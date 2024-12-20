"use client";

import { MyContext } from "@/lib/context";
import { Keypair } from "@solana/web3.js";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { useContext } from "react";
import nacl from "tweetnacl";
import { Button } from "./ui/button";

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
    console.log(Buffer.from(secret).toString("base64"));

    // setSolWallets((prev) => [
    //   ...prev,
    //   {
    //     id: solWallets.length + 1,
    //     private: secret.
    //   },
    // ]);
  };

  return (
    <div>
      <Button onClick={generateSolanaWallet} className="mb-6">
        Generate Solana wallet
      </Button>
    </div>
  );
};

export default GenerateSolanaWallet;
