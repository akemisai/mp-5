import { redirect } from "next/navigation";
import getURLCollection from "@/db";

type AliasRedirectPageProps = {
  params: Promise<{
    alias: string;
  }>;
};

export default async function AliasRedirectPage(props: AliasRedirectPageProps) {
  const params = await props.params;
  const urlsCollection = await getURLCollection();

  // Find the URL associated with the alias
  const urlDoc = await urlsCollection.findOne({ alias: params.alias });
  if (!urlDoc) {
    return <p>Alias not found</p>;
  }

  // Redirect to the original URL
  redirect(urlDoc.url);
}
