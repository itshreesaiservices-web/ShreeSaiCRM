"use client";

import { AnimatedSection } from "@/components/shared/AnimatedSection";

const stats = [
  { id: 1, name: 'Years of Experience', value: '15+' },
  { id: 2, name: 'Happy Clients', value: '2,500+' },
  { id: 3, name: 'Assets Under Management', value: '₹500Cr+' },
  { id: 4, name: 'Tax Saved Annually', value: '₹50Cr+' },
];

export function Stats() {
  return (
    <section className="bg-primary py-16 sm:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <AnimatedSection direction="up">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base leading-7 text-primary-foreground/80">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-primary-foreground sm:text-5xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </AnimatedSection>
      </div>
    </section>
  );
}
