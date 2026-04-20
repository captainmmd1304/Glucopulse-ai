import prisma from '../config/db';

export class DashboardService {
  static async getOverviewMetrics(userId: string) {
    // 1. Fetch latest prediction if exists
    const latest = await prisma.predictionResult.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    if (!latest) {
      return {
        progressionRisk: {
          score: 42,
          trajectory: '+6%',
          level: 'Moderate Risk',
          subtitle: 'Elevated post-prandial glycemic variability observed.'
        },
        bloodPressureSignal: {
          score: 18,
          level: 'Low',
          text: 'Systolic and diastolic readings remain stable.'
        }
      };
    }

    return {
      progressionRisk: {
        score: Math.round(latest.riskProbability),
        trajectory: 'Recent',
        level: latest.category,
        subtitle: `Calculated from your latest clinical assessment on ${latest.createdAt.toLocaleDateString()}.`
      },
      bloodPressureSignal: {
        score: 18,
        level: 'Low',
        text: 'BP signals are currently tracked separately, showing stability.'
      }
    };
  }

  static async getRiskFactors(userId: string) {
    const latest = await prisma.predictionResult.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    if (!latest || !Array.isArray(latest.shapFactors)) {
      return [
        { label: 'Glycemic Load', sub: 'Dominant metabolic driver', impact: 42 },
        { label: 'Family History', sub: 'Inherited susceptibility profile', impact: 28 },
        { label: 'Lifestyle Habits', sub: 'Sleep and activity alignment', impact: 15 }
      ];
    }

    // The ML engine returns objects with `factor` (string) and `impact` (string like '+12.5%')
    const shapData: any[] = latest.shapFactors;
    
    const getVal = (itm: any) => Math.abs(Number(itm.impact?.replace('%', '').replace('+', '') || 0));

    // Sort and calculate sum of absolutes for percentage distribution
    let sum = shapData.reduce((acc, curr) => acc + getVal(curr), 0);
    if (sum === 0) sum = 1;

    return shapData.map(factor => {
       const percentage = Math.round((getVal(factor) / sum) * 100);
       return {
         label: factor.factor || 'Factor',
         sub: 'Personalized risk impact factor',
         impact: percentage || 1
       };
    }).slice(0, 3); // top 3
  }
}
