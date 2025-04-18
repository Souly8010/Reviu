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
    responsive: false,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  return (
    <section id="stats">
      <h2>{t('stats.charts.title')}</h2>
      <p>{t('stats.charts.description')}</p>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '40px',
        flexWrap: 'wrap',
        marginTop: '40px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '500px', height: '500px' }}>
            <Pie data={pieData} options={chartOptions} width={500} height={500} />
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '600px', height: '500px' }}>
            <Line data={lineData} options={chartOptions} width={600} height={500} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
