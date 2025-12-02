const { SimplePool } = require('nostr-tools/pool');

async function testRelay() {
  console.log('🔌 Testing wss://relay.bitesize-media.com\n');
  
  const pool = new SimplePool();
  const relay = 'wss://relay.bitesize-media.com';

  try {
    // Query for recent events
    console.log('📡 Querying for recent events...');
    const events = await pool.querySync([relay], { 
      kinds: [0, 1, 3, 7, 9735], // Metadata, notes, contacts, reactions, zaps
      limit: 20 
    });
    
    console.log(`✅ Connected! Found ${events.length} events\n`);

    if (events.length > 0) {
      events.forEach((event, i) => {
        console.log(`Event ${i + 1} (kind ${event.kind}):`);
        console.log(`  Author: npub...${event.pubkey.slice(-8)}`);
        console.log(`  ${event.content.slice(0, 60)}${event.content.length > 60 ? '...' : ''}`);
        console.log('');
      });
    } else {
      console.log('💡 Relay is empty (normal for new relay)\n');
      console.log('To populate it:');
      console.log('  1. Add this relay to your Nostr client');
      console.log('  2. Publish a test note');
      console.log('  3. Watch it appear here!\n');
    }

    // Watch for new events (all common kinds)
    console.log('👀 Watching for new events (Ctrl+C to stop)...\n');
    
    const sub = pool.subscribeMany(
      [relay],
      [{ 
        kinds: [0, 1, 3, 4, 5, 6, 7, 9735], // Common event types
        since: Math.floor(Date.now() / 1000) // Only new events from now
      }],
      {
        onevent(event) {
          const kindNames = {
            0: 'Metadata',
            1: 'Note',
            3: 'Contacts',
            4: 'DM',
            5: 'Delete',
            6: 'Repost',
            7: 'Reaction',
            9735: 'Zap'
          };
          
          console.log(`⚡ NEW EVENT (${kindNames[event.kind] || 'Unknown'}):`);
          console.log(`  Author: npub...${event.pubkey.slice(-8)}`);
          if (event.content) {
            console.log(`  Content: ${event.content.slice(0, 80)}`);
          }
          console.log('');
        },
        oneose() {
          console.log('📡 Subscription active - relay is ready!\n');
        }
      }
    );

    // Keep running
    process.on('SIGINT', () => {
      console.log('\n👋 Closing connection...');
      sub.close();
      pool.close([relay]);
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testRelay();
