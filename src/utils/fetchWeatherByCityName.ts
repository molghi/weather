async function fetchWeatherByCityName(cityName) {
    try {
        const resultsToReturn = 10;
        const API_URL = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=${resultsToReturn}&language=en&format=json`;
        const response = await fetch(API_URL);
        if (!response.ok) {
            console.error("💥💥💥 City name fetch response not OK:", response.status, response.statusText);
            throw new Error("💥💥💥 Fetching by city name was unsuccessful");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error, error.message);
        throw error;
    }
}

export default fetchWeatherByCityName;
