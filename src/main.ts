import Vue from 'vue';
import App from './App.vue';
import './style/index.styl';
import './game';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
