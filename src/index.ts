import dotenv from 'dotenv';

// Load environment variables
const result = dotenv.config();

if (result.error) {
  console.error('Error loading .env file:', result.error);
} else {
  console.log('✅ .env file loaded successfully');
}

console.log('🚀 Bitesize Media - Starting...');
console.log('📡 Creator:', process.env.CREATOR_PUBKEY);
console.log('⚡ Subscription Price:', process.env.SUBSCRIPTION_PRICE_SATS, 'sats');
console.log('💰 Platform Fee:', process.env.PLATFORM_FEE_PERCENT + '%');

async function main() {
  try {
    console.log('✅ Bitesize Media initialized');
    
    // TODO: Start services
    // - Payment detector
    // - Subscription manager
    // - Relay manager
    
  } catch (error) {
    console.error('❌ Error starting Bitesize Media:', error);
    process.exit(1);
  }
}

main();
