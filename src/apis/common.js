import services from "@/utils/services";

export default {
  /**
   * 获取腾讯云签名
   * @param {*} params
   */
  getCOSAuth(params) {
    return services.get(`${process.env.VUE_APP_API}txMaterial/getTemporarySign`, {
      action: "获取腾讯云签名",
      params
    });
  },

};
