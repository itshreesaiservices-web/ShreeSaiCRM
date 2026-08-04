"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CookieConsent() {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    // Check if consent has already been given
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Delay showing the banner slightly for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 sm:pb-6 pointer-events-none">
      <div className="container mx-auto max-w-5xl">
        <div className="bg-card border border-border shadow-lg rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 pointer-events-auto relative overflow-hidden">
          {/* Subtle gold accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-secondary" />
          
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-1">We value your privacy</h3>
            <p className="text-sm text-muted-foreground">
              We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. Read our <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a> to learn more.
            </p>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button variant="outline" className="flex-1 sm:flex-none" onClick={handleDecline}>
              Decline
            </Button>
            <Button className="flex-1 sm:flex-none bg-primary text-primary-foreground hover:bg-primary/90" onClick={handleAccept}>
              Accept All
            </Button>
          </div>
          
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 p-1 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors sm:hidden"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
