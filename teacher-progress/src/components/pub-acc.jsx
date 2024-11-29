import React from "react";
import Teacher from "../data.json";
import { Pie } from "react-chartjs-2";

export default function PubAcc() {
  const calculateCounts = () => {
    let acceptedCount = 0;
    let publishedCount = 0;
    Teacher.forEach(teacher => {
      acceptedCount += teacher["Accepted Publications"];
      publishedCount += teacher["Total Scopus Publications"];
    });
    return [acceptedCount, publishedCount];
  };

  const data = calculateCounts();
  const state = {
    labels: ["Accepted Publications", "Published Publications"],
    datasets: [
      {
        backgroundColor: ["#B21F00", "#C9DE00"],
        hoverBackgroundColor: ["#501800", "#4B5000"],
        data: data,
      },
    ],
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-slate-100 md:px-10 lg:px-20">
        <h1 className="text-3xl font-bold mt-7">Total Publications vs Accepted Publications</h1>
      <Pie
        data={state}
        options={{
          plugins: {
            title: {
              display: true,
              font: {
                size: 20,
              },
            },
            legend: {
              display: true,
              position: "right",
            },
          },
        }}
      />
    </div>
  );
}