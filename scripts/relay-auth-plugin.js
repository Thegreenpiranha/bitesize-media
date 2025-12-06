#!/usr/bin/env node

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function checkAuth(pubkey) {
  try {
    const result = await pool.query(
      'SELECT pubkey FROM relay_whitelist WHERE pubkey = $1 AND expires_at > NOW()',
      [pubkey]
    );
    
    return result.rows.length > 0;
  } catch (error) {
    console.error('Auth check error:', error);
    return false;
  }
}

// Read AUTH event from stdin (strfry format)
let inputData = '';
process.stdin.on('data', (chunk) => {
  inputData += chunk;
});

process.stdin.on('end', async () => {
  try {
    const event = JSON.parse(inputData);
    const pubkey = event.pubkey;
    
    const isAllowed = await checkAuth(pubkey);
    
    // Return result to strfry
    console.log(JSON.stringify({
      id: event.id,
      action: isAllowed ? 'accept' : 'reject',
      msg: isAllowed ? '' : 'Subscription required'
    }));
    
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('Plugin error:', error);
    process.exit(1);
  }
});