import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { getDomainKeySync, NameRegistryState } from "@bonfida/spl-name-service";

//insert domain name in terminal: npx esrun check-balance-challange-mainnet-domain-bon-2 toly
const domainName = process.argv[2]; // With or without the .sol at the end
if (!domainName) {
    throw new Error("Provide a Solana domain name to check the balance of!");
}

const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');

// Step 1
// Get pubkey of domainName
try {
    const { pubkey } = getDomainKeySync(domainName);
    var pubK = pubkey;
} catch (error) {
    console.error("Error resolving Solana domain name:", error);
    process.exit(1);
}
console.log('Domain public key: ' + pubK);

// Step 2
// Get info for domaim name by public key
// The registry object contains all the info about the domain name
// The NFT owner is of type PublicKey | undefined
try {
    const { registry, nftOwner } = await NameRegistryState.retrieve(
        connection,
        pubK
    );
    var reg = registry;
    var ownerNFT = nftOwner;
}
catch (error) {
    console.error("No owner for domain name " + domainName);
    process.exit(1);
}

/*
registry is of type NameRegistryState
nftOwner is of type PublicKey | undefined
->  When nftOwner is of type PublicKey it means that the domain is tokenized and the current NFT holder is nftOwner. 
    When a domain is tokenized registry.owner is an escrow account that is program owner. Funds should be sent to nftOwner
->  When nftOwner is of type undefined it means that the domain is not tokenized and funds should be sent to registry.owner
*/

var regOwner = new PublicKey(reg.owner);
console.log('NFT Ownber: ' + ownerNFT);
console.log('Registy Owner: ' + regOwner);

//Step 3
//check balance by public key of domain name
try {
    const balanceInLamports = await connection.getBalance(pubK);
    const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
    console.log(`💰 Finished! The balance for the wallet with domain ${domainName} (${pubK.toString()}) is ${balanceInSOL} SOL.`);
} catch (error) {
    console.error("Error fetching balance:", error.message);
    process.exit(1);
}
//look for NFT owner's balance
if (!ownerNFT) {
    try {
        const balanceInLamports = await connection.getBalance(regOwner);
        const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
        console.log(`💰 Finished! The balance for the Owner of the wallet with domain ${domainName} (${regOwner.toString()}) is ${balanceInSOL} SOL.`);
    } catch (error) {
        console.error("Error fetching balance:", error.message);
        process.exit(1);
    }
}
else { console.error("No registry owner"); }

//run: npx esrun check-balance-challange-mainnet-domain-bonfida toly

//preinstall
//npm init -y
//npm install
//npm install
//npm install @solana/web3.js
//npm install @bonfida/spl-name-service