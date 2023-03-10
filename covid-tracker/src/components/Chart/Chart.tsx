import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  country: string;
  countryStatus: AxiosResponse<any, any> | undefined;
};

const fetchDaily = () => {
  return axios.get("https://covid19.mathdro.id/api/daily");
};

type ModifiedDataType = {
  confirmed: {
    total: number;
  };
  deaths: {
    total: number;
  };
  reportDate: string;
};

export const ChartComponent = ({ country, countryStatus }: Props) => {
  const { data: dailyData } = useQuery(["chart", "global"], fetchDaily, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const modifiedData = dailyData?.data.map((dailyData: ModifiedDataType) => ({
    confirmed: dailyData.confirmed.total,
    deaths: dailyData.deaths.total,
    date: dailyData.reportDate,
  }));
  const lineChart = modifiedData ? (
    <Line
      data={{
        labels: modifiedData.map(({ date }: { date: string }) => date),
        datasets: [
          {
            data: modifiedData.map(
              ({ confirmed }: { confirmed: number }) => confirmed
            ),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: modifiedData.map(({ deaths }: { deaths: number }) => deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;
  const barChart = countryStatus ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)",
            ],
            data: [
              countryStatus?.data.confirmed.value,
              countryStatus?.data.recovered.value,
              countryStatus?.data.deaths.value,
            ],
          },
        ],
      }}
      options={{
        plugins: {
          legend: { display: false },
          title: { display: true, text: `Current state in ${country}` },
        },
      }}
    />
  ) : null;
  return <>{country === "Global" ? <>{lineChart}</> : <>{barChart}</>}</>;
};
