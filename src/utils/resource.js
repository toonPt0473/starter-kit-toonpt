import request from './request';
class Resource {
  constructor(url, customActions) {
    this.url = url;
    this.actions = {
      find: {
        url: `${url}`,
        method: 'get',
      },
      create: {
        url: `${url}`,
        method: 'post',
      },
      findById: {
        url: `${url}/{id}`,
        method: 'get',
      },
      update: {
        url: `${url}/{id}`,
        method: 'patch',
      },
      delete: {
        url: `${url}/{id}`,
        method: 'delete',
      },
      count: {
        url: `${url}/count`,
        method: 'get',
      },
      findOne: {
        url: `${url}/findOne`,
        method: 'get',
      },
      upsertWithWhere: {
        url: `${url}/upsertWithWhere?where={where}`,
        method: 'post',
      },
    };
    this.build({ ...this.actions, ...customActions });
  }
  build(actions) {
    Object.keys(actions).forEach((key) => {
      const config = actions[key];
      if (!config.url.startsWith('/')) {
        config.url = `${this.url}/${config.url}`;
      }
      this[key] = (data, options = {}) => request(data, config, options);
    });
  }
}
export default Resource;
