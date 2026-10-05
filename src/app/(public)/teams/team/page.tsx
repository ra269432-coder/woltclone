"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, User } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

interface Employee {
  id: number;
  name: string;
  designation: string;
  department: string;
  image: string | null;
}

export default function Page() {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    const apiUrl = baseUrl.endsWith('/api') ? baseUrl : `${baseUrl}/api`;
    
    fetch(`${apiUrl}/employees/`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        // Filter out HR Admin and System Admin (or any user/designation with 'admin')
        const filteredEmployees = data.filter((emp: Employee) => {
          const designation = (emp.designation || '').toLowerCase();
          const name = (emp.name || '').toLowerCase();
          return !designation.includes('admin') && !name.includes('admin');
        });
        setEmployees(filteredEmployees);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch employees:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> {isBn ? "হোমে ফিরে যান" : "Back to Home"}
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
                {isBn ? "WOLT ফাউন্ডেশন" : "WOLT FOUNDATION"}
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">{isBn ? "আমাদের দল" : "Our Team"}</h1>
            </div>
          </div>
          
          {/* Content Area */}
          <div className="p-8 sm:p-12">
            <div className="prose prose-slate max-w-none prose-lg">
              <p className="text-xl text-slate-600 leading-relaxed mb-8 font-medium">
                {isBn ? "নিবেদিতপ্রাণ পেশাদারদের সাথে দেখা করুন যারা আমাদের মিশনকে জীবনে আনতে অক্লান্ত পরিশ্রম করেন।" : "Meet the dedicated professionals who work tirelessly to bring our mission to life."}
              </p>
              
              <div className="h-px bg-slate-100 w-full my-10"></div>
              
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : employees.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 mb-12">
                  {employees.map((emp) => (
                    <div key={emp.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl transition-all group flex flex-col items-center text-center p-6">
                      <div className="w-32 h-32 rounded-full overflow-hidden mb-6 relative bg-slate-100 border-4 border-white shadow-md">
                        {emp.image ? (
                          <img src={emp.image} alt={emp.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400">
                            <User className="w-12 h-12" />
                          </div>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 mb-1">{emp.name}</h3>
                      <p className="text-blue-600 font-medium text-sm mb-2">{emp.designation}</p>
                      {emp.department && (
                        <span className="px-3 py-1 bg-slate-50 text-slate-500 text-xs rounded-full">{emp.department}</span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-slate-500">
                  {isBn ? "কোন দলের সদস্য পাওয়া যায়নি।" : "No team members found."}
                </div>
              )}
            </div>
            
            {/* Footer Actions */}
            <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex flex-col items-center sm:items-start">
                <p className="text-slate-900 font-semibold mb-1">{isBn ? "আরও তথ্য প্রয়োজন?" : "Need more information?"}</p>
                <p className="text-slate-500 text-sm">{isBn ? "আমাদের দল আপনার প্রশ্নের উত্তর দিতে প্রস্তুত।" : "Our team is ready to answer your questions."}</p>
              </div>
              <Link href="/teams/team">
<div className="inline-flex justify-center cursor-pointer px-8 py-3.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20 w-full sm:w-auto active:scale-[0.98]">
                  {isBn ? "আমাদের দলের সাথে যোগাযোগ করুন" : "Contact Our Team"}
                </div>
</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
