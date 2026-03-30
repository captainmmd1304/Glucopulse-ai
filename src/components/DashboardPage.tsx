import { motion, useReducedMotion } from 'motion/react';
import { Brain, Clipboard, Heart, Utensils, Calendar, ChevronRight, ShieldCheck, ArrowUpRight } from 'lucide-react';

const factorData = [
  { label: 'Glycemic Load', sub: 'Dominant metabolic driver', impact: 42 },
  { label: 'Family History', sub: 'Inherited susceptibility profile', impact: 28 },
  { label: 'Lifestyle Habits', sub: 'Sleep and activity alignment', impact: 15 }
];

const directives = [
  { icon: Utensils, title: 'Fiber Titration', desc: 'Increase soluble fiber intake to 35g/day to reduce post-prandial glucose spikes.' },
  { icon: Heart, title: 'Interval Monitoring', desc: 'Run continuous glucose monitoring over a 7-day calibration window.' },
  { icon: Calendar, title: 'Clinical Consultation', desc: 'Review your metabolic baseline with an endocrinologist within 30 days.' }
];

export function DashboardPage() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="max-w-screen-2xl mx-auto px-5 lg:px-10 py-10 lg:py-12">
      <header className="mb-8 lg:mb-10 panel p-6 lg:p-7 reveal interactive-lift">
        <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-6">
          <div className="max-w-3xl">
            <div className="chip border-primary/35 text-primary mb-4">Risk Intelligence Console</div>
            <h1 className="font-manrope font-bold text-3xl md:text-4xl lg:text-[2.7rem] leading-[1.08] text-on-surface mb-3">
              Metabolic Risk Overview
            </h1>
            <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
              Synthesized from biometrics, family history, and longitudinal glycemic behavior using the GlucoPulse clinical AI engine.
            </p>
          </div>
          <div className="panel-soft px-4 py-3 w-fit">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant">
                model active | confidence 94%
              </span>
            </div>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 xl:grid-cols-12 gap-5 lg:gap-6 mb-8 lg:mb-10">
        <motion.article whileHover={reduceMotion ? undefined : { y: -2 }} className="xl:col-span-8 panel p-6 lg:p-7 reveal interactive-lift">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.16em] text-on-surface-variant font-semibold">Primary Risk Signal</p>
              <h2 className="font-manrope text-2xl lg:text-3xl font-semibold mt-1">Diabetes Progression Risk</h2>
            </div>
            <div className="chip border-amber-400/40 bg-amber-400/12 text-amber-300">Moderate</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 mb-6">
            <div className="panel-soft p-4 md:col-span-2">
              <div className="flex items-end gap-2">
                <span className="font-manrope text-5xl sm:text-6xl font-bold leading-none text-amber-300">42</span>
                <span className="text-on-surface-variant text-xl pb-1">/ 100</span>
              </div>
              <p className="text-sm text-on-surface-variant mt-3 leading-relaxed">
                Elevated post-prandial glycemic variability observed across the most recent 14 monitoring cycles.
              </p>
            </div>

            <div className="panel-soft p-4 flex flex-col justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.14em] text-on-surface-variant font-semibold">Trajectory</p>
                <p className="font-manrope text-lg font-semibold mt-1">+6% upward drift</p>
              </div>
              <div className="inline-flex items-center gap-1 text-xs text-secondary font-semibold mt-4">
                Last 30 days
                <ArrowUpRight size={14} />
              </div>
            </div>
          </div>

          <div className="h-24 panel-soft p-4 mb-6 overflow-hidden">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 100">
              <path d="M0,72 Q40,80 80,58 T160,63 T240,38 T320,42 T400,30" fill="none" stroke="#fbbf24" strokeWidth="2.8"></path>
            </svg>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="btn-primary interactive-lift">Review Clinical Data</button>
            <button className="btn-secondary interactive-lift">Export Report</button>
          </div>
        </motion.article>

        <motion.aside whileHover={reduceMotion ? undefined : { y: -2 }} className="xl:col-span-4 rounded-3xl border border-primary/35 bg-primary/10 p-6 lg:p-7 reveal reveal-delay-1 interactive-lift">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-manrope text-xl font-semibold">Blood Pressure Signal</h3>
            <div className="chip border-primary/35 bg-primary/12 text-primary">Low</div>
          </div>

          <div className="flex items-end gap-2 mb-4">
            <span className="font-manrope text-5xl sm:text-6xl font-bold text-primary leading-none">18</span>
            <span className="text-on-surface-variant text-xl pb-1">/ 100</span>
          </div>

          <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
            Systolic and diastolic readings remain within stable range during nocturnal recovery.
          </p>

            <button className="btn-secondary inline-flex items-center gap-2 interactive-lift">
              Open Trend View
              <ChevronRight size={16} />
            </button>
        </motion.aside>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
        <article className="lg:col-span-8 panel p-6 lg:p-7 reveal interactive-lift">
          <div className="flex items-center gap-3 mb-6">
            <Brain className="text-secondary" size={24} />
            <h3 className="font-manrope text-xl lg:text-2xl font-semibold">Explainable Risk Drivers</h3>
          </div>

          <div className="space-y-6">
            {factorData.map((item) => (
              <div key={item.label} className="panel-soft p-4 interactive-lift">
                <div className="flex justify-between items-end mb-2.5 gap-4">
                  <div>
                    <h4 className="font-manrope text-base lg:text-lg font-semibold text-on-surface">{item.label}</h4>
                    <p className="text-xs lg:text-sm text-on-surface-variant">{item.sub}</p>
                  </div>
                  <span className="font-manrope text-base lg:text-lg font-semibold text-secondary">{item.impact}%</span>
                </div>
                <div className="h-2.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                  <motion.div
                    initial={reduceMotion ? false : { width: 0 }}
                    animate={{ width: `${item.impact}%` }}
                    transition={reduceMotion ? { duration: 0 } : { duration: 0.9, ease: 'easeOut' }}
                    className="h-full bg-secondary rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-surface-container-high/80 text-xs lg:text-sm text-on-surface-variant leading-relaxed">
              Remaining 15% is attributed to stochastic physiological variation and secondary environmental factors.
          </div>
        </article>

        <aside className="lg:col-span-4 flex flex-col gap-5 lg:gap-6">
          <article className="panel p-6 lg:p-7 reveal reveal-delay-1 interactive-lift">
            <h3 className="font-manrope font-semibold text-lg lg:text-xl mb-5 flex items-center gap-2.5">
              <Clipboard className="text-primary" size={20} />
              Clinical Recommendations
            </h3>

            <div className="space-y-3">
              {directives.map((action) => (
                <div key={action.title} className="panel-soft p-3.5 interactive-lift">
                  <div className="flex items-start gap-3">
                    <action.icon className="text-primary mt-0.5" size={17} />
                    <div>
                      <h5 className="font-manrope font-semibold text-sm">{action.title}</h5>
                      <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">{action.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="btn-secondary w-full mt-5 interactive-lift">Schedule Specialist Review</button>
          </article>

          <article className="rounded-3xl border border-secondary/35 bg-secondary/14 p-6 lg:p-7 reveal reveal-delay-2 interactive-lift">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-manrope font-semibold text-lg">Model Integrity</h4>
              <ShieldCheck className="text-secondary" size={18} />
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-5">
              Latest recalibration completed. No model drift detected across current cohort.
            </p>
            <div className="chip border-secondary/35 bg-secondary/15 text-secondary">Validated Engine v4.2</div>
          </article>
        </aside>
      </section>
    </div>
  );
}
