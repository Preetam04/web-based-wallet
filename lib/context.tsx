"use client";
import React, { createContext, useState } from "react";

export type WalletType = {
  id: number;
  private: string;
  public: string;
};

export const MyContext = createContext<{
  mnemonic: string;
  ethWallets: WalletType[];
  solWallets: WalletType[];
  setMnemonic: React.Dispatch<React.SetStateAction<string>>;
  setEthWallets: React.Dispatch<React.SetStateAction<WalletType[]>>;
  setSolWallets: React.Dispatch<React.SetStateAction<WalletType[]>>;
}>({
  mnemonic: "",
  ethWallets: [],
  solWallets: [],
  setMnemonic: () => {},
  setEthWallets: () => {},
  setSolWallets: () => {},
});

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [mnemonic, setMnemonic] = useState<string>("");
  const [ethWallets, setEthWallets] = useState<WalletType[]>([]);
  const [solWallets, setSolWallets] = useState<WalletType[]>([]);

  return (
    <MyContext.Provider
      value={{
        mnemonic,
        setMnemonic,
        ethWallets,
        setEthWallets,
        solWallets,
        setSolWallets,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
