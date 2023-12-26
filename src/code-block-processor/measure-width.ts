export const waitAndMeasureCorrectWidth = async (
    element: HTMLElement,
): Promise<number> => {
    const { width } = element.getBoundingClientRect();
    if (width !== 0) return width;

    return new Promise((resolve) => {
        const observer = new IntersectionObserver((entries) => {
            if (entries.length === 0) {
                return;
            }

            const { width } = entries[0].boundingClientRect;
            if (width !== 0) {
                observer.disconnect();
                resolve(width);
            }
        });

        observer.observe(element);
    });
};
