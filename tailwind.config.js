module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
       backgroundColor : {
         "alpha-0" : "rgba(0, 0, 0, 0)",
         "alpha-100" : "rgba(0, 0, 0, 0.1)",
         "alpha-200" : "rgba(0, 0, 0, 0.2)",
         "alpha-300" : "rgba(0, 0, 0, 0.3)",
         "alpha-400" : "rgba(0, 0, 0, 0.4)",
         "alpha-500" : "rgba(0, 0, 0, 0.5)",
         "alpha-600" : "rgba(0, 0, 0, 0.6)",
         "alpha-700" : "rgba(0, 0, 0, 0.7)",
         "alpha-800" : "rgba(0, 0, 0, 0.8)",
         "alpha-900" : "rgba(0, 0, 0, 0.9)",
         "alpha-full" : "rgba(0, 0, 0, 1)",

       },
      animation : {
        "color-transition" : "color 0.3s ease-in-out"
      }
    },
  },
  plugins: [],
}