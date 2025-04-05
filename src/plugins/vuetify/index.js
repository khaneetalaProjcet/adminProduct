import { createVuetify } from 'vuetify'
import { fa } from 'vuetify/locale';
import { VBtn } from 'vuetify/components/VBtn'
import defaults from './defaults'
import { icons } from './icons'
import { themes } from './theme'

// Styles
import '@core/scss/template/libs/vuetify/index.scss'
import 'vuetify/styles'

export default function (app) {
  const vuetify = createVuetify({
    aliases: {
      IconBtn: VBtn,
    },
    defaults,
    icons,
    theme: {
      defaultTheme: 'light',
      themes,
    },
    locale: {
      locale: 'fa',
      messages: { fa },
    },
    rtl: true,
  })

  app.use(vuetify)
}
