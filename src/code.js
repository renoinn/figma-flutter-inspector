import { inspectTextNode } from './libs/text_node';
figma.showUI(__html__, { width: 375, height: 425 });
figma.on('selectionchange', () => {
    const nodes = figma.currentPage.selection;
    const selectNode = nodes[0];
    // TODO check undefined
    const nodeType = selectNode.type;
    let data = {};
    let type = null;
    switch (nodeType) {
        case 'TEXT':
            const model = inspectTextNode(selectNode);
            data = model;
            type = 'inspectText';
            break;
        default:
            type = 'notSupported';
            break;
    }
    if (type == null) {
        figma.ui.postMessage({
            type: 'needSelect'
        });
    }
    figma.ui.postMessage({
        type: type,
        data: data
    });
});
