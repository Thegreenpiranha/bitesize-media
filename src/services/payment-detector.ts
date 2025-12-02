import { SimplePool, Event } from 'nostr-tools';
import dotenv from 'dotenv';

dotenv.config();

const CREATOR_PUBKEY = process.env.CREATOR_PUBKEY!;
const MONITORED_RELAYS = process.env.MONITORED_RELAYS!.split(',');
const SUBSCRIPTION_PRICE_SATS = parseInt(process.env.SUBSCRIPTION_PRICE_SATS || '10000');

export class PaymentDetector {
  private pool: SimplePool;

  constructor() {
    this.pool = new SimplePool();
    console.log('Payment Detector initialized');
    console.log(`Watching creator: ${CREATOR_PUBKEY}`);
    console.log(`Monitoring ${MONITORED_RELAYS.length} relays`);
  }

  async start() {
    console.log('Starting payment detection...');

    const sub = this.pool.subscribeMany(
      MONITORED_RELAYS,
      [{
        kinds: [9735],
        '#p': [CREATOR_PUBKEY],
        since: Math.floor(Date.now() / 1000) - 60
      }] as any,
      {
        onevent: (event: Event) => {
          this.handleZapReceipt(event);
        },
        oneose: () => {
          console.log('Subscribed to zap receipts');
          console.log('Watching for payments...\n');
        }
      }
    );
  }

  private handleZapReceipt(event: Event) {
    try {
      const bolt11Tag = event.tags.find(t => t[0] === 'bolt11');
      const descriptionTag = event.tags.find(t => t[0] === 'description');

      if (!bolt11Tag || !descriptionTag) {
        console.log('Invalid zap receipt (missing tags)');
        return;
      }

      const zapRequest = JSON.parse(descriptionTag[1]);
      const senderPubkey = zapRequest.pubkey;
      const amount = this.extractAmountFromBolt11(bolt11Tag[1]);

      console.log('\nZAP RECEIVED:');
      console.log(`  From: ${senderPubkey.slice(0, 8)}...`);
      console.log(`  Amount: ${amount} sats`);
      console.log(`  Event ID: ${event.id.slice(0, 8)}...`);

      if (amount >= SUBSCRIPTION_PRICE_SATS) {
        console.log(`VALID SUBSCRIPTION PAYMENT (${amount} >= ${SUBSCRIPTION_PRICE_SATS})`);
        this.processSubscription(senderPubkey, amount, event.id);
      } else {
        console.log(`Insufficient payment (${amount} < ${SUBSCRIPTION_PRICE_SATS})`);
      }

    } catch (error) {
      console.error('Error processing zap:', error);
    }
  }

  private extractAmountFromBolt11(bolt11: string): number {
    // TODO: Implement proper bolt11 parsing with light-bolt11-decoder
    return 10000;
  }

  private processSubscription(pubkey: string, amount: number, zapEventId: string) {
    console.log('\nPROCESSING SUBSCRIPTION:');
    console.log(`  Subscriber: ${pubkey.slice(0, 8)}...`);
    console.log(`  Amount: ${amount} sats`);
    console.log(`  Zap ID: ${zapEventId.slice(0, 8)}...`);
    
    // TODO: 
    // 1. Add to database
    // 2. Add to relay whitelist
    // 3. Send encrypted DM with instructions
    // 4. Schedule renewal reminder

    console.log('Subscription processed (TODO: implement database + whitelist)\n');
  }

  stop() {
    this.pool.close(MONITORED_RELAYS);
    console.log('Payment detector stopped');
  }
}