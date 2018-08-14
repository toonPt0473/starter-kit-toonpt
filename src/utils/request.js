import axios from 'axios'
import _config from './config'

const baseURL = _config.apiUrl

axios.defaults.baseURL = baseURL
function buildURLFromTemplate(data, options) {
  if (data instanceof FormData) {
    return {
      data,
      url: options.url,
    }
  }
  const outputData = { ...options.defaultParams, ...data }
  const outputURL = options.url.replace(/\{(.+?)\}/g, (m, label) => {
    const value = outputData[label]
    if (value !== undefined) {
      delete outputData[label]
    } else {
      throw new Error(`Cannot find ${label} in ${options.url}`)
    }
    return value
  })
  return {
    data: outputData,
    url: outputURL,
  }
}
export default async (data, options, extraOptions) => {
  const config = {}
  const { data: outputData, url } = buildURLFromTemplate(data, options)
  config.url = url
  switch (options.method) {
    case 'post':
      config.method = 'post'
      config.data = outputData
      break
    case 'get':
      config.method = 'get'
      config.params = outputData
      break
    case 'put':
      config.method = 'put'
      config.data = outputData
      break
    case 'delete':
      config.method = 'delete'
      config.params = outputData
      break
    case 'patch':
      config.method = 'patch'
      config.data = outputData
      break
    default:
      throw new Error('Http method not support')
  }
  // return axios.request(config).then((res) => res.data);
  try {
    // set header
    config.headers = {
      ...options.headers,
    }
    if (localStorage.getItem('ACCESSTOKEN_KEY')) {
      try {
        const token = JSON.parse(localStorage.getItem('ACCESSTOKEN_KEY'))
        if (Date.now() - token.createdAt >= token.TTL - 120) {
          localStorage.clear()
          return Promise.reject({ message: 'token is expired' }) // eslint-disable-line
        }
        config.headers.Authorization = token.id
      } catch (e) {
        delete config.headers.Authorization
      }
    }
    const result = await axios.request({ ...config, ...extraOptions })
    return result.data
  } catch (e) {
    if (e.response && e.response.data && e.response.data.error) {
      e.response = e.response.data.error
    }
    throw e
  }
}
