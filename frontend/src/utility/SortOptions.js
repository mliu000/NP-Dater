/*
Mu Ye Liu - June 2025

Represents the utility function for sorting days of the week, months, and days of the month
*/
export function sortDaysOfWeek(days) {
    const daysOfWeekOrder = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthOrder = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dayOfMonthOrder = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
    const dayOrder = [...daysOfWeekOrder, ...monthOrder, ...dayOfMonthOrder];

    days.sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));
}