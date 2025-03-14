import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { AppKitNetwork, baseSepolia, sepolia } from "@reown/appkit/networks";

// 1. Get projectId
const projectId = import.meta.env.VITE_APPKIT_PROJECT_ID;

// 2. Set the networks
const networksList: AppKitNetwork[] = [sepolia, baseSepolia];

// Simplified networks setup - either use the list or default to baseSepolia
const networks: [AppKitNetwork, ...AppKitNetwork[]] =
  networksList.length > 0
    ? [networksList[0], ...networksList.slice(1)]
    : [baseSepolia];

// 3. Create a metadata object - optional
const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "https://mywebsite.com", // origin must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
};

// 4. Create a AppKit instance
createAppKit({
  adapters: [new EthersAdapter()],
  defaultNetwork: baseSepolia,
  networks,
  metadata,
  projectId,
  themeVariables: {
    "--w3m-accent": "#d97706",
    "--w3m-border-radius-master": "1px",
  },
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
});
