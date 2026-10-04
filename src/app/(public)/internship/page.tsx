import { GraduationCap, CheckCircle2, ArrowRight, MapPin, Calendar, Briefcase } from "lucide-react";
import Link from "next/link";
import { fetchAPI } from "@/lib/api/client";

interface Internship {
  id: number;
  title: string;
  slug: string;
  department: string;
  location: string;
  duration: string;
  deadline: string | null;
}

export default async function InternshipPage() {
  const benefits = [
    "Mentorship from industry-leading development professionals",
    "Hands-on field experience in rural Bangladesh",
    "Monthly stipend and travel allowance",
    "Opportunity to transition into a full-time role"
  ];

  let internships: Internship[] = [];
  try {
    const data = await fetchAPI('/api/internships/');
    internships = data.results || data || [];
  } catch (error) {
    console.error("Failed to fetch internships:", error);
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center bg-slate-900">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80" 
            alt="Internship at WOLT" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <span className="text-cyan-400 font-bold tracking-widest uppercase mb-4 block">Get Involved</span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">Future Leaders Program</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">Kickstart your career in the development sector with our rigorous, 6-month immersive internship program.</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 mt-16 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">About the Program</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              The WOLT Future Leaders Program is designed for final-year university students and recent graduates who are passionate about social change. Instead of fetching coffee, our interns are placed directly into core project teams—working on everything from climate policy research to managing field logistics during humanitarian crises.
            </p>
            <h3 className="text-2xl font-bold text-slate-900 mb-6">What You'll Gain</h3>
            <div className="space-y-4 mb-10">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-cyan-600 shrink-0" />
                  <span className="text-slate-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=600&q=80" alt="interns" className="rounded-2xl h-64 object-cover w-full" />
            <img src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&w=600&q=80" alt="interns" className="rounded-2xl h-64 object-cover w-full translate-y-8" />
          </div>
        </div>
      </section>

      {/* Available Internships Section */}
      <section className="container mx-auto px-4 mt-24 max-w-6xl">
        <div className="mb-12 border-b border-slate-200 pb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Available Internships</h2>
          <p className="text-lg text-slate-600">Join our team and make an impact. Browse our current open internship positions below.</p>
        </div>

        {internships.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm">
            <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">No positions open currently</h3>
            <p className="text-slate-500">We are not accepting applications at this time. Please check back later.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {internships.map((internship) => (
              <div key={internship.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col">
                <div className="p-6 flex-1">
                  <div className="inline-block px-3 py-1 bg-cyan-50 text-cyan-700 text-sm font-semibold rounded-full mb-4">
                    {internship.department}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-cyan-600 transition-colors">
                    {internship.title}
                  </h3>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-slate-600 text-sm">
                      <MapPin className="w-4 h-4 shrink-0" />
                      <span>{internship.location}</span>
                    </div>
                    {internship.duration && (
                      <div className="flex items-center gap-2 text-slate-600 text-sm">
                        <Calendar className="w-4 h-4 shrink-0" />
                        <span>{internship.duration}</span>
                      </div>
                    )}
                    {internship.deadline && (
                      <div className="flex items-center gap-2 text-slate-600 text-sm">
                        <Briefcase className="w-4 h-4 shrink-0" />
                        <span>Apply by {new Date(internship.deadline).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="p-4 border-t border-slate-100 bg-slate-50/50 mt-auto">
                  <Link 
                    href={`/internship/${internship.slug}`}
                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-white border border-slate-200 hover:border-cyan-300 hover:bg-cyan-50 text-slate-700 font-medium rounded-xl transition-all"
                  >
                    View Details <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
