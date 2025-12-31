import Vue from 'vue'
import './pollyfills'
import store from 'src/store/'
import VueRouter from 'vue-router'
import VueRouterPrefetch from 'vue-router-prefetch'
import VueNotify from 'vue-notifyjs'
import VeeValidate from 'vee-validate'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/pt-br'
import App from './App.vue'
import Print from 'vue-print-nb'

import VueTheMask from 'vue-the-mask'
import Vuelidate from 'vuelidate'

// Plugins
import GlobalComponents from './globalComponents'
import GlobalDirectives from './globalDirectives'
import initProgress from './progressbar'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'v-slim-dialog/dist/v-slim-dialog.css'
import SlimDialog from 'v-slim-dialog'

// router setup
import routes from './routes/routes'

import './assets/sass/stylecss-dashboard.scss'
import './assets/sass/demo.scss'
import 'element-ui/lib/theme-chalk/index.css'

import './registerServiceWorker'
import methods from 'src/util/methods'

// plugin setup
Vue.mixin(methods)
Vue.use(VueRouter)
Vue.use(VueRouterPrefetch)
Vue.use(GlobalDirectives)
Vue.use(GlobalComponents)
Vue.use(VueNotify)
Vue.use(VeeValidate)


Vue.use(VueAxios, axios)
Vue.use(ElementUI, { locale })

Vue.use(VueTheMask)
Vue.use(require('vue-moment'))
Vue.use(Vuelidate)

Vue.use(SlimDialog)

Vue.use(Print);


Vue.config.productionTip = false

// configure router
const router = new VueRouter({
    routes, // short for routes: routes
    linkActiveClass: 'active',
    scrollBehavior: (to) => {
        if (to.hash) {
            return { selector: to.hash }
        } else {
            return { x: 0, y: 0 }
        }
    }
})

initProgress(router);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store
})