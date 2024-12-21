"use client";
import GenerateEthereumWallet from "@/components/GenerateEthereumWallet";
import GenerateSolanaWallet from "@/components/GenerateSolanaWallet";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { MyContext } from "@/lib/context";
import { generateMnemonic } from "bip39";
import { Clipboard, DownloadIcon, X } from "lucide-react";
import { useContext, useState } from "react";

export default function Home() {
  const [mnemonicModalOpen, setMnemonicModalOpen] = useState(false);
  const { mnemonic, setMnemonic } = useContext(MyContext);

  const { toast } = useToast();

  const createMnemonic = async () => {
    const mn = await generateMnemonic();
    // console.log(mn);

    setMnemonic(mn);
    setMnemonicModalOpen(true);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(mnemonic);
      toast({
        title: "Recovery Phrase Copied to Clipboard",
      });
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const downloadFile = () => {
    // Create a Blob with the mnemonic data
    const blob = new Blob([mnemonic], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    // Create an anchor element and trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = "seed-phrase.txt";
    a.click();

    toast({
      title: "Seed Phrase Downloaded Locally",
    });

    // Clean up
    URL.revokeObjectURL(url);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between  m-10 relative">
      {/* Create Seed Phrase */}
      {mnemonicModalOpen ||
        (!mnemonic && (
          <Button
            onClick={() => {
              createMnemonic();
            }}
          >
            Generate Recovery Phrase
          </Button>
        ))}

      {mnemonic && !mnemonicModalOpen && (
        <div className="absolute right-20">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Show Secret Phrase</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Secret Seed phrase visible</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-3 grid-rows-4 gap-2 mt-4 ">
                {mnemonic.split(" ").map((ele) => (
                  <div
                    key={ele}
                    className="min-w-16 bg-gray-500/25 px-8 py-2 text-center rounded-md"
                  >
                    {ele}
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}

      {/* Add Wallets */}
      {mnemonicModalOpen ||
        (mnemonic && (
          <div className="container">
            <Tabs defaultValue="Ethereum" className="w-full">
              <TabsList className="grid w-full grid-cols-2 max-w-[400px] mb-6">
                <TabsTrigger value="Ethereum">Ethereum</TabsTrigger>
                <TabsTrigger value="Solana">Solana</TabsTrigger>
              </TabsList>
              <TabsContent value="Ethereum">
                <GenerateEthereumWallet />
              </TabsContent>
              <TabsContent value="Solana">
                <GenerateSolanaWallet />
              </TabsContent>
            </Tabs>
          </div>
        ))}

      {/* Save Recovery Phrase */}

      {mnemonicModalOpen && (
        <div className="w-full h-screen bg-black/40 fixed z-50 top-0 flex items-center justify-center ">
          <Card className="w-[525px] relative">
            <Button
              size={"sm"}
              className="absolute right-3 top-3 "
              variant={"ghost"}
              onClick={() => {
                setMnemonicModalOpen(false);
              }}
            >
              <X size={22} />
            </Button>
            <CardHeader>
              <CardTitle>Secure Your Recovery Phrase</CardTitle>
              <CardDescription>
                Make sure to save it now. You won’t be able to retrieve it once
                you close this tab.
              </CardDescription>
            </CardHeader>
            <Separator />

            <CardContent className="grid grid-cols-3 grid-rows-4 gap-2 mt-4 ">
              {mnemonic.split(" ").map((ele) => (
                <div
                  key={ele}
                  className="min-w-16 bg-gray-500/25 px-8 py-2 text-center rounded-md"
                >
                  {ele}
                </div>
              ))}
            </CardContent>

            <CardFooter className="flex items-center justify-between w-full gap-4">
              <Button
                variant={"outline"}
                className="w-full"
                onClick={copyToClipboard}
              >
                {" "}
                <Clipboard size={15} className="mr-3" /> Copy to Clipboard
              </Button>
              <Button
                variant={"default"}
                className="w-full"
                onClick={downloadFile}
              >
                <DownloadIcon size={15} className="mr-3" />
                Download Backup
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </main>
  );
}
