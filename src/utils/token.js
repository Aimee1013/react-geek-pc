// 封装local Storage存取token

const key = 'pc-key'

// 存token
const setToken = (token) => {
  return window.localStorage.setItem(key, token)
}

// 取token
const getToken = () => {
  return window.localStorage.getItem(key)
}

// 删除token
const removeToken = () => {
  return window.localStorage.removeItem(key)
}

export {
  setToken,
  getToken,
  removeToken
}