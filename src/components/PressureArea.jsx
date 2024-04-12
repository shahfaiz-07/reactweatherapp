import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";
import { useEffect, useState } from "react";
import { useData } from "../context/weatherContext";

const PressureArea = ({ pressureToday }) => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend,
        Filler
    );

    let { currentCity } = useData();
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    font: {
                        size: 10,
                    },
                },
            },
            title: {
                display: true,
                text: `${currentCity}'s Pressure Every 3 Hour`,
                position: "top",
            },
            filler: {
                propogate: true,
            },
        },
        maintainAspectRatio: false,
        scales: {
            x: {
                display: false, // Hide x-axis labels
                ticks: {
                    font: {
                        size: 10,
                    },
                },
            },
            y: {
                suggestedMin: Math.min(...pressureToday.data) - 5,
                suggestedMax: Math.max(...pressureToday.data) + 5,
                ticks: {
                    font: {
                        size: 8,
                    },
                },
                // stacked: true,
                // display: false,
                // beginAtZero: true, // Hide y-axis labels
            },
        },
        elements: {
            line: {
                tension: 0.4,
            },
        },
    };
    const [chartData, setChartData] = useState({
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        datasets: [
            {
                label: "Hourly Pressure (mb)",
                data: [0, 3, 2, 3, 2],
                borderColor: "rgb(27,153,139)",
                fill: true,
                backgroundColor: "rgba(27,153,139,0.3)",
                borderWidth: 1,
                pointStyle: "cirle",
                pointRadius: 5,
                pointHoverRadius: 7,
            }
        ],
    });
    useEffect(() => {
        setChartData((prev) => ({
            ...prev,
            labels: pressureToday.labels,
            datasets: [
                {
                    ...prev.datasets[0],
                    data: pressureToday.data,
                }
            ],
        }));
    }, [pressureToday]);
    // updateChart()
    return (
        <div className="w-full h-48 md:h-1/2 md:w-[90%] mx-auto md:p-5 text-center">
            <Line options={options} data={chartData} width="100%" />
        </div>
    );
};

export default PressureArea;
