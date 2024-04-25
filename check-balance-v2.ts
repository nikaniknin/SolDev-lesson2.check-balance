import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";

const suppliedPublicKey = process.argv[2]; //example: BDeHQNAw7R88j6mZLFc8CgQ4FoFN3AoDiM83CYSFVcau, ANv1sNQACR4pDQSyFbRNpixEZ8Kz3Jr4GcszhhH8D3ju 
if (!suppliedPublicKey) {
    throw new Error("Provide a public key to check the balance of!");
}

const publicKey = new PublicKey(suppliedPublicKey);

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

const balanceiInLamports = await connection.getBalance(publicKey);

const balanceInSOL = balanceiInLamports / LAMPORTS_PER_SOL;

console.log(`💰 Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`);

//run: npx esrun check-balance-v2 BDeHQNAw7R88j6mZLFc8CgQ4FoFN3AoDiM83CYSFVcau