/*
Mu Ye Liu - June 2025

General API requests (POST, GET, etc)
*/

// General api post request
export async function postRequest(url, jsonInput) {
    try {
        const response = await fetch(url, {
            method: 'POST',
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

export async function getRequest(url) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) throw new Error('Response was not ok');

        const data = await response.json();

        return data;
    } catch (err) {
        throw err;
    }
}