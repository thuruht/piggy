# Deployment Guide

This document outlines the process for deploying the PigMap.org application to Cloudflare.

## Prerequisites

1.  **Install Wrangler:**
    ```bash
    npm install -g wrangler
    ```
2.  **Authenticate with Cloudflare:**
    ```bash
    wrangler login
    ```
3.  **Install Project Dependencies:**
    ```bash
    npm install
    ```

## Deployment Steps

1.  **Run Database Migrations:**
    Before deploying, ensure your remote D1 database schema is up-to-date:
    ```bash
    npx wrangler d1 migrations apply livestock --remote
    ```

2.  **Deploy the Application:**
    ```bash
    npm run deploy
    ```

## Cloudflare Bindings

The application relies on the following Cloudflare bindings, which must be configured in `wrangler.toml`:

-   **LIVESTOCK_DB (D1):** The primary database for storing all marker, comment, and report data.
-   **LIVESTOCK_MEDIA (R2):** Used for storing user-uploaded images and videos.
-   **PIGMAP_CONFIG (KV):** Used for session tracking to prevent duplicate reports and upvotes.
-   **LIVESTOCK_REPORTS (Durable Object):** Manages real-time WebSocket connections for live updates.
-   **RATE_LIMITER:** Provides rate limiting functionality for the API endpoints.

## Routes

The application is configured to be served from the following routes:

-   pigmap.org/*
-   www.pigmap.org/*
-   kc.pigmap.org/*
-   kcmo.pigmap.org/*
-   kansascity.pigmap.org/*
