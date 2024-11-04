import { manufacturersData } from "@/data/manufacturers";

export const getManufactureDetailByManufactureIds = (manufacturerIds) => {
    const data = [];

    const manufacturers = manufacturersData;
    if (manufacturers.length <= 0) {
        return [];
    };
    if (manufacturerIds && manufacturerIds.length > 0) {
        for (const manufacture of manufacturerIds) {
            const { manufacturerId } = manufacture;
            const filtered = manufacturers.filter((manufacture) => manufacture.manufacturerId === manufacturerId)[0];
            if (filtered) {
                data.push(filtered);
            }
        }
    };
    return data;
};


export const getManufactureDetailByManufactureId = (manufactureId) => {

    const data = null;
    const manufacturers = manufacturersData;
    if (manufacturers.length <= 0) {
        return null;
    };

    if (manufactureId) {
        const filtered = manufacturers.filter((manufacture) => manufacture.manufacturerId === manufactureId)[0];
        if (!filtered) {
            return null;
        }
        return filtered;
    };
    return data;

}