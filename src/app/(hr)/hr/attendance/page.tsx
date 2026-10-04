"use client";

import { useState } from "react";
import { Search, Download, Calendar, User, Clock, AlertCircle, Briefcase, CalendarDays, ChevronDown, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from "recharts";
import { motion, AnimatePresence } from "framer-motion";

const employeesData = [
  {
    id: 1,
    name: "Sarah Jenkins",
    department: "Marketing",
    role: "Marketing Manager",
    stats: { present: 22, absent: 0, leave: 2, leavesLeft: 14 },
    records: [
      { date: "2026-09-23", checkIn: "10:41 AM", checkOut: "06:47 PM", status: "Present", location: "Remote" },
      { date: "2026-09-19", checkIn: "09:13 AM", checkOut: "05:30 PM", status: "Present", location: "Remote" },
      { date: "2026-09-10", checkIn: "09:50 AM", checkOut: "06:05 PM", status: "Late", location: "Remote" },
      { date: "2026-09-07", checkIn: "09:00 AM", checkOut: "05:00 PM", status: "Present", location: "Remote" },
      { date: "2026-09-04", checkIn: "09:00 AM", checkOut: "05:30 PM", status: "Present", location: "Remote" },
    ]
  },
  {
    id: 2,
    name: "Rahim Uddin",
    department: "Engineering",
    role: "Software Engineer",
    stats: { present: 18, absent: 2, leave: 4, leavesLeft: 10 },
    records: [
      { date: "2026-09-23", checkIn: "08:55 AM", checkOut: "05:00 PM", status: "Present", location: "Dhaka HQ" },
      { date: "2026-09-22", checkIn: "09:15 AM", checkOut: "05:15 PM", status: "Late", location: "Dhaka HQ" },
      { date: "2026-09-21", checkIn: "--:--", checkOut: "--:--", status: "Absent", location: "--" },
      { date: "2026-09-20", checkIn: "08:50 AM", checkOut: "05:05 PM", status: "Present", location: "Dhaka HQ" },
    ]
  },
  {
    id: 3,
    name: "Dr. Salma Begum",
    department: "Medical",
    role: "Head Physician",
    stats: { present: 20, absent: 1, leave: 3, leavesLeft: 12 },
    records: [
      { date: "2026-09-23", checkIn: "09:15 AM", checkOut: "06:00 PM", status: "Present", location: "Medical Camp - Sylhet" },
      { date: "2026-09-22", checkIn: "09:00 AM", checkOut: "05:30 PM", status: "Present", location: "Medical Camp - Sylhet" },
    ]
  },
];

const COLORS = ['#10b981', '#f43f5e', '#6366f1']; // Present (Emerald), Absent (Rose), Leave (Indigo)

export default function AttendancePage() {
  const [selectedEmpId, setSelectedEmpId] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const selectedEmp = employeesData.find(e => e.id === selectedEmpId) || employeesData[0];
  
  const chartData = [
    { name: 'Present', value: selectedEmp.stats.present },
    { name: 'Absent', value: selectedEmp.stats.absent },
    { name: 'Leave', value: selectedEmp.stats.leave },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500">
            Attendance Dashboard
          </h2>
          <p className="text-slate-500 mt-1">Monitor employee attendance, leaves, and performance.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-white border shadow-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all">
            <Download className="w-4 h-4 mr-2" /> Export Report
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200 transition-all">
            <CalendarDays className="w-4 h-4 mr-2" /> Request Leave
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Employee Selector & Overview */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 relative z-10">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Select Employee</h3>
            
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between p-3 border border-slate-200 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-sm">
                    {selectedEmp.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">{selectedEmp.name}</div>
                    <div className="text-xs text-slate-500">{selectedEmp.role}</div>
                  </div>
                </div>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute w-full mt-2 bg-white border border-slate-200 shadow-xl rounded-xl overflow-hidden z-50"
                  >
                    {employeesData.map(emp => (
                      <button
                        key={emp.id}
                        onClick={() => { setSelectedEmpId(emp.id); setIsDropdownOpen(false); }}
                        className={`w-full flex items-center gap-3 p-3 text-left transition-colors hover:bg-indigo-50 ${selectedEmpId === emp.id ? 'bg-indigo-50/50' : ''}`}
                      >
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs">
                          {emp.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-800">{emp.name}</div>
                          <div className="text-xs text-slate-500">{emp.department}</div>
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500 flex items-center gap-2"><Briefcase className="w-4 h-4" /> Department</span>
                <span className="font-medium text-slate-800">{selectedEmp.department}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500 flex items-center gap-2"><Clock className="w-4 h-4" /> Schedule</span>
                <span className="font-medium text-slate-800">09:00 AM - 05:00 PM</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-slate-500 flex items-center gap-2"><User className="w-4 h-4" /> Emp ID</span>
                <span className="font-medium text-slate-800">WOLT-{1000 + selectedEmp.id}</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
            <div className="relative z-10">
              <h3 className="text-indigo-100 font-medium mb-1 flex items-center gap-2">
                <CalendarDays className="w-4 h-4" /> Remaining Leaves
              </h3>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-bold">{selectedEmp.stats.leavesLeft}</span>
                <span className="text-indigo-200 mb-1">days left</span>
              </div>
              <div className="w-full bg-white/20 h-1.5 rounded-full mt-4 overflow-hidden">
                <div 
                  className="bg-white h-full rounded-full" 
                  style={{ width: `${(selectedEmp.stats.leavesLeft / 24) * 100}%` }}
                ></div>
              </div>
              <div className="text-xs text-indigo-200 mt-2 text-right">Out of 24 annual days</div>
            </div>
          </div>
        </div>

        {/* Right Column: Charts & Stats */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-800">{selectedEmp.stats.present}</div>
                <div className="text-sm text-slate-500 font-medium">Days Present</div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600">
                <XCircle className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-800">{selectedEmp.stats.absent}</div>
                <div className="text-sm text-slate-500 font-medium">Days Absent</div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-800">{selectedEmp.stats.leave}</div>
                <div className="text-sm text-slate-500 font-medium">Days on Leave</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2 h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full md:w-1/2 space-y-4">
              <h3 className="text-lg font-bold text-slate-800">Attendance Overview</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {selectedEmp.name} has maintained a solid attendance record this month. With {selectedEmp.stats.present} days present and only {selectedEmp.stats.absent} days absent, their attendance rate is approximately {Math.round((selectedEmp.stats.present / (selectedEmp.stats.present + selectedEmp.stats.absent + selectedEmp.stats.leave)) * 100)}%.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">On-time rate: 92%</span>
                <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">Avg Hours: 8.2h</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Logs Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <h3 className="font-bold text-slate-800 text-lg">Recent Attendance Logs</h3>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search date..." 
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm transition-all"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-xs uppercase tracking-wider text-slate-500 border-b border-slate-100">
                <th className="p-5 font-medium">Date</th>
                <th className="p-5 font-medium">Check In</th>
                <th className="p-5 font-medium">Check Out</th>
                <th className="p-5 font-medium">Location</th>
                <th className="p-5 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm">
              {selectedEmp.records.map((record, i) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={i} 
                  className="hover:bg-slate-50/80 transition-colors group"
                >
                  <td className="p-5 font-medium text-slate-700 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
                      {new Date(record.date).getDate()}
                    </div>
                    {new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="p-5 text-slate-600 font-mono text-xs">{record.checkIn}</td>
                  <td className="p-5 text-slate-500 font-mono text-xs">{record.checkOut}</td>
                  <td className="p-5 text-slate-600">{record.location}</td>
                  <td className="p-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 ${
                      record.status === "Present" ? "bg-emerald-50 text-emerald-600 border border-emerald-200/50" : 
                      record.status === "Late" ? "bg-amber-50 text-amber-600 border border-amber-200/50" : 
                      "bg-rose-50 text-rose-600 border border-rose-200/50"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        record.status === "Present" ? "bg-emerald-500" : 
                        record.status === "Late" ? "bg-amber-500" : 
                        "bg-rose-500"
                      }`}></span>
                      {record.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
