import React, { useState, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom"
import {
    Fbbboys,
    FBoys,
    FMen,
    FOMen,
    FVOMen,
    parseDate,
    TotalMen,
    TotalWomen,
    unk,
    FbbGirlies,
    FGirls,
    FWomen,
    FOWomen,
    months,
    FVOWomen,
    calcMilliseconds
} from "../Utility/UtilityFunctions"
import Realtime from "./Graph2/Realtime";
import GraphTwo from "../Components/Graph2/GraphTwo"
import Loadingwheel from "./Loadingwheel";
import Buttons from "./Graph2/Buttons";
import { AnimatePresence, motion } from "framer-motion"

const intialState = {
    totMen: [],
    totWomen: [],
    unk: [],
    men1: [],
    men2: [],
    men3: [],
    men4: [],
    men5: [],
    fem1: [],
    fem2: [],
    fem3: [],
    fem4: [],
    fem5: [],
}

function SecondPage() {
    const { id, date } = useParams();
    const [dataTotal, setDataTotal] = useState()
    const [state, dispatch] = useReducer(reducer, intialState)
    const [allTimes, setAllTimes] = useState()
    const dateNow = new Date();

    const fetchData = async () => {
        try {
            const apiRes = await fetch("https://viola-counter.herokuapp.com/api/hour-traffics");
            const parsedRes = await apiRes.json();
            const filterData = await parsedRes.data.map((item) => {
                return item.attributes
            }).filter(item => item.sales_point === id && item.date === date)
            const hrs = await filterData.map((item) => {
                return item.time
            })
            setAllTimes(hrs)
            setDataTotal(filterData)
            dispatch({ type: "presentationData" })
        } catch (err) {
            console.log(err)
        }
    }
    // console.log(60 - dateNow.getMinutes())
    function reducer(state, action) {
        switch (action.type) {
            case "bbBoys":
                return state.men1.length > 0 ? { ...state, men1: [] } : { ...state, men1: Fbbboys(dataTotal) }
            case "boys":
                return state.men2.length > 0 ? { ...state, men2: [] } : { ...state, men2: FBoys(dataTotal) }
            case "men":
                return state.men3.length > 0 ? { ...state, men3: [] } : { ...state, men3: FMen(dataTotal) }
            case "oldMen":
                return state.men4.length > 0 ? { ...state, men4: [] } : { ...state, men4: FOMen(dataTotal) }
            case "veryOldMen":
                return state.men5.length > 0 ? { ...state, men5: [] } : { ...state, men5: FVOMen(dataTotal) }

            case "bbGirls":
                return state.fem1.length > 0 ? { ...state, fem1: [] } : { ...state, fem1: FbbGirlies(dataTotal) }
            case "girls":
                return state.fem2.length > 0 ? { ...state, fem2: [] } : { ...state, fem2: FGirls(dataTotal) }
            case "women":
                return state.fem3.length > 0 ? { ...state, fem3: [] } : { ...state, fem3: FWomen(dataTotal) }
            case "oldWomen":
                return state.fem4.length > 0 ? { ...state, fem4: [] } : { ...state, fem4: FOWomen(dataTotal) }
            case "veryOldWomen":
                return state.fem5.length > 0 ? { ...state, fem5: [] } : { ...state, fem5: FVOWomen(dataTotal) }

            case "totaleMen":
                return state.totMen.length > 0 ? { ...state, totMen: [] } : { ...state, totMen: TotalMen(dataTotal) }
            case "totaleWomen":
                return state.totWomen.length > 0 ? { ...state, totWomen: [] } : { ...state, totWomen: TotalWomen(dataTotal) }
            case "totaleUnk":
                return state.unk.length > 0 ? { ...state, unk: [] } : { ...state, unk: unk(dataTotal) }
            default:
                return { ...state, totMen: TotalMen(dataTotal), totWomen: TotalWomen(dataTotal), unk: unk(dataTotal) }
        }
    }

    useEffect(() => {
        fetchData();
        const intervalCall = setInterval(() => {
            if (60 - dateNow.getMinutes() === 0) {
                fetchData()
                console.log("data")
            }
        }, calcMilliseconds(1));
        return () => {
            clearInterval(intervalCall);
        };
    }, [])

    if (!dataTotal) {
        return <Loadingwheel sm={false} />
    }

    return <AnimatePresence>
        <motion.main transition={{ duration: 0.5, ease: "easeInOut" }} animate={{ x: "0%" }} initial={{ x: "100%" }} key="hourly-traffic_page" className="hourly-traffic_page">
            <aside className="column-1">
                <Buttons dispatch={dispatch} state={state} id={id} />
                <div className="menu-container_realtime">
                    <div className="display">
                        <h2>Dati Realtime</h2>
                        <h2>{dateNow.getDate()} {months[dateNow.getMonth()]}</h2>
                    </div>
                    <Realtime />
                </div>
            </aside>
            <section className="column-2">
                <article className="date-navigation_container">
                    <div className="date-container">
                        <div className="btn-container">
                        </div>
                        <div className="date">
                            <h3>{parseDate(date)}</h3>
                        </div>
                        <div className="btn-container">
                        </div>
                    </div>
                </article>
                <div className="graph-two_cont"> {
                    state && <GraphTwo date={date} state={state} allTimes={allTimes} />
                }
                </div>

            </section>
        </motion.main >
    </AnimatePresence>
}

export default SecondPage;