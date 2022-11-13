export const parseDate = (dateString) => {
    const d = new Date(dateString);

    const dYear = d.getFullYear();
    const dMonth =("0" + d.getMonth()).slice(-2);
    const dDay = ("0" + d.getDate()).slice(-2);
    const dHour = ("0" + d.getHours()).slice(-2);
    const dMinutes = ("0" + d.getMinutes()).slice(-2);

    return {
        dYear,
        dMonth,
        dDay,
        dHour,
        dMinutes
    }
}

export const displayTime = (dateString) => {
    const { dYear, dMonth, dDay, dHour, dMinutes} = parseDate(dateString);
    return `${ dDay }.${ dMonth }.${ dYear } ${dHour}:${dMinutes}`
}
