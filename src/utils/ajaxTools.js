/* eslint-disable no-undef */
/**
 * 创建xhr对象
 */
function createXHR() {
    var xhr = null;
    if (window.XMLHttpRequest){
        xhr = new XMLHttpRequest(); //IE除外的浏览器
    } else if (window.ActiveXObject) {
        try {
            xhr = new ActiveXObject("Msxm12.XMLHTTP");//最新版的ActiveX对象
        } catch (e) {
            try {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                throw new Error('your browser is not support ajax, please change your browser, try again!')
            }
        }
    }
    return xhr;
}

/**
 * ajax请求
 * @param {Object} options 
 */
function ajax(options) {
    let _default = {
        url: '',
        type: 'get',
        dataType: 'json',
        async: true,
        data: null,
        params: null,
        header: null,
        timeout: 5000,
        success: null,
        error: null,
        progress: null
    }

    for (let key in options) {
        if (options.hasOwnProperty(key)) {
            _default[key] = options[key]
        }
    }

    //如果为get请求，则添加时间戳，防止缓存 
    if (_default['type'] === 'get') {
        if(!!_default['params'] && typeof _default['params'] === 'object'){
            let keyArr = [];
            for(let key in _default['params']){
                keyArr.push(key + '=' + _default['params'][key])
            }
            _default['url'] += '?' + keyArr.join('&');
        } 
        console.log(_default['url'])
    }

    // 发送请求
    let xhr = createXHR();
    xhr.open(_default['type'], _default['url'], _default['async'])
    for(let key in _default['header']){
        xhr.setRequestHeader(key, _default['header'][key]);
    }
    xhr.onprogress = (e) => {
        console.log(e)
        let data = {
            loaded: e.loaded,
            total: e.total,
            readyState: xhr.readyState,
            status: xhr.status
        }
        if(typeof _default['progress'] === 'function'){
            _default['progress'].call(xhr, data)
        }
    }
    xhr.send(_default['data'])
    xhr.onload = () => {
        let config = {
            text: xhr.responseText,
            statusText: xhr.statusText,
            type: xhr.responseType,
            url: xhr.responseURL
        }
        if (/^2\d{2}$/.test(xhr.status)) {
            if (xhr.readyState === 4) {
                let resText = xhr.responseText
                if (_default['dataType'] === 'json') {
                    resText = JSON.parse(resText)
                }
                if (typeof _default['success'] === 'function') {
                    _default['success'].call(xhr, resText, config)
                }
            }
        }
    }
    xhr.onerror = (e) => {
        if(typeof _default['error'] === 'function'){
            _default['error'].call(xhr, e, e.type)
        }
    }
    
}

export default ajax;
