<template>
  <div>
    <h2>Flutter Inspector</h2>
    <div>
      <pre id="inspect">{{ inspect }}</pre>
    </div>
  </div>
</template>

<script>
import { rgba2hex } from './libs/rgba2hex';

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
        this.inspect = '// select object type not supported. node: ' + message.data.pluginMessage.data.node;
        return;
      }
      if (message.data.pluginMessage.type == 'inspect') {
        let params = "";
        const data = message.data.pluginMessage.data;
        console.log(data.code);
        this.inspect = data.code;
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