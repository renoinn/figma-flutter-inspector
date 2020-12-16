import { rgba2hex } from './rgba2hex';
import { Column, CrossAxisAlignment, MainAxisAlignment, Row, Stack } from '@bridged.xyz/flutter-builder';

function inspectFrameNode(node: FrameNode): Column | Row | Stack {
	let widget;
	switch (node.layoutMode) {
		case 'NONE':
			widget = new Stack({
				children: [],
			});
			break;

		case 'HORIZONTAL':
			widget = new Row({
				children: [],
				mainAxisAlignment: getMainAlignment(node.primaryAxisAlignItems),
				crossAxisAlignment: getCrossAlignment(node.counterAxisAlignItems),
			});
			break;
		
		case 'VERTICAL':
			widget = new Column({
				children: [],
				mainAxisAlignment: getMainAlignment(node.primaryAxisAlignItems),
				crossAxisAlignment: getCrossAlignment(node.counterAxisAlignItems),
			});
	
		default:
			break;
	}

	return widget;
}

function getMainAlignment(primaryAlign: "MIN" | "MAX" | "CENTER" | "SPACE_BETWEEN"): MainAxisAlignment {
	let mainAlignment = MainAxisAlignment.start;
	switch (primaryAlign) {
		case 'CENTER':
			mainAlignment = MainAxisAlignment.center;
			break;
		case 'MIN':
			mainAlignment = MainAxisAlignment.start;
			break;
		case 'MAX':
			mainAlignment = MainAxisAlignment.end;
			break;
		case 'SPACE_BETWEEN':
			mainAlignment = MainAxisAlignment.spaceBetween;
			break;
		default:
			break;
	}
	return mainAlignment;
}

function getCrossAlignment(counterAlign: "MIN" | "MAX" | "CENTER" ): CrossAxisAlignment {
	let crossAlignment = CrossAxisAlignment.center;
	switch (counterAlign) {
		case 'CENTER':
			crossAlignment = CrossAxisAlignment.center;
			break;
		case 'MIN':
			crossAlignment = CrossAxisAlignment.start;
			break;
		case 'MAX':
			crossAlignment = CrossAxisAlignment.end;
			break;
		default:
			break;
	}
	return crossAlignment;
}

export {
	inspectFrameNode
}