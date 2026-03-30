"use client";

import { Breadcrumbs, BreadcrumbsItem } from "@heroui/react";

export interface BreadcrumbLink {
  label: string;
  href?: string;
}

export interface PageHeaderProps {
  title: string;
  breadcrumbs?: BreadcrumbLink[];
  children?: React.ReactNode;
}

export function PageHeader({ title, breadcrumbs, children }: PageHeaderProps) {
  return (
    <div className="mb-6">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumbs className="mb-2">
          {breadcrumbs.map((crumb, index) => (
            <BreadcrumbsItem key={index} href={crumb.href}>
              {crumb.label}
            </BreadcrumbsItem>
          ))}
        </Breadcrumbs>
      )}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>
        {children && <div className="flex items-center gap-2">{children}</div>}
      </div>
    </div>
  );
}
