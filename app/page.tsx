"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { generateMnemonic } from "bip39";
import { Clipboard, Download, DownloadIcon, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [mnemonic, setMnemonic] = useState("");
  const [mnemonicModalOpen, setMnemonicModalOpen] = useState(false);

  const { toast } = useToast();

  const createMnemonic = async () => {
    const mn = await generateMnemonic();
    setMnemonic(mn);
    setMnemonicModalOpen(true);
  };
  // console.log(mnemonic.split(" "));

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(mnemonic);
      toast({
        title: "Seed Phrase Copied to Clipboard",
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
    <main className="flex min-h-screen flex-col items-center justify-between p-12 ">
      {/* Create Seed Phrase */}
      {mnemonicModalOpen ||
        (!mnemonic && (
          <Button
            onClick={() => {
              createMnemonic();
            }}
          >
            Generate Seed Phrase
          </Button>
        ))}
      {/* Add Wallets */}
      {mnemonicModalOpen ||
        (mnemonic && (
          <Button
            onClick={() => {
              createMnemonic();
            }}
          >
            Add Wallets
          </Button>
        ))}

      {/* Save Seed Phrase */}

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
              <CardTitle>Secure Your Seed Phrase</CardTitle>
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
