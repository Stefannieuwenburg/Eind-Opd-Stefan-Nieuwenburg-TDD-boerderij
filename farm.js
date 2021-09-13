// get result yield for 1 plant (including environmental factors)
const getYieldForPlant = (crop, environmentalFactors) => { 

    if(environmentalFactors !== undefined){

        const sunFactor = "sun" in environmentalFactors;
        const windFactor = "wind" in environmentalFactors;
        const soilFactor = "soil" in environmentalFactors;
        const sunPercentage = crop.factors.sun[environmentalFactors.sun] / 100 + 1;
        const windPercentage = crop.factors.wind[environmentalFactors.wind] / 100 + 1;
        const soilPercentage = crop.factors.soil[environmentalFactors.soil] / 100 + 1;

        if ((sunFactor === true) && (windFactor === false) && (soilFactor === false)){
            return crop.yield * sunPercentage;
        } else if ((sunFactor === false) && (windFactor === true) && (soilFactor === false)){
            return crop.yield * windPercentage;
        } else if ((sunFactor === false) && (windFactor === false) && (soilFactor === true)){
            return crop.yield * soilPercentage;
        } else if ((sunFactor === true) && (windFactor === true) && (soilFactor === false)){
            return (crop.yield * sunPercentage ) * windPercentage;
        } else if ((sunFactor === true) && (windFactor === false) && (soilFactor === true)){
            return (crop.yield * sunPercentage ) * soilPercentage;
        } else if ((sunFactor === false) && (windFactor === true) && (soilFactor === true)){
            return (crop.yield * windPercentage ) * soilPercentage;
        } else if ((sunFactor === true) && (windFactor === true) && (soilFactor === true)){
            return ((crop.yield * sunPercentage ) * windPercentage) * soilPercentage;
        }
    } else {
        return crop.yield;
    };
};

// get result yield for entire crop (all plants of 1 type)
const getYieldForCrop = (input, environmentalFactors) => {
    return getYieldForPlant(input.crop, environmentalFactors) * input.numCrops;
};

// get result total yield for multiple crops
const getTotalYield = ({crops}) => {
    let total = 0;
    crops.forEach(crop => {
        total += getYieldForCrop(crop)
    });
    return total;
};

// get result costs for a single crop
const getCostsForCrop = (input) => {
    const cropCosts = input.crop.costs;
    return cropCosts * input.numCrops;
};

// get result revenue for a single crop
const getRevenueForCrop = (input, environmentalFactors) => {
    return getYieldForCrop(input, environmentalFactors) * input.crop.salesPrice
};

// get result profit for single crop
const getProfitForCrop = (input, environmentalFactors) => {
    return getRevenueForCrop(input, environmentalFactors) - getCostsForCrop(input);
};

// get result profit for multiple crops
const getTotalProfit = ({crops}, environmentalFactors) => {
    let total = 0;
    crops.forEach(crop => {
        total += getProfitForCrop(crop, environmentalFactors)
    })
    return total;
};



module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit
}