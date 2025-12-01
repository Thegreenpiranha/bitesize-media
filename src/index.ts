import dotenv from 'dotenv';

//Load environment variables
dotenv.config

console.log('Bitesize Media - Starting...');
console.log('Creator: ${process.env.CREATOR_PUBKEY}');
console.log(`⚡ Subscription Price: ${process.env.SUBSCRIPTION_PRICE_SATS} sats`);
console.log(`Platform Fee: ${process.env.PLATFORM_FEE_PERCENT}%`);

async function main() {
    try {
        console.log( 'Bitesize Media initialised');

        //TODO: Start services
        // - Payment detector
        // - Subscription manager
        // - Relay manager

    } catch (error) {
        console.error('Error starting Bitesize Media:', error);
    }
}

main();