import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/src/lib/data/services";
import { ServiceDetail } from "@/src/components";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const serviceData = await getServiceBySlug(slug);

  if (!serviceData) {
    notFound();
  }

  return <ServiceDetail data={serviceData} />;
}
