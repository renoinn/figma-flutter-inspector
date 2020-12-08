import { rgba2hex } from './rgba2hex';

function inspectTextNode(node: TextNode): TextModel {
  const fontName = node.fontName as FontName;
  const font = fontName.style.split(' ');
  const fontWeight = font[0];
  const fontStyle = font.length > 1 ? font[1] : 'Regular';
  const letterSpacing = node.letterSpacing as LetterSpacing;
  const fills = node.fills as ReadonlyArray<Paint>;
  let color = '000000';
  if (fills.length == 1) {
      const fill = fills[0] as SolidPaint;
      color = rgba2hex([fill.color.r, fill.color.g, fill.color.b]).toUpperCase();
  }
  let textStyle: FlutterTextStyle = {
    fontSize: node.fontSize as number,
    fontWeight: fontWeight,
    fontStyle: fontStyle,
    decoration: node.textDecoration as string,
    letterSpacing: letterSpacing.value,
    color: color,
    // height: number,
    shadows: node.effects,
  };
  let textModel: TextModel = {
    value: node.characters,
    textAlign: node.textAlignHorizontal,
    textDirection: node.textDecoration as string,
    style: textStyle,
    locale: 'ja',
    softWrap: true,
  };

  return textModel;
}

type TextModel = {
  value: string,
  style: FlutterTextStyle,
  textAlign: string,
  textDirection: string,
  locale: string,
  softWrap: boolean,
}
  
type FlutterTextStyle = {
  color: string,
  fontSize: number,
  fontWeight: string,
  fontStyle: string,
  letterSpacing: number,
  // height: number,
  shadows: ReadonlyArray<Effect>,
  decoration: string,
  // decorationColor: string,
  // decorationStyle: string
}

export {
  inspectTextNode,
  TextModel,
  FlutterTextStyle
}