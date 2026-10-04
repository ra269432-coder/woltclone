import { fetchAPI } from "@/lib/api/client";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Clock, Briefcase } from "lucide-react";
import Link from "next/link";
import CareerApplicationForm from "./ApplicationForm";

interface Job {
  id: number;
  title: string;
  slug: string;
  department: string;
  location: string;
  employment_type: string;
  description: string;
  responsibilities: string;
  requirements: string;
  deadline: string | null;
  status: string;
}

export async function generateStaticParams() {
  try {
    const data = await fetchAPI('/api/jobs/');
    const jobs = data.results || data || [];
    return jobs.map((job: Job) => ({
      slug: job.slug,
    }));
  } catch (error) {
    console.error("Failed to fetch jobs for static params:", error);
    return [];
  }
}

export default async function CareerDetail({ params }: { params: Promise<{ slug: string }> }) {
  let job: Job | null = null;
  const { slug } = await params;
  
  try {
    const data = await fetchAPI(`/api/jobs/${slug}/`);
    job = data;
  } catch (error) {
    console.error("Failed to fetch job details:", error);
  }

  if (!job) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24 pt-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/careers" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Careers
        </Link>

        {/* Header section */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm mb-8">
          <div className="inline-block px-3 py-1 bg-amber-50 text-amber-700 text-sm font-semibold rounded-full mb-4">
            {job.department}
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">{job.title}</h1>
          
          <div className="flex flex-wrap items-center gap-6 text-slate-600 font-medium pb-8 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-slate-400" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-slate-400" />
              <span>{job.employment_type}</span>
            </div>
            {job.deadline && (
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-slate-400" />
                <span>Apply by {new Date(job.deadline).toLocaleDateString()}</span>
              </div>
            )}
          </div>

          <div className="prose prose-slate max-w-none mt-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Description</h3>
            <div className="whitespace-pre-wrap text-slate-600 mb-8">{job.description}</div>

            {job.responsibilities && (
              <>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Responsibilities</h3>
                <div className="whitespace-pre-wrap text-slate-600 mb-8">{job.responsibilities}</div>
              </>
            )}

            {job.requirements && (
              <>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Requirements</h3>
                <div className="whitespace-pre-wrap text-slate-600">{job.requirements}</div>
              </>
            )}
          </div>
        </div>

        {/* Application Form Section */}
        <div className="scroll-mt-8" id="apply">
          <CareerApplicationForm jobId={job.id} />
        </div>
      </div>
    </div>
  );
}
