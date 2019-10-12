import axios from 'axios'
import { Notify } from 'quasar'

let finishFunction = response => {
  return response
}

let errorFunction = error => {
  if (error.response === undefined) {
    Notify.create({
      message: 'Nosso servidor encontra-se temporariamente indisponível, tente mais tarde por favor.',
      color: 'black',
      textColor: 'white',
      position: 'top',
      icon: 'sentiment_very_dissatisfied',
      timeout: 10000
    })
  }
  return Promise.reject(error)
}

const legadoApi =
axios.create({baseURL: process.env.URL_LEGADO + '/creaOnLine'})

const restApi =
axios.create({baseURL: process.env.API + '/rest-api/crea', headers: {'Authorization': localStorage.getItem('TOKEN')}})
restApi.interceptors.response.use(finishFunction, errorFunction)
restApi.interceptors.request.use(function (config) {
  config.headers['Authorization'] = localStorage.getItem('TOKEN')
  return config
}, function (error) {
  return Promise.reject(error)
})

const restApiExterna =
axios.create({baseURL: process.env.API + '/rest-api/crea'})

const protocoloApi =
axios.create({baseURL: process.env.SPRING + '/protocolo-api', headers: {'Authorization': localStorage.getItem('TOKEN')}})
protocoloApi.interceptors.response.use(finishFunction, errorFunction)
protocoloApi.interceptors.request.use(function (config) {
  config.headers['Authorization'] = localStorage.getItem('TOKEN')
  config.headers['Accept'] = '*/*'
  return config
}, function (error) {
  return Promise.reject(error)
})

export default ({ Vue }) => {
  Vue.prototype.$axios = restApi
  Vue.prototype.$axiosLegago = legadoApi
  Vue.prototype.$axiosProtocoloApi = protocoloApi
  Vue.prototype.$axiosApiExterna = restApiExterna
  Vue.prototype.$axiosApiExterna.CancelToken = axios.CancelToken
}
