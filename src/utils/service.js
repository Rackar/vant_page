import axios from 'axios'

function getTokenByLocal() {
  let token = localStorage.getItem('token') || ''
  return token
}
JSON.stringify()
const service = axios.create({
  baseURL: 'apply',
  timeout: 5000
})

console.dir(service)

//request拦截
service.interceptors.request.use(
  config => {
    if (getTokenByLocal()) {
      config.headers['token'] = getTokenByLocal()
      config.headers['ContentType'] = 'application/json;charset=utf-8'
    }
    return config
  },
  err => {
    Promise.reject(err)
  }
)

//response拦截器
service.interceptors.response.use(
  response => {
    let res = response.data
    if (res.code == '400') {
      //认证处理
    } else {
      //正常
    }
    return Promise.resolve(res.data)
  },
  err => {
    return Promise.reject(err)
  }
)

export default service
