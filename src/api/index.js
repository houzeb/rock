import RequestBase from './base'

class RequestPC extends RequestBase {
    __axiosRequestInterceptor (config) {
        var __sessionId = localStorage.getItem('SESSIONID')
        typeof config.headers === 'undefined' ? config.headers = {} : null
        config.headers[this.sessionName] = __sessionId
        this.sessionId = __sessionId
        return super.__axiosRequestInterceptor(config)
    }
    __axiosResponseInterceptorError (error) {
		// Do something with response error
		// if (error.response.status == 401) {
        //     location.href = '/login'
        // }
        let data = {}
        function jump(url, time) {
            setTimeout(function(){
                location.href = url
            }, time*1000)
        }
        if (error.response && error.response.status) {
            data = {
                code: error.response.status,
                msg: ''
            }
            switch (error.response.status) {
                case 401: 
                    data.msg = '未登录,即将跳转登录页'
                    jump('/login', 2)
                    break;
                case 403: 
                    data.msg = '登录超时，请重新登录'
                    jump('/login', 2)
                    break;
                case 404: 
                    data.msg = '接口请求地址不存在！'
                    // jump('/404', 2)
                    break;
                default: 
                    data.msg = '服务器开小差了'
                    break;
            }
        } else {
            data = {
                msg: error.message.indexOf('timeout') !== -1 ? '请求超时，请稍后重试' : error.message
            }
            // alert(data.msg)
        }
		return Promise.resolve(data)
    }
    
}
export default RequestPC