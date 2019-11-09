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
        header: null,
        success: null,
        error: null
    }

    for (let key in options) {
        if (options.hasOwnProperty(key)) {
            _default[key] = options[key]
        }
    }

    //如果为get请求，则添加时间戳，防止缓存 
    if (_default['type'] === 'get') {
        let timeStamp = new Date().getTime();
        _default['url'].indexOf('?') != -1 ? _default['url'] += '&' : _default['url'] += '?';
        _default['url'] += '_=' + timeStamp;
    }

    let xhr = createXHR();
    xhr.open(_default['type'], _default['url'], _default['async'])
    xhr.onreadystatechange = () => {
        if (/^2\d{2}$/.test(xhr.status)) {
            if (xhr.readyState === 2) {
                if (typeof _default['getHeader'] === 'function') {
                    _default['getHeader'].call(xhr)
                }
            }
            if (xhr.readyState === 4) {
                let value = xhr.responseText;
                if (_default['dataType'] === 'json') {
                    value = JSON.parse(value)
                }
                if (typeof _default['success'] === 'function') {
                    _default['success'].call(xhr, value)
                }
            }
        }
    }
    xhr.send(_default['data'])
}

export default ajax;
