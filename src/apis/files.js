import axios from "axios";

export default {
  /**
   * 上传文件
   * @param {*} params
   */
  uploadFile(params) {
    let token = null;
    if (localStorage.getItem("TOKEN")) {
      token = localStorage.getItem("TOKEN");
    }
    return axios({
      url: `${process.env.VUE_APP_API}upload/singleUpload`,
      method: 'post',
      data: params,
      headers: {
        'Content-Type': 'multipart/form-data',
        'token': token
      }
    })
  },

};
