const { finalizeEvent, getPublicKey } = require('nostr-tools');
const { SimplePool } = require('nostr-tools/pool');

// Fixed test key (this specific private key for testing only)
const sk = Buffer.from('76ded5f55577390211538e7cec2575993005cfac56eaab33a5f9cf73cdc154f9', 'hex');

async function publishTest() {
  const pk = getPublicKey(sk);
  
  console.log('Publishing as:', pk);
  
  const pool = new SimplePool();
  const relay = 'wss://relay.bitesize-media.com';
  
  const event = finalizeEvent({
    kind: 1,
    created_at: Math.floor(Date.now() / 1000),
    tags: [],
    content: 'Test from whitelisted key!'
  }, sk);
  
  console.log('Attempting to publish...');
  
  try {
    await Promise.race([
      pool.publish([relay], event),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 10000))
    ]);
    console.log('Success!');
  } catch (error) {
    console.error('Error:', error.message);
  }
  
  pool.close([relay]);
}

publishTest();