import { manufacturersData } from "@/data/manufacturers";

export const getManufactureDetailByManufactureIds = (manufacturerIds) => {
    const data = [];

    const manufacturers = manufacturersData;
    if (manufacturers.length <= 0) {
        return [];
    };

    console.log(manufacturerIds);
    if (manufacturerIds && manufacturerIds.length > 0) {
        for (const manufacture of manufacturerIds) {
            const { manufacturerId } = manufacture;
            const filtered = manufacturers.filter((manufacture) => manufacture.manufacturerId === manufacturerId)[0];
            console.log(filtered);
            if (filtered) {
                console.log(filtered)
                data.push(filtered);
            }
        }
    };
    return data;
}