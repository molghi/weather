function convertTempUnits(value: number, flag: string): number {
    if (flag === "toFahrenheit" || flag === "to F") {
        // to Fahrenheit
        return (value * 9) / 5 + 32;
    } else {
        // to Celsius
        return ((value - 32) * 5) / 9;
    }
}

export default convertTempUnits;
