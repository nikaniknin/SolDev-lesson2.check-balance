import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";

const suppliedPublicKey = process.argv[2]; //example: BDeHQNAw7R88j6mZLFc8CgQ4FoFN3AoDiM83CYSFVcau, ANv1sNQACR4pDQSyFbRNpixEZ8Kz3Jr4GcszhhH8D3ju 
if (!suppliedPublicKey) {
    throw new Error("Provide a public key to check the balance of!");
}

let publicKey;
try {
    // Your Solana code that may throw an error
    publicKey = new PublicKey(suppliedPublicKey);
} catch (error) {
    if (error.toString().includes("Invalid public key")) {
        //console.log("The error is related to an invalid public key.");
        console.error("Invalid public key provided:", suppliedPublicKey);
        process.exit(1);
        // process.exit() force process to end immediately, even if there are asynchronous operations pending.
        // process.exit(1) used to end with exit code `1`, signals - error occurred. 
    } else {
        console.log("An error occurred:", error.toString());
        process.exit(1);
    }
}

//  const publicKey = new PublicKey(suppliedPublicKey);

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

//const pkOnCurve = PublicKey.isOnCurve(publicKey); //to ckeck if the PK is valid
//console.log(`💰 Public Key ${publicKey} is on curve - ${pkOnCurve}!`);

const balanceiInLamports = await connection.getBalance(publicKey);

const balanceInSOL = balanceiInLamports / LAMPORTS_PER_SOL;

console.log(`💰 Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`);

//run: npx esrun check-balance-challange BDeHQNAw7R88j6mZLFc8CgQ4FoFN3AoDiM83CYSFVcau
//for invalid run: npx esrun check-balance-challange BDeHQNAw7R88j6mZLFc8CgQ4FoFN3AoDiM83CYSFV