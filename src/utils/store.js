import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    temp: {
      ifTemp: false,
      title: '',
      content: ''
    },
    token: '',
    userid: '',
    username: '',
    currentPerson: {
      articles: [],
      name: '',
      _id: '',
      info: ''
    }
  },
  mutations: {
    login_saveToken(state, tokenWithB) {
      console.log('保存token');
      let token = tokenWithB.split(" ")[1]
        ? tokenWithB.split(" ")[1]
        : tokenWithB;
      let userinfo = setUserIdAndNameFormToken(token);
      state.userid = userinfo.userid
      state.username = userinfo.username
      state.token = token
      window.localStorage.setItem('token', token)
      function parseJwt(token) {
        let secPart = token.split(".")[1];
        let userString = decodeURIComponent(
          escape(window.atob(secPart.replace(/-/g, "+").replace(/_/g, "/")))
        )

        return JSON.parse(userString)
      }
      function setUserIdAndNameFormToken(token) {
        let payloadInfo = parseJwt(token)
        let result = {
          userid: payloadInfo.userid,
          username: payloadInfo.username
        }
        return result
      }
    },

    logout_delToken(state) {
      state.token = ''
      window.localStorage.removeItem('token')

      // console.log(dd);
      state.userid = ''
      state.username = ''
    },
    saveTempContent(state, data) {
      state.temp.title = data.title
      state.temp.content = data.content
      state.temp.ifTemp = true
    },
    setCurrentPerson(state, data) {
      state.currentPerson = data
    }
  },
  actions: {}
})
