const monthsName:Record<number, string> = {
    1:"enero",
    2:"febrero",
    3:"marzo",
    4:"abril",
    5:"mayo",
    6:"junio",
    7:"julio",
    8:"agosto",
    9:"septiembre",
    10:"ocubre",
    11:"noviembre",
    12:"diciembre"
}
const checkTime = (hour:number) => {
    return hour >= 12 
        ?   'p.m'
        :   'a.m'
}
export const formatDate = (d:Date) => {
    const date = new Date(d);
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDay();
    const hour = date.getHours();
    const min = date.getMinutes();
    
    // 11 noviembre 2025, 11:22 p.m
    return `${day} ${monthsName[month]} ${year}, ${hour}:${min} ${checkTime(hour)}`
}