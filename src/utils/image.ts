export const drawVideoStillToCanvas = (video: HTMLVideoElement, canvas: HTMLCanvasElement, dimensions: {width: number, height: number}): void => {
    const context = canvas.getContext("2d");
    if (context === null) return;
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    context.drawImage(video, 0, 0, dimensions.width, dimensions.height);
};

export const setCanvasDataToImage = (canvas: HTMLCanvasElement, image: HTMLImageElement): Promise<void> => {
    return new Promise((resolve) => {
        const data = canvas.toDataURL("image/png");
        image.setAttribute("src", data);
        image.onload = () => resolve();
    });
};

export const setSizeOfElement = (element: HTMLImageElement|HTMLCanvasElement|HTMLVideoElement, dimensions: {width: number, height: number}) => {
    element.setAttribute("width", String(dimensions.width));
    element.setAttribute("height", String(dimensions.height));
};