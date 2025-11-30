# Bitesize Media

> Premium Nostr relay monetization for creators

Turn your Nostr audience into recurring revenue through Lightning-powered premium relays.

**Coming soon:** https://bitesize-media.com

---

## The Problem

Nostr creators with large followings (10k-100k+) struggle to monetize:
- Random zaps average 1-10 sats (< $0.01 per tip)
- Inconsistent revenue despite engaged audiences  
- No sustainable income model for full-time creation

**Example:** Creator with 53,000 followers earns ~$50/month from random zaps.

## The Solution

**Premium Relay Subscriptions with Exclusive Content:**

1. Creator posts exclusive content to premium relay (10x more volume)
2. Premium subscribers (10,000 sats/month ≈ $9) get access to exclusive content + private community
3. Free followers still see occasional public posts (different content, lower volume)
4. Automatic monthly renewals via Lightning payments

**Value proposition:** Premium members get exclusive content, higher volume, and community access that free followers never see.

**Same creator:** 1% conversion = 530 subscribers = ~$4,800/month recurring revenue

---

## Why Bitesize Media?

### For Creators
- **Real revenue:** $2k-10k/month vs. $50/month in random zaps
- **You keep 97.9%:** Only 2.1% platform fee
- **No platform risk:** You own your keys, your relay, your audience
- **Predictable income:** Monthly subscriptions vs. random tips
- **Content control:** Decide what's premium vs. public

### For Subscribers  
- **Exclusive content:** Premium-only posts that never go public
- **10x more volume:** Daily exclusive content vs. occasional public posts
- **Private community:** Access to premium member group chat (NIP-29)
- **Direct support:** Your $9/month goes directly to the creator (97.9%)
- **Behind-the-scenes:** Work-in-progress, exclusive formats, creator insights
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
Daily:
1. Post exclusive content to premium relay (alice.bitesize-media.com)
2. Premium subscribers see exclusive memes, behind-the-scenes, WIP content
3. Engage with premium community in private group chat

Weekly:
4. Post occasional content to public relays (different content, drives discovery)
5. Public posts include teasers/previews that drive premium signups
```

### Content Strategy
```
FREE TIER (Public Relays):
- 2-3 posts per week
- Different content than premium
- Teasers and previews
- Drives discovery and signups

PREMIUM TIER (Private Relay + Community):
- Daily exclusive content (10x volume)
- Premium-only memes and formats
- Behind-the-scenes content
- Work-in-progress and experiments
- Private community group chat
- Direct creator interaction
```

### Subscriber Workflow  
```
1. Discover creator's premium offering via public posts
2. Zap subscription event with 10,000 sats
3. Receive encrypted DM with:
   - Premium relay credentials (wss://creator.bitesize-media.com)
   - Private community group invite
   - Setup instructions
4. Add premium relay to Nostr client (one-time setup)
5. Join private community group
6. Enjoy exclusive content + community access
```

### Technical Flow
```
Fan zaps creator's subscription event (≥10k sats)
         ↓
Payment detected via NIP-57 zap receipts
         ↓
Subscriber's pubkey added to relay whitelist (NIP-42)
         ↓
Subscriber added to premium community group (NIP-29)
         ↓
Encrypted DM sent with:
  - Relay URL and setup instructions
  - Community group invite
  - Welcome message
         ↓
Subscriber adds wss://creator.bitesize-media.com to client
         ↓
Access to exclusive content + private community
         ↓
Day 25: Renewal reminder sent via DM
         ↓
Day 30: Access revoked if not renewed (relay + community)
```

---

## Tech Stack

**Infrastructure:**
- **Relay:** strfry (C++, battle-tested Nostr relay)
- **Backend:** Node.js + nostr-tools
- **Database:** PostgreSQL (subscription tracking, whitelist management)
- **Queue:** BullMQ (renewal reminders, scheduled tasks)
- **Auth:** NIP-42 relay authentication
- **Community:** NIP-29 groups (private member chat)
- **Payment:** Lightning via NIP-57 zap monitoring

**Nostr Standards (NIPs):**
- NIP-01: Basic protocol
- NIP-04/44: Encrypted direct messages
- NIP-29: Relay-based groups (private communities)
- NIP-42: Relay authentication
- NIP-57: Lightning zaps

---

## Architecture
```
┌──────────────────────────────────────┐
│  Public Nostr Relays                 │
│  (relay.damus.io, nos.lol, etc.)     │
│  - Monitor zap receipts (kind 9735)  │
│  - Creator's public content          │
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
│  - Add pubkey to premium group       │
│  - Send encrypted DM with setup      │
│  - Schedule 30-day renewal reminder  │
│  - Handle renewals/expirations       │
└──────────────────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│  Premium Infrastructure              │
│                                      │
│  Premium Relay (strfry)              │
│  wss://creator.bitesize-media.com    │
│  - NIP-42 authentication required    │
│  - Whitelist-only read access        │
│  - Creator write access              │
│  - Exclusive content only            │
│                                      │
│  Premium Community (NIP-29)          │
│  - Private group chat                │
│  - Member-only discussions           │
│  - Direct creator interaction        │
└──────────────────────────────────────┘
```
---

## Value Proposition Example

### Meme Creator with 50k Followers

**FREE TIER (Public Relays):**
- 2-3 memes per week
- Keeps creator visible
- Drives discovery
- Teasers for premium content

**PREMIUM TIER ($9/month):**
- 10-15 exclusive memes per week (7x more content)
- Behind-the-scenes content
- Work-in-progress and experiments
- Premium community group chat
- Vote on content ideas
- Custom meme requests (monthly)

**ROI for Subscriber:**
- $9/month = ~$0.30 per day
- Get 2-3 exclusive memes daily
- Access to private community
- Direct creator interaction
- Support creator directly (97.9% goes to them)

**ROI for Creator:**
- 1% conversion = 500 subscribers
- 500 × 10k sats = 5M sats/month ≈ $4,550/month
- Keep $4,454/month (97.9%)
- Sustainable full-time income

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
PREMIUM_GROUP_ID=group_unique_id
```

---

## Contributing

Currently in private beta. Open to contributions after public launch.

**Interested in early access?**
- Creators: Star this repo and watch for updates
- Developers: Open an issue or reach out via Nostr

---

## Why "Bitesize Media"?

- **Bite-sized:** Short-form content (memes, clips, quick takes)
- **Media:** Any content type (images, video, text, audio)
- **2.1%:** Aligned with Bitcoin (21M cap)
- **Lightning:** Fast payments, low fees
- **Nostr:** Decentralized, censorship-resistant
- **Community-first:** Premium = content + belonging

---

## License

MIT License - see [LICENSE](LICENSE) for details

---

## Contact

- **Website:** https://bitesize-media.com *(coming soon)*
- **Nostr:** npub19aw7qqpahp8v64zfz2p4p3nv07mra8gzkfgdsjhcfarrutumemcstpfsmu
- **Email:** sean@bitesize-media.com
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