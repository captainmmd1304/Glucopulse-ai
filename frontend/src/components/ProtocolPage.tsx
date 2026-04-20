import { useState, useEffect } from 'react';
import { Utensils, Activity, FlaskConical, Stethoscope, Heart, Download, Share2, CheckCircle2, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { clinicalApi } from '../lib/api';

interface ProtocolData {
  nutrition: {
    title: string;
    subtitle: string;
    directives: Array<{ title: string; desc: string; items?: string[] }>;
  };
  lifestyle: {
    title: string;
    subtitle: string;
    items: Array<{ val: string; label: string; desc: string }>;
  };
}

interface AdherenceData {
  adherenceScore: number;
  streakDays: number;
  level: number;
  signal: string;
}

export function ProtocolPage() {
  const { token } = useAuth();
  const [protocol, setProtocol] = useState<ProtocolData | null>(null);
  const [adherence, setAdherence] = useState<AdherenceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [exportLoading, setExportLoading] = useState(false);
  const [shareLoading, setShareLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState('');

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const [protocolRes, adherenceRes] = await Promise.all([
          clinicalApi.getProtocol(token),
          clinicalApi.getAdherence(token),
        ]);
        setProtocol(protocolRes.data);
        setAdherence(adherenceRes.data);
      } catch (err: any) {
        setError(err.message || 'Failed to load clinical data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleExport = async () => {
    if (!token) return;
    setExportLoading(true);
    setActionMessage('');
    try {
      const res = await clinicalApi.exportReport(token);
      setActionMessage(res.message || 'Report generated successfully!');
    } catch (err: any) {
      setActionMessage(err.message || 'Export failed');
    } finally {
      setExportLoading(false);
    }
  };

  const handleShare = async () => {
    if (!token) return;
    setShareLoading(true);
    setActionMessage('');
    try {
      const res = await clinicalApi.shareWithTeam(token);
      setActionMessage(res.message || 'Report shared successfully!');
    } catch (err: any) {
      setActionMessage(err.message || 'Share failed');
    } finally {
      setShareLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <p className="text-sm text-on-surface-variant font-medium">Loading protocol…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center px-5">
        <div className="panel p-8 text-center max-w-md">
          <p className="text-tertiary font-semibold mb-2">Error loading data</p>
          <p className="text-sm text-on-surface-variant">{error}</p>
        </div>
      </div>
    );
  }

  // Use API data or fallback defaults
  const nutritionDirectives = protocol?.nutrition?.directives ?? [
    { title: 'Reduce Glycemic Load by 20%', desc: 'Limit carbohydrate intake to low-GI sources (GI < 55) to prevent insulin spikes and promote pancreatic rest.', items: ['Whole grains: Steel-cut oats, quinoa, barley.', 'Legumes: Lentils, chickpeas, black beans.'] },
  ];
  const lifestyleItems = protocol?.lifestyle?.items ?? [
    { val: '150m', label: 'Zone 2 Cardio', desc: 'Weekly aerobic base training to increase mitochondrial efficiency.' },
    { val: '2x', label: 'Resistance Load', desc: 'Bi-weekly strength sessions to enhance non-insulin mediated glucose uptake.' },
    { val: '7.5h', label: 'Sleep Latency', desc: 'Maintain consistent circadian rhythm to regulate cortisol levels.' }
  ];
  const adh = adherence ?? { adherenceScore: 84, streakDays: 12, level: 3, signal: '' };

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
                <h2 className="text-2xl lg:text-3xl font-semibold font-manrope text-on-surface">{protocol?.nutrition?.title || 'Nutrition Protocol'}</h2>
                <p className="text-sm lg:text-base text-on-surface-variant">{protocol?.nutrition?.subtitle || 'Precision glycemic management'}</p>
              </div>
            </div>

            <div className="space-y-6">
              {nutritionDirectives.length > 0 && (
                <div className="panel-soft p-6">
                  <h3 className="text-primary font-semibold text-lg mb-2">{nutritionDirectives[0].title}</h3>
                  <p className="text-on-surface-variant text-sm lg:text-base mb-6 leading-relaxed">
                    {nutritionDirectives[0].desc}
                  </p>
                  {nutritionDirectives[0].items && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {nutritionDirectives[0].items.map(item => (
                        <div key={item} className="panel p-4 rounded-2xl flex items-start gap-3 interactive-lift">
                          <CheckCircle2 className="text-primary shrink-0 mt-0.5" size={16} />
                          <span className="text-sm text-on-surface leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {nutritionDirectives.slice(1).map((directive, i) => (
                  <div key={i} className={`rounded-2xl border p-5 interactive-lift ${i === 0 ? 'border-secondary/35 bg-secondary/12' : 'border-tertiary/35 bg-tertiary/12'}`}>
                    <h4 className={`font-semibold text-base mb-2 ${i === 0 ? 'text-secondary' : 'text-tertiary'}`}>{directive.title}</h4>
                    <p className="text-sm text-on-surface-variant leading-relaxed">{directive.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="panel p-7 lg:p-9 reveal reveal-delay-1 interactive-lift">
            <div className="flex items-center gap-4 mb-7">
              <div className="w-12 h-12 rounded-xl border border-secondary/35 bg-secondary/14 flex items-center justify-center text-secondary">
                <Activity size={24} />
              </div>
              <div>
                <h2 className="text-2xl lg:text-3xl font-semibold font-manrope text-on-surface">{protocol?.lifestyle?.title || 'Lifestyle Protocol'}</h2>
                <p className="text-sm lg:text-base text-on-surface-variant">{protocol?.lifestyle?.subtitle || 'Metabolic training and recovery'}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {lifestyleItems.map(item => (
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
              <span className="text-secondary text-lg font-semibold">{adh.adherenceScore}%</span>
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
                  <span className="text-sm font-medium text-on-surface-variant">{adh.streakDays} Day Streak</span>
                </div>
                <span className="chip border-secondary/35 bg-secondary/14 text-secondary">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-secondary" size={18} />
                  <span className="text-sm font-medium text-on-surface-variant">Metabolic Master</span>
                </div>
                <span className="text-xs text-on-surface-variant font-semibold">Lvl {adh.level}</span>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border reveal reveal-delay-2 interactive-lift">
            <h4 className="text-base font-semibold text-on-surface mb-2">AI Clinical Signal</h4>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              {adh.signal || 'Combined dietary protocol and morning Zone 2 training indicates a projected 14% improvement in glycemic stability.'}
            </p>
          </div>
        </aside>
      </div>

      <section className="mt-12 lg:mt-14 panel p-8 lg:p-10 text-center max-w-4xl mx-auto reveal interactive-lift">
        <h2 className="text-3xl lg:text-4xl font-semibold font-manrope mb-4">Export Clinical Report</h2>
        <p className="text-on-surface-variant text-base lg:text-lg mb-6 max-w-2xl mx-auto leading-relaxed">
          Generate a high-resolution PDF with complete data visualization and risk projections for your primary care physician.
        </p>

        {actionMessage && (
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2">
            <CheckCircle2 size={16} className="text-primary" />
            <span className="text-sm text-primary font-medium">{actionMessage}</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={handleExport}
            disabled={exportLoading}
            className="btn-primary inline-flex items-center justify-center gap-2.5 text-base interactive-lift disabled:opacity-60"
          >
            {exportLoading ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
            {exportLoading ? 'Generating…' : 'Generate PDF'}
          </button>
          <button
            onClick={handleShare}
            disabled={shareLoading}
            className="btn-secondary inline-flex items-center justify-center gap-2.5 text-base interactive-lift disabled:opacity-60"
          >
            {shareLoading ? <Loader2 size={18} className="animate-spin" /> : <Share2 size={18} />}
            {shareLoading ? 'Sharing…' : 'Share with Care Team'}
          </button>
        </div>
      </section>
    </div>
  );
}
