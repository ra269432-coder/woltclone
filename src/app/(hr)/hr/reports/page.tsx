"use client";

import { 
  FileText, Users, CalendarCheck, CalendarOff, Banknote, 
  Briefcase, UserPlus, Building, Target, GraduationCap, 
  FileWarning, RefreshCw, BarChart3, Download
} from "lucide-react";
import { Button } from "@/components/ui/button";

const reports = [
  { title: "Employee Report", desc: "Total employees, department, designation, status", icon: Users },
  { title: "Attendance Report", desc: "Present, absent, late, overtime", icon: CalendarCheck },
  { title: "Leave Report", desc: "Approved, rejected, pending, leave balance", icon: CalendarOff },
  { title: "Payroll Report", desc: "Salary, allowances, deductions, net salary", icon: Banknote },
  { title: "Recruitment Report", desc: "Applicants, shortlisted, interviewed, selected", icon: Briefcase },
  { title: "Joining/Exit Report", desc: "New joiners and resigned employees", icon: UserPlus },
  { title: "Department-wise Report", desc: "Employees grouped by department", icon: Building },
  { title: "Performance Report", desc: "Employee evaluations and ratings", icon: Target },
  { title: "Training Report", desc: "Training completed, upcoming, attendance", icon: GraduationCap },
  { title: "Contract Expiry Report", desc: "Contracts and documents expiring soon", icon: FileWarning },
  { title: "Turnover Report", desc: "Employees who joined vs. left", icon: RefreshCw },
  { title: "HR Summary Report", desc: "Overall HR statistics for management", icon: BarChart3 },
];

export default function ReportsPage() {
  const handleDownload = (title: string) => {
    // Use the actual backend endpoint to generate and download the PDF
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    window.open(`${backendUrl}/management/hr/reports/download/?report=${encodeURIComponent(title)}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">HR Analytics & Reports</h2>
          <p className="text-slate-500">Generate and automatically download comprehensive HR data as PDF.</p>
        </div>
        <Button 
          onClick={() => handleDownload("Complete_HR_Audit")}
          className="bg-wolt-blue hover:bg-wolt-blue/90 text-white flex items-center gap-2 shadow-md shadow-wolt-blue/20"
        >
          <Download className="w-4 h-4" /> Export All Data
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border shadow-sm flex flex-col transition-all hover:shadow-md hover:border-blue-200">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-blue-50 text-wolt-blue rounded-lg shrink-0">
                <report.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 leading-tight mb-1">{report.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{report.desc}</p>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              onClick={() => handleDownload(report.title)}
              className="mt-auto w-full flex gap-2 text-sm text-slate-600 hover:text-wolt-blue hover:border-wolt-blue/30 hover:bg-blue-50"
            >
              <FileText className="w-4 h-4" /> Download PDF
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
