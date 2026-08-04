import React from "react";
import { cn } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
  className?: string;
}

export function PageHeader({ title, description, breadcrumbs, className }: PageHeaderProps) {
  return (
    <div className={cn("bg-muted/50 border-b border-border py-12 md:py-20", className)}>
      <div className="container mx-auto px-4 lg:px-8 flex flex-col items-center text-center">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              {breadcrumbs.map((bc, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return (
                  <React.Fragment key={bc.label}>
                    <BreadcrumbItem>
                      {isLast || !bc.href ? (
                        <BreadcrumbPage>{bc.label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={bc.href}>{bc.label}</BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {!isLast && <BreadcrumbSeparator />}
                  </React.Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        )}
        
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
          {title}
        </h1>
        {description && (
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
