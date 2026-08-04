"use client";

import { AnimatedSection } from "@/components/shared/AnimatedSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const faqs = [
  {
    question: "How do I start investing in Mutual Funds with you?",
    answer: "Getting started is simple. Book a free consultation with our experts. We will assess your risk profile, financial goals, and investment horizon to recommend the best mutual funds for your portfolio.",
  },
  {
    question: "What documents are required for Income Tax filing?",
    answer: "Typically, you need your PAN card, Aadhaar card, Form 16 (for salaried individuals), bank statements, and investment proofs (80C, 80D, etc.). Our tax experts will provide a comprehensive checklist tailored to your specific income sources.",
  },
  {
    question: "Do you offer services for NRIs?",
    answer: "Yes, we specialize in offering comprehensive financial advisory, tax planning, and investment management services for Non-Resident Indians (NRIs) with income or investments in India.",
  },
  {
    question: "How are your advisory fees structured?",
    answer: "We believe in complete transparency. Our fees depend on the complexity of the services required. For mutual funds, we offer both direct (fee-only) and regular (commission-based) models. This will be clearly discussed during your initial consultation.",
  },
  {
    question: "Is my financial data secure with Shree Sai Services?",
    answer: "Absolutely. We employ bank-grade security and encryption to ensure your financial data is strictly confidential and fully protected against unauthorized access.",
  },
];

export function FAQ() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16">
          <AnimatedSection direction="up" className="lg:w-1/3">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Can't find the answer you're looking for? Reach out to our customer support team.
            </p>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Contact Support</Link>
            </Button>
          </AnimatedSection>
          
          <AnimatedSection direction="left" className="lg:w-2/3">
            <Accordion className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-lg font-medium">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
