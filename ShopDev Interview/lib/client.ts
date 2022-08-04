import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "0vv8moc6",
  dataset: "hcplive",
  useCdn: true,
  apiVersion: "2022-06-02",
});