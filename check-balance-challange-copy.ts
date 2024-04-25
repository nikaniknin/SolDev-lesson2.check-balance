import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";

const suppliedPublicKey = process.argv[2]; // example: BDeHQNAw7R88j6mZLFc8CgQ4FoFN3AoDiM83CYSFVcau, ANv1sNQACR4pDQSyFbRNpixEZ8Kz3Jr4GcszhhH8D3ju 
if (!suppliedPublicKey) {
    throw new Error("Provide a public key to check the balance of!");
}

let publicKey;
try {
    publicKey = new PublicKey(suppliedPublicKey);
} catch (error) {
    console.error("Invalid public key provided:", suppliedPublicKey);
    process.exit(1);
}

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

try {
    const balanceInLamports = await connection.getBalance(publicKey);
    const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
    console.log(`💰 Finished! The balance for the wallet at address ${publicKey.toBase58()} is ${balanceInSOL}!`);
} catch (error) {
    console.error("Error fetching balance:", error.message);
    process.exit(1);
}

//run: npx esrun check-balance-challange BDeHQNAw7R88j6mZLFc8CgQ4FoFN3AoDiM83CYSFVcau
//for invalid run: npx esrun check-balance-challange BDeHQNAw7R88j6mZLFc8CgQ4FoFN3AoDiM83CYSFV