import { MyContext } from "@/lib/context";
import { mnemonicToSeed } from "bip39";
import { BytesLike, HDNodeWallet, Wallet } from "ethers";
import { useContext } from "react";
import { Button } from "./ui/button";
import WalletCard from "./WalletCard";

const GenerateEthereumWallet = () => {
  const { mnemonic, ethWallets, setEthWallets } = useContext(MyContext);

  const generateEthereumWallet = async () => {
    const seed = await mnemonicToSeed(mnemonic);
    const derivationPath = `m/44'/60'/${ethWallets.length}'/0'`;
    const hdNode = HDNodeWallet.fromSeed(seed as BytesLike);
    const child = hdNode.derivePath(derivationPath);
    const privateKey = child.privateKey;
    const wallet = new Wallet(privateKey);

    setEthWallets((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        private: privateKey,
        public: wallet.address,
      },
    ]);
  };

  return (
    <div>
      <Button onClick={generateEthereumWallet} className="mb-6">
        Generate Ethereum wallet
      </Button>

      <div className="grid grid-cols-2 gap-4">
        {ethWallets.map((ele) => (
          <WalletCard key={ele.public} type={"Ethereum"} data={ele} />
        ))}
      </div>
    </div>
  );
};

export default GenerateEthereumWallet;
