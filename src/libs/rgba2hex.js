function rgba2hex(rgba) {
    if (rgba.length < 4) {
        return rgb2hex(rgba);
    }
    const alpha = Math.round(rgba[3] * 255).toString(16);
    const alphaHex = alpha.length == 1 ? "0" + alpha : alpha;
    const rgb = rgba.slice(0, 3);
    const hex = rgba2hex(rgb);
    return alphaHex + hex;
}
function rgb2hex(rgb) {
    return rgb.map(function (value) {
        const c = value * 255;
        const hex = Math.round(c).toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }).join("");
}
export { rgba2hex, rgb2hex };
