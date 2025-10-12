# PigMap.org - Anonymous Community Tracking System

A privacy-focused, real-time community tracking application for Kansas City. This application allows users to anonymously report and visualize incidents on a map.

## Key Features

- **Anonymous Reporting:** Users can submit reports without creating an account or providing personal information.
- **Real-time Map:** Reports are displayed on a live map, with real-time updates provided via WebSockets.
- **Data Visualization:** A dedicated sidebar provides insights into the data with charts for trends and distribution.
- **Media Uploads:** Users can upload images and videos associated with their reports.
- **Multi-language Support:** The interface is available in 16 languages.
- **PWA Ready:** The application can be installed on a user's home screen for a native-like experience.
- **Privacy First:** No IP addresses are logged, and all submissions are anonymous.

## Tech Stack

- **Frontend:** Vanilla JavaScript, HTML, CSS
- **Backend:** Cloudflare Workers, Hono (for routing)
- **Database:** Cloudflare D1
- **Storage:** Cloudflare R2 for media uploads
- **Real-time:** Cloudflare Durable Objects for WebSocket management
- **Mapping:** OpenLayers
- **Charting:** D3.js
- **Animations:** GSAP

## Setup and Deployment

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Configure Cloudflare:**
    - Ensure your `wrangler.toml` file is configured with the correct Cloudflare account details and bindings for D1, R2, and Durable Objects.

3.  **Run Migrations:**
    - To set up your D1 database schema, run:
    ```bash
    npx wrangler d1 migrations apply livestock --remote
    ```

4.  **Deploy:**
    ```bash
    npm run deploy
    ```

## Development

To run the application locally for development, use the following command. This will start a local server with hot-reloading.

```bash
npm run dev
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any bugs or feature requests.
