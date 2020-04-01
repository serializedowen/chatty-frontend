import isElectron from './isElectron';

function setCookie(name, value, days = Date.now() + 60 * 60) {
  if (isElectron()) {
    const { remote } = require('electron');
    const { session } = remote;

    console.log('setting');
    console.log(Reflect.ownKeys(session.defaultSession));

    return session.defaultSession.cookies.set({
      name,
      value,
      expirationDate: days,
      url: 'chatty://home'
    });
  } else {
    var expires = '';
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
  }
}
function getCookie(name) {
  if (isElectron()) {
    const { remote } = require('electron');

    const { session } = remote;
    console.log(Reflect.ownKeys(session.defaultSession));

    console.log(session.defaultSession.cookies.get({ name }));
    return session.defaultSession.cookies.get({ name });
  }
  var nameEQ = name + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
function eraseCookie(name) {
  document.cookie = name + '=; Max-Age=-99999999;';
}

export default { setCookie, getCookie, eraseCookie };
