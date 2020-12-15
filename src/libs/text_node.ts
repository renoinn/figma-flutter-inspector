import { rgba2hex } from './rgba2hex';
import { Color, FontStyle, FontWeight, Text, TextAlign, TextStyle } from '@bridged.xyz/flutter-builder';

function inspectTextNode(node: TextNode): Text {
  const fontName = node.fontName as FontName;
  const font = fontName.style.split(' ');
  const figmaFontStyle = font.length > 1 ? font[1] : 'Regular';

  let fontWeight = FontWeight.normal;
  switch (font[0]) {
    case 'Regular':
      fontWeight = FontWeight.normal;
      break;
    case 'Thin':
      fontWeight = FontWeight.w200;
      break;
    case 'Light':
      fontWeight = FontWeight.w300;
      break;
    case 'Medium':
      fontWeight = FontWeight.w500;
      break;
    case 'Bold':
      fontWeight = FontWeight.w700;
      break;
    case 'Black':
      fontWeight = FontWeight.w900;
      break;
    default:
      break;
  }

  let fontStyle = FontStyle.normal;
  switch (figmaFontStyle) {
    case 'Regular':  
      fontStyle = FontStyle.normal;
      break;

    case 'Italic':
      fontStyle = FontStyle.italic;
      break;
  
    default:
      break;
  }

  let textAlign = TextAlign.center;
  switch (node.textAlignHorizontal) {
    case 'LEFT':
      textAlign = TextAlign.left;
      break;
    case 'RIGHT':
      textAlign = TextAlign.right;
      break;
    case 'JUSTIFIED':
      textAlign = TextAlign.justify;
      break;
  }

  const fills = node.fills as ReadonlyArray<Paint>;
  let color = 'FFFFFFFF';
  if (fills.length == 1) {
      const fill = fills[0] as SolidPaint;
      color = rgba2hex([1, fill.color.r, fill.color.g, fill.color.b]).toUpperCase();
  }

  // const dropShadow = node.effects.filter(effect => effect.type == 'DROP_SHADOW');

  let textStyle = new TextStyle({
    fontSize: node.fontSize as number,
    fontWeight: fontWeight,
    fontStyle: fontStyle,
    // decoration: node.textDecoration as string,
    color: Color.fromHex(color),
  });
  let textWidget = new Text(node.characters, {
    textAlign: textAlign,
    style: textStyle,
  });

  return textWidget;
}

export {
  inspectTextNode
}