import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { createClient } from "next-sanity";

export const sanityClient = createClient({
  dataset: "production",
  projectId: "0v05p84i",
  useCdn: false,
  apiVersion: "2024-10-26",
});

const builder = imageUrlBuilder(sanityClient);

export const getImageData = (source: SanityImageSource) =>
  builder.image(source);

export const getImageUrl = (source: SanityImageSource) =>
  builder.image(source).url();
