let currentPrice = 6.10;
let dayRange = [6, 6.28];
let yearRange = [4.03, 7.33];

function calcRate() {
    const yearRangeDiff = yearRange[1] - yearRange[0];
    const monthRangeDiff = yearRangeDiff * 12; // Convert years to months
    const dayRangeDiff = dayRange[1] - dayRange[0];

    // Check if either range has negative values, which is invalid
    if (yearRangeDiff < 0 || dayRangeDiff < 0) {
        return null;
    }

    // Calculate the monthly growth rate based on daily changes
    const monthlyGrowthRate = Math.pow(dayRange[1] / dayRange[0], 365 / monthRangeDiff) - 1;

    return monthlyGrowthRate;
}

function calculateOptimalStocks(initialInvestment, returns) {
    const growthRate = calcRate();

    if (growthRate === null) {
        return "Invalid input ranges for calculating the growth rate.";
    }

    // Check for invalid input values
    if (initialInvestment <= 0 || returns <= initialInvestment) {
        return "Invalid inputs. Please provide valid numbers.";
    }

    let optimalStocks = 0;
    let minTimeInMonths = Infinity;

    for (let stocks = 1; stocks * currentPrice <= initialInvestment; stocks++) {
        const totalInvestment = stocks * currentPrice;
        let futureValue = initialInvestment;
        let timeInMonths = 0;

        while (futureValue < returns) {
            futureValue += (stocks * currentPrice) * Math.pow(1 + growthRate, timeInMonths);
            timeInMonths++;
        }

        if (futureValue >= returns && timeInMonths < minTimeInMonths) {
            minTimeInMonths = timeInMonths;
            optimalStocks = stocks;
        }
    }

    return optimalStocks;
}

function calculateTime(initialInvestment, optimalStocks, returns) {
    const growthRate = calcRate();

    if (growthRate === null) {
        return "Invalid input ranges for calculating the growth rate.";
    }

    // Check for invalid input values
    if (initialInvestment <= 0 || optimalStocks <= 0 || returns <= initialInvestment) {
        return "Invalid inputs. Please provide valid numbers.";
    }

    let futureValue = initialInvestment;
    let timeInMonths = 0;

    while (futureValue < returns) {
        futureValue += (optimalStocks * currentPrice) * Math.pow(1 + growthRate, timeInMonths);
        timeInMonths++;
    }

    return timeInMonths;
}

// Example usage:
const initialInvestment = 2000; // Initial investment amount
const returns = 12000; // Target return amount

const optimalStocks = calculateOptimalStocks(initialInvestment, returns);

if (optimalStocks > 0) {
    const timeInMonths = calculateTime(initialInvestment, optimalStocks, returns);

    if (typeof timeInMonths === 'number' && !isNaN(timeInMonths)) {
        console.log(`You should buy ${optimalStocks} stocks to reach your target return within your initial investment.`);
        console.log(`It will take approximately ${timeInMonths.toFixed(2)} months to reach your target return.`);
    } else {
        console.log("Invalid input values for time calculation.");
    }
} else {
    console.log("It's not possible to reach the target return with the given initial investment and current price.");
}
