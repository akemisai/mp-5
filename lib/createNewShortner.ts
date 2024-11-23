"use server";

import getURLCollection from "@/db";
import { URLProps } from "@/types";

export default async function createNewShortenedUrl(
  alias: string,
  url: string
): Promise<URLProps | null> {
  const urlsCollection = await getURLCollection();

  // Check if alias already exists
  const existingUrl = await urlsCollection.findOne({ alias });
  if (existingUrl) {
    throw new Error("Alias already taken");
  }

  // Insert new alias and URL
  const res = await urlsCollection.insertOne({ alias, url });
  if (!res.acknowledged) {
    return null;
  }

  return { id: res.insertedId.toHexString(), alias, url };
}
