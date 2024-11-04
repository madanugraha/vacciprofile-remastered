import { licensersData } from "@/data/licensers";

export const getLicenserDetailDetailByLicenserIds = (licensersId) => {
    const data = [];

    const licensers = licensersData;
    if (licensers.length <= 0) {
        return [];
    };
    if (licensersId && licensersId.length > 0) {
        for (const licenser of licensersId) {
            const { licenserId } = licenser;
            const filtered = licensers.filter((dat) => dat.licenserId === licenserId)[0];
            if (filtered) {
                data.push(filtered);
            }
        }
    };
    return data;
};