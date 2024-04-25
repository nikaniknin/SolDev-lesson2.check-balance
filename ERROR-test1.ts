import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { getHashedName, getNameAccountKey, NameRegistryState } from "@solana/spl-name-service";

const input = process.argv[2];
if (!input) {
    throw new Error("Provide a public key or a domain name (like toly.sol) to check the balance of!");
}

let publicKey;

const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');

const resolvePublicKey = async (input) => {
    try {
        // Check if input is already a public key
        return new PublicKey(input);
    } catch {
        // If not, assume it's a domain and try to resolve it
        const hashedName = await getHashedName(input.split('.sol')[0]);
        const nameAccountKey = await getNameAccountKey(hashedName, undefined, "sol");
        const nameAccount = await NameRegistryState.retrieve(connection, nameAccountKey);
        return nameAccount.owner;
    }
};

(async () => {
    try {
        publicKey = await resolvePublicKey(input);
    } catch (error) {
        console.error("Error resolving input:", error.message);
        process.exit(1);
    }

    try {
        const balanceInLamports = await connection.getBalance(publicKey);
        const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
        console.log(`💰 Finished! The balance for ${publicKey} is ${balanceInSOL} SOL.`);
    } catch (error) {
        console.error("Error fetching balance:", error.message);
        process.exit(1);
    }
})();