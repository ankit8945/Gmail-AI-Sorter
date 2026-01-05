import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryPieChart = ({ stats }) => {
  const labels = Object.keys(stats.categories || {});
  const values = Object.values(stats.categories || {});

  if (labels.length === 0) {
    return (
      <div className="card p-4 text-sm text-slate-400">
        No data yet. Analyze emails to see category distribution.
      </div>
    );
  }

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: [
          "#60a5fa",
          "#22c55e",
          "#f97316",
          "#eab308",
          "#ef4444",
          "#a855f7"
        ],
        borderColor: "#020617",
        borderWidth: 1
      }
    ]
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#e5e7eb",
          boxWidth: 12,
          font: {
            size: 11
          }
        }
      }
    }
  };

  return (
    <div className="card p-4">
      <h3 className="text-slate-100 font-semibold mb-2 text-sm">
        Category distribution
      </h3>

      {/* FIXED SMALL HEIGHT */}
      <div className="h-[220px]">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default CategoryPieChart;
