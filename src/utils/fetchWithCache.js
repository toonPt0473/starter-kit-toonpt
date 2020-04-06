import localforge from 'localforage'
import axios from 'axios'

export default class Fetch {
  constructor(baseURL, defaultHttpHeaders) {
    this.store = localforge.createInstance({
      name: 'BannYa',
    })
    this.headers = defaultHttpHeaders
    this.baseURL = baseURL
  }

  static cacheAge = 1000 * 60 * 15

  mergeHeaders(overideHeader) {
    return { ...(this.headers || {}), ...(overideHeader || {}) }
  }

  mergeBaseURL(overideBaseURL) {
    if (!overideBaseURL) return this.baseURL
    overideBaseURL = overideBaseURL.trim()
    if (overideBaseURL === '') return ''
    if (overideBaseURL) return overideBaseURL
    return this.baseURL
  }


  isBrowser = () => typeof window !== 'undefined'

  genKey = (data) => `${data.method}|${data.url}|${JSON.stringify(data.headers)}|${JSON.stringify(data.data)}`

  genAgeKey = (key) => `age-of:${key}`

  async isInvalid(key) {
    if (!this.isBrowser()) return true
    const current = +new Date()
    const age = await this.getAge(key)
    // console.log('current/age > ', current, age)
    // console.log('age > ', current - age)
    if (!age) return true
    const isExpired = (current - age) > this.cacheAge
    const isInvalid = isExpired
    // console.log('is key > ', age, ' expired', isExpired)
    await this.invalidate({ key, isExpired })
    return isInvalid
  }

  async invalidate(ctx) {
    const { key, isExpired } = ctx
    if (isExpired) {
      await this.store.removeItem(key)
    }
  }

  async setItem(key, data) {
    if (!this.isBrowser()) return
    try {
      await Promise.all([
        this.store.setItem(key, JSON.stringify(data)),
        this.store.setItem(this.genAgeKey(key), +new Date()),
      ])
    } catch (ex) {
      console.error('setItem error > ', ex)
    }
  }

  async getItem(key) {
    if (!this.isBrowser()) return null
    const items = await this.store.getItem(key)
    return JSON.parse(items)
  }

  async getAge(key) {
    if (!this.isBrowser()) return null
    const ageKey = this.genAgeKey(key)
    return this.store.getItem(ageKey)
  }

  async get(url, data, options = {}) {
    const mergedUrl = this.mergeBaseURL(options.baseURL) + url
    const headers = this.mergeHeaders(options.headers)
    const key = this.genKey({ method: 'get', url: mergedUrl, data, headers })
    const isKeyInvalid = await this.isInvalid(key)
    if (!this.isBrowser() || options.noCache || isKeyInvalid) {
      const response = await axios.get(mergedUrl, { params: data, headers })
      await this.setItem(key, response.data)
      return response.data
    }
    console.log('load data from cache')
    return this.getItem(key)
  }

  async post(url, data, options = {}) {
    const mergedUrl = this.mergeBaseURL(options.baseURL) + url
    const headers = this.mergeHeaders(options.headers)
    const key = this.genKey({ method: 'post', url: mergedUrl, data, headers })
    const isKeyInvalid = await this.isInvalid(key)
    if (!this.isBrowser() || options.noCache || isKeyInvalid) {
      const response = await axios.post(mergedUrl, data, { headers })
      await this.setItem(key, response.data)
      return response.data
    }
    console.log('load data from cache')
    return this.getItem(key)
  }

  async put(url, data, options) {
    const mergedUrl = this.mergeBaseURL(options.baseURL) + url
    const headers = this.mergeHeaders(options.headers)
    const key = this.genKey({ method: 'put', url: mergedUrl, data })
    const isKeyInvalid = await this.isInvalid(key)
    if (!this.isBrowser() || options.noCache || isKeyInvalid) {
      const response = await axios.put(mergedUrl, data, { headers })
      await this.setItem(key, response.data)
      return response.data
    }
    console.log('load data from cache')
    return this.getItem(key)
  }

  async patch(url, data, options = {}) {
    const mergedUrl = this.mergeBaseURL(options.baseURL) + url
    const key = this.genKey({ method: 'patch', url: mergedUrl, data })
    const isKeyInvalid = await this.isInvalid(key)
    if (!this.isBrowser() || options.noCache || isKeyInvalid) {
      const response = await axios.patch(mergedUrl, data, { headers: this.mergeHeaders(options.headers) })
      await this.setItem(key, response.data)
      return response.data
    }
    console.log('load data from cache')
    return this.getItem(key)
  }

  async delete(url, data, options) {
    const mergedUrl = this.mergeBaseURL(options.baseURL) + url
    return axios.delete(mergedUrl, { params: data, headers: this.mergeHeaders(options.headers) })
  }
}
