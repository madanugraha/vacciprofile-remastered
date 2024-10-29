const { vaccinesData } = require("@/data/vaccines");

export const getVaccinesByPathogenId = (id) => {
    const data = [];
    const vaccines = vaccinesData;
    if (vaccines.length > 0) {
        const result = vaccinesData.filter((data) => data.pathogenId === id);
        return result;
    }
    return data
}

export const getVaccineDetailByManufactureId = (id) => {
    
}