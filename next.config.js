const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  return {
    env: {
      SERVER_URL: isDev ? "http://localhost:3000" : "https://wedding-invitation-admin.herokuapp.com",
    }
  }
}