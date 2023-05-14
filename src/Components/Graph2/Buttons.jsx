import React from "react";
import { cleanUpName } from "../../Utility/UtilityFunctions"
import Men from "../../Icons/icons8-mars-symbol-100.png"
import Women from "../../Icons/icons8-venus-symbol-100.png";
import N from "../../Icons/icons8-decision-100 (2).png"

function Buttons({ dispatch, state, id }) {
    return <div className="menu-container menu-container_page2">
        <div className="display">
            <h2>{cleanUpName(id)}</h2>
        </div>
        <div className="gender-menu">
            <section className="gender-section">
                <div className="gender-icon_container gender-icon_container_male">
                    <img src={Men} alt="Sezione Uomini" />
                </div>
                <article onClick={() => dispatch({ type: "totaleMen" })} className={state.totMen.length > 0 ? "demographics-pill demographics-pill_totMen" : "demographics-pill"}>Totale</article>
                <article onClick={() => dispatch({ type: "bbBoys" })} className={state.men1.length > 0 ? "demographics-pill demographics-pill_bbB" : "demographics-pill"} >0-17</article>
                <article onClick={() => dispatch({ type: "boys" })} className={state.men2.length > 0 ? "demographics-pill demographics-pill_boys" : "demographics-pill"} >18-34</article>
                <article onClick={() => dispatch({ type: "men" })} className={state.men3.length > 0 ? "demographics-pill demographics-pill_men" : "demographics-pill"} >35-49</article>
                <article onClick={() => dispatch({ type: "oldMen" })} className={state.men4.length > 0 ? "demographics-pill demographics-pill_oldMen" : "demographics-pill"} >50-64</article>
                <article onClick={() => dispatch({ type: "veryOldMen" })} className={state.men5.length > 0 ? "demographics-pill demographics-pill_veryOldMen" : "demographics-pill"} >65+</article>
            </section>
            <section className="gender-section">
                <div className="gender-icon_container gender-icon_container_fem">
                    <img src={Women} alt="Sezione Uomini" />
                </div>
                <article onClick={() => dispatch({ type: "totaleWomen" })} className={state.totWomen.length > 0 ? "demographics-pill demographics-pill_totWomen" : "demographics-pill"}>Totale</article>
                <article onClick={() => dispatch({ type: "bbGirls" })} className={state.fem1.length > 0 ? "demographics-pill demographics-pill_bbG" : "demographics-pill"} >0-17</article>
                <article onClick={() => dispatch({ type: "girls" })} className={state.fem2.length > 0 ? "demographics-pill demographics-pill_girls" : "demographics-pill"} >18-34</article>
                <article onClick={() => dispatch({ type: "women" })} className={state.fem3.length > 0 ? "demographics-pill demographics-pill_women" : "demographics-pill"} >35-49</article>
                <article onClick={() => dispatch({ type: "oldWomen" })} className={state.fem4.length > 0 ? "demographics-pill demographics-pill_oldWomen" : "demographics-pill"} >50-64</article>
                <article onClick={() => dispatch({ type: "veryOldWomen" })} className={state.fem5.length > 0 ? "demographics-pill demographics-pill_veryOldWomen" : "demographics-pill"} >65+</article>
            </section>
            <section className="gender-section">
                <div className="gender-icon_container gender-icon_container_unk">
                    <img src={N} alt="Sezione Uomini" />
                </div>
                <article onClick={() => dispatch({ type: "totaleUnk" })} className={state.unk.length > 0 ? "demographics-pill demographics-pill_unk" : "demographics-pill"}>Totale</article>
            </section>
        </div>
    </div>
}

export default Buttons;