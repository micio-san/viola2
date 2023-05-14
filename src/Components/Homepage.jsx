import React, { useState, useEffect } from "react";
import Loadingwheel from "./Loadingwheel";
import { IoIosArrowDown } from "react-icons/io"
import GraphOneContainer from "./Graph1/GraphOneContainer";
import { cleanUpName, ages, calcMilliseconds } from "../Utility/UtilityFunctions"
import { motion, AnimatePresence } from "framer-motion"

function Homepage() {
    const [allData, setAllData] = useState();
    const [allPharmacies, setAllPharmacies] = useState([]);
    const [currentPharma, setCurrentPharma] = useState("");
    const [currentPharmaData, setCurrentPharmaData] = useState();
    const [sideMenuCtrl, setSideMenuCtrl] = useState(false);
    const malesCl = ["#ACA6EB", "#7D75D4", "#453baf", "#281f89", "#0e084f"];
    const femCl = ["#EEA8FF", "#D27DD6", "#B459B9", "#9B389E", "#68326A"];

    const fetchData = async () => {
        try {
            const res = await fetch("https://viola-counter.herokuapp.com/api/daily-traffics");
            const { data } = await res.json();
            setAllData(data)
            getAllPharmacies(data);
        } catch (err) {
            console.log(err)
        }
    }

    const getAllPharmacies = (data) => {
        let set = new Set()
        const response = data.map((one) => {
            set.add(one.attributes.sales_point)
        });
        setCurrentPharma([...set][0]);
        setAllPharmacies([...set]);
        setCurrentPharmaData(data.filter((one) => {
            return one.attributes.sales_point === [...set][0];
        }));
    }

    const getCurrentData = (pharmaName) => {
        setCurrentPharma(pharmaName)
        setCurrentPharmaData(allData.filter((one) => {
            return one.attributes.sales_point === pharmaName;
        }));
        setSideMenuCtrl(false)
    }
    useEffect(() => {
        fetchData();
        const intervalCall = setInterval(() => {
            fetchData()
            console.log("data")
        }, calcMilliseconds(60));
        return () => {
            clearInterval(intervalCall);
        };
    }, []);

    if (!allData || !allPharmacies) {
        return <Loadingwheel sm={false} />
    }

    return <AnimatePresence>
        <motion.main transition={{ duration: 0.5, ease: "easeInOut" }} animate={{ x: "0%" }} initial={{ x: "-100%" }}>
            <aside className="column-1">
                <div className="menu-container">
                    <div className="display">
                        <h2>{cleanUpName(currentPharma)}</h2>
                        <div onClick={() => setSideMenuCtrl(prev => !prev)} className="icon-container">
                            <IoIosArrowDown className={sideMenuCtrl ? "icon-container_icon icon-container_icon_active" : "icon-container_icon"} />
                        </div>
                    </div>
                    <div className={sideMenuCtrl ? "list-container list-container_open" : "list-container"}>
                        <AnimatePresence key="sideMenuPageOne">    {
                            sideMenuCtrl && allPharmacies.map((one, idx) => {
                                return <motion.div exit={{ opacity: 0 }} transition={{ duration: 0.5, delay: 0.2 * idx }} animate={{ opacity: 1 }} initial={{ opacity: 0 }} key={idx} onClick={() => getCurrentData(one)} className={currentPharma === one ? "list-item list-item_active" : "list-item"}>
                                    <h2 className={sideMenuCtrl ? "item item_open" : "item"}>{cleanUpName(one)}</h2>
                                </motion.div>
                            })
                        }</AnimatePresence>
                    </div>
                </div>
            </aside>
            <section className="column-2" >
                <GraphOneContainer currentPharmaData={currentPharmaData} />
                <div className="demographics-container">
                    <div className="demographics-container_fmlml">
                        {
                            ages.map((age, idx) => {
                                return <article className="age-container" style={{ background: `${malesCl[idx]}` }} key={idx}>
                                    <h2>{age}</h2>
                                </article>
                            })
                        }
                        <article className="age-container age-container_tot">
                            <h2>TOTALE</h2>
                        </article>
                    </div>
                    <div className="demographics-container_fmlml">
                        {
                            ages.map((age, idx) => {
                                return <article className="age-container" style={{ background: `${femCl[idx]}` }} key={idx}>
                                    <h2>{age}</h2>
                                </article>
                            })
                        }
                        <article className="age-container age-container_unk">
                            <h2>UNK</h2>
                        </article>
                    </div>
                </div>
            </section>
        </motion.main >
    </AnimatePresence>
}

export default Homepage;