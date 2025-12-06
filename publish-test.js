const { finalizeEvent, generateSecretKey, getPublicKey } = require('nostr-tools');
const { SimplePool } = require('nostr-tools/pool');

async function publishTest() {
  // Your keys (you'll need your actual private key)
  const sk = generateSecretKey(); // Replace with your actual secret key if you have it
  const pk = getPublicKey(sk);
  
  console.log('Publishing as:', pk);
  
  const pool = new SimplePool();
  const relay = 'wss://relay.bitesize-media.com';
  
  const event = finalizeEvent({
    kind: 1,
    created_at: Math.floor(Date.now() / 1000),
    tags: [],
    content: 'Test post to my premium relay!'
  }, sk);
  
  console.log('Event:', event);
  
  try {
    await Promise.race([
      pool.publish([relay], event),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 10000))
    ]);
    console.log('Published successfully!');
  } catch (error) {
    console.error('Error:', error.message);
  }
  
  pool.close([relay]);
}

publishTest();