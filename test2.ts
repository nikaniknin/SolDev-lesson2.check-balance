// Import necessary modules
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { getHashedName, getNameAccountKey, NameRegistryState } from '@solana/spl-name-service';

const domainName = process.argv[2]; // "toly.sol"

// Initialize connection
const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');

async function resolveDomainNameAndCheckBalance(domain) {
    try {
        const hashedName = await getHashedName(domain);
        const nameAccountKey = await getNameAccountKey(hashedName, undefined, 'name');

        const nameRegistry = await NameRegistryState.retrieve(connection, nameAccountKey);
        const ownerPublicKey = new PublicKey(nameRegistry.owner);

        // Once you have the public key, you can check the balance as before
        const balanceInLamports = await connection.getBalance(ownerPublicKey);
        console.log(`💰 The balance for ${domain} at address ${ownerPublicKey} is ${balanceInLamports / LAMPORTS_PER_SOL} SOL!`);
    } catch (error) {
        console.error("Failed to resolve domain name:", error);
    }
}

resolveDomainNameAndCheckBalance(domainName);