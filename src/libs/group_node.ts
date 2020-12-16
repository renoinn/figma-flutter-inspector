import { rgba2hex } from './rgba2hex';
import { Container, BoxDecoration, BoxShadow, Color, Offset } from "@bridged.xyz/flutter-builder";

function inspectGroupNode(node: GroupNode): Container {
	const decoration = new BoxDecoration({});

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

export {
	inspectGroupNode
}