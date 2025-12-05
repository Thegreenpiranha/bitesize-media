import { pool } from '../db/connection';

export class SubscriptionManager {
  
  async createSubscription(
    subscriberPubkey: string,
    creatorPubkey: string,
    amountSats: number,
    zapEventId: string
  ): Promise<void> {
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    try {
      const existing = await pool.query(
        'SELECT id FROM subscriptions WHERE subscriber_pubkey = $1 AND creator_pubkey = $2 AND status = $3',
        [subscriberPubkey, creatorPubkey, 'active']
      );

      if (existing.rows.length > 0) {
        console.log('Subscription already exists, extending expiry');
        await pool.query(
          'UPDATE subscriptions SET expires_at = $1 WHERE id = $2',
          [expiresAt, existing.rows[0].id]
        );
        return;
      }

      await pool.query(
        `INSERT INTO subscriptions (subscriber_pubkey, creator_pubkey, amount_sats, zap_event_id, expires_at)
         VALUES ($1, $2, $3, $4, $5)`,
        [subscriberPubkey, creatorPubkey, amountSats, zapEventId, expiresAt]
      );

      await pool.query(
        `INSERT INTO payment_events (event_id, subscriber_pubkey, creator_pubkey, amount_sats)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (event_id) DO NOTHING`,
        [zapEventId, subscriberPubkey, creatorPubkey, amountSats]
      );

      console.log('Subscription created successfully');
      console.log(`  Expires: ${expiresAt.toISOString()}`);

    } catch (error) {
      console.error('Error creating subscription:', error);
      throw error;
    }
  }

  async addToRelayWhitelist(pubkey: string, relayUrl: string): Promise<void> {
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    try {
      await pool.query(
        `INSERT INTO relay_whitelist (pubkey, relay_url, expires_at)
         VALUES ($1, $2, $3)
         ON CONFLICT (pubkey, relay_url) DO UPDATE SET expires_at = $3`,
        [pubkey, relayUrl, expiresAt]
      );

      console.log(`Added ${pubkey.slice(0, 8)}... to relay whitelist`);

    } catch (error) {
      console.error('Error adding to whitelist:', error);
      throw error;
    }
  }

  async getActiveSubscriptions(): Promise<any[]> {
    const result = await pool.query(
      'SELECT * FROM subscriptions WHERE status = $1 AND expires_at > NOW()',
      ['active']
    );
    return result.rows;
  }
}