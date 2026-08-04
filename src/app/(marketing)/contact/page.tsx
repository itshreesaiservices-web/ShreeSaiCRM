"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(10, { message: "Phone number is required." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export default function ContactPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // This will be connected to an API route (e.g. Resend) later
    console.log(values);
    alert("Message sent successfully!");
    form.reset();
  }

  return (
    <>
      <PageHeader 
        title="Contact Us" 
        description="We're here to help you with your financial queries. Reach out to us today."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
      />
      
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <AnimatedSection direction="left">
              <h2 className="text-3xl font-bold tracking-tight mb-8">Get in Touch</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+91 98765 43210" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="How can we help you?" 
                            className="min-h-[150px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full h-12 text-lg">Send Message</Button>
                </form>
              </Form>
            </AnimatedSection>
            
            <AnimatedSection direction="right" className="space-y-8">
              <div className="bg-muted p-8 rounded-3xl border border-border h-full">
                <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
                
                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="bg-background p-3 rounded-xl border border-border mr-4">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Office Address</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        123 Financial District,<br />
                        Business Park, Mumbai,<br />
                        Maharashtra 400001, India
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-background p-3 rounded-xl border border-border mr-4">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Phone</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        +91 98765 43210<br />
                        022 1234 5678
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-background p-3 rounded-xl border border-border mr-4">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Email</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        contact@shreesaiservices.com<br />
                        support@shreesaiservices.com
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-background p-3 rounded-xl border border-border mr-4">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Business Hours</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        Monday - Friday: 9:30 AM - 6:30 PM<br />
                        Saturday: 10:00 AM - 2:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Google Maps Section - Static Placeholder */}
      <section className="h-[400px] w-full bg-muted relative">
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=Mumbai&zoom=13&size=2000x400&scale=2&maptype=roadmap&style=feature:all|element:labels.text.fill|color:0x333333&style=feature:all|element:labels.text.stroke|color:0xffffff&style=feature:landscape|element:geometry|color:0xf5f5f5&style=feature:poi|element:geometry|color:0xeeeeee&style=feature:poi|element:labels.text.fill|color:0x999999&style=feature:road|element:geometry|color:0xffffff&style=feature:road|element:labels.text.fill|color:0x999999&style=feature:transit|element:geometry|color:0xf2f2f2&style=feature:water|element:geometry|color:0xc9c9c9')] bg-cover bg-center">
            <span className="bg-background/80 px-4 py-2 rounded-md font-medium shadow-sm backdrop-blur">Google Maps Integration Area</span>
        </div>
      </section>
    </>
  );
}
