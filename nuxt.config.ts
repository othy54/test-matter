// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss'],
    routeRules: {
        '/**': { static: true },
    },
    experimental: {
        componentIslands: true,
    },

})
