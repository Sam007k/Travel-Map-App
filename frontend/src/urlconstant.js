// Constants.js
const production = {
    url: `https://travel-map-app-api.onrender.com/api/`,
  };
  const development = {
    // url: "http://localhost:8800/api/",
    url: "http://supreme-space-fortnight-75wgrv7p7px3xqvj-8800.app.github.dev/api/"
  };
  export const config =
    process.env.NODE_ENV === "development" ? development : production;