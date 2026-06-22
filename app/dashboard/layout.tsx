import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - DSA Practice",
  description: "Your DSA practice dashboard",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
