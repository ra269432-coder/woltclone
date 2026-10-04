import { fetchAPI } from "@/lib/api/client";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Calendar, Briefcase } from "lucide-react";
import Link from "next/link";
import ApplicationForm from "./ApplicationForm";

interface Internship {
  id: number;
  title: string;
  slug: string;
  department: string;
  description: string;
  requirements: string;
  location: string;
  duration: string;
  allowance: string;
  deadline: string | null;
  status: string;
}

export async function generateStaticParams() {
  try {
    const data = await fetchAPI('/api/internships/');
    const internships = data.results || data || [];
    return internships.map((internship: Internship) => ({
      slug: internship.slug,
    }));
  } catch (error) {
    console.error("Failed to fetch internships for static params:", error);
    return [];
  }
}

export default async function InternshipDetail({ params }: { params: Promise<{ slug: string }> }) {
  let internship: Internship | null = null;
  const { slug } = await params;
  
  try {
    const data = await fetchAPI(`/api/internships/${slug}/`);
    internship = data;
  } catch (error) {
    console.error("Failed to fetch internship details:", error);
  }

  if (!internship) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24 pt-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/internship" className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-medium mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Internships
        </Link>

        {/* Header section */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm mb-8">
          <div className="inline-block px-3 py-1 bg-cyan-50 text-cyan-700 text-sm font-semibold rounded-full mb-4">
            {internship.department}
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">{internship.title}</h1>
          
          <div className="flex flex-wrap items-center gap-6 text-slate-600 font-medium pb-8 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-slate-400" />
              <span>{internship.location}</span>
            </div>
            {internship.duration && (
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-slate-400" />
                <span>{internship.duration}</span>
              </div>
            )}
            {internship.deadline && (
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-slate-400" />
                <span>Apply by {new Date(internship.deadline).toLocaleDateString()}</span>
              </div>
            )}
            {internship.allowance && (
              <div className="flex items-center gap-2">
                <span className="bg-slate-100 px-3 py-1 rounded-lg text-sm text-slate-700">Stipend: {internship.allowance}</span>
              </div>
            )}
          </div>

          <div className="prose prose-slate max-w-none mt-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Description</h3>
            <div className="whitespace-pre-wrap text-slate-600 mb-8">{internship.description}</div>

            {internship.requirements && (
              <>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Requirements</h3>
                <div className="whitespace-pre-wrap text-slate-600">{internship.requirements}</div>
              </>
            )}
          </div>
        </div>

        {/* Application Form Section */}
        <div className="scroll-mt-8" id="apply">
          <ApplicationForm internshipId={internship.id} />
        </div>
      </div>
    </div>
  );
}
