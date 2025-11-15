import { useState } from "react";
import { ArrowLeft, MessageCircle, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const WhatsappDirect = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const sendMessage = () => {
    // Remove all non-numeric characters
    const cleanNumber = phoneNumber.replace(/\D/g, "");

    if (cleanNumber.length < 10) {
      toast({
        title: "Invalid number",
        description: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }

    // Add country code if not present
    let formattedNumber = cleanNumber;
    if (!cleanNumber.startsWith("91") && cleanNumber.length === 10) {
      formattedNumber = "91" + cleanNumber;
    }

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${formattedNumber}${message ? `?text=${encodedMessage}` : ""}`;

    window.open(whatsappUrl, "_blank");

    toast({
      title: "Opening WhatsApp",
      description: "Redirecting to WhatsApp...",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="icon" className="rounded-xl">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">WhatsApp Direct</h1>
              <p className="text-xs text-muted-foreground">Message without saving contact</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="p-6 border-border bg-card">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-2">Send Message</h2>
            <p className="text-sm text-muted-foreground">
              Send a WhatsApp message without adding the number to your contacts
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                Phone Number
              </Label>
              <div className="mt-2 flex gap-2">
                <div className="flex items-center px-3 py-2 rounded-lg border border-input bg-muted/30">
                  <span className="text-sm font-medium text-muted-foreground">+91</span>
                </div>
                <Input
                  id="phone"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter phone number"
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Enter 10-digit Indian mobile number or include country code
              </p>
            </div>

            <div>
              <Label htmlFor="message" className="text-sm font-medium text-foreground">
                Message (Optional)
              </Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                className="mt-2 min-h-[120px] resize-none"
              />
            </div>

            <Button
              onClick={sendMessage}
              className="w-full bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20BA5A] hover:to-[#0F7A6B] text-white"
              size="lg"
            >
              <Send className="h-4 w-4 mr-2" />
              Open in WhatsApp
            </Button>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-muted/50">
            <h3 className="text-sm font-semibold text-foreground mb-2">How it works:</h3>
            <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
              <li>Enter the phone number you want to message</li>
              <li>Optionally add a pre-filled message</li>
              <li>Click the button to open WhatsApp</li>
              <li>Start chatting without saving the contact</li>
            </ul>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default WhatsappDirect;
