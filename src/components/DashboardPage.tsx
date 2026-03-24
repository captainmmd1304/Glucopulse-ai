import { motion } from 'motion/react';
import { Search, Bell, User, Activity, Brain, Clipboard, Heart, Utensils, Calendar } from 'lucide-react';

export function DashboardPage() {
  return (
    <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-12">
      {/* Header Section */}
      <header className="mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="max-w-2xl">
          <h1 className="font-manrope font-extrabold text-5xl tracking-tight text-on-surface mb-4">Patient Risk Profile: Analytical Overview</h1>
          <p className="text-lg text-on-surface-variant leading-relaxed">Generated based on synthesis of multi-modal biometric data, genetic markers, and longitudinal glycemic patterns.</p>
        </div>
        <div className="flex items-center gap-4 bg-surface-container-low px-6 py-3 rounded-2xl">
          <div className="w-3.5 h-3.5 rounded-full bg-secondary animate-pulse"></div>
          <span className="text-sm font-bold text-secondary tracking-wide uppercase">AI Model Active • Confidence 94%</span>
        </div>
      </header>

      {/* Primary Risk Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        {/* Diabetes Risk Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="relative overflow-hidden bg-surface-container-lowest rounded-3xl p-10 flex flex-col justify-between min-h-[360px] ambient-shadow"
        >
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-8">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">AI Risk Assessment</span>
                <h2 className="font-manrope font-bold text-4xl text-on-surface mt-2">Diabetes Risk</h2>
              </div>
              <div className="bg-amber-500/10 text-amber-600 px-5 py-2 rounded-full text-sm font-bold border border-amber-500/20">
                Medium Risk
              </div>
            </div>
            <div className="flex items-baseline gap-3 mb-4">
              <span className="font-manrope font-extrabold text-7xl text-amber-500">42</span>
              <span className="font-manrope text-3xl text-on-surface-variant">/ 100</span>
            </div>
            <p className="text-on-surface-variant max-w-sm leading-relaxed">Elevated post-prandial glycemic variability detected over the last 14 clinical cycles.</p>
          </div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="mt-10 flex gap-4">
            <button className="bg-primary text-on-primary font-bold px-8 py-4 rounded-full text-sm hover:opacity-90 transition-all">View clinical data</button>
            <button className="bg-surface-container-highest text-on-surface font-bold px-8 py-4 rounded-full text-sm hover:bg-surface-container-high transition-all">Download Report</button>
          </div>
        </motion.div>

        {/* Hypertension Risk Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="relative overflow-hidden bg-surface-container-lowest rounded-3xl p-10 flex flex-col justify-between min-h-[360px] ambient-shadow"
        >
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-8">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">AI Risk Assessment</span>
                <h2 className="font-manrope font-bold text-4xl text-on-surface mt-2">Hypertension Risk</h2>
              </div>
              <div className="bg-primary/10 text-primary px-5 py-2 rounded-full text-sm font-bold border border-primary/20">
                Low Risk
              </div>
            </div>
            <div className="flex items-baseline gap-3 mb-4">
              <span className="font-manrope font-extrabold text-7xl text-primary">18</span>
              <span className="font-manrope text-3xl text-on-surface-variant">/ 100</span>
            </div>
            <p className="text-on-surface-variant max-w-sm leading-relaxed">Systolic and diastolic pressures remain within optimal clinical thresholds during nocturnal rest.</p>
          </div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="mt-10 flex gap-4">
            <button className="bg-primary text-on-primary font-bold px-8 py-4 rounded-full text-sm hover:opacity-90 transition-all">Review trends</button>
          </div>
        </motion.div>
      </section>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Explainable AI Section */}
        <section className="lg:col-span-8 bg-surface-container-lowest rounded-3xl p-12 ambient-shadow">
          <div className="flex items-center gap-4 mb-12">
            <Brain className="text-secondary" size={32} />
            <h3 className="font-manrope font-bold text-3xl">Explainable AI: Risk Breakdown</h3>
          </div>
          <div className="space-y-12">
            {[
              { label: 'Glycemic Load', sub: 'Primary driver of current metabolic risk profile', impact: 42 },
              { label: 'Family History', sub: 'Aggregated genetic markers for Type-2 susceptibility', impact: 28 },
              { label: 'Lifestyle Habits', sub: 'Activity patterns and circadian rhythm alignment', impact: 15 }
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <h4 className="font-manrope font-bold text-xl text-on-surface">{item.label}</h4>
                    <p className="text-sm text-on-surface-variant">{item.sub}</p>
                  </div>
                  <span className="font-manrope font-bold text-secondary text-lg">{item.impact}% Impact</span>
                </div>
                <div className="h-3.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.impact}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-secondary rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 pt-10 border-t border-surface-container-high">
            <p className="text-sm text-on-surface-variant italic leading-relaxed">
              Note: The remaining 15% is attributed to stochastic physiological factors and secondary environmental influencers.
            </p>
          </div>
        </section>

        {/* Recommended Actions Section */}
        <section className="lg:col-span-4 flex flex-col gap-8">
          <div className="bg-surface-container-low rounded-3xl p-10">
            <h3 className="font-manrope font-bold text-2xl mb-8 flex items-center gap-3">
              <Clipboard className="text-primary" size={24} />
              Clinical Directives
            </h3>
            <div className="space-y-6">
              {[
                { icon: Utensils, title: 'Fiber Titration', desc: 'Increase dietary soluble fiber to 35g/day to dampen post-prandial glucose spikes.' },
                { icon: Heart, title: 'Interval Monitoring', desc: 'Execute continuous glucose monitoring (CGM) for a 7-day calibration period.' },
                { icon: Calendar, title: 'Clinical Consultation', desc: 'Review metabolic baseline with an endocrinologist within the next 30 days.' }
              ].map((action) => (
                <div key={action.title} className="p-6 bg-surface-container-lowest rounded-2xl ambient-shadow">
                  <div className="flex items-start gap-4">
                    <action.icon className="text-primary mt-1" size={20} />
                    <div>
                      <h5 className="font-manrope font-bold text-base">{action.title}</h5>
                      <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">{action.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-10 py-4 px-6 border-2 border-primary text-primary font-bold rounded-full text-base hover:bg-primary hover:text-on-primary transition-all">
              Schedule Consultation
            </button>
          </div>

          {/* AI Pulse Visual */}
          <div className="bg-primary-container rounded-3xl p-10 text-on-primary overflow-hidden relative">
            <h4 className="font-manrope font-bold text-xl mb-2">Metabolic Pulse</h4>
            <p className="text-sm opacity-80 mb-8">Real-time biological synchronization score</p>
            <div className="h-32 w-full flex items-end gap-1.5">
              {[12, 16, 20, 24, 18, 14, 10, 22, 24, 16].map((h, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h*4}px` }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  className="bg-white/40 w-full rounded-t-sm"
                  style={{ opacity: (i+1)/10 }}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
