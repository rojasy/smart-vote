import './assets/main.css'
import { createApolloProvider } from '@vue/apollo-option'
import { apolloClient } from './apollo-client.js'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VueAxios from 'vue-axios'
import axios from 'axios'

const app = createApp(App)

// Create a provider
const apolloProvider = createApolloProvider({
    defaultClient: apolloClient,
  })

const pinia = createPinia()

pinia.use(({store})=>{
    store.router = markRaw(router)
})

app.use(apolloProvider);
app.use(pinia)
app.use(VueAxios,axios)
app.use(router)

app.mount('#app')
