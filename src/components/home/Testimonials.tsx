"use client";

import { AnimatedSection } from "@/components/shared/AnimatedSection";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Ramesh Sharma",
    role: "IT Professional",
    content: "Shree Sai Services transformed my investment portfolio. Their strategic approach to mutual funds has yielded returns far exceeding my expectations. Highly professional team.",
    initials: "RS"
  },
  {
    id: 2,
    name: "Anita Desai",
    role: "Small Business Owner",
    content: "Filing taxes used to be a nightmare for my business until I found Shree Sai Services. Their tax planning advice saved us a significant amount legally and cleanly.",
    initials: "AD"
  },
  {
    id: 3,
    name: "Vikram Mehta",
    role: "Retiree",
    content: "Their retirement planning services are top-notch. I now have a steady, tax-efficient income stream that gives me total peace of mind.",
    initials: "VM"
  },
  {
    id: 4,
    name: "Priya Singh",
    role: "Corporate Executive",
    content: "Transparent, knowledgeable, and always accessible. The holistic financial planning provided by them has been a game-changer for my family's future.",
    initials: "PS"
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <AnimatedSection direction="up" className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here is what some of our valued clients have to say about our services.
          </p>
        </AnimatedSection>
        
        <AnimatedSection direction="up" delay={0.2} className="max-w-5xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <Card className="h-full bg-card border-border shadow-sm">
                      <CardContent className="p-6 flex flex-col h-full">
                        <Quote className="w-10 h-10 text-primary/20 mb-4" />
                        <p className="text-muted-foreground flex-grow mb-6 italic">
                          "{testimonial.content}"
                        </p>
                        <div className="flex items-center gap-4 mt-auto">
                          <Avatar>
                            <AvatarFallback className="bg-primary/10 text-primary">{testimonial.initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
                            <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8 gap-4">
              <CarouselPrevious className="position-static transform-none relative" />
              <CarouselNext className="position-static transform-none relative" />
            </div>
          </Carousel>
        </AnimatedSection>
      </div>
    </section>
  );
}
