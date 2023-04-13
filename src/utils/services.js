/**
 * 这里是ajax的通用访问接口处理
 */
import axios from "axios";
import Qs from "qs";
import "./expromise";
import vm from '@/main';
const toString = Object.prototype.toString;
const service = axios.create({
  baseURL: "",
  timeout: 600000,
  transformRequest: function(data, config, test) {
    return Qs.stringify(data);
  },
  headers: {
    "Cache-Control": "no-cache",
    "Content-Type": "application/x-www-form-urlencoded",
    "X-Requested-With": "XMLHttpRequest"
  }
});
/**
 * 服务端接口empty字符串跟null返回的结果不同，过滤掉empty字符串
 * @param params
 */
function filterEmptyKey(params) {
  Object.keys(params).forEach(key => {
    if (params[key] === "" || params[key] === null) {
      delete params[key];
    }
  });
}

service.interceptors.request.use(
  config => {
    if (localStorage.getItem("TOKEN")) {
      config.headers["token"] = localStorage.getItem("TOKEN");
    }
    if (config.method === "post") {
      const params = {
        ...config.data
      };
      // filterEmptyKey(params);
      const lowerUrl = (config.url + "").toLocaleLowerCase();
      const hasAbsoluteSchema = config.url.indexOf("http") === 0;
      if (!hasAbsoluteSchema) {
        if (lowerUrl.indexOf("/dsp/") > -1 || lowerUrl.indexOf("/dmp/") > -1) {
          for (const key in params) {
            const type = toString.call(params[key]);
            if (type === "[object Object]" || type === "[object Array]") {
              params[key] = JSON.stringify(params[key]);
            }
          }
        }
      }
      config.data = params;
    } else if (config.method === "get") {
      config.params = {
        _t: Date.parse(new Date()) / 1000,
        ...config.params
      };
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  res => {
    const { data, config } = res;
    if ((!data.succeed || data.succeed === "false") && data.code !== 200) {
      const msg = data.errorMessage || data.message || "未知错误";
      const code = data.errorCode || data.code || -1000;

      //未手动配置 隐藏 消息提示时，公共提醒错误
      if (!config.hidden) {
       vm.$message.error(`${config.action}失败：${msg}`);
      }
      //登录权限跳转
      if (code === 401) {
        setTimeout(() => {
          if (vm.$route.fullPath.indexOf("/login") === -1) {
            const url = encodeURIComponent(vm.$route.fullPath);
            vm.$router.replace(`/login?gotoUrl=${url}`);
          }
        }, 1000);
      } else if (code === 403) {
        setTimeout(function() {
          vm.$router.replace("/");
        },1500)
      } else if (code === 418) {
        setTimeout(function() {
          vm.$router.replace("/login");
        },1500)
      }

      //return Promise.reject(new Error('请求失败'))
      return Promise.reject({
        code: code,
        message: msg
      });
    }

    return data || {};
  },
  error => {
    if (!error.config.hidden) {
      let message = error.message;
      if (error.response && error.response.status === 403) {
        message = "您没有该权限";
        setTimeout(function() {
          const url = encodeURIComponent(window.location.href);
          window.top.location.href = `/login?gotoUrl=${url}`;
        },1500)
      } else if (error.response && error.response.status === 502) {
        message = "系统升级中，请稍后重试";
      } else if (error.response && error.response.status === 504) {
        message = "系统超时，请重试";
      } else if (error.response && error.response.status === 401) {
        message = "请登录";
        if (vm.$route.fullPath.indexOf("/login") === -1) {
          const url = encodeURIComponent(vm.$route.fullPath);
          vm.$router.replace(`/login?gotoUrl=${url}`);
        }
      } else if (error.response && error.response.status === 418) {
        message = "该用户已停用";
        const url = encodeURIComponent(window.location.href);
        setTimeout(function () {
          window.top.location.href = `/login?gotoUrl=${url}`;
        },1500)
      }
      vm.$message.error(`${error.config.action}失败：${message}`);
    }
    return Promise.reject(error);
  }
);

/**
 * 以json格式向后端提交数据
 *
 * @param {String} url 请求的url
 * @param {Object} params 参数
 * @param {Object} config 配置
 *
 * @returns promise对象
 */
service.json = (url, params, config) => {
  let isArray = Object.prototype.toString.call(params) === "[object Array]";
  const defaultConfig = {
    headers: {
      "Content-Type": "application/json"
    },
    transformRequest: function(data, requestConfig) {
      if (isArray) {
        return JSON.stringify(params);
      }
      return JSON.stringify(data);
    }
  };
  const newConfig = Object.assign(defaultConfig, config);
  return service.post(url, params, newConfig);
};
export default service;
