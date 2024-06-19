export default defineNuxtConfig({
  devtools: {
    enabled: false,
    timeline: {
      enabled: true,
    },
  },
  css: [
    "~/assets/styles/utility/_normalize.scss",
    "~/assets/styles/app.scss",
    "~/assets/styles/common.scss",
    "~/assets/styles/global.scss",
  ],
  modules: [
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "nuxt-icons",
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxt/eslint",
    "@nuxtjs/color-mode",
  ],
  eslint: {
    config: {
      stylistic: true,
    },
  },
  colorMode: {
    classSuffix: "",
  },
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
  app: {
    pageTransition: {
      name: "fade",
      mode: "out-in", // default
    },
  },
});
