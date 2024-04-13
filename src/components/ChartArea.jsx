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

const ChartArea = ({tempToday}) => {
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
                        family: "monospace",
                    },
                },
            },
            title: {
                display: true,
                text: `${currentCity}'s Temperature Every 3 Hour`,
                position: "top",
                font: {
                    family: "monospace",
                },
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
                suggestedMin: Math.min(...tempToday.data_min) - 2,
                suggestedMax: Math.max(...tempToday.data_max) + 2,
                ticks: {
                    font: {
                        size: 10,
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
                label: "Hourly Max Temperature (°C)",
                data: [0, 3, 2, 3, 6],
                borderColor: "rgb(220,20,60)",
                fill: 2,
                backgroundColor: "rgba(220,20,60,0.3)",
                borderWidth: 1,
                pointStyle: "triangle",
                pointRadius: 5,
                pointHoverRadius: 7,
            },
            {
                label: "Hourly Min Temperature (°C)",
                data: [0, 3, 2, 3, 2],
                borderColor: "rgb(27,153,139)",
                // fill: true,
                backgroundColor: "rgba(27,153,139,0.3)",
                borderWidth: 1,
                pointStyle: "rect",
                pointRadius: 5,
                pointHoverRadius: 7,
            },
            {
                label: "Hourly Avg Temperature (°C)",
                data: [0, 3, 2, 3, 4],
                borderColor: "rgb(65,105,225)",
                fill: "start",
                backgroundColor: "rgba(65,105,225,0.3)",
                borderWidth: 2,
                pointStyle: "cirle",
                pointRadius: 5,
                pointHoverRadius: 7,
            },
        ],
    });
    useEffect(() => {
        setChartData((prev) => ({
            ...prev,
            labels: tempToday.labels,
            datasets: [
                {
                    ...prev.datasets[0],
                    data: tempToday.data_max,
                },
                {
                    ...prev.datasets[1],
                    data: tempToday.data_min,
                },
                {
                    ...prev.datasets[2],
                    data: tempToday.data,
                },
            ],
        }));
    }, [tempToday])
    // updateChart()
    return (
        <div className="w-full h-48 md:h-1/2 md:w-[90%] mx-auto md:p-5 text-center">
            <Line options={options} data={chartData} width="100%"  />
        </div>
    );
};

export default ChartArea;
