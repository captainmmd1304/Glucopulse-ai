# GlucoPulse AI 🩺⚡

> AI-based proactive risk prediction for Diabetes & Hypertension. Receive personalized generative recommendations based on your clinical and lifestyle profile.

![Status](https://img.shields.io/badge/Status-Active-brightgreen.svg)
![React](https://img.shields.io/badge/React-19.0.0-blue.svg)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-38B2AC.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6.svg)

## 🌟 Overview

GlucoPulse AI provides an **FDA-Aligned Clinical Framework** that bridges the gap between complex health data and actionable clinical insights through advanced generative neural networks. 

## ✨ Features

- **Continuous Risk Mapping:** Real-time analysis of vital signs and lifestyle triggers to visualize potential risk spikes before they occur.
- **Preventative Actions:** Localized intervention plans (Personalized Nutrition Logic, Blood Pressure Benchmarking, Circadian Stress Analysis) that integrate directly with existing medical management systems.
- **Genetic Markers Integration:** Integrating familial clinical history to refine susceptibility models for type 2 diabetes.
- **Institutional Integration:** Seamlessly sync with Epic, Cerner, and Apple Health records for a holistic, longitudinal clinical view.

## 🛠️ Tech Stack

- **Frontend core:** React 19, React Router DOM v7
- **Styling & Animation:** Tailwind CSS v4, Framer Motion, Lucide React
- **AI Integration:** Google GenAI SDK
- **Backend framework:** Express (Node.js)
- **Build logic:** Vite v6
- **Language:** TypeScript

## 🚀 Getting Started

### Prerequisites

Ensure you have Node.js (v18 or higher) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/glucopulse-ai.git
   cd glucopulse-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory and add any required API keys (e.g., Google GenAI keys).

4. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`.

## 📂 Project Structure

```
glucopulse-ai/
├── src/
│   ├── components/       # Reusable UI components & Pages
│   ├── App.tsx           # Main application routing
│   ├── index.css         # Global Tailwind & Custom Styles
│   └── main.tsx          # Application entry point
├── public/               # Static assets
├── package.json          # Dependencies & Scripts
└── vite.config.ts        # Vite configuration
```

## 📄 License

This project is licensed under the MIT License.
