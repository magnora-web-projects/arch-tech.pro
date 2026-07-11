import { sql } from "@vercel/postgres";
import { unstable_cache } from "next/cache";
import { ServicePageData } from "../types";

export const getServiceBySlug = unstable_cache(
  async (slug: string): Promise<ServicePageData | null> => {
    try {
      const { rows } = await sql<ServicePageData>`
        SELECT * FROM services WHERE slug = ${slug} LIMIT 1
      `;

      return rows[0] || null;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch service page data.");
    }
  },
  ["service-page-data"],
  { revalidate: 3600, tags: ["services"] },
);

export const getAllServicesSlugs = unstable_cache(
  async (): Promise<{ slug: string }[]> => {
    try {
      const { rows } = await sql<{ slug: string }>`
        SELECT slug FROM services
      `;
      return rows;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch slugs.");
    }
  },
  ["services-slugs-list"],
  { revalidate: 86400, tags: ["services"] },
);
