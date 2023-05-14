import React from "react";
import { parseHr } from "../../Utility/UtilityFunctions"
import { Chart, registerables } from "chart.js"
import { Line } from "react-chartjs-2";
import NoData from "./NoData";
Chart.register(...registerables)

function GraphTwo({ state, allTimes, date }) {
    const hrs = parseHr(allTimes)
    const clrs = ["#3020dd", "#993366", "#727272", "#0b0a0b96", "#c2c2c29f"]
    const malesClr = ["#ACA6EB", "#7D75D4", "#453baf", "#281f89", "#0e084f"];
    const femClr = ["#EEA8FF", "#D27DD6", "#B459B9", "#9B389E", "#68326A"];

    function checkEmptyness() {
        const isEmpty = Object.values(state).filter((item) => {
            return item.length > 0
        })
        return isEmpty.length === 0 ? true : false
    }

    if (checkEmptyness()) {
        return <>
            <NoData date={date} />
        </>
    }

    const options = {
        maintainAspectRatio: false,
        layout: {
            padding: 0,
        },
        plugins: {
            customCanvasBackgroundColor: {
                color: 'lightGreen',
            },
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: clrs[3],
                title: {
                    display: false,
                },
            }
        },
        scales: {
            y: {
                border: {
                    color: clrs[1],
                    width: 3
                },
                grid: {
                    drawBorder: true,
                    color: clrs[1],
                    tickLength: 24,
                },
                ticks: {
                    min: 12,
                    color: clrs[1],
                    labelOffset: 13,
                    padding: 0,
                    beginAtZero: true,
                    font: {
                        size: 20,
                        weight: "bold",
                        family: "'Quicksand', sans-serif"
                    },
                }
            },
            x: {
                border: {
                    color: clrs[1],
                    width: 3
                },
                grid: {
                    drawBorder: true,
                    color: clrs[1],
                },
                ticks: {
                    padding: 24,
                    beginAtZero: true,
                    font: {
                        size: 20,
                        weigth: 300,
                        family: "'Quicksand', sans-serif"
                    },
                    color: "rgba(11, 10, 11, 0.5882352941)"
                }
            }
        },
        chartArea: {
            backgroundColor: 'rgba(251, 85, 85)'
        }
    }

    const data = {
        labels: hrs.sort(),
        datasets: [
            {
                label: "Uomini Totale",
                data: state.totMen,
                backgroundColor: clrs[0],
                borderColor: clrs[0],
                tension: 0.4,
                radius: 4,
            },
            {
                label: "Donne Totale",
                data: state.totWomen,
                backgroundColor: clrs[1],
                borderColor: clrs[1],
                tension: 0.4,
                radius: 4
            },
            {
                label: "Sconosciuti",
                data: state.unk,
                backgroundColor: clrs[2],
                borderColor: clrs[2],
                tension: 0.4,
                radius: 4

            },
            {
                label: "Uomini 0-17",
                data: state.men1,
                backgroundColor: malesClr[0],
                borderColor: malesClr[0],
                tension: 0.4,
                radius: 4
            },
            {
                label: "Uomini 18-34",
                data: state.men2,
                backgroundColor: malesClr[1],
                borderColor: malesClr[1],
                tension: 0.4,
                radius: 4
            },
            {
                label: "Uomini 35-49",
                data: state.men3,
                backgroundColor: malesClr[2],
                borderColor: malesClr[2],
                tension: 0.4,
                radius: 4
            },
            {
                label: "Uomini 50-64",
                data: state.men4,
                backgroundColor: malesClr[3],
                borderColor: malesClr[3],
                tension: 0.4,
                radius: 4
            },
            {
                label: "Uomini 65+",
                data: state.men5,
                backgroundColor: malesClr[4],
                borderColor: malesClr[4],
                tension: 0.4,
                radius: 4
            },
            {
                label: "Donne 0-17",
                data: state.fem1,
                backgroundColor: femClr[0],
                borderColor: femClr[0],
                tension: 0.4,
                radius: 4
            },
            {
                label: "Donne 18-34",
                data: state.fem2,
                backgroundColor: femClr[1],
                borderColor: femClr[1],
                tension: 0.4,
                radius: 4
            },
            {
                label: "Donne 35-49",
                data: state.fem3,
                backgroundColor: femClr[2],
                borderColor: femClr[2],
                tension: 0.4,
                radius: 4
            },
            {
                label: "Donne 50-64",
                data: state.fem4,
                backgroundColor: femClr[3],
                borderColor: femClr[3],
                tension: 0.4,
                radius: 4
            },
            {
                label: "Donne 65+",
                data: state.fem5,
                backgroundColor: femClr[4],
                borderColor: femClr[4],
                tension: 0.4,
                radius: 4
            },

        ]
    }

    const cow = {
        id: "cow",
        beforeDraw(chart, args, pluginOptions) {
            const { ctx, chartArea: { top, bottom, left, right, width, height } } = chart
            ctx.save();

            ctx.fillStyle = clrs[4];
            ctx.fillRect(left, top, width, height)
        }
    }

    return <Line height={604} width={1395} data={data} options={options} plugins={[cow]} >
    </Line >
}

export default GraphTwo