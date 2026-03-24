import { motion } from 'motion/react';
import { ArrowLeft, Activity, BookOpen, Microscope, ShieldCheck, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

export function ExplanationPage() {
  return (
    <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-12">
      {/* Header Section */}
      <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-6">
            <Link to="/dashboard" className="text-primary flex items-center gap-2 text-sm font-bold hover:underline">
              <ArrowLeft size={16} />
              Back to Assessment
            </Link>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-on-surface mb-6 leading-tight font-manrope">
            Why this result?
          </h1>
          <p className="text-xl text-on-surface-variant leading-relaxed font-inter max-w-2xl">
            A clinical-grade breakdown of the physiological and lifestyle factors contributing to your Type 2 Diabetes risk assessment.
          </p>
        </div>
        
        {/* Model Confidence Indicator */}
        <div className="bg-surface-container-lowest p-8 rounded-3xl ambient-shadow flex flex-col items-center justify-center min-w-[240px]">
          <span className="text-[10px] font-bold text-secondary mb-4 tracking-widest uppercase">Model Confidence</span>
          <div className="relative flex items-center justify-center">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle className="text-surface-container-high" cx="64" cy="64" fill="transparent" r="56" stroke="currentColor" strokeWidth="10"></circle>
              <motion.circle 
                initial={{ strokeDashoffset: 351.8 }}
                animate={{ strokeDashoffset: 351.8 * (1 - 0.96) }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="text-secondary" 
                cx="64" cy="64" fill="transparent" r="56" 
                stroke="currentColor" 
                strokeDasharray="351.8" 
                strokeWidth="10"
              />
            </svg>
            <span className="absolute text-3xl font-extrabold font-manrope">96%</span>
          </div>
        </div>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Impact Factors */}
        <div className="lg:col-span-8 space-y-10">
          <section className="bg-surface-container-lowest p-12 rounded-3xl ambient-shadow">
            <h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
              <Activity className="text-primary" size={32} />
              Impact Factor Breakdown
            </h2>
            <div className="space-y-16">
              {[
                { 
                  label: 'Glycemic load', 
                  tag: 'High Impact Factor', 
                  impact: 64, 
                  color: 'bg-tertiary-container',
                  desc: 'Continuous glucose monitoring data indicates frequent post-prandial spikes exceeding 180mg/dL. High glycemic variability is the primary driver for the current risk score.'
                },
                { 
                  label: 'Family history', 
                  tag: 'Moderate Impact Factor', 
                  impact: 22, 
                  color: 'bg-amber-500',
                  desc: 'First-degree genetic markers and reported family health history contribute to a baseline predisposed elevation in the metabolic risk profile.'
                },
                { 
                  label: 'Lifestyle habits', 
                  tag: 'Low Impact Factor', 
                  impact: 14, 
                  color: 'bg-primary',
                  desc: 'Regular cardiovascular activity and consistent sleep cycles (7.2h avg) are currently acting as protective factors, mitigating higher risk scores.'
                }
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{item.label}</h3>
                      <span className={cn("text-xs font-bold uppercase tracking-widest", item.tag.includes('High') ? 'text-tertiary' : item.tag.includes('Moderate') ? 'text-amber-600' : 'text-primary')}>
                        {item.tag}
                      </span>
                    </div>
                    <span className="text-3xl font-extrabold text-on-surface">{item.impact}%</span>
                  </div>
                  <div className="h-4 w-full bg-surface-container-high rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.impact}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={cn("h-full rounded-full", item.color)}
                    />
                  </div>
                  <p className="mt-6 text-base text-on-surface-variant leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Risk Trajectory Chart */}
          <section className="bg-surface-container-low p-12 rounded-3xl">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-2xl font-bold mb-2">Risk Trajectory</h2>
                <p className="text-base text-on-surface-variant">90-day predictive forecast based on current biological markers</p>
              </div>
              <div className="flex gap-3">
                <span className="px-4 py-1.5 bg-surface-container-lowest text-[10px] font-bold rounded-full ambient-shadow">Real-time</span>
                <span className="px-4 py-1.5 bg-secondary-container text-white text-[10px] font-bold rounded-full shadow-lg">AI Predicted</span>
              </div>
            </div>
            <div className="h-80 relative w-full flex items-end">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 200">
                <path className="opacity-80" d="M0,150 Q100,160 200,120 T400,100 T600,80 T800,110 T1000,90" fill="none" stroke="#4b41e1" strokeWidth="4"></path>
                <path className="opacity-10" d="M0,150 Q100,160 200,120 T400,100 T600,80 T800,110 T1000,90 L1000,200 L0,200 Z" fill="#4b41e1"></path>
              </svg>
            </div>
            <div className="flex justify-between mt-6 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest px-4">
              <span>Oct</span>
              <span>Nov</span>
              <span>Dec</span>
              <span>Jan (Forecast)</span>
              <span>Feb (Forecast)</span>
            </div>
          </section>
        </div>

        {/* Right Column: Evidence & Actions */}
        <div className="lg:col-span-4 space-y-10">
          {/* Clinical Evidence */}
          <aside className="bg-surface-container-lowest p-10 rounded-3xl ambient-shadow">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
              <ShieldCheck className="text-secondary" size={24} />
              Clinical Evidence
            </h3>
            <ul className="space-y-8">
              {[
                { icon: BookOpen, title: 'ADA Standard 2024', desc: 'Aligned with American Diabetes Association protocols for glycemic variability assessment.' },
                { icon: Microscope, title: 'Metabolic Pathway Analysis', desc: 'Model accounts for 42 distinct metabolic markers derived from recent lab results.' }
              ].map((item, i) => (
                <li key={i} className="flex gap-5">
                  <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-secondary-fixed flex items-center justify-center">
                    <item.icon className="text-secondary" size={20} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold mb-2">{item.title}</h4>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <button className="w-full mt-10 py-4 bg-surface-container-high hover:bg-surface-container-highest transition-colors rounded-full text-sm font-bold">
              View Clinical Whitepaper
            </button>
          </aside>

          {/* Recommended Action */}
          <aside className="bg-primary p-10 rounded-3xl text-on-primary ambient-shadow">
            <h3 className="text-2xl font-bold mb-6">Recommended Action</h3>
            <p className="text-base opacity-90 leading-relaxed mb-10">
              Based on your Glycemic Load impact (64%), we recommend a "Fiber-First" nutrition strategy to dampen insulin spikes.
            </p>
            <div className="space-y-4">
              <button className="w-full py-5 bg-white text-primary rounded-full font-bold text-base shadow-xl active:scale-95 transition-all">
                Personalize My Plan
              </button>
              <button className="w-full py-5 bg-primary-container text-on-primary rounded-full font-bold text-base hover:bg-opacity-90 transition-all">
                Consult a Specialist
              </button>
            </div>
          </aside>

          {/* Assessment Status */}
          <div className="bg-surface-container-low p-8 rounded-3xl">
            <h4 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-6">Assessment Status</h4>
            <div className="flex flex-wrap gap-3">
              <span className="px-5 py-2 bg-tertiary-container text-on-primary rounded-full text-[10px] font-bold">Rising Trend</span>
              <span className="px-5 py-2 bg-primary-container text-on-primary rounded-full text-[10px] font-bold">Clinically Validated</span>
              <span className="px-5 py-2 bg-surface-container-highest text-on-surface-variant rounded-full text-[10px] font-bold">v4.2 Engine</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
