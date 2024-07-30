import { mintTo } from "@solana/spl-token";
import "dotenv/config";
import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
const connection = new Connection(clusterApiUrl("devnet"));

// Our token has two decimal places
const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

const user = getKeypairFromEnvironment("SECRET_KEY");

// Subtitute in your token mint account from create-token-mint.ts
const tokenMintAccount = new PublicKey(
  "A1bixEZXErya6gNzMs29s7VqZpd1BgXZUwHt6fD3kQZV"
);

// Substitute in your own, or a friend's token account address, based on the previous step.
const recipientAssociatedTokenAccount = new PublicKey(
  "4uChPBzyo7dumKm5yG7JWBRYFZ1KLhPPmcMo51jq7ySB"
);

const transactionSignature = await mintTo(
  connection,
  user,
  tokenMintAccount,
  recipientAssociatedTokenAccount,
  user,
  100* MINOR_UNITS_PER_MAJOR_UNITS
);

const link = getExplorerLink("transaction", transactionSignature, "devnet");

console.log(`✅ Success! Mint Token Transaction: ${link}`);