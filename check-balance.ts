import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";

const publicKey = new PublicKey("BKsVcQb2xrRJrhBwzHeirEfVBzZ16bacXVnE6YoMogKv");

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

const balanceiInLamports = await connection.getBalance(publicKey);

const balanceInSOL = balanceiInLamports / LAMPORTS_PER_SOL;

console.log(`💰 Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`);