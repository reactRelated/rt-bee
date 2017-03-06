import fetch from 'isomorphic-fetch';
/**
 * 获取对象原型下的类名
 * @param obj   被获取的对象
 * @returns {*}
 */
export function getProType(obj){
    return Object.prototype.toString.call(obj).toLowerCase().replace(/\[|\]/g,"").split(" ")[1];
}

//  http请求头参数配置
const httpDefault = {
    mode: "cors",
    credentials: "include",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json; charset=utf-8"
    }
};


//  失败与成功的状态
const successStatus = 1000;
const errorStatus = 900 ;

/**
 * 根据ajax返回运行相关回调方法
 * @param res   ajax返回处理后的结果
 * @param opts  配置参数
 * @private
 */
function _runCallbacks(res, opts) {
    if (res.code == successStatus) {
        getProType(opts.success) == "function" && opts.success(res);
    } else if (res.code == errorStatus) {
        getProType(opts.error) == "function" && opts.error(res);
    }
}

//  POST、GET、DELETE请求方法配置
export const fetchMethods = ({

    /**
     * POST请求
     * @param opts  相关配置参数
     */
    "Post": (opts) => {
        fetch(opts.url, {
            ...httpDefault,
            "method": "POST",
            "body": JSON.stringify(opts.body)
        }).then((res) => {
            return res.json();
        }).then((res) => {
            _runCallbacks(res, opts);
        }).catch((ex) => {
            throw ex;
        });
    },

    /**
     * GET请求
     * @param opts  相关配置参数
     */
    "Get": (opts) => {
        fetch(opts.url, {
            ...httpDefault,
            "method": "GET"
        }).then((res) => {
            return res.json();
        }).then((res) => {
            _runCallbacks(res, opts);
        }).catch((ex) => {
            throw  ex;
        });
    },

    /**
     * DELETE请求
     * @param opts  相关配置参数
     */
    "Delete": (opts) => {
        fetch(opts.url, {
            ...httpDefault,
            "method": "DELETE",
            "body": JSON.stringify(opts.body)
        }).then((res) => {
            return res.json();
        }).then((res) => {
            _runCallbacks(res, opts);
        }).catch((ex) => {
            throw ex;
        });
    }
});