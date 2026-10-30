import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceView } from "@/components/service/ServiceView";
import { SERVICE_DETAILS, serviceBySlug } from "@/lib/services";

export function generateStaticParams() {
  return SERVICE_DETAILS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) return {};
  return {
    title: `${s.title} — Rudranex`,
    description: s.intro,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) notFound();
  return <ServiceView s={s} />;
}
