import type { Metadata } from "next";
import { InquiryForm } from "@/components/inquiry/inquiry-form";

export const metadata: Metadata = {
  title: "Start a Project — Novus Media",
  description:
    "Tell us about your project and we'll get back to you within 24–48 hours with a tailored proposal.",
};

export default function InquiryPage() {
  return <InquiryForm />;
}
