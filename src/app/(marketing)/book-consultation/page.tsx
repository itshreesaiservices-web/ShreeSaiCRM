"use client";

import { useState } from "react";

import { PageHeader } from "@/components/shared/PageHeader";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { submitConsultation } from "@/app/actions/book-consultation";
import { CheckCircle2, AlertCircle } from "lucide-react";
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
  date: z.string().min(1, { message: "Preferred date is required." }),
  service: z.string().min(1, { message: "Please select a service." }),
  message: z.string().optional(),
});

export default function BookConsultationPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      date: "",
      service: "",
      message: "",
    },
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setErrorMsg(null);
    const result = await submitConsultation(values);
    if (result.success) {
      setIsSuccess(true);
      form.reset();
    } else {
      setErrorMsg(result.error || "Something went wrong.");
    }
  }

  return (
    <>
      <PageHeader 
        title="Book a Consultation" 
        description="Take the first step towards financial freedom. Schedule a free 30-minute discovery call with our experts."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Book Consultation" },
        ]}
      />
      
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <AnimatedSection direction="up">
            <div className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-sm">
              <h2 className="text-2xl font-bold mb-8 text-center">Schedule Your Session</h2>
              
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center text-center py-12 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-2">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                  </div>
                  <h3 className="text-3xl font-bold">Request Submitted!</h3>
                  <p className="text-muted-foreground text-lg max-w-md pt-2">
                    Thank you for booking a consultation. We have received your request and will contact you shortly to confirm the appointment.
                  </p>
                  <div className="pt-6">
                    <Button variant="outline" onClick={() => setIsSuccess(false)} className="h-11 px-8">
                      Book Another Consultation
                    </Button>
                  </div>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {errorMsg && (
                      <div className="p-4 rounded-md bg-destructive/10 text-destructive text-sm flex items-center gap-2 mb-6">
                        <AlertCircle className="w-5 h-5" />
                        {errorMsg}
                      </div>
                    )}
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
                            <Input placeholder="john@example.com" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Date</FormLabel>
                          <FormControl>
                            {/* Simple date input for now */}
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service of Interest</FormLabel>
                        <FormControl>
                           <select 
                             className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                             {...field}
                           >
                             <option value="" disabled>Select a service...</option>
                             <option value="mutual_funds">Mutual Funds Advisory</option>
                             <option value="income_tax">Income Tax Planning & Filing</option>
                             <option value="financial_planning">Holistic Financial Planning</option>
                             <option value="insurance">Insurance Solutions</option>
                             <option value="other">Other / General Inquiry</option>
                           </select>
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
                        <FormLabel>Additional Information (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us a bit about your current financial situation or specific questions you have." 
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" disabled={form.formState.isSubmitting} className="w-full h-12 text-lg">
                    {form.formState.isSubmitting ? "Submitting..." : "Request Appointment"}
                  </Button>
                </form>
              </Form>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
