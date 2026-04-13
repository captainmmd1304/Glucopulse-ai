import { Utensils, Activity, FlaskConical, Stethoscope, Heart, Download, Share2, CheckCircle2 } from 'lucide-react';

export function ProtocolPage() {
  return (
    <div className="max-w-screen-2xl mx-auto px-5 lg:px-10 py-10 lg:py-12">
      <header className="mb-10 lg:mb-12 max-w-4xl">
        <span className="chip border-primary/35 bg-primary/12 text-primary mb-5">Clinical Protocol v4.2</span>
        <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-semibold font-manrope text-on-surface mb-5 tracking-tight leading-[1.08]">
          Recommended Plan:
          <br />
          <span className="text-primary">Diabetes Prevention Pathway</span>
        </h1>
        <p className="text-base lg:text-lg text-on-surface-variant font-inter leading-relaxed max-w-3xl">
          Clinical action plan generated using longitudinal biomarker analysis. Adhering to these precision interventions lowers progression risk.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
        <section className="lg:col-span-8 flex flex-col gap-5 lg:gap-6">
          <div className="panel p-7 lg:p-9 reveal interactive-lift">
            <div className="flex items-center gap-4 mb-7">
              <div className="w-12 h-12 rounded-xl border border-primary/35 bg-primary/14 flex items-center justify-center text-primary">
                <Utensils size={24} />
              </div>
              <div>
                <h2 className="text-2xl lg:text-3xl font-semibold font-manrope text-on-surface">Nutrition Protocol</h2>
                <p className="text-sm lg:text-base text-on-surface-variant">Precision glycemic management</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="panel-soft p-6">
                <h3 className="text-primary font-semibold text-lg mb-2">Reduce Glycemic Load by 20%</h3>
                <p className="text-on-surface-variant text-sm lg:text-base mb-6 leading-relaxed">
                  Limit carbohydrate intake to low-GI sources (GI &lt; 55) to prevent insulin spikes and promote pancreatic rest.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    'Whole grains: Steel-cut oats, quinoa, barley.',
                    'Legumes: Lentils, chickpeas, black beans.'
                  ].map(item => (
                    <div key={item} className="panel p-4 rounded-2xl flex items-start gap-3 interactive-lift">
                      <CheckCircle2 className="text-primary shrink-0 mt-0.5" size={16} />
                      <span className="text-sm text-on-surface leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-secondary/35 bg-secondary/12 p-5 interactive-lift">
                  <h4 className="font-semibold text-secondary text-base mb-2">Time-Restricted Feeding</h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Adopt a 10:14 window (10h eating, 14h fasting) to enhance cellular autophagy and insulin sensitivity.
                  </p>
                </div>
                <div className="rounded-2xl border border-tertiary/35 bg-tertiary/12 p-5 interactive-lift">
                  <h4 className="font-semibold text-tertiary text-base mb-2">Fiber Density Optimization</h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Target &gt;35g fiber daily. Prioritize cruciferous vegetables to delay gastric emptying.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="panel p-7 lg:p-9 reveal reveal-delay-1 interactive-lift">
            <div className="flex items-center gap-4 mb-7">
              <div className="w-12 h-12 rounded-xl border border-secondary/35 bg-secondary/14 flex items-center justify-center text-secondary">
                <Activity size={24} />
              </div>
              <div>
                <h2 className="text-2xl lg:text-3xl font-semibold font-manrope text-on-surface">Lifestyle Protocol</h2>
                <p className="text-sm lg:text-base text-on-surface-variant">Metabolic training and recovery</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { val: '150m', label: 'Zone 2 Cardio', desc: 'Weekly aerobic base training to increase mitochondrial efficiency.' },
                { val: '2x', label: 'Resistance Load', desc: 'Bi-weekly strength sessions to enhance non-insulin mediated glucose uptake.' },
                { val: '7.5h', label: 'Sleep Latency', desc: 'Maintain consistent circadian rhythm to regulate cortisol levels.' }
              ].map(item => (
                <div key={item.label} className="panel-soft p-5 text-center interactive-lift">
                  <div className="text-3xl font-extrabold text-secondary font-manrope mb-2">{item.val}</div>
                  <div className="text-[10px] font-semibold text-on-surface uppercase tracking-[0.15em] mb-2">{item.label}</div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="lg:col-span-4 flex flex-col gap-5 lg:gap-6">
          <div className="rounded-3xl border border-primary/35 bg-primary/12 p-6 lg:p-7 reveal interactive-lift">
            <h3 className="text-xl lg:text-2xl font-semibold font-manrope mb-6">Clinical Next Steps</h3>
            <ul className="space-y-5">
              {[
                { icon: FlaskConical, title: 'HbA1c Follow-up', sub: 'Scheduled for Oct 14th' },
                { icon: Stethoscope, title: 'Endocrinology Review', sub: 'Telehealth Consultation' },
                { icon: Heart, title: 'Continuous Glucose Monitor', sub: 'Sync 14-day history' }
              ].map((step, i) => (
                <li key={i} className="flex gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-primary/18 border border-primary/35 flex items-center justify-center shrink-0 text-primary">
                    <step.icon size={18} />
                  </div>
                  <div>
                    <p className="text-sm lg:text-base font-semibold text-on-surface">{step.title}</p>
                    <p className="text-xs lg:text-sm text-on-surface-variant">{step.sub}</p>
                  </div>
                </li>
              ))}
            </ul>
            <button className="btn-primary w-full mt-6 interactive-lift">Book Specialist Review</button>
          </div>

          <div className="panel p-6 lg:p-7 reveal reveal-delay-1 interactive-lift">
            <div className="flex justify-between items-center mb-5">
              <h4 className="font-semibold font-manrope text-on-surface text-lg">Protocol Adherence</h4>
              <span className="text-secondary text-lg font-semibold">84%</span>
            </div>
            <div className="h-24 w-full mb-6 overflow-hidden panel-soft p-2 relative">
              <svg className="w-full h-full absolute bottom-0 left-0" viewBox="0 0 100 30" preserveAspectRatio="none">
                <path d="M0 25 Q 10 20, 20 22 T 40 15 T 60 10 T 80 18 T 100 5" fill="none" stroke="#7c86ff" strokeWidth="2"></path>
                <path d="M0 25 Q 10 20, 20 22 T 40 15 T 60 10 T 80 18 T 100 5 V 30 H 0 Z" fill="#7c86ff" fillOpacity="0.12"></path>
              </svg>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Activity className="text-secondary" size={18} />
                  <span className="text-sm font-medium text-on-surface-variant">12 Day Streak</span>
                </div>
                <span className="chip border-secondary/35 bg-secondary/14 text-secondary">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-secondary" size={18} />
                  <span className="text-sm font-medium text-on-surface-variant">Metabolic Master</span>
                </div>
                <span className="text-xs text-on-surface-variant font-semibold">Lvl 3</span>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border reveal reveal-delay-2 interactive-lift">
            <h4 className="text-base font-semibold text-on-surface mb-2">AI Clinical Signal</h4>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Combined dietary protocol and morning Zone 2 training indicates a projected 14% improvement in glycemic stability.
            </p>
          </div>
        </aside>
      </div>

      <section className="mt-12 lg:mt-14 panel p-8 lg:p-10 text-center max-w-4xl mx-auto reveal interactive-lift">
        <h2 className="text-3xl lg:text-4xl font-semibold font-manrope mb-4">Export Clinical Report</h2>
        <p className="text-on-surface-variant text-base lg:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
          Generate a high-resolution PDF with complete data visualization and risk projections for your primary care physician.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="btn-primary inline-flex items-center justify-center gap-2.5 text-base interactive-lift">
            <Download size={18} />
            Generate PDF
          </button>
          <button className="btn-secondary inline-flex items-center justify-center gap-2.5 text-base interactive-lift">
            <Share2 size={18} />
            Share with Care Team
          </button>
        </div>
      </section>
    </div>
  );
}
