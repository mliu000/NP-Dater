/*
Mu Ye Liu - June 2025

Represents js files that store the utility functions for the application.
*/

// Sorts the days of the week, months, and day of the month in a specific order.
export function sortDaysOfWeek(days) {
    const daysOfWeekOrder = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthOrder = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dayOfMonthOrder = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
    const dayOrder = [...daysOfWeekOrder, ...monthOrder, ...dayOfMonthOrder];

    days.sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));
}

// Converts a hex color code to an RGB string.
export function hexToRGB(hex) {
    hex = hex.replace(/^#/, '');

    if (hex.length === 3) {
        hex = hex.split('').map(c => c + c).join('');
    }

    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `RGB(${r}, ${g}, ${b})`;
}