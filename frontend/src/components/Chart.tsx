import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface AnalysisChartProps {
  diabetes: number;
  heartDisease: number;
  hypertension: number;
  qualityOfFood: number;
  calories: number;
}

export function AnalysisChart({
  diabetes,
  heartDisease,
  hypertension,
  qualityOfFood,
  calories,
}: AnalysisChartProps) {

  const data = {
    labels: ['Diabetes', 'Heart Disease', 'Hypertension', 'Quality of Food', 'Calories'],
    datasets: [
      {
        label: 'Risk/Quality',
        data: [diabetes, heartDisease, hypertension, qualityOfFood, calories],
        backgroundColor: [
          diabetes === 2 ? 'rgba(255, 99, 132, 0.5)' : diabetes === 1 ? 'rgba(255, 206, 86, 0.5)' : 'rgba(75, 192, 192, 0.5)',
          heartDisease === 2 ? 'rgba(255, 99, 132, 0.5)' : heartDisease === 1 ? 'rgba(255, 206, 86, 0.5)' : 'rgba(75, 192, 192, 0.5)',
          hypertension === 2 ? 'rgba(255, 99, 132, 0.5)' : hypertension === 1 ? 'rgba(255, 206, 86, 0.5)' : 'rgba(75, 192, 192, 0.5)',
          'rgba(54, 162, 235, 0.5)', // Quality of Food (between 0 and 1)
          'rgba(153, 102, 255, 0.5)', // Calories (between 0 and 1)
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Health and Food Quality Analysis',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 2, // Set the max value for y-axis based on risk level (0, 1, 2)
      },
    },
  };

  return <Bar data={data} options={options} />;
}
