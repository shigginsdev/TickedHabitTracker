import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

console.log('SUPABASE URL:', import.meta.env.VITE_SUPABASE_URL)

createApp(App).use(router).mount('#app')
