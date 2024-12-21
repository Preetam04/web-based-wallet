import { useToast } from "@/hooks/use-toast";
import { WalletType } from "@/lib/context";
import { AlertCircle, Copy } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

const WalletCard = ({ data, type }: { data: WalletType; type: string }) => {
  const { toast } = useToast();

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Public addess copied to clipboard",
      });
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <Card className="px-8 -space-y-2.5 w-full">
      <CardHeader>
        <CardTitle className="text-xl">
          {type} Wallet {data.id}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Label>Public key</Label>
        <div className="relative">
          <Input
            value={data.public}
            onChange={() => {}}
            disabled={true}
            className="disabled:cursor-default"
          />

          <Copy
            size={18}
            onClick={() => {
              copyToClipboard(data.public);
            }}
            className="absolute right-1.5 top-2 opacity-60 cursor-pointer"
          />
        </div>
      </CardContent>

      <CardFooter className="space-x-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Private Key</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertCircle className="text-yellow-400" size={20} />
                Private Key visible
              </DialogTitle>
            </DialogHeader>
            <Textarea
              value={data.private}
              onChange={() => {}}
              disabled={true}
              className="disabled:cursor-default"
            />
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default WalletCard;
