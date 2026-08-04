import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Mail, Phone, Lock, Camera } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function PortalProfilePage() {
  const session = await getSession() as any;
  if (!session) redirect("/login");

  const user: any = await prisma.user.findUnique({
    where: { id: session.userId as string },
    include: { clientProfile: true }
  });

  const firstName = (user?.clientProfile?.firstName || user?.name || "Client") as string;
  const lastName = (user?.clientProfile?.lastName || "") as string;
  const fullName = `${firstName} ${lastName}`.trim();
  const initials = fullName.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
  const email = (user?.email || "") as string;
  const phone = (user?.clientProfile?.phone || "") as string;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <User className="w-8 h-8 text-primary" />
            My Profile
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your personal details and security settings.
          </p>
        </div>
        <Button>
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <Card className="lg:col-span-1 h-fit">
           <CardContent className="p-6 flex flex-col items-center">
             <div className="relative mb-6">
               <Avatar className="w-32 h-32 ring-4 ring-primary/20">
                 <AvatarImage src="" />
                 <AvatarFallback className="text-4xl bg-primary/10 text-primary font-bold">{initials}</AvatarFallback>
               </Avatar>
               <Button size="icon" className="absolute bottom-0 right-0 rounded-full w-10 h-10 shadow-lg">
                 <Camera className="w-5 h-5" />
               </Button>
             </div>
             <h3 className="text-xl font-bold">{fullName}</h3>
             <p className="text-muted-foreground">Client ID: SS-{user?.id.substring(0, 4)}</p>
             <p className="text-xs text-muted-foreground mt-4 px-4 py-2 bg-muted/50 rounded-lg text-center">
               PAN and Aadhar are verified. Please contact your advisor to change verified KYC details.
             </p>
           </CardContent>
         </Card>

         <div className="lg:col-span-2 space-y-6">
           <Card>
             <CardHeader>
               <CardTitle>Personal Details</CardTitle>
               <CardDescription>Update your contact information.</CardDescription>
             </CardHeader>
             <CardContent className="space-y-4">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <label className="text-sm font-medium">First Name</label>
                   <Input defaultValue={firstName} disabled />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-medium">Last Name</label>
                   <Input defaultValue={lastName} disabled />
                 </div>
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-medium flex items-center">
                   <Mail className="w-4 h-4 mr-2 text-muted-foreground" /> Email Address
                 </label>
                 <Input defaultValue={email} />
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-medium flex items-center">
                   <Phone className="w-4 h-4 mr-2 text-muted-foreground" /> Phone Number
                 </label>
                 <Input defaultValue={phone} />
               </div>
             </CardContent>
           </Card>

           <Card>
             <CardHeader>
               <CardTitle className="flex items-center text-destructive">
                 <Lock className="w-5 h-5 mr-2" /> Security
               </CardTitle>
               <CardDescription>Update your portal password.</CardDescription>
             </CardHeader>
             <CardContent className="space-y-4">
               <div className="space-y-2">
                 <label className="text-sm font-medium">Current Password</label>
                 <Input type="password" />
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <label className="text-sm font-medium">New Password</label>
                   <Input type="password" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-medium">Confirm New Password</label>
                   <Input type="password" />
                 </div>
               </div>
               <Button variant="outline" className="border-destructive/30 text-destructive hover:bg-destructive/10 mt-2">
                 Update Password
               </Button>
             </CardContent>
           </Card>
         </div>
      </div>
    </div>
  );
}
