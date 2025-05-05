import React from 'react';
import { Pie, Line } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Statistics = () => {
  const { t } = useTranslation();

  const pieData = {
    labels: [t('stats.charts.pieChart.positiveReviews'), t('stats.charts.pieChart.negativeReviews')],
    datasets: [{
      data: [78, 22],
      backgroundColor: ['#10b981', '#ef4444']
    }]
  };

  const lineData = {
    labels: [
      t('stats.charts.months.jan'), 
      t('stats.charts.months.feb'), 
      t('stats.charts.months.mar'), 
      t('stats.charts.months.apr'), 
      t('stats.charts.months.may'), 
      t('stats.charts.months.jun')
    ],
    datasets: [{
      label: t('stats.charts.lineChart.yield'),
      data: [65, 72, 80, 76, 85, 92],
      borderColor: '#10b981',
      backgroundColor: 'rgba(16,185,129,0.2)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#fff',
      pointBorderColor: '#10b981'
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 12, // Taille de police réduite pour une meilleure adaptation
            family: "'Inter', sans-serif"
          },
          color: '#ffffff'
        }
      },
      tooltip: {
        titleFont: {
          size: 14,
          family: "'Inter', sans-serif"
        },
        bodyFont: {
          size: 13,
          family: "'Inter', sans-serif"
        }
      }
    }
  };

  return (
    <section id="stats">
      <h2>{t('stats.charts.title')}</h2>
      <p>{t('stats.charts.description')}</p>

      <div className="chart-container">
        <div className="chart-item pie-chart">
          <h3>{t('navbar.stats')}</h3>
          <div className="chart-wrapper">
            <Pie data={pieData} options={chartOptions} />
          </div>
        </div>

        <div className="chart-item line-chart">
          <h3>{t('navbar.stats')}</h3>
          <div className="chart-wrapper">
            <Line data={lineData} options={chartOptions} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
