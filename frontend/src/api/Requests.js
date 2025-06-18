/*
Mu Ye Liu - June 2025

General API requests (POST, GET, etc)
*/

// General api request function
export async function apiRequest(url, type, jsonInput) {
    try {
        const response = await fetch(url, {
            method: type,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jsonInput)
        });

        if (!response.ok) throw new Error('Response was not ok');

        const data = await response.json();

        return data;
    } catch (err) {
        throw err;
    }
}