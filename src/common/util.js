const Util = {
  // 存取localStorage
  removeStore: function (key) {
    localStorage.removeItem(key);
  },
  getStore: function (key) {
    let val = localStorage.getItem(key) || "";
    return (val.substr(0, 1) === "{" || val.substr(0, 1) === "[") ? JSON.parse(localStorage.getItem(key)) : val;
  },
  setStore: function (key, value) {
    let val = typeof (value) === 'object' ? JSON.stringify(value) : value;
    localStorage.setItem(key, val)
  },
  //存取sessionStorage
  getSession: function (key) {
    let val = sessionStorage.getItem(key) || "";
    return (val.substr(0, 1) === "{" || val.substr(0, 1) === "[") ? JSON.parse(sessionStorage.getItem(key)) : val;
  },
  setSession: function (key, value) {
    let val = typeof (value) === 'object' ? JSON.stringify(value) : value;
    sessionStorage.setItem(key, val)
  },
  removeSession: function (key) {
    sessionStorage.removeItem(key);
  },
  // 获取年
  getYears: function (minYear = 1900) {
    let years = [],
      curYear = new Date().getFullYear();
    for (let i = minYear; i <= curYear; i++) {
      years.push(i)
    }
    return years;
  },
  // 获取月天
  getDays: function (year = new Date().getFullYear(), month = new Date().getMonth()) {
    month = parseInt(month, 10);
    let days = [],
      maxDay = new Date(year, month, 0).getDate();
    for (let i = 1; i <= maxDay; i++) {
      days.push(i)
    }
    return days;
  },
  // 时间格式化
  dateFormat: function (time, fmt) { //author: meizz
    if (time == null || time == "") {
      return "";
    } else {
      var date = new Date(time);
      var o = {
        "M+": date.getMonth() + 1, //月份
        "D+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
      };
      if (/(Y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));

      return fmt;
    }
  },
  // 返回顶部 mySpeed 越大 速度越慢 1为立刻回到顶部
  toTop: function (mySpeed = 200) {
    document.documentElement.scrollTop = document.body.scrollTop = 0;
  },
  //md5
  MD5: function (text) {
    if (!text || text.length <= 0) {
      return '';
    }
    return crypto.MD5(text).toString();
  },
  // inArray
  inArray: function (arr, value) {
    return arr.some(t => t == value)
  },
  // 秒数转时分秒
  secToTime: function (result) {
    var h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600);
    var m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
    var s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
    return result = h + ":" + m + ":" + s;
  },
  // 秒转时分
  secToHourMinute(minutes) {
    // 也可以转换为json，以方便外部使用
    return {
      hour: Math.floor(minutes / 60),
      minute: (minutes % 60)
    };
  },
  // 评论时间
  getCommentDate: function (date) {
    let dateTimeStamp = date * 1000;
    let minute = 1000 * 60;
    let hour = minute * 60;
    let day = hour * 24;
    let halfamonth = day * 15;
    let month = day * 30;
    let now = new Date().getTime();
    let diffValue = now - dateTimeStamp;
    if (diffValue < 0) {
      return;
    }
    let monthC = diffValue / month;
    let weekC = diffValue / (7 * day);
    let dayC = diffValue / day;
    let hourC = diffValue / hour;
    let minC = diffValue / minute;
    let result = '';
    if (monthC >= 1) {
      result = "" + parseInt(monthC) + "月前";
    } else if (weekC >= 1) {
      result = "" + parseInt(weekC) + "周前";
    } else if (dayC >= 1) {
      result = "" + parseInt(dayC) + "天前";
    } else if (hourC >= 1) {
      result = "" + parseInt(hourC) + "小时前";
    } else if (minC >= 1) {
      result = "" + parseInt(minC) + "分钟前";
    } else
      result = "刚刚";
    return result;
  },
  //url参数转对象
  getRequest: function () {
    let url = window.location.search; //获取url中"?"符后的字串
    let theRequest = {};
    if (url.indexOf("?") != -1) {
      let str = url.substr(1);
      let strs = str.split("&");
      for (let i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
      }
    }
    return JSON.stringify(theRequest);
  },
  //url参数转对象
  getRequestHash: function () {
    let url = window.location.hash; //获取url中"#"符后的字串
    let theRequest = {};
    if (url.indexOf("#") != -1) {
      let str = url.substr(1);
      let strs = str.split("&");
      for (let i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
      }
    }
    return JSON.stringify(theRequest);
  },
}

export default Util;