import React, { useEffect, useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Loadingwheel from "../Loadingwheel";
import ColonnaGraphOne from "./ColonnaGraphOne";
import { parseDate } from "../../Utility/UtilityFunctions";

function GraphOneContainer({ currentPharmaData }) {
    //se i dati sono > di 7 dividere i dati in +pagine
    const [dividedData, setDividedData] = useState();
    //indice per muoversi tra pagine
    const [idx, setIdx] = useState(0)

    const splitdata = () => {
        if (currentPharmaData.length > 7 && currentPharmaData.length <= 14) {
            let first = currentPharmaData.slice(0, 7);
            let second = currentPharmaData.slice(7, currentPharmaData.length);
            setDividedData([first, second])
        } else if (currentPharmaData.length > 14) {
            let first = currentPharmaData.slice(0, 7);
            let second = currentPharmaData.slice(7, 14);
            let third = currentPharmaData.slice(14, currentPharmaData.length);
            setDividedData([first, second, third])
        } else {
            setDividedData([currentPharmaData])
        }
    }

    //date prima e ultima di pagina
    const fixDates = () => {
        const allDates = dividedData[idx].map((one) => {
            return one.attributes.date;
        });
        return allDates.length === 1 ? parseDate(allDates[0]) : parseDate(allDates[0]).concat(" - ").concat(parseDate(allDates[allDates.length - 1]))
    }

    // la somma totale dei clienti arrotondata per eccesso, rendendo il max adattabile al totale
    //calcolo in loop di sezioni
    const getMaxHeigth = () => {
        const justHeights = dividedData[idx].map((one) => {
            return one.attributes.total_sum;
        })
        const highest = justHeights.sort((a, b) => b - a);
        const roundedRes = Math.ceil(highest[0] / 100) * 100;
        let responsiveHeights = [];
        for (let i = roundedRes; i >= 0; i -= 50) {
            responsiveHeights.push(i)
        }
        return responsiveHeights;
    }

    useEffect(() => {
        splitdata();
        setIdx(0)
    }, [currentPharmaData]);

    //evitare errori x ritardi di render
    if (!currentPharmaData || !dividedData) {
        return <Loadingwheel sm={false} />
    }

    return <>
        <article className="date-navigation_container">
            <div className="date-container">
                {
                    idx > 0 ? <div className="btn-container" onClick={() => setIdx(prev => prev - 1)}>
                        <IoIosArrowBack />
                    </div> : <div className="btn-container btn-container_deactivated">
                        <IoIosArrowBack />
                    </div>
                }
                <div className="date">
                    <h3>{fixDates()}</h3>
                </div>
                {
                    dividedData.length > 1 && idx <= 0 ?
                        dividedData.length && <div className="btn-container" onClick={() => setIdx(prev => prev + 1)}>
                            <IoIosArrowForward />
                        </div> : dividedData.length && <div className="btn-container  btn-container_deactivated">
                            <IoIosArrowForward />
                        </div>
                }

            </div>
        </article>
        <article className="graph-main_container">
            <div className="quantity-container">
                {
                    getMaxHeigth().map((one, idx) => {
                        return <div key={idx} className="level-container">
                            <div className="line"></div>
                            <h3>{one}</h3>
                        </div>
                    })
                }
            </div>
            <div className="graph-container">
                {
                    dividedData && dividedData[idx].map((data, id) => {
                        return <ColonnaGraphOne key={id} data={data.attributes} maxHeight={getMaxHeigth()[0]} />
                    })
                }
            </div>
        </article>
    </>
}

export default GraphOneContainer;