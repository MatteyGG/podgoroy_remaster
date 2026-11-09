import PereslavlClient from "@/app/pereslavl/pereslavl-client";
import type { PereslavlPageContent } from "@/content/pereslavl-page";

type Props = {
  content: PereslavlPageContent;
  source: "directus" | "fallback";
};

export default function PereslavlSection({ content, source }: Props) {
  return (
    <div id="pereslavl">
      <PereslavlClient content={content} source={source} />
    </div>
  );
}
