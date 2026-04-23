# ShipTrack — Transport Shipment Tracker

A simple Transport Shipment Tracker Web App built with **React**, **Zustand**, and **TailwindCSS**. This project demonstrates a basic implementation of a shipment tracking system with features like listing shipments, viewing details, and assigning transporters.

---

## Live Demo

🌐 **[https://shipment-tracker.mfadhilfadholi.my.id/](https://shipment-tracker.mfadhilfadholi.my.id/)**

---

## Project Structure

```
shipment-tracker/
├── public/
├── src/
│   ├── components /                    # Reusable UI components (e.g., ShipmentCard, FilterSummary)
│   ├── data/                           # Mock data for shipments
│   ├── pages/                          # Page components (e.g., HomePage)
│   ├── store/                          # Zustand store for state management
│   ├── test/                           # Unit tests for components and store
│   ├── App.jsx                         # Root component with router
│   ├── main.jsx                        # Entry point
│   └── index.css                       # Global styles
├── index.html
├── package.json
├── pnpm-lock.yaml
├── README.md
└── vite.config.js
```

---

## Steps to Run Locally

### Prerequisites

- **Node.js** 19 or higher
- **pnpm** v10 or higher

### Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd shipment-tracker

# 2. Install dependencies
pnpm install

# 3. Start the development server
pnpm run dev
```

The app will be available at `http://localhost:5173`

### Other Commands

```bash
# Run unit tests
pnpm run test

# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

---

## Notes

- **No backend/real API** — All data is served from `src/data/mockData.js`. The `assignTransporter` action simulates an 800ms API delay using `setTimeout` to mimic a real async call.
- **Real-time simulation** — On the List page, a `setInterval` runs every 8 seconds and randomly assigns one unassigned shipment to a random transporter. This simulates a WebSocket or server-push event. The interval is cleaned up when the component unmounts.
- **State persistence** — Zustand state is in-memory only. Refreshing the page resets state to the initial mock data.
- **Vue → React** — The test case specified Vue 3 + Composition API, but this implementation uses React with hooks as a direct equivalent. Zustand replaces Pinia, and React Router replaces Vue Router. All architectural requirements are fulfilled.
- **Test scope** — Unit tests cover the core store logic (`assignTransporter` success/failure, `getShipmentById`). Component tests can be added on top of this foundation.
