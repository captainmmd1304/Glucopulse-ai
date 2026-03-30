import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ShieldCheck, ArrowRight, Activity, Database, RefreshCw, ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroVisual: React.FC = () => {
  const reduceMotion = useReducedMotion();

  return (
    <div className="lg:col-span-6 relative mt-12 lg:mt-0">
      <div className="grid grid-cols-2 gap-4 lg:gap-5 relative z-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: 20 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
          transition={reduceMotion ? { duration: 0 } : { delay: 0.2 }}
          className="panel p-6 lg:p-7 h-full interactive-lift"
        >
          <Activity className="text-secondary mb-4 w-6 h-6 lg:w-8 lg:h-8" />
          <div className="text-[10px] font-semibold text-secondary uppercase tracking-[0.16em] mb-2">Step 01</div>
          <h3 className="font-manrope font-bold text-lg lg:text-xl mb-4 text-on-surface">Data Ingestion</h3>
          <div className="flex flex-col justify-end gap-3 h-16 pb-1">
            <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
              <div className="h-full bg-secondary w-3/4"></div>
            </div>
            <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
              <div className="h-full bg-secondary w-1/2"></div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: 20 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
          transition={reduceMotion ? { duration: 0 } : { delay: 0.4 }}
          className="glass-panel p-6 lg:p-7 rounded-3xl interactive-lift"
        >
          <RefreshCw className="text-primary mb-4 w-6 h-6 lg:w-8 lg:h-8" />
          <div className="text-[10px] font-semibold text-primary uppercase tracking-[0.16em] mb-2">Step 02</div>
          <h3 className="font-manrope font-bold text-lg lg:text-xl mb-4 text-on-surface">AI Neural Risk</h3>
          <div className="flex items-end gap-1.5 h-16">
            {[4, 8, 12, 6, 10].map((h, i) => (
              <div
                key={i}
                className={`w-2.5 bg-primary/${(i + 1) * 20} rounded-t-sm`}
                style={{ height: `${h * 4}px` }}
              ></div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={reduceMotion ? { duration: 0 } : { delay: 0.6 }}
          className="panel p-6 lg:p-7 col-span-2 interactive-lift"
        >
          <div className="flex flex-col sm:flex-row justify-between sm:items-start mb-6 gap-3 sm:gap-0">
            <div>
              <div className="text-[10px] font-semibold text-tertiary uppercase tracking-[0.16em] mb-2">Step 03</div>
              <h3 className="font-manrope font-bold text-lg lg:text-xl">Risk Breakdown</h3>
            </div>
            <div className="bg-tertiary-container/80 border border-tertiary/35 px-4 py-1.5 rounded-full text-[10px] font-bold text-on-surface w-fit">
              MODERATE RISK
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 lg:gap-6">
            {[
              { label: 'Glycemic Index', val: '84.2' },
              { label: 'Systolic BP', val: '132' },
              { label: 'BMI Ref', val: '24.1' }
            ].map((item) => (
              <div key={item.label} className="panel-soft p-3 lg:p-4 interactive-lift">
                <div className="text-[10px] lg:text-xs text-on-surface-variant font-medium mb-1 truncate uppercase tracking-[0.12em]">{item.label}</div>
                <div className="text-xl lg:text-2xl font-extrabold text-on-surface">{item.val}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute -z-10 inset-0 bg-[radial-gradient(circle_at_42%_44%,rgba(124,134,255,0.18),transparent_52%)]"></div>
    </div>
  );
};

const HeroSection: React.FC = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative pt-14 lg:pt-20 pb-20 lg:pb-24 overflow-hidden px-5 lg:px-10">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.6 }}
          className="lg:col-span-6 z-10 reveal"
        >
          <div className="chip mb-6 lg:mb-7 border-primary/30 bg-primary/8 text-primary">
            <ShieldCheck size={14} className="mr-2" />
            FDA-aligned clinical framework
          </div>
          <h1 className="font-manrope font-semibold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-on-surface leading-[1.04] tracking-[-0.025em] mb-6 lg:mb-7">
            Predict earlier.
            <br className="hidden sm:block" />
            Intervene smarter.
            <br className="hidden sm:block" />
            <span className="text-primary">Improve outcomes.</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-on-surface-variant max-w-xl mb-10 lg:mb-11 leading-relaxed">
            Predict diabetes and hypertension risk earlier, with tailored guidance grounded in your clinical and lifestyle profile.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/dashboard" className="btn-primary text-center text-base lg:text-lg interactive-lift">
              Start Assessment
            </Link>
            <button className="btn-secondary flex-1 sm:flex-none text-base lg:text-lg interactive-lift">
              Review Validation
            </button>
          </div>
        </motion.div>

        <HeroVisual />
      </div>
    </section>
  );
};

const StatsSection: React.FC = () => {
  const stats = [
    { label: 'Model Accuracy', val: '99.4%' },
    { label: 'Clinical Data Points', val: '12M+' },
    { label: 'Inference Latency', val: '0.02s' },
    { label: 'Compliant Security', val: 'HIPAA' }
  ];

  return (
    <section className="py-14 lg:py-20 px-5 lg:px-10">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-5">
        {stats.map((stat) => (
          <div key={stat.label} className="panel-soft px-4 py-5 md:px-5 md:py-6 text-center md:text-left reveal reveal-delay-1 interactive-lift">
            <div className="text-3xl lg:text-4xl font-extrabold font-manrope text-primary tracking-tighter">
              {stat.val}
            </div>
            <p className="mt-2 text-[10px] lg:text-xs font-bold text-on-surface-variant uppercase tracking-[0.16em]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

const ClinicalIntelligenceSection: React.FC = () => {
  return (
    <section className="py-18 lg:py-24 px-5 lg:px-10">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 lg:mb-14 gap-6 lg:gap-8">
          <div className="max-w-2xl">
            <h2 className="font-manrope font-semibold text-3xl lg:text-5xl text-on-surface mb-4 lg:mb-6 leading-tight tracking-tight">
              Designed for Clinical Precision
            </h2>
            <p className="text-on-surface-variant text-base lg:text-lg leading-relaxed">
              We bridge the gap between complex health data and actionable clinical insights through advanced generative neural networks.
            </p>
          </div>
          <Link to="/insights" className="chip border-secondary/40 text-secondary hover:text-on-surface transition-colors group">
            Explore Clinical Method
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6">
          <div className="md:col-span-8 panel p-7 lg:p-10 flex flex-col justify-between overflow-hidden relative reveal interactive-lift">
            <div className="relative z-10">
              <Activity className="text-primary mb-6 lg:mb-8 w-10 h-10 lg:w-12 lg:h-12" />
              <h3 className="font-manrope font-semibold text-2xl lg:text-3xl text-on-surface mb-3 lg:mb-4">Continuous Risk Mapping</h3>
              <p className="text-on-surface-variant text-base lg:text-lg max-w-md leading-relaxed">
                Real-time analysis of vital signs and lifestyle triggers to visualize potential risk spikes before they occur.
              </p>
            </div>
            <div className="mt-10 lg:mt-12 h-48 lg:h-56 panel-soft p-6 lg:p-8 relative overflow-hidden">
              <div className="absolute inset-0 flex items-end px-8 lg:px-12 pb-8 lg:pb-12">
                <svg className="w-full h-full opacity-40" preserveAspectRatio="none" viewBox="0 0 400 100">
                  <path d="M0,80 Q50,90 100,50 T200,60 T300,20 T400,40" fill="none" stroke="#7c86ff" strokeWidth="3"></path>
                </svg>
              </div>
              <div className="absolute top-4 left-4 lg:top-6 lg:left-8 flex items-center gap-2 lg:gap-3 bg-surface-container-lowest/80 backdrop-blur-sm px-3 lg:px-4 py-1.5 lg:py-2 rounded-full">
                <div className="w-2 lg:w-2.5 h-2 lg:h-2.5 rounded-full bg-secondary"></div>
                <span className="text-[10px] lg:text-xs font-bold text-on-surface-variant uppercase tracking-[0.14em]">Live Glucose Stream</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 rounded-3xl border border-secondary/35 bg-secondary/14 p-7 lg:p-9 flex flex-col justify-between text-on-surface reveal reveal-delay-1 interactive-lift">
            <div>
              <ShieldCheck className="mb-6 lg:mb-8 w-10 h-10 lg:w-12 lg:h-12 text-secondary" />
              <h3 className="font-manrope font-semibold text-2xl lg:text-3xl mb-4 lg:mb-6">Preventative Actions</h3>
              <p className="text-on-surface-variant text-base lg:text-lg leading-relaxed">
                Localized intervention plans that integrate directly with existing medical management systems.
              </p>
            </div>
            <ul className="mt-10 lg:mt-12 space-y-4 lg:space-y-6">
              {['Personalized Nutrition Logic', 'Blood Pressure Benchmarking', 'Circadian Stress Analysis'].map(item => (
                <li key={item} className="flex items-center gap-3 lg:gap-4 text-sm lg:text-base font-medium">
                  <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-secondary/30 flex items-center justify-center shrink-0">
                    <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-secondary"></div>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4 panel p-7 lg:p-9 flex flex-col justify-center reveal reveal-delay-2 interactive-lift">
            <ClipboardList className="text-tertiary mb-6 lg:mb-8 w-10 h-10 lg:w-12 lg:h-12" />
            <h3 className="font-manrope font-semibold text-2xl lg:text-3xl text-on-surface mb-4 lg:mb-6">Genetic Context</h3>
            <p className="text-on-surface-variant text-base lg:text-lg leading-relaxed">
              Integrating familial clinical history to refine susceptibility models for type 2 diabetes.
            </p>
          </div>

          <div className="md:col-span-8 rounded-3xl border border-primary/35 bg-primary/12 p-7 lg:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 lg:gap-12 reveal reveal-delay-3 interactive-lift">
            <div className="flex-1">
              <h3 className="font-manrope font-semibold text-2xl lg:text-3xl text-on-surface mb-4 lg:mb-5">Institutional Integration</h3>
              <p className="text-on-surface-variant text-base lg:text-lg leading-relaxed max-w-lg">
                Seamlessly sync with Epic, Cerner, and Apple Health records for a holistic clinical view.
              </p>
            </div>
            <div className="flex gap-4 lg:gap-6 shrink-0 w-full md:w-auto justify-start md:justify-end">
              {[Database, RefreshCw, ClipboardList].map((Icon, i) => (
                <div key={i} className="w-14 h-14 lg:w-20 lg:h-20 rounded-2xl border border-primary/35 bg-primary/16 flex items-center justify-center interactive-lift">
                  <Icon className="text-primary w-6 h-6 lg:w-8 lg:h-8" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CtaSection: React.FC = () => {
  return (
    <section className="py-14 lg:py-24 px-5 lg:px-10">
      <div className="max-w-4xl mx-auto">
        <div className="panel rounded-[2rem] lg:rounded-[2.5rem] p-8 lg:p-14 text-center relative overflow-hidden reveal interactive-lift">
          <div className="relative z-10">
            <h2 className="font-manrope font-semibold text-3xl sm:text-4xl lg:text-5xl text-on-surface mb-5 lg:mb-6 tracking-tight">
              Ready to Operationalize Preventive Care?
            </h2>
            <p className="text-on-surface-variant text-base lg:text-lg mb-8 lg:mb-10 max-w-xl mx-auto leading-relaxed">
              Join clinicians and health-conscious individuals using GlucoPulse to stay ahead of metabolic risk progression.
            </p>
            <Link to="/dashboard" className="btn-primary inline-block text-lg interactive-lift">
              Start My Assessment
            </Link>
          </div>

          <div className="absolute top-0 right-0 w-64 h-64 lg:w-80 lg:h-80 bg-primary/10 rounded-full -mr-24 -mt-24 lg:-mr-32 lg:-mt-32 blur-[60px] lg:blur-[80px]"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 lg:w-80 lg:h-80 bg-secondary/10 rounded-full -ml-24 -mb-24 lg:-ml-32 lg:-mb-32 blur-[60px] lg:blur-[80px]"></div>
        </div>
      </div>
    </section>
  );
};

export function LandingPage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <StatsSection />
      <ClinicalIntelligenceSection />
      <CtaSection />
    </div>
  );
}
