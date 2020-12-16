import { rgba2hex } from './rgba2hex';
import { Border, BorderRadius, BoxBorder, BoxDecoration, BoxShadow, Color, Container, Offset, Radius } from '@bridged.xyz/flutter-builder';

function inspectRectangleNode(node: RectangleNode | ComponentNode): Container {
	const decoration = new BoxDecoration({});

	if (typeof node.cornerRadius == 'number') {
		decoration.borderRadius = BorderRadius.circular(node.cornerRadius);
	} else {
		let radius:RadiusLTRB = {};
		if (node.topLeftRadius) radius.topLeft = Radius.circular(node.topLeftRadius);
		if (node.topRightRadius) radius.topRight = Radius.circular(node.topRightRadius);
		if (node.bottomLeftRadius) radius.bottomLeft = Radius.circular(node.bottomLeftRadius);
		if (node.bottomRightRadius) radius.bottomRight = Radius.circular(node.bottomRightRadius);
		decoration.borderRadius = BorderRadius.only(radius);
	}
	if (node.strokes.length == 1) {
		const stroke = node.strokes[0] as SolidPaint;
		const color = Color.fromHex(rgba2hex([stroke.opacity, stroke.color.r, stroke.color.g, stroke.color.b]).toUpperCase());
		const border = Border.all({color: color, width: node.strokeWeight});
		decoration.border = border;
	}
	const fills = node.fills as ReadonlyArray<Paint>;
	if (fills.length == 1) {
		const fill = node.fills[0] as SolidPaint;
		const color = Color.fromHex(rgba2hex([fill.opacity, fill.color.r, fill.color.g, fill.color.b]).toUpperCase());
		decoration.color = color;
	} else if (fills.length > 1) {
		// TODO build gradient
	}

	const dropShadows = node.effects.filter(effect => effect.type == 'DROP_SHADOW');
	if (dropShadows.length > 0) {
		const boxShadows = [];
		dropShadows.map(effect => {
			const shadow = effect as ShadowEffect;
			const boxShadow = new BoxShadow({
				color: Color.fromHex(rgba2hex([shadow.color.a, shadow.color.r, shadow.color.g, shadow.color.b]).toUpperCase()),
				offset: new Offset(shadow.offset.x, shadow.offset.y),
				blurRadius: shadow.radius,
				spreadRadius: shadow.spread
			});
			boxShadows.push(boxShadow);
		});
		decoration.boxShadow = boxShadows;
	}

	const container = new Container({
		width: node.width,
		height: node.height,
		decoration: decoration
	});

	return container;
}

interface RadiusLTRB {
	topLeft?: Radius,
	topRight?: Radius,
	bottomLeft?: Radius,
	bottomRight?: Radius,
};

export {
	inspectRectangleNode
}