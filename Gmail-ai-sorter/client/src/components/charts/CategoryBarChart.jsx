import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const CategoryBarChart = ({ stats }) => {
  const labels = Object.keys(stats.categories || {});
  const values = Object.values(stats.categories || {});

  if (labels.length === 0) {
    return (
      <div className="card p-4 text-sm text-slate-400">
        No data yet. Analyze emails to see counts per category.
      </div>
    );
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Emails",
        data: values,
        backgroundColor: "#38bdf8",
        borderRadius: 6,
        barThickness: 22
      }
    ]
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        ticks: {
          color: "#9ca3af",
          font: { size: 11 }
        },
        grid: {
          color: "#1f2937"
        }
      },
      y: {
        ticks: {
          color: "#9ca3af",
          font: { size: 11 },
          precision: 0
        },
        grid: {
          color: "#1f2937"
        }
      }
    }
  };

  return (
    <div className="card p-4">
      <h3 className="text-slate-100 font-semibold mb-2 text-sm">
        Emails per category
      </h3>

      {/* FIXED SMALL HEIGHT */}
      <div className="h-[220px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default CategoryBarChart;
