export default {
  publicRuntimeConfig: {
    authServer: 'http://localhost:3001/auth'
  },
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    link: [
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Alata&family=Comfortaa&display=swap'
      }
    ]
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxt/typescript-build'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/style-resources',
    '@nuxtjs/svg',
    'v-wave/nuxt'
  ],
  server: {
    port: 3000
  },
  axios: {
    baseURL: 'http://localhost:3000'
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},

  styleResources: {
    scss: '~/assets/scss/variables.scss'
  },

  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      home: '/admin'
    },
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'accessToken',
          maxAge: 1800,
          type: 'Bearer'
        },
        refreshToken: {
          property: 'refreshToken',
          data: 'refreshToken',
          maxAge: 60 * 60 * 24 * 30
        },
        user: {
          property: false,
          autoFetch: true
        },
        endpoints: {
          login: { url: 'http://localhost:3001/auth/login', method: 'post' },
          refresh: {
            url: 'http://localhost:3001/auth/refresh-token',
            method: 'post'
          },
          user: { url: 'http://localhost:3001/user', method: 'get' },
          logout: { url: 'http://localhost:3001/auth/logout', method: 'delete' }
        }
      }
    }
  }
}
