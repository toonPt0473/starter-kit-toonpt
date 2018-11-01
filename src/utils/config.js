const ENV = {
  dev: {
    API_URL: 'http://localhost:3000/api',
  },
  staging: {
    API_URL: 'https://develop-url.com/api',
  },
  prod: {
    API_URL: 'http://localhost:3000',
  },
}

function getEnvVars(env = '') {
  if (env === null || env === undefined || env === '') return ENV.dev

  if (env.indexOf('dev') !== -1) return ENV.dev
  else if (env.indexOf('staging') !== -1) return ENV.staging
  else if (env.indexOf('prod') !== -1) return ENV.prod
  return ENV.dev
}


export default getEnvVars()
