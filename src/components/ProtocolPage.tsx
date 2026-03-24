import { motion } from 'motion/react';
import { Utensils, Activity, Moon, FlaskConical, Stethoscope, Heart, Download, Share2, CheckCircle2 } from 'lucide-react';

export function ProtocolPage() {
  return (
    <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-12">
      {/* Header Section */}
      <header className="mb-20 md:pl-16 max-w-4xl">
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary-container text-on-primary text-[10px] font-bold mb-6 tracking-widest uppercase">Clinical Protocol v4.2</span>
        <h1 className="text-6xl font-extrabold font-manrope text-on-surface mb-8 tracking-tight leading-tight">
          Recommended Actions: <br />
          <span className="text-primary">Diabetes Prevention Protocol</span>
        </h1>
        <p className="text-xl text-on-surface-variant font-inter leading-relaxed max-w-2xl">
          This clinical action plan is generated using high-fidelity longitudinal data analysis. Following these precision interventions significantly mitigates Metabolic Syndrome escalation.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Protocols */}
        <section className="lg:col-span-8 flex flex-col gap-10">
          {/* Dietary Protocol */}
          <div className="bg-surface-container-lowest rounded-3xl p-12 ambient-shadow">
            <div className="flex items-center gap-6 mb-10">
              <div className="w-16 h-16 rounded-2xl bg-primary-container flex items-center justify-center text-on-primary">
                <Utensils size={32} />
              </div>
              <div>
                <h2 className="text-3xl font-bold font-manrope text-on-surface">Dietary Protocol</h2>
                <p className="text-base text-on-surface-variant">Precision Glycemic Management</p>
              </div>
            </div>

            <div className="space-y-10">
              <div className="p-8 bg-surface-container-low rounded-2xl">
                <h3 className="text-primary font-bold text-xl mb-3">Reduce Glycemic Load by 20%</h3>
                <p className="text-on-surface-variant text-base mb-8 leading-relaxed">Limit carbohydrate intake to low-GI sources (GI &lt; 55) to prevent insulin spikes and promote pancreatic rest.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    'Whole grains: Steel-cut oats, quinoa, barley.',
                    'Legumes: Lentils, chickpeas, black beans.'
                  ].map(item => (
                    <div key={item} className="bg-surface-container-lowest p-5 rounded-xl flex items-start gap-4 ambient-shadow">
                      <CheckCircle2 className="text-primary shrink-0 mt-1" size={18} />
                      <span className="text-sm text-on-surface leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="border-l-4 border-secondary p-8 bg-secondary/5 rounded-r-2xl">
                  <h4 className="font-bold text-secondary text-lg mb-2">Time-Restricted Feeding</h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed">Adopt a 10:14 window (10h eating, 14h fasting) to enhance cellular autophagy and insulin sensitivity.</p>
                </div>
                <div className="border-l-4 border-tertiary p-8 bg-tertiary/5 rounded-r-2xl">
                  <h4 className="font-bold text-tertiary text-lg mb-2">Fiber Density Optimization</h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed">Target &gt;35g fiber daily. Prioritize cruciferous vegetables to delay gastric emptying.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Lifestyle Adjustments */}
          <div className="bg-surface-container-lowest rounded-3xl p-12 ambient-shadow">
            <div className="flex items-center gap-6 mb-10">
              <div className="w-16 h-16 rounded-2xl bg-secondary-container flex items-center justify-center text-on-primary">
                <Activity size={32} />
              </div>
              <div>
                <h2 className="text-3xl font-bold font-manrope text-on-surface">Lifestyle Adjustments</h2>
                <p className="text-base text-on-surface-variant">Metabolic Training & Recovery</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                { val: '150m', label: 'Zone 2 Cardio', desc: 'Weekly aerobic base training to increase mitochondrial efficiency.' },
                { val: '2x', label: 'Resistance Load', desc: 'Bi-weekly strength sessions to enhance non-insulin mediated glucose uptake.' },
                { val: '7.5h', label: 'Sleep Latency', desc: 'Maintain consistent circadian rhythm to regulate cortisol levels.' }
              ].map(item => (
                <div key={item.label} className="bg-surface-container-low p-8 rounded-2xl text-center">
                  <div className="text-4xl font-extrabold text-secondary font-manrope mb-3">{item.val}</div>
                  <div className="text-xs font-bold text-on-surface uppercase tracking-widest mb-3">{item.label}</div>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Right Column: Next Steps & Analytics */}
        <aside className="lg:col-span-4 flex flex-col gap-10">
          {/* Clinical Next Steps */}
          <div className="bg-primary text-on-primary rounded-3xl p-10 ambient-shadow">
            <h3 className="text-2xl font-bold font-manrope mb-8">Clinical Next Steps</h3>
            <ul className="space-y-8">
              {[
                { icon: FlaskConical, title: 'HbA1c Follow-up', sub: 'Scheduled for Oct 14th' },
                { icon: Stethoscope, title: 'Endocrinology Review', sub: 'Telehealth Consultation' },
                { icon: Heart, title: 'Continuous Glucose Monitor', sub: 'Sync 14-day history' }
              ].map((step, i) => (
                <li key={i} className="flex gap-5">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <step.icon size={20} />
                  </div>
                  <div>
                    <p className="text-base font-bold">{step.title}</p>
                    <p className="text-sm opacity-70">{step.sub}</p>
                  </div>
                </li>
              ))}
            </ul>
            <button className="w-full mt-10 py-4 bg-white text-primary rounded-full font-bold text-base hover:bg-on-primary-container transition-all">
              Book Consultation
            </button>
          </div>

          {/* Protocol Adherence */}
          <div className="bg-surface-container-lowest rounded-3xl p-10 ambient-shadow">
            <div className="flex justify-between items-center mb-8">
              <h4 className="font-bold font-manrope text-on-surface text-xl">Protocol Adherence</h4>
              <span className="text-secondary text-lg font-bold">84%</span>
            </div>
            <div className="h-28 w-full mb-8 overflow-hidden bg-surface-container-low rounded-2xl relative">
              <svg className="w-full h-full absolute bottom-0" viewBox="0 0 100 30" preserveAspectRatio="none">
                <path d="M0 25 Q 10 20, 20 22 T 40 15 T 60 10 T 80 18 T 100 5" fill="none" stroke="#4b41e1" strokeWidth="2"></path>
                <path d="M0 25 Q 10 20, 20 22 T 40 15 T 60 10 T 80 18 T 100 5 V 30 H 0 Z" fill="#4b41e1" fillOpacity="0.1"></path>
              </svg>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Activity className="text-secondary" size={20} />
                  <span className="text-sm font-semibold text-on-surface-variant">12 Day Streak</span>
                </div>
                <span className="text-[10px] bg-secondary-fixed text-on-surface px-3 py-1 rounded-full font-bold">ACTIVE</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <CheckCircle2 className="text-secondary" size={20} />
                  <span className="text-sm font-semibold text-on-surface-variant">Metabolic Master</span>
                </div>
                <span className="text-[10px] text-on-surface-variant font-bold">Lvl 3</span>
              </div>
            </div>
          </div>

          {/* AI Clinical Insight */}
          <div className="glass-panel p-8 rounded-3xl border border-white/50 ambient-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5">
              <Activity size={80} />
            </div>
            <h4 className="text-base font-bold text-on-surface mb-3">AI Clinical Insight</h4>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Data suggests a 14% improvement in glycemic stability when Dietary Protocol is combined with Zone 2 training before 10:00 AM.
            </p>
          </div>
        </aside>
      </div>

      {/* Export Section */}
      <section className="mt-24 bg-surface-container-high rounded-[3rem] p-16 text-center max-w-4xl mx-auto">
        <h2 className="text-4xl font-extrabold font-manrope mb-6">Export Full Clinical Report</h2>
        <p className="text-on-surface-variant text-lg mb-12 max-w-lg mx-auto leading-relaxed">Generate a high-resolution PDF with full data visualization and risk projections for your primary care physician.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <button className="bg-primary text-on-primary px-12 py-4 rounded-full font-bold flex items-center justify-center gap-3 hover:opacity-90 transition-all text-lg">
            <Download size={20} />
            Export PDF
          </button>
          <button className="bg-surface-container-lowest text-on-surface px-12 py-4 rounded-full font-bold flex items-center justify-center gap-3 hover:bg-surface-container-high transition-all text-lg ambient-shadow">
            <Share2 size={20} />
            Share Securely
          </button>
        </div>
      </section>
    </div>
  );
}
