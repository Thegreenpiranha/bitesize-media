# Bitesize Media

> Premium Nostr relay monetization for creators

Turn your Nostr audience into recurring revenue through Lightning-powered premium relays.

**Live at:** https://bitesize-media.com

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

## Revenue Model

### Platform Fee: 2.1%

**Why 2.1%?**  
Like 21 million bitcoin - it's a principle, not profit optimization.

**Industry Comparison:**
- Patreon: 5-12%
- YouTube: 30-45%  
- OnlyFans: 20%
- Substack: 10%
- **Bitesize Media: 2.1%** ⚡

### Example Economics

**Creator with 50,000 followers:**
```
Conservative (0.5% conversion):
- 250 subscribers × 10k sats/month = 2.5M sats ≈ $2,275/month
- Creator keeps: $2,227/month (97.9%)
- Platform: $48/month (2.1%)

Realistic (1% conversion):
- 500 subscribers × 10k sats/month = 5M sats ≈ $4,550/month  
- Creator keeps: $4,454/month
- Platform: $96/month

Strong (2% conversion):
- 1,000 subscribers × 10k sats/month = 10M sats ≈ $9,100/month
- Creator keeps: $8,909/month
- Platform: $191/month
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
git clone https://github.com/yourusername/bitesize-media
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

## Roadmap

### ✅ Phase 0: Foundation (Week 1)
- [x] Project setup and documentation
- [ ] Deploy strfry relay with NIP-42 auth
- [ ] PostgreSQL schema (subscriptions, whitelist)
- [ ] Basic payment detection (zap monitoring)

### 🚧 Phase 1: MVP (Week 2-3)
- [ ] Automated whitelist management
- [ ] Encrypted DM delivery (onboarding instructions)
- [ ] Renewal reminder system (Day 25 notifications)
- [ ] Manual creator dashboard (revenue, active subs)

### 📋 Phase 2: Launch (Week 4)
- [ ] Deploy to production VPS
- [ ] SSL/domain configuration
- [ ] Onboard first creator (53k followers)
- [ ] Soft launch with 10-20 test subscribers

### 🎯 Phase 3: Scale (Month 2-3)
- [ ] Multi-creator support
- [ ] Automated onboarding flow
- [ ] Analytics dashboard
- [ ] Public marketplace/discovery

### 🚀 Phase 4: Expand (Month 4-6)
- [ ] Tiered subscriptions (basic/premium/VIP)
- [ ] Bundle subscriptions (multiple creators)
- [ ] Mobile-optimized ticket viewer
- [ ] Creator referral program

---

## Success Metrics

### 30-Day Targets (First Creator)
- **Subscribers:** 50+ (0.1% conversion from 53k followers)
- **Revenue:** $455+/month for creator
- **Churn:** <20% monthly
- **Platform revenue:** $9.50+/month (covers infrastructure)

### 90-Day Targets  
- **Subscribers:** 200+ (0.4% conversion)
- **Revenue:** $1,820+/month for creator  
- **Churn:** <15% monthly
- **New creators:** 3-5 in pipeline

### 6-Month Vision
- **Creators:** 10-20 active
- **Total volume:** $50k+/month
- **Platform MRR:** $1,000+
- **Proven model, ready to scale**

---

## Infrastructure Costs

### Monthly Operating Expenses
```
VPS (Hetzner CPX21): $6/month
- 3 vCPU, 4GB RAM, 80GB SSD
- Relay + backend + database

Domain: $1/month  
- bitesize-media.com + SSL (Let's Encrypt)

Total: $7/month
```

**Break-even:** 1 creator with 50+ subscribers

**At scale (50 creators):** $7/month infrastructure, $2,500+/month revenue

---

## Contributing

Currently in private beta. Open to contributions after public launch.

**Interested in early access?**
- Creators: Apply at https://bitesize-media.com/creators 
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

- **Website:** https://bitesize-media.com
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