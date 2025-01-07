import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { PortableTextBlock } from "next-sanity";

export default interface CalendarEvent {
  title: string;
  date: string;
  description: PortableTextBlock[];
  image: SanityImageSource;
  duration: string;
  slug: string;
  location: string;
}
