import type { MetadataRoute } from "next";
import { PAGES, absoluteUrl } from "@/lib/site";
import PAGE_DATES from "@/lib/page-dates.json";

const dates = PAGE_DATES as Record<string, string>;

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: dates[page.path] ? new Date(dates[page.path]) : undefined,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
