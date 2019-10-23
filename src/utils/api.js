import requestOfPost from './common'

export function postRequest(url, data) {
  return new Promise((res, rej) => {
    requestOfPost(url.data).then(re => res(re).catch(err => rej(err)))
  })
}
