import {postRequest} from './api'

export function loginApi(params, cb) {
  postRequest('./apply/login', params, cb)
}
