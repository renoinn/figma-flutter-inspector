<template>
  <div>
    <h2>Flutter Inspector</h2>
    <div>
      <highlightjs language='dart' class="dart" :code="inspect" />
    </div>
  </div>
</template>

<script>
import { rgba2hex } from './libs/rgba2hex';
import 'highlight.js/styles/stackoverflow-dark.css';

export default {
  name: "App",
  data() {
    return {
      inspect: '// please select object.'
    };
  },
  created() {
    onmessage = message => {
      if (message.data.pluginMessage.type == 'needSelect') {
        this.inspect = '// please select object.';
        return;
      }
      if (message.data.pluginMessage.type == 'notSupported') {
        this.inspect = '// select object type not supported';
        return;
      }
      if (message.data.pluginMessage.type == 'inspectText') {
        let params = "";
        const data = message.data.pluginMessage.data;
        let textAlign = 'center';
        switch (data.textAlign) {
          case 'LEFT':
            textAlign = 'left';
            break;
          case 'RIGHT':
            textAlign = 'right';
            break;
          case 'JUSTIFIED':
            textAlign = 'justify';
            break;
        }
        let fontWeight = 'normal';
        switch (data.style.fontWeight) {
          case 'Regular':
            fontWeight = 'normal';
            break;
          case 'Thin':
            fontWeight = 'w200';
            break;
          case 'Light':
            fontWeight = 'w300';
            break;
          case 'Medium':
            fontWeight = 'w500';
            break;
          case 'Bold':
            fontWeight = 'w700';
            break;
          case 'Black':
            fontWeight = 'w900';
            break;
          default:
            break;
        }

        let shadows = null;
        if (data.style.shadows.length > 0) {
          const dropShadow = data.style.shadows.filter(effect => effect.type == 'DROP_SHADOW');

          if (dropShadow.length > 0) {
          const shadowItems = dropShadow.map(effect => `Shadow(blurRadius: ${effect.radius}, color: Color(0x${rgba2hex([effect.color.r, effect.color.g, effect.color.b, effect.color.a])}), offset: Offset(${effect.offset.x}, ${effect.offset.y})),\n`);
          
            shadows = `    shadows: [\n`;
            for (let i = 0; i < shadowItems.length; i++) {
              const element = shadowItems[i];
              shadows += `      ${element}\n`;
            }
            shadows += `    ],\n`;
          }
        }

        params = `const Text(\n`;
        params += `  '${data.value}',\n`;
        params += `  style: TextStyle(\n`;
        params += `    color: Color(0x${data.style.color}),\n`;
        params += `    fontSize: ${data.style.fontSize},\n`;
        params += `    fontWeight: FontWeight.${fontWeight}\n`;

        if (shadows != null) {
          params += shadows;
        }

        params += `  ),\n`;
        params += `  textAlign: TextAlign.${textAlign},\n`;

        

        params += `)`;

        this.inspect = params;
      }
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}

#inspect {
  /* background: #555566;
  color: #FEFEFE; */
  text-align: left;
  overflow-wrap: break-word;
  white-space: pre-wrap;
}
</style>