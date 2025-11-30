# Bitesize Media

> Premium Nostr relay monetization for creators

Turn your Nostr audience into recurring revenue through Lightning-powered premium relays.

**Live at:** https://bitesize-media.com //needs updating for pivot

---

## The Problem

Nostr creators with large followings (10k-100k+) struggle to monetize:
- Random zaps average 1-10 sats (< $0.01 per tip)
- Inconsistent revenue despite engaged audiences  
- No sustainable income model for full-time creation

**Example:** Creator with 53,000 followers earns ~$50/month from random zaps.

## The Solution

**Premium Relay Subscriptions:**

1. Creator posts content to private relay immediately
2. Premium subscribers (10,000 sats/month ≈ $9) see content instantly
3. Free followers see content 24 hours later on public relays
4. Automatic monthly renewals via Lightning payments

**Same creator:** 1% conversion = 530 subscribers = ~$4,800/month recurring revenue

---

## Why Bitesize Media?

### For Creators
- **Real revenue:** $2k-10k/month vs. $50/month in random zaps
- **You keep 97.9%:** Only 2.1% platform fee
- **No platform risk:** You own your keys, your relay, your audience
- **Predictable income:** Monthly subscriptions vs. random tips

### For Subscribers  
- **Early access:** See content 24 hours before free followers
- **Direct support:** Your $9/month goes directly to the creator
- **Exclusive content:** Premium-only posts and updates
- **No accounts:** Just your Nostr key and Lightning wallet

### For the Ecosystem
- **2.1% fee:** Aligned with 21M bitcoin cap (principle over profit)
- **Open source:** Built on Nostr standards (NIPs)
- **Censorship-resistant:** Decentralized relay infrastructure
- **Lightning-native:** Instant payments, no middlemen

---

## How It Works

### Creator Workflow
```
1. Post meme/content to premium relay (alice.bitesize-media.com)
2. Premium subscribers see it immediately
3. 24 hours later, repost to public relays
4. Repeat daily, earn monthly recurring revenue
```

### Subscriber Workflow  
```
1. Discover creator's premium offering
2. Zap subscription event with 10,000 sats
3. Receive encrypted DM with relay credentials
4. Add premium relay to Nostr client (one-time setup)
5. Enjoy early access to content
```

### Technical Flow
```
Fan zaps creator's subscription event (≥10k sats)
         ↓
Payment detected via NIP-57 zap receipts
         ↓
Subscriber's pubkey added to relay whitelist (NIP-42)
         ↓
Encrypted DM sent with relay URL and setup instructions
         ↓
Subscriber adds wss://creator.bitesize-media.com to client
         ↓
Instant access to premium content
         ↓
Day 25: Renewal reminder sent via DM
         ↓
Day 30: Access expires if not renewed
```

---

## Tech Stack

**Infrastructure:**
- **Relay:** strfry (C++, battle-tested Nostr relay)
- **Backend:** Node.js + nostr-tools
- **Database:** PostgreSQL (subscription tracking, whitelist management)
- **Queue:** BullMQ (renewal reminders, scheduled tasks)
- **Auth:** NIP-42 relay authentication
- **Payment:** Lightning via NIP-57 zap monitoring

**Nostr Standards (NIPs):**
- NIP-01: Basic protocol
- NIP-04/44: Encrypted direct messages
- NIP-42: Relay authentication
- NIP-57: Lightning zaps

---

## Architecture
```
┌──────────────────────────────────────┐
│  Public Nostr Relays                 │
│  (relay.damus.io, nos.lol, etc.)     │
│  - Monitor zap receipts (kind 9735)  │
└──────────────────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│  Payment Detection Service           │
│  - Filter by creator pubkey          │
│  - Validate amount ≥ 10,000 sats     │
│  - Extract subscriber pubkey         │
└──────────────────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│  Subscription Manager                │
│  - Add pubkey to relay whitelist     │
│  - Send encrypted DM with setup      │
│  - Schedule 30-day renewal reminder  │
│  - Handle renewals/expirations       │
└──────────────────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│  Premium Relay (strfry)              │
│  wss://creator.bitesize-media.com    │
│  - NIP-42 authentication required    │
│  - Whitelist-only read access        │
│  - Creator always has write access   │
└──────────────────────────────────────┘
```
---

## Installation

### Prerequisites
```bash
Node.js 18+
PostgreSQL 14+
strfry relay
Lightning node (for testing)
```

### Quick Start
```bash
# Clone repository
git clone https://github.com/Thegreenpiranha/bitesize-media
cd bitesize-media

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your settings

# Initialize database
npm run db:init

# Start development server
npm run dev
```

### Environment Variables
```env
# .env
CREATOR_PUBKEY=npub1...
RELAY_URL=wss://creator.bitesize-media.com
PLATFORM_PRIVKEY=nsec1...
SUBSCRIPTION_PRICE_SATS=10000
SUBSCRIPTION_DURATION_DAYS=30
PLATFORM_FEE_PERCENT=2.1
DATABASE_URL=postgresql://user:pass@localhost:5432/bitesize
MONITORED_RELAYS=wss://relay.damus.io,wss://nos.lol,wss://relay.nostr.band
```

---

## Contributing

Currently in private beta. Open to contributions after public launch.

**Interested in early access?**
- Creators: Apply at https://bitesize-media.com/creators // to be built
- Developers: Email sean@bitesize-media.com

---

## Why "Bitesize Media"?

- **Bite-sized:** Short-form content (memes, clips, quick takes)
- **Media:** Any content type (images, video, text, audio)
- **2.1%:** Aligned with Bitcoin (21M cap)
- **Lightning:** Fast payments, low fees
- **Nostr:** Decentralized, censorship-resistant

---

## License

MIT License - see [LICENSE](LICENSE) for details

---

## Contact

- **Website:** https://bitesize-media.com //needs updating for the pivot
- **Nostr:** npub19aw7qqpahp8v64zfz2p4p3nv07mra8gzkfgdsjhcfarrutumemcstpfsmu
- **Email:** hello@bitesize-media.com
- **GitHub:** https://github.com/Thegreenpiranha/bitesize-media

---

## Acknowledgments

Built on the shoulders of giants:
- [Nostr Protocol](https://github.com/nostr-protocol/nostr)
- [strfry relay](https://github.com/hoytech/strfry)
- [nostr-tools](https://github.com/nbd-wtf/nostr-tools)
- The entire Nostr community

---

**Built with ⚡️ on Nostr**

*"Real monetization for real creators. No middlemen, no platform risk, no censorship."*