"use client";

import DashboardLayout from "@/lib/components/layout";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashboardLayout children={children}/>
    </>
  );
}