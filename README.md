# Todo DApp with Event-Driven Architecture

[![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-4+-646CFF?logo=vite)](https://vitejs.dev/)
[![Ethers.js](https://img.shields.io/badge/Ethers.js-6+-3C3C3D)](https://docs.ethers.org/)
[![Radix UI](https://img.shields.io/badge/Radix_UI-1.0-161618)](https://www.radix-ui.com/)

A decentralized todo list application demonstrating event-driven architecture patterns for real-time blockchain interactions and theme management.

**Read the accompanying article**: [Event-Driven Architecture for DApp Development](https://medium.com/@emmanuelomemgboji/event-driven-architecture-for-dapp-contract-event-listening-ed52381587cc)

## Features

- 🎨 System-wide theme toggling (dark/light mode)
- 📝 Real-time todo management via smart contract events
- ⚡ Instant UI updates without page refresh
- 🔗 Blockchain state synchronization
- 🛠 Custom event management hooks

## Prerequisites

- Node.js v18+
- MetaMask (or compatible Ethereum wallet)
- [Reown AppKit Project ID](https://cloud.reown.com/)

## Setup

1. **Clone repository**

```bash
git clone https://github.com/Signor1/event-driven-todo-dapp.git
cd event-driven-todo-dapp
```

1. **Install dependencies**

```bash
npm install
```

1. **Configure environment**  
Create `.env` file from example:

```bash
cp .env.example .env
```

| Environment Variable         | Description                            |
|------------------------------|----------------------------------------|
| `VITE_APPKIT_PROJECT_ID`     | From Reown AppKit Dashboard            |
| `VITE_BASE_RPC_URL`          | Blockchain RPC endpoint                |
| `VITE_CONTRACT_ADDRESS`      | Deployed Todo contract address         |

The smart contract can be found in the article
4. **Run development server**

```bash
npm run dev
```

## Tech Stack

- **Frontend**: React + Vite
- **Blockchain**: Ethers.js
- **UI Components**: Radix Primitives
- **State Management**: Context API + Custom Event System
- **Wallet Management**: Reown AppKit

## Learn More

For detailed implementation insights and architecture decisions, read the companion article:  
[Event-Driven Architecture for DApp Development](https://medium.com/@emmanuelomemgboji/event-driven-architecture-for-dapp-contract-event-listening-ed52381587cc)

## Credits

- UI components powered by [Radix UI](https://www.radix-ui.com/)
- Blockchain interactions managed via [Reown AppKit](https://reown.com/)
