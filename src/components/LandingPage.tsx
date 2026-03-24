import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, ArrowRight, Activity, Database, RefreshCw, ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroVisual: React.FC = () => {
  return (
    <div className="lg:col-span-6 relative mt-12 lg:mt-0">
      <div className="grid grid-cols-2 gap-4 lg:gap-6 relative z-10">
        {/* Step 01 */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface-container-lowest p-6 lg:p-8 rounded-2xl ambient-shadow h-full"          >
          <Activity className="text-secondary mb-4 w-6 h-6 lg:w-8 lg:h-8" />
          <div className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-2">Step 01</div>
          <h3 className="font-manrope font-bold text-lg lg:text-xl mb-4">Data Ingestion</h3>
          <div className="flex flex-col justify-end gap-3 h-16 pb-1">
            <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
              <div className="h-full bg-secondary w-3/4"></div>
            </div>
            <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
              <div className="h-full bg-secondary w-1/2"></div>
            </div>
          </div>
        </motion.div>

        {/* Step 02 */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-panel p-6 lg:p-8 rounded-2xl ambient-shadow"
        >
          <RefreshCw className="text-primary mb-4 w-6 h-6 lg:w-8 lg:h-8" />
          <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">Step 02</div>
          <h3 className="font-manrope font-bold text-lg lg:text-xl mb-4">AI Neural Risk</h3>
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

        {/* Step 03 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-surface-container-lowest p-6 lg:p-8 rounded-2xl ambient-shadow col-span-2"
        >
          <div className="flex flex-col sm:flex-row justify-between sm:items-start mb-6 gap-3 sm:gap-0">
            <div>
              <div className="text-[10px] font-bold text-tertiary uppercase tracking-widest mb-2">Step 03</div>
              <h3 className="font-manrope font-bold text-lg lg:text-xl">Risk Breakdown</h3>
            </div>
            <div className="bg-tertiary-container px-4 py-1.5 rounded-full text-[10px] font-bold text-on-primary w-fit">
              MODERATE RISK
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 lg:gap-6">
            {[
              { label: 'Glycemic Index', val: '84.2' },
              { label: 'Systolic BP', val: '132' },
              { label: 'BMI Ref', val: '24.1' }
            ].map((item) => (
              <div key={item.label} className="bg-surface-container-low p-3 lg:p-4 rounded-xl">
                <div className="text-[10px] lg:text-xs text-on-surface-variant font-medium mb-1 truncate">{item.label}</div>
                <div className="text-xl lg:text-2xl font-extrabold">{item.val}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Decorative Background Element */}
      <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-secondary/5 rounded-full blur-[80px] lg:blur-[100px]"></div>
    </div>
  );
};

const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-16 lg:pt-20 pb-24 lg:pb-32 overflow-hidden px-6 lg:px-12">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-6 z-10"
        >
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-container text-on-primary-container text-xs font-bold mb-6 lg:mb-8 tracking-wider uppercase">
            <ShieldCheck size={14} className="mr-2" />
            FDA-Aligned Clinical Framework
          </div>
          <h1 className="font-manrope font-extrabold text-5xl sm:text-6xl lg:text-8xl text-on-surface leading-[1.05] tracking-tight mb-6 lg:mb-8">
            Predict. <br className="hidden sm:block" />
            Prevent. <br className="hidden sm:block" />
            <span className="text-primary">Perform.</span>
          </h1>
          <p className="text-lg lg:text-xl text-on-surface-variant max-w-xl mb-10 lg:mb-12 leading-relaxed">
            AI-based risk prediction for Diabetes & Hypertension. Get personalized recommendations based on your clinical and lifestyle profile.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/dashboard"
              className="ai-pulse-gradient text-on-primary px-8 lg:px-10 py-4 lg:py-5 rounded-full font-bold text-base lg:text-lg text-center hover:scale-[0.98] transition-transform shadow-xl shadow-primary/20"
            >
              Start Health Assessment
            </Link>
            <button className="bg-surface-container-highest flex-1 sm:flex-none text-on-surface px-8 lg:px-10 py-4 lg:py-5 rounded-full font-bold text-base lg:text-lg text-center hover:bg-surface-container-high transition-colors">
              View Clinical Validation
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
    <section className="bg-surface-container-low py-16 lg:py-24 px-6 lg:px-12">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
        {stats.map((stat) => (
          <div key={stat.label} className="space-y-2 text-center md:text-left shadow-sm md:shadow-none p-4 md:p-0 rounded-2xl bg-surface-container-lowest md:bg-transparent">
            <div className="text-4xl lg:text-5xl font-extrabold font-manrope text-primary tracking-tighter">
              {stat.val}
            </div>
            <p className="text-[10px] lg:text-xs font-bold text-on-surface-variant uppercase tracking-widest">
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
    <section className="py-24 lg:py-32 px-6 lg:px-12">
      <div className="max-w-screen-2xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 lg:mb-20 gap-6 lg:gap-8">
          <div className="max-w-2xl">
            <h2 className="font-manrope font-bold text-4xl lg:text-5xl text-on-surface mb-6 lg:mb-8 leading-tight">
              Designed for Clinical Precision
            </h2>
            <p className="text-on-surface-variant text-lg lg:text-xl leading-relaxed">
              We bridge the gap between complex health data and actionable clinical insights through advanced generative neural networks.
            </p>
          </div>
          <Link to="/insights" className="text-primary font-bold flex items-center gap-2 group text-base lg:text-lg">
            Explore Methodology
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          {/* Feature 1 */}
          <div className="md:col-span-8 bg-surface-container-lowest p-8 lg:p-12 rounded-2xl ambient-shadow flex flex-col justify-between overflow-hidden relative">
            <div className="relative z-10">
              <Activity className="text-primary mb-6 lg:mb-8 w-10 h-10 lg:w-12 lg:h-12" />
              <h3 className="font-manrope font-bold text-2xl lg:text-3xl text-on-surface mb-4 lg:mb-6">Continuous Risk Mapping</h3>
              <p className="text-on-surface-variant text-base lg:text-lg max-w-md">
                Real-time analysis of vital signs and lifestyle triggers to visualize potential risk spikes before they occur.
              </p>
            </div>
            <div className="mt-12 lg:mt-16 h-48 lg:h-56 bg-surface-container-low rounded-2xl p-6 lg:p-8 relative overflow-hidden">
              <div className="absolute inset-0 flex items-end px-8 lg:px-12 pb-8 lg:pb-12">
                <svg className="w-full h-full opacity-40" preserveAspectRatio="none" viewBox="0 0 400 100">
                  <path d="M0,80 Q50,90 100,50 T200,60 T300,20 T400,40" fill="none" stroke="#4b41e1" strokeWidth="3"></path>
                </svg>
              </div>
              <div className="absolute top-4 left-4 lg:top-6 lg:left-8 flex items-center gap-2 lg:gap-3 bg-surface-container-lowest/80 backdrop-blur-sm px-3 lg:px-4 py-1.5 lg:py-2 rounded-full">
                <div className="w-2 lg:w-2.5 h-2 lg:h-2.5 rounded-full bg-secondary"></div>
                <span className="text-[10px] lg:text-xs font-bold text-on-surface-variant uppercase tracking-widest">Real-time Glucose</span>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="md:col-span-4 bg-secondary p-8 lg:p-12 rounded-2xl flex flex-col justify-between text-on-primary">
            <div>
              <ShieldCheck className="mb-6 lg:mb-8 w-10 h-10 lg:w-12 lg:h-12" />
              <h3 className="font-manrope font-bold text-2xl lg:text-3xl mb-4 lg:mb-6">Preventative Actions</h3>
              <p className="opacity-80 text-base lg:text-lg leading-relaxed">
                Localized intervention plans that integrate directly with existing medical management systems.
              </p>
            </div>
            <ul className="mt-10 lg:mt-12 space-y-4 lg:space-y-6">
              {['Personalized Nutrition Logic', 'Blood Pressure Benchmarking', 'Circadian Stress Analysis'].map(item => (
                <li key={item} className="flex items-center gap-3 lg:gap-4 text-sm lg:text-base font-medium">
                  <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-white"></div>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Feature 3 */}
          <div className="md:col-span-4 bg-surface-container-lowest p-8 lg:p-12 rounded-2xl ambient-shadow flex flex-col justify-center">
            <ClipboardList className="text-tertiary mb-6 lg:mb-8 w-10 h-10 lg:w-12 lg:h-12" />
            <h3 className="font-manrope font-bold text-2xl lg:text-3xl text-on-surface mb-4 lg:mb-6">Genetic Markers</h3>
            <p className="text-on-surface-variant text-base lg:text-lg leading-relaxed">
              Integrating familial clinical history to refine susceptibility models for type 2 diabetes.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="md:col-span-8 bg-primary-container p-8 lg:p-12 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-8 lg:gap-12">
            <div className="flex-1">
              <h3 className="font-manrope font-bold text-2xl lg:text-3xl text-on-primary mb-4 lg:mb-6">Institutional Integration</h3>
              <p className="text-on-primary/80 text-base lg:text-lg leading-relaxed max-w-lg">
                Seamlessly sync with Epic, Cerner, and Apple Health records for a holistic clinical view.
              </p>
            </div>
            <div className="flex gap-4 lg:gap-6 shrink-0 w-full md:w-auto justify-start md:justify-end">
              {[Database, RefreshCw, ClipboardList].map((Icon, i) => (
                <div key={i} className="w-14 h-14 lg:w-20 lg:h-20 rounded-2xl bg-white/10 flex items-center justify-center">
                  <Icon className="text-on-primary w-6 h-6 lg:w-8 lg:h-8" />
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
    <section className="py-16 lg:py-32 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-surface-container-high rounded-[2rem] lg:rounded-[3rem] p-10 lg:p-20 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="font-manrope font-extrabold text-3xl sm:text-4xl lg:text-5xl text-on-surface mb-6 lg:mb-8 tracking-tight">
              Ready for the Future of Preventative Care?
            </h2>
            <p className="text-on-surface-variant text-lg lg:text-xl mb-10 lg:mb-12 max-w-xl mx-auto leading-relaxed">
              Join thousands of clinical practitioners and individuals using GlucoPulse to stay ahead of metabolic risks.
            </p>
            <Link
              to="/dashboard"
              className="ai-pulse-gradient text-on-primary px-10 lg:px-14 py-4 lg:py-6 rounded-full font-bold text-lg lg:text-xl hover:shadow-2xl hover:shadow-primary/30 transition-all inline-block hover:scale-[0.98]"
            >
              Start Free Assessment
            </Link>
          </div>

          <div className="absolute top-0 right-0 w-64 h-64 lg:w-80 lg:h-80 bg-primary/5 rounded-full -mr-24 -mt-24 lg:-mr-32 lg:-mt-32 blur-[60px] lg:blur-[80px]"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 lg:w-80 lg:h-80 bg-secondary/5 rounded-full -ml-24 -mb-24 lg:-ml-32 lg:-mb-32 blur-[60px] lg:blur-[80px]"></div>
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
