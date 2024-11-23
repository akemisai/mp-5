import getURLCollection from "@/db";
import { ObjectId } from "mongodb";
import { URLProps } from "@/types";

export default async function getURLById(id: string): Promise<URLProps | null> {
  const urlsCollection = await getURLCollection();

  // Validate and convert id to ObjectId
  let urlId;
  try {
    urlId = new ObjectId(id);
  } catch {
    throw new Error("Invalid ID format");
  }

  // Fetch URL document by ID
  const data = await urlsCollection.findOne({ _id: urlId });
  if (!data) {
    return null;
  }

  return {
    id: data._id.toHexString(),
    alias: data.alias,
    url: data.url,
  };
}