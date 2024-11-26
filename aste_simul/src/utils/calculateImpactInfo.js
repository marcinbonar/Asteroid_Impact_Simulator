export const calculateImpactInfo = (params, materialDensity) => {
    const { diameter, speed, angle, material } = params;
    if (!material || !materialDensity[material]) {
        console.error('Proszę wybrać materiał.');
        return null;
    }
    const density = materialDensity[material];
    const radius = diameter / 2;
    const volume = (4 / 3) * Math.PI * Math.pow(radius, 3);
    const mass = volume * density;
    const speedInMetersPerSecond = speed * 1000;
    const impactEnergy =
        0.5 * mass * Math.pow(speedInMetersPerSecond, 2) * Math.sin((angle * Math.PI) / 180);
    const impactEnergyTNT = (impactEnergy / (4.184 * 1e9)).toFixed(2);
    const craterSize = (0.13 * Math.pow(impactEnergy / density, 1 / 3)).toFixed(2);
    const craterDepth = (craterSize / 10).toFixed(2);
    const fireballSize = (0.3 * Math.pow(impactEnergy, 0.25)).toFixed(2);
    const shockwavePressure = impactEnergy / Math.pow(diameter, 2);
    const calibrationConstant = 94;
    const shockwaveDecibels = (
        20 * Math.log10(shockwavePressure) +
        calibrationConstant
    ).toFixed(2);
    const earthquakeMagnitude = (1.5 * Math.log10(impactEnergy) - 4.8).toFixed(2);

    return {
        craterSize,
        craterDepth,
        impactEnergy: (impactEnergy / 1e9).toFixed(2),
        impactEnergyTNT,
        fireballSize,
        shockwaveDecibels,
        earthquakeMagnitude,
        diameter,
        speed,
        angle,
        material,
    };
};
