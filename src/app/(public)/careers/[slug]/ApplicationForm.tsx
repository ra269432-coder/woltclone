"use client";

import { useState } from "react";
import { fetchAPI } from "@/lib/api/client";
import { UploadCloud, CheckCircle2, Loader2 } from "lucide-react";

export default function CareerApplicationForm({ jobId }: { jobId: number }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // The backend expects 'job' as the ID field for the foreign key
    formData.append("job", jobId.toString());

    try {
      await fetchAPI('/api/applications/jobs/', {
        method: 'POST',
        body: formData,
      });
      setSuccess(true);
      form.reset();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-200 text-center">
        <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-emerald-900 mb-2">Application Received!</h3>
        <p className="text-emerald-700">Thank you for applying. We will review your application and get back to you soon.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
      <h3 className="text-2xl font-bold text-slate-900 mb-6">Apply for this Position</h3>
      
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-6 border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name *</label>
            <input required name="applicant_name" type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Jane Doe" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address *</label>
            <input required name="email" type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="jane@example.com" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number *</label>
            <input required name="phone" type="tel" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="+880 1..." />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Education / University</label>
            <input name="education" type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="BSc in Computer Science..." />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Cover Letter</label>
          <textarea name="cover_letter" rows={5} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tell us why you're a great fit..."></textarea>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Upload CV (PDF only) *</label>
          <div className="relative border-2 border-dashed border-slate-300 rounded-xl p-8 hover:bg-slate-50 transition-colors text-center group cursor-pointer">
            <input required name="cv" type="file" accept=".pdf" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            <UploadCloud className="w-10 h-10 text-slate-400 mx-auto mb-3 group-hover:text-blue-500 transition-colors" />
            <p className="text-slate-600 font-medium group-hover:text-blue-600">Click to upload or drag and drop</p>
            <p className="text-slate-400 text-sm mt-1">PDF max 5MB</p>
          </div>
        </div>

        <button 
          disabled={loading}
          type="submit" 
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-xl transition-colors flex justify-center items-center gap-2"
        >
          {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Submit Application"}
        </button>
      </form>
    </div>
  );
}
