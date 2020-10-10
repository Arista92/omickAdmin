import Vue from "vue";
import "normalize.css/normalize.css"; // A modern alternative to CSS resets
import "@/icons"; // icon
import "@/permission"; // permission control
import "@/styles/index.scss"; // global css
import App from "./App";
import store from "./store";
import router from "./router";
import axios from "axios"; //api
import moment from "moment";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";
import VueClipboard from "vue-clipboard2";
import KeenUI from "keen-ui"; //材料设计语音 组件库
import "keen-ui/dist/keen-ui.css";
// import CKEditor from '@ckeditor/ckeditor5-vue';
import { mockXHR } from "../mock";
// import vueParticleLine from 'vue-particle-line'
// import 'vue-particle-line/dist/vue-particle-line.css'

import plTable from 'pl-table'
import 'pl-table/themes/index.css' // 引入样式（必须引入)，vuecli3.0不需要配置，cli2.0请查看webpack是否配置了url-loader对woff，ttf文件的引用,不配置会报错哦
// import 'pl-table/themes/plTableStyle.css' //引入这个样式就可以好看啦
Vue.use(plTable);

// import dataV from '@jiaminghi/data-view' //图表组件库
// Vue.use(dataV)




// Vue.use( CKEditor );
VueClipboard.config.autoSetContainer = true;
Vue.prototype.$moment = moment;
Vue.prototype.$axios = axios;
if (process.env.NODE_ENV === "production") {
  mockXHR();
}

Vue.use(ElementUI);
Vue.use(ViewUI);
// Vue.use(axios);
Vue.use(moment);
Vue.use(KeenUI);
Vue.use(VueClipboard);
Vue.config.productionTip = false;
// Vue.use(vueParticleLine)

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
