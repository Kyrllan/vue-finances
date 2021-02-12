import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import pt from 'vuetify/es5/locale/pt'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  lang: {
    locales: { pt },
    current: 'pt'
  },
  icons: {
    iconfont: 'md'
  },
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: colors.lightBlue.darken2,
        accent: colors.indigo.darken1,
        info: colors.blue,
        error: colors.red.darken1,
        success: colors.lightBlue.darken2,
        warning: colors.purple.darken1,
        secondary: colors.green.accent4,
        terciary: colors.red.darken2,
        quarternary: colors.grey.darken
      }
    }
  }

})
