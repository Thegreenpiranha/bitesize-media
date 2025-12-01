-- Subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
    id SERIAL PRIMARY KEY,
    subscriber_pubkey VARCHAR(64) NOT NULL,
    creator_pubkey VARCHAR(64) NOT NULL,
    amount_sats INTEGER NOT NULL,
    zap_event_id VARCHAR(64) UNIQUE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'active', -- active, expired, cancelled
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    last_renewal_reminder TIMESTAMP,
    UNIQUE(subscriber_pubkey, creator_pubkey)
);

-- Relay whitelist
CREATE TABLE IF NOT EXISTS relay_whitelist (
    id SERIAL PRIMARY KEY,
    pubkey VARCHAR(64) NOT NULL,
    relay_url VARCHAR(255) NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    UNIQUE(pubkey, relay_url)
);

-- Payment events (for deduplication)
CREATE TABLE IF NOT EXISTS payment_events (
    id SERIAL PRIMARY KEY,
    event_id VARCHAR(64) UNIQUE NOT NULL,
    subscriber_pubkey VARCHAR(64) NOT NULL,
    creator_pubkey VARCHAR(64) NOT NULL,
    amount_sats INTEGER NOT NULL,
    processed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Premium groups
CREATE TABLE IF NOT EXISTS premium_groups (
    id SERIAL PRIMARY KEY,
    creator_pubkey VARCHAR(64) NOT NULL,
    group_id VARCHAR(64) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(creator_pubkey)
);

-- Group members
CREATE TABLE IF NOT EXISTS group_members (
    id SERIAL PRIMARY KEY,
    group_id VARCHAR(64) NOT NULL,
    member_pubkey VARCHAR(64) NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(group_id, member_pubkey)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_subscriptions_subscriber ON subscriptions(subscriber_pubkey);
CREATE INDEX IF NOT EXISTS idx_subscriptions_creator ON subscriptions(creator_pubkey);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_expires ON subscriptions(expires_at);
CREATE INDEX IF NOT EXISTS idx_whitelist_pubkey ON relay_whitelist(pubkey);
CREATE INDEX IF NOT EXISTS idx_payment_events_id ON payment_events(event_id);