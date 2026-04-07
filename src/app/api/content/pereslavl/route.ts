import { NextResponse } from "next/server";
import { getPereslavlContent } from "@/lib/pereslavl-content";

export async function GET() {
  const result = await getPereslavlContent();
  return NextResponse.json(result);
}
