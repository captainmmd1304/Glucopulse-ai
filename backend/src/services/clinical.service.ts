import prisma from '../config/db';

export class ClinicalService {
  static async getProtocol(userId: string) {
    const latest = await prisma.predictionResult.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    const baseNutrition = {
      title: 'Nutrition Protocol',
      subtitle: 'Precision glycemic management',
      directives: [
        {
          title: 'Reduce Glycemic Load by 20%',
          desc: 'Limit carbohydrate intake to low-GI sources (GI < 55) to prevent insulin spikes and promote pancreatic rest.',
          items: [
            'Whole grains: Steel-cut oats, quinoa, barley.',
            'Legumes: Lentils, chickpeas, black beans.'
          ]
        },
        {
          title: 'Time-Restricted Feeding',
          desc: 'Adopt a 10:14 window (10h eating, 14h fasting) to enhance cellular autophagy and insulin sensitivity.'
        },
        {
          title: 'Fiber Density Optimization',
          desc: 'Target >35g fiber daily. Prioritize cruciferous vegetables to delay gastric emptying.'
        }
      ]
    };

    const baseLifestyle = {
      title: 'Lifestyle Protocol',
      subtitle: 'Metabolic training and recovery',
      items: [
        { val: '150m', label: 'Zone 2 Cardio', desc: 'Weekly aerobic base training to increase mitochondrial efficiency.' },
        { val: '2x', label: 'Resistance Load', desc: 'Bi-weekly strength sessions to enhance non-insulin mediated glucose uptake.' },
        { val: '7.5h', label: 'Sleep Latency', desc: 'Maintain consistent circadian rhythm to regulate cortisol levels.' }
      ]
    };

    if (!latest || !Array.isArray(latest.recommendations)) {
      return { nutrition: baseNutrition, lifestyle: baseLifestyle };
    }

    const recs: string[] = latest.recommendations;

    return {
      nutrition: {
        title: 'Personalized AI Protocol',
        subtitle: `Custom generated for your ${latest.category} profile.`,
        directives: [
          {
            title: 'Primary AI Interventions',
            desc: 'Based on your latest assessment, the Model recommends the following immediate clinical actions:',
            items: recs
          },
          baseNutrition.directives[1],
          baseNutrition.directives[2]
        ]
      },
      lifestyle: baseLifestyle
    };
  }

  static async getAdherence(userId: string) {
    return {
      adherenceScore: 84,
      streakDays: 12,
      level: 3,
      signal: 'Combined dietary protocol and morning Zone 2 training indicates a projected 14% improvement in glycemic stability.'
    };
  }
}
