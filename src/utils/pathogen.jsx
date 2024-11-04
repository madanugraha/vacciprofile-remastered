import { pathogensData } from "@/data/pathogens";

export const getPathogenDetailById = (pathogenId) => {
    const data = null;
    if (pathogenId) {
        const pathogenData = pathogensData;
        const filter = pathogenData.filter((dat) => dat.pathogenId === pathogenId)[0];
        if (!filter) {
            return null;
        }
        return filter;
    };
    return data;
}