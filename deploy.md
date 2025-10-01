# Deploy to pigmap.org

## Setup
1. Install Wrangler: `npm install -g wrangler`
2. Login: `wrangler auth login`
3. Install dependencies: `npm install`

## Deploy
```bash
wrangler deploy
```

## Existing Bindings Used:
- **LIVESTOCK_MEDIA** (R2): Media uploads
- **PIGMAP_CONFIG** (KV): Markers and comments storage  
- **LIVESTOCK_REPORTS** (Durable Object): Real-time updates
- **LIVESTOCK_DB** (D1): Database (optional)
- **RATE_LIMITER**: Request limiting

## Routes:
- pigmap.org/*
- www.pigmap.org/*
- kc.pigmap.org/*
- kcmo.pigmap.org/*
- kansascity.pigmap.org/*

## Privacy Features:
- No IP logging
- Anonymous reporting
- Magic code authentication
- Privacy-first headers