import { motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, Activity, BookOpen, Microscope, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

export function ExplanationPage() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="max-w-screen-2xl mx-auto px-5 lg:px-10 py-10 lg:py-12">
      <header className="mb-10 lg:mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-7 lg:gap-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-5">
            <Link to="/dashboard" className="chip border-primary/30 text-primary hover:text-on-surface transition-colors">
              <ArrowLeft size={15} />
              Back to Dashboard
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[3.35rem] font-semibold tracking-tight text-on-surface mb-4 leading-[1.08] font-manrope">
            Why this risk signal?
          </h1>
          <p className="text-base md:text-lg text-on-surface-variant leading-relaxed font-inter max-w-2xl">
            Clinical breakdown of physiological and behavioral factors contributing to your Type 2 diabetes risk signal.
          </p>
        </div>

        <div className="panel p-6 rounded-3xl flex flex-col items-center justify-center min-w-[220px] reveal reveal-delay-1 interactive-lift">
          <span className="text-[10px] font-semibold text-secondary mb-4 tracking-[0.16em] uppercase">Model Confidence</span>
          <div className="relative flex items-center justify-center">
            <svg className="w-28 h-28 transform -rotate-90">
              <circle className="text-surface-container-high" cx="56" cy="56" fill="transparent" r="48" stroke="currentColor" strokeWidth="9"></circle>
              <motion.circle
                initial={reduceMotion ? false : { strokeDashoffset: 301.6 }}
                animate={{ strokeDashoffset: 301.6 * (1 - 0.96) }}
                transition={reduceMotion ? { duration: 0 } : { duration: 1.4, ease: 'easeOut' }}
                className="text-secondary"
                cx="56"
                cy="56"
                fill="transparent"
                r="48"
                stroke="currentColor"
                strokeDasharray="301.6"
                strokeWidth="9"
              />
            </svg>
            <span className="absolute text-3xl font-extrabold font-manrope">96%</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
        <div className="lg:col-span-8 space-y-5 lg:space-y-6">
          <section className="panel p-7 lg:p-10 reveal interactive-lift">
            <h2 className="text-2xl lg:text-3xl font-semibold mb-7 flex items-center gap-3">
              <Activity className="text-primary" size={28} />
              Driver Breakdown
            </h2>
            <div className="space-y-10">
              {[
                {
                  label: 'Glycemic load',
                  tag: 'High Impact Factor',
                  impact: 64,
                  color: 'bg-tertiary-container',
                  desc: 'Continuous glucose monitoring data indicates frequent post-prandial spikes exceeding 180mg/dL. High glycemic variability drives the current risk score.'
                },
                {
                  label: 'Family history',
                  tag: 'Moderate Impact Factor',
                  impact: 22,
                  color: 'bg-amber-500',
                  desc: 'First-degree genetic markers and reported family health history contribute to a baseline predisposed elevation in risk profile.'
                },
                {
                  label: 'Lifestyle habits',
                  tag: 'Low Impact Factor',
                  impact: 14,
                  color: 'bg-primary',
                  desc: 'Regular cardiovascular activity and consistent sleep cycles are currently acting as protective factors, mitigating higher risk scores.'
                }
              ].map((item) => (
                <div key={item.label} className="panel-soft p-4 interactive-lift">
                  <div className="flex justify-between items-end mb-3">
                    <div>
                      <h3 className="text-lg lg:text-xl font-semibold mb-1 text-on-surface">{item.label}</h3>
                      <span className={cn('text-[10px] font-semibold uppercase tracking-[0.16em]', item.tag.includes('High') ? 'text-tertiary' : item.tag.includes('Moderate') ? 'text-amber-400' : 'text-primary')}>
                        {item.tag}
                      </span>
                    </div>
                    <span className="text-2xl lg:text-3xl font-extrabold text-on-surface">{item.impact}%</span>
                  </div>
                  <div className="h-3 w-full bg-surface-container-high rounded-full overflow-hidden">
                    <motion.div
                      initial={reduceMotion ? false : { width: 0 }}
                      animate={{ width: `${item.impact}%` }}
                      transition={reduceMotion ? { duration: 0 } : { duration: 1, ease: 'easeOut' }}
                      className={cn('h-full rounded-full', item.color)}
                    />
                  </div>
                  <p className="mt-3 text-sm lg:text-base text-on-surface-variant leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="panel-soft p-7 lg:p-9 rounded-3xl border reveal reveal-delay-1 interactive-lift">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <div>
                <h2 className="text-xl lg:text-2xl font-semibold mb-1 text-on-surface">Risk Trajectory</h2>
                <p className="text-sm lg:text-base text-on-surface-variant">90-day predictive forecast based on current biological markers</p>
              </div>
              <div className="flex gap-2">
                <span className="chip">Observed</span>
                <span className="chip border-secondary/35 bg-secondary/15 text-secondary">Predicted</span>
              </div>
            </div>
            <div className="h-72 relative w-full flex items-end">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 200">
                <path className="opacity-90" d="M0,150 Q100,160 200,120 T400,100 T600,80 T800,110 T1000,90" fill="none" stroke="#7c86ff" strokeWidth="4"></path>
                <path className="opacity-10" d="M0,150 Q100,160 200,120 T400,100 T600,80 T800,110 T1000,90 L1000,200 L0,200 Z" fill="#7c86ff"></path>
              </svg>
            </div>
            <div className="flex justify-between mt-4 text-[10px] font-semibold text-on-surface-variant uppercase tracking-[0.16em] px-1">
              <span>Oct</span>
              <span>Nov</span>
              <span>Dec</span>
              <span>Jan</span>
              <span>Feb</span>
            </div>
          </section>
        </div>

        <div className="lg:col-span-4 space-y-5 lg:space-y-6">
          <aside className="panel p-6 lg:p-7 reveal interactive-lift">
            <h3 className="text-lg lg:text-xl font-semibold mb-6 flex items-center gap-3">
              <ShieldCheck className="text-secondary" size={22} />
              Clinical Evidence
            </h3>
            <ul className="space-y-5">
              {[
                { icon: BookOpen, title: 'ADA Standard 2024', desc: 'Aligned with ADA protocols for glycemic variability assessment.' },
                { icon: Microscope, title: 'Metabolic Pathway Analysis', desc: 'Model accounts for 42 distinct metabolic markers from recent labs.' }
              ].map((item, i) => (
                <li key={i} className="flex gap-3.5">
                  <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-secondary/14 border border-secondary/30 flex items-center justify-center">
                    <item.icon className="text-secondary" size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm lg:text-base font-semibold mb-1 text-on-surface">{item.title}</h4>
                    <p className="text-xs lg:text-sm text-on-surface-variant leading-relaxed">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
             <button className="btn-secondary w-full mt-6 interactive-lift">Open Clinical Evidence</button>
          </aside>

          <aside className="rounded-3xl border border-primary/35 bg-primary/12 p-6 lg:p-7 reveal reveal-delay-1 interactive-lift">
            <h3 className="text-xl font-semibold mb-4 text-on-surface">Recommended Next Step</h3>
            <p className="text-sm lg:text-base text-on-surface-variant leading-relaxed mb-6">
              Based on glycemic load impact (64%), begin a fiber-first nutrition strategy to reduce insulin spikes.
            </p>
            <div className="space-y-3">
              <button className="btn-primary w-full interactive-lift">Personalize Care Plan</button>
              <button className="btn-secondary w-full interactive-lift">Request Specialist Consult</button>
            </div>
          </aside>

          <div className="panel-soft p-5 reveal reveal-delay-2 interactive-lift">
            <h4 className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-[0.16em] mb-4">Assessment Status</h4>
            <div className="flex flex-wrap gap-2.5">
              <span className="chip border-tertiary/35 bg-tertiary/18 text-tertiary">Rising Trend</span>
              <span className="chip border-primary/35 bg-primary/14 text-primary">Clinically Validated</span>
              <span className="chip">v4.2 Engine</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
