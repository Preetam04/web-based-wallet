"use client";

import { MyContext } from "@/lib/context";
import { Keypair } from "@solana/web3.js";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { encodeBase58 } from "ethers";
import { useContext } from "react";
import nacl from "tweetnacl";
import { Button } from "./ui/button";
import WalletCard from "./WalletCard";

const GenerateSolanaWallet = () => {
  const { mnemonic, setSolWallets, solWallets } = useContext(MyContext);

  const generateSolanaWallet = async () => {
    const seed = await mnemonicToSeed(mnemonic);
    const path = `m/44'/501'/${solWallets.length}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(
      derivedSeed as Uint8Array
    ).secretKey;

    const keypair = Keypair.fromSecretKey(secret);

    // console.log(Buffer.from(keypair.secretKey).toString("base64"));
    // console.log(keypair.publicKey.toBytes());
    // console.log();

    console.log(keypair.publicKey.toString());
    console.log(encodeBase58(keypair.secretKey));

    setSolWallets((prev) => [
      ...prev,
      {
        id: solWallets.length + 1,
        private: encodeBase58(keypair.secretKey),
        public: keypair.publicKey.toString(),
      },
    ]);
  };

  return (
    <div>
      <Button onClick={generateSolanaWallet} className="mb-6">
        Generate Solana wallet
      </Button>

      <div className="grid grid-cols-2 gap-4">
        {solWallets.map((ele) => (
          <WalletCard key={ele.public} type={"Solana"} data={ele} />
        ))}
      </div>
    </div>
  );
};

export default GenerateSolanaWallet;
