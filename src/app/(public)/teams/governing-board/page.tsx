import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ChairmanMessage } from "@/components/home/ChairmanMessage";

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Header Area */}
          <div className="h-64 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative flex items-end">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80')] opacity-20 bg-cover bg-center"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
            <div className="relative z-10 p-8 sm:p-12 w-full">
              <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-200 uppercase bg-blue-900/50 rounded-full border border-blue-700/50 backdrop-blur-md">
                WOLT FOUNDATION
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">{"Governing Board"}</h1>
            </div>
          </div>
          
          {/* Content Area */}
          <div className="p-8 sm:p-12">
            <div className="prose prose-slate max-w-none prose-lg">
              <p className="text-xl text-slate-600 leading-relaxed mb-8 font-medium">
                {"Our distinguished board members provide oversight, strategic guidance, and ensure we uphold the highest standards of governance."}
              </p>

              <div className="h-px bg-slate-100 w-full my-10"></div>
              
              {/* Leadership Message Section */}
              <div className="mb-12 rounded-3xl overflow-hidden shadow-sm border border-slate-100">
                <ChairmanMessage />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 mb-12">
                <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 hover:border-blue-200 transition-all duration-300 group flex flex-col h-full">
                  <div className="w-full h-52 rounded-2xl overflow-hidden mb-6 relative">
                    <img 
                      src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80" 
                      alt="Strategic Oversight" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-700 transition-colors px-1">{"Strategic Oversight"}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed px-1">{"Ensuring long-term sustainability and adherence to our core mission."}</p>
                </div>
                
                <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-pink-900/5 hover:border-pink-200 transition-all duration-300 group flex flex-col h-full">
                  <div className="w-full h-52 rounded-2xl overflow-hidden mb-6 relative">
                    <img 
                      src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80" 
                      alt="Transparency & Accountability" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-pink-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-pink-700 transition-colors px-1">{"Transparency & Accountability"}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed px-1">{"Committing to ethical practices and transparent reporting to our stakeholders."}</p>
                </div>
              </div>
            </div>
            
            {/* Footer Actions */}
            <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex flex-col items-center sm:items-start">
                <p className="text-slate-900 font-semibold mb-1">Need more information?</p>
                <p className="text-slate-500 text-sm">Our team is ready to answer your questions.</p>
              </div>
              <Link href="/teams/team">
                <div className="inline-flex justify-center cursor-pointer px-8 py-3.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20 w-full sm:w-auto active:scale-[0.98]">
                  Contact Our Team
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
