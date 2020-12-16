import { inspectTextNode } from './libs/text_node';
import { inspectFrameNode } from './libs/frame_node';
import { inspectRectangleNode } from './libs/rectangle_node';
import { inspectGroupNode } from './libs/group_node';

figma.showUI(__html__, { width: 375, height: 425 });

figma.on('selectionchange', () => {
  const nodes = figma.currentPage.selection;
  if (figma.currentPage.selection.length === 0) {
    figma.ui.postMessage({
        type: 'needSelect',
    });
    return;
  }

  if (figma.currentPage.selection.length >= 2) {
    figma.notify("only single selection is supported", {
      timeout: 1.5
    })
    return false;
  }

  const selectNode = nodes[0];
  const data = buildData(selectNode);
  figma.ui.postMessage(data);
});
  
function buildData (node: SceneNode): MessageData {
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

    case 'GROUP':
      const group = inspectGroupNode(node as GroupNode);
      type = 'inspect';
      data = { code: group.build().finalize() };
      break;
    case 'COMPONENT':
      const component = inspectRectangleNode(node as ComponentNode);
      type = 'inspect';
      data = { code: component.build().finalize() };
      break;

    case 'RECTANGLE':
      const rectangle = inspectRectangleNode(node as RectangleNode);
      type = 'inspect';
      data = { code: rectangle.build().finalize() };
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

interface MessageData {
  type: string,
  data?: object // FIXME
}