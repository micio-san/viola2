import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom"
import { parseDate, getAges } from "../../Utility/UtilityFunctions"

function ColonnaGraphOne({ data, maxHeight }) {
    //nMad :(nMad/50) = 624 : x
    const oneSectionHeight = maxHeight / 50;
    const graphHeight = 524 / oneSectionHeight;
    //calcolo scala;
    const ratioHeight = (n) => {
        return n * (graphHeight / 50)
    };

    const malesClr = ["#ACA6EB", "#7D75D4", "#453baf", "#281f89", "#0e084f"];
    const femClr = ["#EEA8FF", "#D27DD6", "#B459B9", "#9B389E", "#68326A"].reverse();
    const unkTotClr = ["#6FBA68", "#727272"].reverse();
    const {
        date,
        unknown_total,
        total_sum,
        M1, M2, M3, M4, M5,
        F1, F2, F3, F4, F5,
        sales_point
    } = data;
    const [totals, setTotals] = useState([])
    const categories = ["M", "F", "N", "T"];
    const [males, setMales] = useState({});
    const [females, setFemales] = useState({})
    const mArr = ['M1', 'M2', 'M3', 'M4', 'M5'].reverse()

    function renderGenders(x, clrArr, men) {
        return x.demo?.map((dem, key) => {
            return <div key={key} className="daily-data_col" style={{ height: `${ratioHeight(dem)}px`, background: `${clrArr[key]}` }}>
                <h3>{dem}</h3>
                <div className="column-label">
                    <h2 className="demogrs">{men ? "Uomini" : "Donne"}      {getAges(mArr[key])}</h2>
                    <div className="bottom">
                        <div style={{ backgroundColor: clrArr[key] }} className="clr-sm">
                        </div>
                        <h4>{dem}</h4>
                    </div>
                </div>
            </div>
        })
    }


    useEffect(() => {
        setMales({
            total: [M5, M4, M3, M2, M1].reduce((a, c) => a + c),
            demo: [M5, M4, M3, M2, M1]
        });
        setFemales({
            total: [F5, F4, F3, F2, F1].reduce((a, c) => a + c),
            demo: [F5, F4, F3, F2, F1]
        });
        setTotals([unknown_total, total_sum])

    }, [data]);

    return <>
        <Link to={`/${sales_point}/${date}`} className="daily-data_container"  >
            <div style={{ height: `${ratioHeight(males.total)}px` }} className="daily-data_col_tot">
                {
                    renderGenders(males, malesClr, true)
                }
            </div>
            <div style={{ height: `${ratioHeight(females.total)}px` }} className="daily-data_col_tot">
                {
                    renderGenders(females, femClr, false)
                }
            </div>
            {
                totals.map((one, idx) => {
                    return <div style={{ height: `${ratioHeight(one)}px`, background: `${unkTotClr[idx]}` }} key={idx} className="daily-data_col">
                        <h3>{one}</h3>
                        <div className="column-label">
                            <h2 className="demogrs">{idx === 0 ? "Sconosciutu" : "Totale"} </h2>
                            <div className="bottom">
                                <div style={{ backgroundColor: unkTotClr[idx] }} className="clr-sm">
                                </div>
                                <h4>{one}</h4>
                            </div>
                        </div>
                    </div>
                })
            }
            <div className="labels_container">
                {
                    categories.map(one => {
                        return <h4 key={one} className="label">{one}</h4>
                    })
                }
            </div>
            <div className="dates-sm_container">
                <h4 className="date">  {
                    parseDate(date).slice(0, 5)
                }
                </h4>
            </div>
        </Link>
    </>

}

export default ColonnaGraphOne;
