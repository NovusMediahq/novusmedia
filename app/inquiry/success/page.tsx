import type { Metadata } from "next";
import { SuccessScreen } from "@/components/inquiry/success-screen";

export const metadata: Metadata = {
  title: "Request Received — Novus Media",
  description: "Your project inquiry has been received. We'll be in touch within 24–48 hours.",
};

export default function SuccessPage() {
  return <SuccessScreen />;
}
