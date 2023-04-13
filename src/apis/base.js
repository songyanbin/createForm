import services from "@/utils/services";

export default {
  login(params) {
    return services.get(`${process.env.VUE_APP_API}adminUser/login`, {
      action: "登录",
      params
    });
  },
  /**
   * 根据用户ID获取菜单列表
   * @param {*} params
   */
  logout(params) {
    return services.get(`${process.env.VUE_APP_API}dsp-login/logout`, {
      action: "退出",
      params
    });
  },
  /**
   * 获取限制支付状态
   * @param {*} params
   */
  getStatus(params) {
    return services.get(`${process.env.VUE_APP_API}rewardDetails/getStatus`, {
      action: "获取限制支付状态",
      params
    });
  },
  /**
   * 设置限制支付状态
   * @param {*} params
   */
  setStatus(params) {
    return services.get(`${process.env.VUE_APP_API}rewardDetails/setStatus`, {
      action: "设置限制支付状态",
      params
    });
  },
};
