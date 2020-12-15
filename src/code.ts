import { inspectTextNode } from './libs/text_node';
import { inspectFrameNode } from './libs/frame_node';

figma.showUI(__html__, { width: 375, height: 425 });

figma.on('selectionchange', () => {
  const nodes = figma.currentPage.selection;
  const selectNode = nodes[0];
  
  const data = buildData(selectNode);

  figma.ui.postMessage(data);
});
  
function buildData (node: SceneNode) {
  // TODO check undefined
  const nodeType = node.type;

  let data = {};
  let type = 'needSelect';
  switch (nodeType) {
    case 'TEXT':
      const text = inspectTextNode(node as TextNode);
      type = 'inspect';
      data = { code: text.build().finalize() };
      break;

    case 'FRAME':
      const frame = inspectFrameNode(node as FrameNode);
      type = 'inspect';
      data = { code: frame.build().finalize() };
      break;

    case 'RECTANGLE':
    case 'GROUP':
    case 'COMPONENT':
      type = 'notSupported';
      break;

    default:
      type = 'notSupported';
      break;
  }

  return {
    type: type,
    data: data,
  }
}
