import { createApp } from 'vue'
import App from '@/App.vue'
import { registerPlugins } from '@core/utils/plugins'
import Vue3PersianDatetimePicker from 'vue3-persian-datetime-picker';



// Styles
import '@core/scss/template/index.scss'
import '@layouts/styles/index.scss'
import "@/assets/styles/main.css"
import "@/assets/styles/index.css"

// Create vue app
const app = createApp(App)
app.use(
    Vue3PersianDatetimePicker, {
    name: 'persian-date-picker',
    props: {
        editable: false,
        inputClass: 'form-control my-perian-datepicker',
        color: '#ae8947',
        autoSubmit: true,
    }
}
);


// Register plugins
registerPlugins(app)

// Mount vue app
app.mount('#app')
