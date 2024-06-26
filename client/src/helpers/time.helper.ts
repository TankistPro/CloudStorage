interface parsedDataResponse {
    dYear: number,
    dMonth: string,
    dDay: string,
    dHour: string,
    dMinutes: string
}
export const parseDate = (dateString : Date) : parsedDataResponse => {
    const d = new Date(dateString);

    const dYear = d.getFullYear();
    const dMonth =("0" + (d.getMonth() + 1)).slice(-2) ;
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

export const displayTime = (dateString: Date) : string => {
    const { dYear, dMonth, dDay, dHour, dMinutes} = parseDate(dateString);
    return `${ dDay }.${ dMonth }.${ dYear } ${dHour}:${dMinutes}`
}
