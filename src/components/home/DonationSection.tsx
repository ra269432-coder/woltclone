"use client";

import { CreditCard, Lock, ShieldCheck, Heart, ArrowRight, Smartphone, Building2 } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { motion } from "framer-motion";

import { useLanguage } from "@/context/LanguageContext";

const amounts = [25, 50, 100, 500];

export function DonationSection() {
  const { t } = useLanguage();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [donationType, setDonationType] = useState<"one-time" | "monthly">("one-time");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bkash" | "nagad">("card");

  const getImpact = (amt: number | null) => {
    if (!amt) return "Every contribution makes a difference.";
    if (amt <= 25) return "Provides emergency medical supplies for one person.";
    if (amt <= 50) return "Feeds a family in crisis for a month.";
    if (amt <= 100) return "Sponsors a child's education and supplies for a year.";
    return "Helps build long-term disaster resilience infrastructure.";
  };

  const getBDT = (usd: number | null) => {
    if (!usd) return "";
    return `(৳${(usd * 110).toLocaleString()})`;
  };

  return (
    <section id="donate" className="py-16 bg-slate-50 relative overflow-hidden">
      {/* Decorative Gradients */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-slate-200/50 rounded-full blur-[120px] pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/50 rounded-full blur-[100px] pointer-events-none transform -translate-x-1/2 translate-y-1/2"></div>
      <div className="absolute inset-0 bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] z-0"></div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-blue-600 font-bold tracking-widest uppercase text-sm mb-6 shadow-sm border border-slate-200"
          >
            <Heart className="w-4 h-4 fill-current text-rose-500" /> {t("donateSection.tag")}
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tighter"
          >
            {t("donateSection.title")}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-900/80 text-xl font-bold"
          >
            {t("donateSection.subtitle")}
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
          className="bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-slate-100 relative z-20"
        >
          
          {/* Info Side */}
          <div className="lg:w-5/12 bg-slate-950 text-white p-12 flex flex-col gap-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-slate-950 to-slate-900 opacity-100 z-0"></div>
            <div className="absolute -top-[20%] -left-[20%] w-[100%] h-[100%] rounded-full bg-blue-500/10 blur-[100px] z-0"></div>
            
            <div className="relative z-10">
              <h3 className="text-4xl font-black mb-8 leading-tight tracking-tight">{t("donateSection.dollar")}</h3>
              <ul className="space-y-6 text-blue-100 font-medium text-lg">
                <li className="flex items-center gap-4"><ShieldCheck className="w-8 h-8 text-blue-400 shrink-0" /> {t("donateSection.secure")}</li>
                <li className="flex items-center gap-4"><ShieldCheck className="w-8 h-8 text-blue-400 shrink-0" /> {t("donateSection.transparent")}</li>
                <li className="flex items-center gap-4"><ShieldCheck className="w-8 h-8 text-blue-400 shrink-0" /> {t("donateSection.grassroots")}</li>
              </ul>
            </div>
            
            <div className="relative z-10 bg-black/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 mt-auto">
              <p className="text-lg font-bold leading-relaxed tracking-wide">{t("donateSection.quote")}</p>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:w-7/12 p-12 bg-white">
            <form onSubmit={(e) => { e.preventDefault(); alert("Redirecting to secure hosted checkout..."); }} className="space-y-8">
              
              {/* Toggle Frequency */}
              <div className="flex bg-slate-100 p-1.5 rounded-2xl">
                <button
                  type="button"
                  onClick={() => setDonationType("one-time")}
                  className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300 ${
                    donationType === "one-time" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  One-time
                </button>
                <button
                  type="button"
                  onClick={() => setDonationType("monthly")}
                  className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300 ${
                    donationType === "monthly" ? "bg-blue-600 text-white shadow-sm shadow-blue-600/20" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  Monthly
                </button>
              </div>

              {/* Amount Selection */}
              <div>
                <label className="block text-sm font-black tracking-widest uppercase text-slate-400 mb-4">{t("donateSection.selectAmount")}</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {amounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setSelectedAmount(amount)}
                      className={`py-4 rounded-2xl border-2 font-black text-xl transition-all duration-300 flex flex-col items-center justify-center ${
                        selectedAmount === amount 
                          ? "border-blue-600 bg-blue-50 text-blue-600 scale-105 shadow-md shadow-blue-600/10" 
                          : "border-slate-200 text-slate-500 hover:border-blue-600/50 hover:text-blue-600"
                      }`}
                    >
                      <span>${amount}</span>
                    </button>
                  ))}
                </div>
                <div className="mt-4">
                  <input 
                    type="number" 
                    placeholder={t("donateSection.customAmount")} 
                    className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-blue-600 focus:bg-white transition-colors font-bold text-lg text-slate-900 placeholder:text-slate-400"
                    onChange={(e) => setSelectedAmount(Number(e.target.value) || null)}
                  />
                </div>
                {/* Impact Statement */}
                <div className="mt-4 text-center bg-emerald-50 rounded-xl p-4 border border-emerald-100 text-emerald-800 flex flex-col sm:flex-row items-center justify-center gap-2">
                  <Heart className="w-5 h-5 text-emerald-500 shrink-0" /> 
                  <span className="font-semibold text-sm">{getImpact(selectedAmount)}</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <label className="block text-sm font-black tracking-widest uppercase text-slate-400 mb-4">Payment Method</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`py-4 px-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all duration-300 ${
                      paymentMethod === "card" ? "border-blue-600 bg-blue-50 text-blue-600" : "border-slate-200 text-slate-500 hover:border-slate-300"
                    }`}
                  >
                    <CreditCard className="w-6 h-6" />
                    <span className="font-bold text-sm">Card / Bank</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("bkash")}
                    className={`py-4 px-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all duration-300 ${
                      paymentMethod === "bkash" ? "border-pink-500 bg-pink-50 text-pink-600" : "border-slate-200 text-slate-500 hover:border-slate-300"
                    }`}
                  >
                    <Smartphone className="w-6 h-6" />
                    <span className="font-bold text-sm">bKash</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("nagad")}
                    className={`py-4 px-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all duration-300 ${
                      paymentMethod === "nagad" ? "border-orange-500 bg-orange-50 text-orange-600" : "border-slate-200 text-slate-500 hover:border-slate-300"
                    }`}
                  >
                    <Building2 className="w-6 h-6" />
                    <span className="font-bold text-sm">Nagad</span>
                  </button>
                </div>
                <p className="text-xs text-slate-500 mt-4 text-center font-medium">
                  You will be redirected to our secure hosted checkout to complete your payment. No card data is stored on our servers.
                </p>
              </div>

              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl py-6 text-xl font-black flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-blue-600/20 group hover:-translate-y-1">
                <Lock className="w-6 h-6 opacity-80" /> 
                Proceed to Checkout • ${selectedAmount || 0} {getBDT(selectedAmount)}
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>
            </form>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
