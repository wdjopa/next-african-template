const Cookies = require("js-cookie");

module.exports = {
  getCookie: (cookiename) => {
    Cookies.get(cookiename); // => 'value'
  },
  setCookie: (cookiename, cookievalue) => {
    Cookies.set(cookiename, cookievalue, { expires: 365 });
  },
  deleteCookie: (cookiename) => {
    Cookies.remove(cookiename);
  },
};
