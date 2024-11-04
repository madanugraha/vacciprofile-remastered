export const parseDynamicPropsFromObject = (obj) => {
    const res = Object.entries(obj).map((dat) => {
        const [name, val] = dat;
        return {
            value: [name, val]
        }
    }) || null;

    return res;
}