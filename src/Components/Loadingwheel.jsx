import React from "react"

function Loadingwheel({ sm }) {
    return <section className={sm ? "loading-wheel_container loading-wheel_container_sm" : "loading-wheel_container"}>
        <article className="loading-wheel">
        </article>
    </section>
}

export default Loadingwheel;