const env = process.env.NODE_ENV || 'defaultConfig'
let baseUrl = 'http://localhost:8000'
const defaultConfig = {
  baseUrl,
  apiUrl: `${baseUrl}/api/`,
}

let config = {}
switch (env) {
  case 'development':
    baseUrl = 'http://localhost:8000'
    break
  case 'production':
    baseUrl = 'https:/api.myproject.com'
    break
  default:
    break
}
config = {
  baseUrl,
  apiUrl: `${baseUrl}/api/`,
}

export default {
  ...defaultConfig,
  ...config,
}
