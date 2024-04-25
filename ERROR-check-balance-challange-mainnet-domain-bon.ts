import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
//2import { getPublicKey } from "@solana/spl-name-service"; // Import the getPublicKey function
import { getDomainKeySync, NameRegistryState } from "@bonfida/spl-name-service";

//1const suppliedPublicKey = process.argv[2]; //example: BDeHQNAw7R88j6mZLFc8CgQ4FoFN3AoDiM83CYSFVcau, ANv1sNQACR4pDQSyFbRNpixEZ8Kz3Jr4GcszhhH8D3ju 
//1if (!suppliedPublicKey) {
//1    throw new Error("Provide a public key to check the balance of!");
//1}

//2const suppliedName = process.argv[2]; // example: toly.sol
//2if (!suppliedName) {
//2    throw new Error("Provide a Solana domain name to check the balance of!");
//2}

const domainName = "bonfida"; // With or without the .sol at the end

const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');

const { pubkey } = getDomainKeySync(domainName);

const { registry, nftOwner } = await NameRegistryState.retrieve(
    connection,
    pubkey
);

console.log(pubkey);

//2async function main() {
//2    let publicKey;
//2    try {
//2        // Resolve the Solana domain name to a public key
//2        publicKey = await getPublicKey(suppliedName, connection);
//2    } catch (error) {
//2        console.error("Error resolving Solana domain name:", error);
//2        process.exit(1);
//2    }

//2    try {
//2        const balanceInLamports = await connection.getBalance(publicKey);
//2        const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
//2        console.log(`💰 Finished! The balance for the wallet with domain ${suppliedName} (${publicKey.toString()}) is ${balanceInSOL} SOL.`);
//2    } catch (error) {
//2        console.error("Error fetching balance:", error.message);
//2        process.exit(1);
//2    }
//2}

//2main();

//1let publicKey;
//1try {
// Your Solana code that may throw an error
//1    publicKey = new PublicKey(suppliedPublicKey);
//1} catch (error) {
//1    if (error.toString().includes("Invalid public key")) {
//1        //console.log("The error is related to an invalid public key.");
//1        console.error("Invalid public key provided:", suppliedPublicKey);
//1        process.exit(1);
//1        // process.exit() force process to end immediately, even if there are asynchronous operations pending.
//1        // process.exit(1) used to end with exit code `1`, signals - error occurred. 
//1    } else {
//1        console.log("An error occurred:", error.toString());
//1        process.exit(1);
//1    }
//1}

//  const publicKey = new PublicKey(suppliedPublicKey);

//1const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");

//const pkOnCurve = PublicKey.isOnCurve(publicKey); //to ckeck if the PK is valid
//console.log(`💰 Public Key ${publicKey} is on curve - ${pkOnCurve}!`);

//1const balanceiInLamports = await connection.getBalance(publicKey);

//1const balanceInSOL = balanceiInLamports / LAMPORTS_PER_SOL;

//1console.log(`💰 Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`);

//run: npx esrun check-balance-challange BDeHQNAw7R88j6mZLFc8CgQ4FoFN3AoDiM83CYSFVcau
//for invalid run: npx esrun check-balance-challange BDeHQNAw7R88j6mZLFc8CgQ4FoFN3AoDiM83CYSFV