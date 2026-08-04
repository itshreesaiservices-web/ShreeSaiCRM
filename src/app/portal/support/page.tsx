import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, Paperclip } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function PortalSupportPage() {
  const session = await getSession() as any;
  if (!session) redirect("/login");

  const user: any = await prisma.user.findUnique({
    where: { id: session.userId as string },
    include: { clientProfile: true }
  });

  const firstName = (user?.clientProfile?.firstName || user?.name || "Client") as string;

  const messages = [
    { sender: "Sharad Hume (Advisor)", time: "10:30 AM", content: `Hi ${firstName}, I noticed you haven't uploaded the Capital Gains statement for FY 25-26 yet. Please upload it so we can proceed with your ITR filing.`, isMe: false },
    { sender: "You", time: "11:15 AM", content: "Hi Sharad, yes I am waiting for my broker to send it. Should have it by tomorrow.", isMe: true },
    { sender: "Sharad Hume (Advisor)", time: "11:20 AM", content: "Great! Let me know once it is uploaded in the document vault.", isMe: false },
  ];
  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-6rem)]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-primary" />
            Support & Messaging
          </h1>
          <p className="text-muted-foreground mt-1">
            Communicate securely with your dedicated advisor and our support team.
          </p>
        </div>
      </div>

      <Card className="flex-1 flex flex-col min-h-0">
        <CardHeader className="border-b border-border py-4 px-6 shrink-0 bg-muted/30">
           <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Sharad Hume (Dedicated Advisor)</CardTitle>
                <p className="text-xs text-emerald-500 mt-1 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
                  Online
                </p>
              </div>
           </div>
        </CardHeader>
        
        <CardContent className="p-0 flex-1 flex flex-col min-h-0 relative">
          <ScrollArea className="flex-1 p-6">
             <div className="space-y-6 flex flex-col pb-4">
               <div className="text-center text-xs text-muted-foreground my-4">Today, 10:30 AM</div>
               
               {messages.map((msg, i) => (
                 <div key={i} className={`flex flex-col max-w-[80%] ${msg.isMe ? 'self-end' : 'self-start'}`}>
                    <div className={`p-4 rounded-2xl ${msg.isMe ? 'bg-primary text-primary-foreground rounded-tr-sm' : 'bg-muted text-foreground rounded-tl-sm'}`}>
                      <p className="text-sm">{msg.content}</p>
                    </div>
                    <span className="text-xs text-muted-foreground mt-1 px-1">
                      {msg.time}
                    </span>
                 </div>
               ))}
             </div>
          </ScrollArea>
          
          <div className="p-4 border-t border-border shrink-0 bg-card">
             <div className="flex gap-2 items-center">
                <Button variant="outline" size="icon" className="shrink-0">
                  <Paperclip className="w-4 h-4 text-muted-foreground" />
                </Button>
                <Input placeholder="Type your secure message here..." className="flex-1" />
                <Button className="shrink-0">
                  <Send className="w-4 h-4" />
                </Button>
             </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
