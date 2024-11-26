export const prepareChartData = (simulationResults, materials) => {
    const craterSizes = simulationResults.map((result) => parseFloat(result.craterSize));
    const materialCounts = {};
    materials.forEach((material) => {
        materialCounts[material] = simulationResults.filter(
            (result) => result.material === material
        ).length;
    });
    const impactEnergies = simulationResults.map((result) => parseFloat(result.impactEnergy));

    return {
        craterSizes,
        materialCounts,
        impactEnergies,
    };
};
