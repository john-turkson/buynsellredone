import { parkwindPlugin } from "@park-ui/tailwind-plugin"

const config = {
  content: ["./src/**/*.{astro,html,js,jsx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {}
  },
  plugins: [parkwindPlugin],
  parkUI: {
    accentColor: "bronze",
    grayColor: "sand",
    borderRadius: "md"
  },
  darkMode: ["class"]
}

export default config
