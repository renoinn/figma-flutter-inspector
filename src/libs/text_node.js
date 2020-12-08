import { rgba2hex } from './rgba2hex';
function inspectTextNode(node) {
    const fontName = node.fontName;
    const font = fontName.style.split(' ');
    const fontWeight = font[0];
    const fontStyle = font.length > 1 ? font[1] : 'Regular';
    const letterSpacing = node.letterSpacing;
    const fills = node.fills;
    let color = '000000';
    if (fills.length == 1) {
        const fill = fills[0];
        color = rgba2hex([fill.color.r, fill.color.g, fill.color.b]).toUpperCase();
    }
    let textStyle = {
        fontSize: node.fontSize,
        fontWeight: fontWeight,
        fontStyle: fontStyle,
        decoration: node.textDecoration,
        letterSpacing: letterSpacing.value,
        color: color,
        // height: number,
        shadows: node.effects,
    };
    let textModel = {
        value: node.characters,
        textAlign: node.textAlignHorizontal,
        textDirection: node.textDecoration,
        style: textStyle,
        locale: 'ja',
        softWrap: true,
    };
    return textModel;
}
export { inspectTextNode };
