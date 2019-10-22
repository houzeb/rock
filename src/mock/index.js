import Mock from 'mockjs'
import loginAPI from './login'
import systemAPI from './system'
import articleAPI from './article'
import remoteSearchAPI from './remoteSearch'
import transactionAPI from './transaction'

// 修复在使用 MockJS 情况下，设置 withCredentials = true，且未被拦截的跨域请求丢失 Cookies 的问题
// https://github.com/nuysoft/Mock/issues/300
Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
Mock.XHR.prototype.send = function() {
  if (this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false
  }
  this.proxy_send(...arguments)
}

// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info/, 'get', loginAPI.getUserInfo)

// 系统相关
Mock.mock(/\/system\/systemConfigFindList/, 'post', systemAPI.systemConfigFindList)
Mock.mock(/\/system\/systemConfigEdit/, 'post', systemAPI.systemConfigEdit)
Mock.mock(/\/system\/systemConfigDel/, 'get', systemAPI.systemConfigDel)

export default Mock
