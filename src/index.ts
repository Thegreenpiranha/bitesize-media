import dotenv from 'dotenv';
import { PaymentDetector } from './services/payment-detector';

// Load environment variables
const result = dotenv.config();

if (result.error) {
  console.error('Error loading .env file:', result.error);
} else {
  console.log('.env file loaded successfully');
}

console.log('Bitesize Media - Starting...');
console.log('Creator:', process.env.CREATOR_PUBKEY);
console.log('⚡Subscription Price:', process.env.SUBSCRIPTION_PRICE_SATS, 'sats');
console.log('Platform Fee:', process.env.PLATFORM_FEE_PERCENT + '%');
console.log('');

async function main() {
  try {
    // Start payment detection
    const paymentDetector = new PaymentDetector();
    await paymentDetector.start();

    console.log('Bitesize Media running');
    console.log('Press Ctrl+C to stop\n');

    // Handle shutdown
    process.on('SIGINT', () => {
      console.log('\n Shutting down...');
      paymentDetector.stop();
      process.exit(0);
    });

  } catch (error) {
    console.error('Error starting Bitesize Media:', error);
    process.exit(1);
  }
}

main();