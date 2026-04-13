export class DashboardService {
  static async getOverviewMetrics(userId: string) {
    // In a real scenario, we perform aggregations over the Prisma DB.
    // For now, mapping accurately to the React UI payload:
    return {
      progressionRisk: {
        score: 42,
        trajectory: '+6%',
        level: 'Moderate',
        subtitle: 'Elevated post-prandial glycemic variability observed across the most recent 14 monitoring cycles.'
      },
      bloodPressureSignal: {
        score: 18,
        level: 'Low',
        text: 'Systolic and diastolic readings remain within stable range during nocturnal recovery.'
      }
    };
  }

  static async getRiskFactors(userId: string) {
    // Return the dynamic array for the explainable risk drivers progress bars
    return [
      { label: 'Glycemic Load', sub: 'Dominant metabolic driver', impact: 42 },
      { label: 'Family History', sub: 'Inherited susceptibility profile', impact: 28 },
      { label: 'Lifestyle Habits', sub: 'Sleep and activity alignment', impact: 15 }
    ];
  }
}
