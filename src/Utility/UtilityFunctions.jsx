export function cleanUpName(x) {
    return x.replaceAll("_", " ")
};

export function parseDate(x) {
    const arr = x.split("-").reverse();
    const stringifiedArr = arr.join("-");
    return stringifiedArr.replaceAll("-", "/")
}

export const ages = ["0-17", "18-34", "35-49", "50-64", "+65"];

export const TotalMen = (data) => {
    return data.map((item) => {
        const { M1, M2, M3, M4, M5 } = item
        return [M1, M2, M3, M4, M5].reduce((acc, curr) => acc + curr)
    })
}

export const Fbbboys = (data) => {
    return data.map((item) => item.M1)
}

export const FBoys = (data) => {
    return data.map((item) => item.M2)
}

export const FMen = (data) => {
    return data.map((item) => item.M3)
}

export const FOMen = (data) => {
    return data.map((item) => item.M4)
}

export const FVOMen = (data) => {
    return data.map((item) => item.M5)
}

export const FbbGirlies = (data) => {
    return data.map((item) => item.F1)
}

export const FGirls = (data) => {
    return data.map((item) => item.F2)
}

export const FWomen = (data) => {
    return data.map((item) => item.F3)
}

export const FOWomen = (data) => {
    return data.map((item) => item.F4)
}

export const FVOWomen = (data) => {
    return data.map((item) => item.F5)
}

export const TotalWomen = (data) => {
    return data.map((item) => {
        const { F1, F2, F3, F4, F5 } = item
        return [F1, F2, F3, F4, F5].reduce((acc, curr) => acc + curr)
    })
}

export const unk = (data) => {
    return data.map((item) => {
        return item.unknown;
    })
}

export const parseHr = (x) => {
    return x.map((hr) => {
        return hr.slice(0, 5)
    })
}

export const months = ["Gennaio", "Febbraio", "Marzo", "Aprile",
    "Maggio", "Giugno", "Luglio", "Agosto", "Settembre",
    "Ottobre", "Novembre", "Dicembre"
];

export const parseAPIDate = (x) => {
    const startTime = x.indexOf("T")
    const endTime = x.indexOf("Z")
    const parsed = x.slice(startTime + 1, endTime).split(":");
    const toNum = parsed.map((one, idx) => {
        if (idx === 2) {
            parseFloat(one)
            return Math.round(one)
        } else if (idx === 0) {
            let num = parseInt(one)
            return num += 2
        }
        return parseInt(one)
    })

    const add0 = toNum.map((num) => {
        const numStr = String(num);
        if (numStr.length === 1) {
            return "0" + numStr
        }
        return numStr
    })

    return add0.join(":")
}

export const getAges = (dem) => {
    switch (dem) {
        case "M1" || "F1" || 0:
            return "0-17"
        case "M2" || "F2" || 1:
            return "18-34"
        case "M3" || "F3" || 2:
            return "35-49"
        case "M4" || "F4" || 3:
            return "50-64"
        default:
            return "65+"
    }
}

export const calcMilliseconds = (x) => (x * 60) * 1000 