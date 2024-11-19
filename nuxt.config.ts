// https://nuxt.com/docs/api/configuration/nuxt-config
export default ({
  // compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  components: true,
  runtimeConfig: {
    public: {
      botId: process.env.NUXT_APP_BOT_ID,
      chatId: process.env.NUXT_APP_CHAT_ID,
      // baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    }
  }
})




