export function formatDate(value, format) {
    if (value == null) return ""
    const date = new Date(value)
    value = format

    if (format.indexOf("%Y") >= 0) value = value.replace(/%Y/g, date.getFullYear())
    if (format.indexOf("%m") >= 0) value = value.replace(/%m/g, ("0" + (date.getMonth() + 1)).slice(-2))
    if (format.indexOf("%d") >= 0) value = value.replace(/%d/g, ("0" + date.getDate()).slice(-2))
    if (format.indexOf("%H") >= 0) value = value.replace(/%H/g, ("0" + date.getHours()).slice(-2))
    if (format.indexOf("%i") >= 0) value = value.replace(/%i/g, ("0" + date.getMinutes()).slice(-2))
    if (format.indexOf("%s") >= 0) value = value.replace(/%s/g, ("0" + date.getSeconds()).slice(-2))

    return value
}

export function formatMap(value, map) {
    if (map != null) value = map[value]
    return (value + "").trim()
}

export function formatNumber(number) {
    if (number == null) return number
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}