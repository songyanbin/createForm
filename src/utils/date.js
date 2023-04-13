import el from "element-ui/src/locale/lang/el";

const ONE_DAY = 86400000; //24 * 60 * 60 * 1000;
export default {
  /**
   *返回date2比date1大了几天（不是十分准确，可能有1天的偏差）
   *@param {Date} startDate 开始时间
   *@param {Date} endDate 结束时间
   *@returns {Number}
   */
  getDaysPass(startDate, endDate) {
    let t = endDate.getTime() - startDate.getTime(); //相差毫秒
    let day = Math.round(t / 1000 / 60 / 60 / 24);
    if (day === 0 || day === 1) {
      day = startDate.getDate() === endDate.getDate() ? 0 : 1;
    }
    return day;
  },

  /**
   *格式化时间文本
   *@param {String} format 格式化的文本格式
   *@param {Date} date 时间对象
   *@param {Date} zone 时区
   *@returns {String} 格式化后的文本
   * @example
   * MZ.date.format('现在是YYYY年MM月dd日 hh点mm分ss秒，星期w',new Date());
   *  Y 表示年份
   *  M 大写M表示月份
   *  D 表示几号
   *  h 表示小时
   *  m 表示分
   *  s 表示秒
   *  w 表示星期几
   */
  format: function(date, format = "YYYY-MM-DD HH:mm:ss", zone) {
    if (zone && typeof zone === "number") {
      //得到1970年一月一日到现在的秒数
      let len = date.getTime();
      //本地时间与GMT时间的时间偏移差
      let offset = date.getTimezoneOffset() * 60000;
      let utcTime = len + offset;
      date = new Date(utcTime + 3600000 * zone);
    }

    let o = {
      "M+": date.getMonth() + 1, //month
      "D+": date.getDate(), //day
      "H+": date.getHours(), //hour
      "m+": date.getMinutes(), //minute
      "s+": date.getSeconds(), //second
      "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
      S: date.getMilliseconds(), //millisecond
      w: "日一二三四五六".charAt(date.getDay())
    };

    format = format.replace(/Y{4}/, date.getFullYear()).replace(
      /Y{2}/,
      date
        .getFullYear()
        .toString()
        .substring(2)
    );

    let k, reg;
    for (k in o) {
      reg = new RegExp(k);

      /* eslint no-use-before-define:0 */
      format = format.replace(reg, match);
    }

    function match(m) {
      return m.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length);
    }

    return format;
  },

  /**
   * 获得距离指定日期 n 天的日期对象
   * @param {Date} date - 指定日期对象
   * @param {Number} n - 距离指定日期的天数
   * @returns {Date}
   * @example
   * //获取明天的日期对象:
   * MZ.date.getDateByDays(new Date(), 1);
   *
   */
  getDateByDays: function(date, n) {
    if (!date) {
      date = new Date();
    }

    return new Date(date.getTime() + n * ONE_DAY);
  },

  /**
   * 判断日期是否是今天之前
   * @param date
   */
  isLastDay(date) {
    const today = this.format(new Date(), "YYYY-MM-DD");
    const compareDay = this.format(date, "YYYY-MM-DD");
    return today > compareDay;
  },

  /**
   *
   * @param {Date} date 日期
   * @param {Number} days 要增加的天数
   */
  addDays(date, days) {
    return this.addTime(date, ONE_DAY * days);
  },

  /**
   *
   * @param {Date} date 日期
   * @param {Number} time 毫秒数
   */
  addTime(date, time) {
    return new Date(date.getTime() + time);
  },

  getMaxWeek() {
    let now = new Date();
    let nowTime = now.getTime();
    let nowDay = now.getDay();
    //   这里为什么nowDay不用减1，因为北京时间需要-8小时，而日期选择器默认选择一天的0：0：0这个时间，所以不需要减1
    let maxTime = nowTime - (nowTime % ONE_DAY) - nowDay * ONE_DAY - 1;
    return maxTime;
  },

  getWeekNumber(src) {
    const date = new Date(src.getTime());
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
    // January 4 is always in week 1.
    const week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week 1.
    // Rounding should be fine for Daylight Saving Time. Its shift should never be more than 12 hours.
    return (
      1 +
      Math.round(
        ((date.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7
      )
    );
  },
  /*比较同一天两个时间大小*/
   compareTime(t1, t2){
     let d = new Date();
     let ft1 = d.setHours(t1.split(":")[0], t1.split(":")[1]);
     let ft2 = d.setHours(t2.split(":")[0], t2.split(":")[1]);
    return ft1 > ft2
  },
  /*比较日期大小 如果d2为null,则d2 为当前日期*/
  compareDate(d1, d2){
    let date1 = new Date(Date.parse(d1.replace(/-/g, "/")));
    let date2 = null;

    if (!d2) {
      date2 = new Date();
    }else{
      date2 = new Date(Date.parse(d2.replace(/-/g, "/")));
    }
    console.log(date1, date2);
    return date1 > date2
  },
  getTimes(date) {
    return new Date(date).getTime()
  },
  //比较大小
  compareOriDate(start,end) {
    var startTime = new Date(start).getTime();
    var endTime =new Date(end).getTime();
    return startTime<endTime
  }
};
