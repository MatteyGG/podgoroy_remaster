import PereslavlClient from "./pereslavl-client";
import { getPereslavlContent } from "@/lib/pereslavl-content";

export default async function PereslavlPage() {
  const result = await getPereslavlContent();
  return <PereslavlClient content={result.data} source={result.source} />;
}
