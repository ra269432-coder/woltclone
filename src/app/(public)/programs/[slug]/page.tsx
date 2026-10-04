import { ProgramClient } from "./ProgramClient";

// Ensure Next.js knows this route is statically generated
export async function generateStaticParams() {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    const res = await fetch(`${API_URL}/api/programs/`);
    if (!res.ok) {
      console.warn("Could not fetch programs for static generation:", res.statusText);
      return [];
    }
    const programs = await res.json();
    return programs.map((p: any) => ({
      slug: p.slug,
    }));
  } catch (error) {
    console.warn("Failed to generate static params for programs:", error);
    return [];
  }
}

export default async function DynamicProgramPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  return <ProgramClient slug={resolvedParams.slug} />;
}
