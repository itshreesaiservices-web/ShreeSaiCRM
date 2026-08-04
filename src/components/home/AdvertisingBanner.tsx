"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ExternalLink } from "lucide-react";

// Mocked data for the skeleton. 
// In production, this will be fetched from the database via Server Action.
const MOCK_BANNERS = [
  {
    id: 1,
    title: "Tax Planning Masterclass",
    description: "Join our free webinar on maximizing your tax savings for FY 2026-27.",
    bgColor: "bg-blue-600",
    buttonText: "Register Now",
  },
  {
    id: 2,
    title: "New Mutual Fund NFO",
    description: "Invest in the latest emerging markets fund. Limited time offer.",
    bgColor: "bg-emerald-600",
    buttonText: "Learn More",
  },
  {
    id: 3,
    title: "Retirement Planning Consultation",
    description: "Book a specialized 1-on-1 session with our senior advisors today.",
    bgColor: "bg-indigo-600",
    buttonText: "Book Session",
  }
];

export function AdvertisingBanner() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <Carousel
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
          className="w-full max-w-5xl mx-auto"
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {MOCK_BANNERS.map((banner) => (
              <CarouselItem key={banner.id}>
                <Card className={`border-none ${banner.bgColor} text-white overflow-hidden shadow-lg`}>
                  <CardContent className="flex flex-col md:flex-row items-center justify-between p-8 md:p-12 min-h-[250px] relative">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-black opacity-10 rounded-full translate-y-1/3 -translate-x-1/4 blur-2xl pointer-events-none" />
                    
                    <div className="z-10 text-center md:text-left mb-6 md:mb-0 max-w-xl">
                      <div className="text-xs font-bold uppercase tracking-wider mb-2 opacity-80">
                        Featured Promotion
                      </div>
                      <h3 className="text-3xl font-bold mb-3">{banner.title}</h3>
                      <p className="text-white/80 text-lg">
                        {banner.description}
                      </p>
                    </div>
                    
                    <div className="z-10">
                      <button className="bg-white text-foreground px-6 py-3 rounded-md font-semibold flex items-center hover:bg-white/90 transition-colors shadow-sm">
                        {banner.buttonText}
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
             <CarouselPrevious className="-left-12 border-none bg-background/50 hover:bg-background/80" />
             <CarouselNext className="-right-12 border-none bg-background/50 hover:bg-background/80" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
