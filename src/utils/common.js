import service from './service'

//耦合度低
export default function requestOfPost(url, data) {
  return service.post(url, data)
}
