"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, Mail, AlertCircle } from "lucide-react";
import { loginUser } from "./actions";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full" type="submit" disabled={pending}>
      {pending ? "Authenticating..." : "Sign In"}
    </Button>
  );
}

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);

  async function clientAction(formData: FormData) {
    const result = await loginUser(null, formData);
    if (result?.error) {
      setError(result.error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
           <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="font-bold text-2xl text-primary-foreground">S</span>
           </div>
           <h1 className="text-3xl font-bold tracking-tight">Shree Sai Services</h1>
           <p className="text-muted-foreground">Secure CRM & Client Portal Login</p>
        </div>

        <Card className="border-border shadow-lg">
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Enter your credentials to access your account.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={clientAction} className="space-y-4">
              {error && (
                <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm flex items-center gap-2">
                   <AlertCircle className="w-4 h-4" />
                   {error}
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input name="email" type="email" placeholder="name@example.com" className="pl-10" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Password</label>
                  <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input name="password" type="password" placeholder="••••••••" className="pl-10" required />
                </div>
              </div>

              <div className="pt-4">
                <SubmitButton />
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center border-t p-4 space-y-2 text-sm text-muted-foreground">
            <div className="flex gap-1">
              Don't have an account? <a href="/signup" className="text-primary hover:underline font-medium">Sign up</a>
            </div>
            <p className="text-xs">Protected by end-to-end encryption</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
