import { sql } from "@vercel/postgres";
import { unstable_cache } from "next/cache";
import { ServiceItem } from "@/src/lib/home/servicesData";

export const getHomeServices = unstable_cache(
  async (): Promise<ServiceItem[]> => {
    try {
      const { rows } = await sql`
        SELECT 
          service_id as id, 
          title, 
          description, 
          icon_type as "iconType", 
          icon_value as "iconValue", 
          link
        FROM home_services
        ORDER BY sort_order ASC
      `;

      return rows as ServiceItem[];
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Failed to fetch services data.");
    }
  },
  ["home-services-data"], // Cache Key
  { revalidate: 3600, tags: ["home-services"] },
);
