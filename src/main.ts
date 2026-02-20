import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

console.log('SUPABASE URL:', import.meta.env.VITE_SUPABASE_URL)

createApp(App).mount('#app')
