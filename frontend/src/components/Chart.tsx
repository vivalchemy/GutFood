import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Plugin } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface AnalysisChartProps {
  diabetes: number; // 0, 1, or 2
  heartDisease: number; // 0, 1, or 2
  hypertension: number; // 0, 1, or 2
  qualityOfFood: number; // 0 (good), 1 (normal), 2 (bad)
  calories: number; // Value between 0 and 1
}

export function Chart({
  diabetes,
  heartDisease,
  hypertension,
  qualityOfFood,
  calories,
}: AnalysisChartProps) {

  const data = {
    labels: [
      'Diabetes',
      'Heart Disease',
      'Hypertension',
      qualityOfFood === 0 ? 'Quality of Food: Good' : 'Quality of Food: Bad',
      calories > 0.8 ? 'Calories: High' : (calories < 0.4 ? 'Calories: Low' : 'Calories: Normal'),
    ],
    datasets: [
      {
        label: 'Risk/Quality',
        data: [diabetes, heartDisease, hypertension, qualityOfFood, calories],
        backgroundColor: [
          diabetes === 2 ? 'rgba(255, 99, 132, 0.5)' : diabetes === 1 ? 'rgba(255, 206, 86, 0.5)' : 'rgba(75, 192, 192, 0.5)',
          heartDisease === 2 ? 'rgba(255, 99, 132, 0.5)' : heartDisease === 1 ? 'rgba(255, 206, 86, 0.5)' : 'rgba(75, 192, 192, 0.5)',
          hypertension === 2 ? 'rgba(255, 99, 132, 0.5)' : hypertension === 1 ? 'rgba(255, 206, 86, 0.5)' : 'rgba(75, 192, 192, 0.5)',
          qualityOfFood === 0 ? 'rgba(54, 162, 235, 0.5)' : 'rgba(255, 99, 132, 0.5)', // Quality of Food
          calories > 0.8 ? 'rgba(255, 99, 132, 0.5)' : (calories < 0.4 ? 'rgba(54, 162, 235, 0.5)' : 'rgba(255, 206, 86, 0.5)'), // Calories
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
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw; // Get the value from the chart
            let labelText = tooltipItem.label + ': ' + value;

            // Add qualitative descriptions
            if (tooltipItem.dataIndex < 3) { // For diabetes, heart disease, hypertension
              if (value === 2) labelText += ' (Bad)';
              else if (value === 1) labelText += ' (Normal)';
              else labelText += ' (Good)';
            } else if (tooltipItem.dataIndex === 3) { // Quality of Food
              labelText += qualityOfFood === 0 ? ' (Good)' : ' (Bad)';
            } else if (tooltipItem.dataIndex === 4) { // Calories
              if (calories > 0.8) labelText += ' (High Calory)';
              else if (calories < 0.4) labelText += ' (Low Calory)';
              else labelText += ' (Normal)';
            }

            return labelText;
          },
        },
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
