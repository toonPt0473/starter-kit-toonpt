export default (name, type) => ({
  request: `${name}/${type}_REQUEST`,
  success: `${name}/${type}_SUCCESS`,
  failure: `${name}/${type}_FAILURE`,
})
