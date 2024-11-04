export const firstLetterUpperCaseDetector = (str) => {
    if (str) {
        const hasSpaces = str.includes(" ");
        const firstLetters = str.slice(0, 1);
        const isFirstLeterUpperCase = firstLetters === firstLetters.toUpperCase();

        if (hasSpaces && isFirstLeterUpperCase) {
            return true
        } else {
            return false
        }
    };
    return false;
};



export const camelCaseToHumanReadable = (str) => {
    if (str) {
        str
            // insert a space before all caps
            .replace(/([A-Z])/g, ' $1')
            // uppercase the first character
            .replace(/^./, function (str) { return str.toUpperCase(); })
    }

}