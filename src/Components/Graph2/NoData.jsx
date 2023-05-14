import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { months } from "../../Utility/UtilityFunctions"

function NoData({ date }) {
    const dateArr = date.split("-").reverse();
    const dateN = parseInt(dateArr[1]) - 1;
    const navigate = useNavigate()
    const [progress, setProgress] = useState(0)

    setTimeout(() => {
        navigate("/")
    }, 3000);

    useEffect(() => {
        setInterval(() => {
            setProgress((prev) => prev + 1)
        }, 60);
    }, [])

    return <main className="error-main error-main_none">
        <div className="error-container">
            <h2>Purtroppo non ci sono dati per il giorno {dateArr[0]} <br /> del mese di {months[dateN]}</h2>
            <div className="line-container">
                <div style={{ width: `${progress}%` }} className="line"></div>
            </div>
        </div>
    </main>
}

export default NoData;