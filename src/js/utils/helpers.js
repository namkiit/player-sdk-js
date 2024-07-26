export const setStyle = (el, prop, val) => {
  el.style[prop] = val;
};

export const setClass = (el, val) => {
  el.className = val;
};

export const setStyles = (el, styles) => {
  for (var prop in styles) {
    setStyle(el, prop, styles[prop]);
  }
};

export const setAttribute = (el, prop, val) => {
  el.setAttribute(prop, val);
};

export const setAttributes = (el, attributes) => {
  for (var prop in attributes) {
    setAttribute(el, prop, attributes[prop]);
  }
};

export const parseSize = (val, p = 1) => {
  if (typeof val !== "number" || val === 0) {
    return 100 * p + "%";
  } else if (val < 0) {
    return val * p * -1 + "%";
  }
  return val * p + "px";
};

export const checkTypeLink = (url) => {
  if (!url) {
    return "unknown";
  }
  // else if (url && urlString.includes(".mp4") || urlString.includes(".MP4")) {
  //   return "mp4";
  // } 
  const urlString = url.toString();
  if (urlString.includes(".m3u8") || urlString.includes(".M3U8")) {
    return "m3u8";
  }
  else if (urlString.includes(".mpd") || urlString.includes(".MPD")) {
    return "dash"
  }
  else {
    return "unknown";
  }
}

export const setLayout = (el, pos, size) => {
  var { x, y } = pos || {};
  //var { w, h } = size || {};
  var w = size.w * -100;
  var h = size.h * -100;
  var styles = {
    width: parseSize(w),
    height: parseSize(h),
  };
  if (x === 1) {
    if (w > 0) {
      styles["left"] = "50%";
      styles["margin-left"] = parseSize(w, -0.5);
    } else {
      styles["left"] = parseSize(0 - Math.abs(100 - Math.abs(w)), 0.5);
      styles["margin-left"] = 0;
    }
  } else if (x === 2) {
    styles["right"] = 0;
    styles["margin-left"] = 0;
  } else {
    styles["left"] = 0;
    styles["margin-left"] = 0;
  }
  if (y === 1) {
    if (h > 0) {
      styles["top"] = "50%";
      styles["margin-top"] = parseSize(h, -0.5);
    } else {
      styles["top"] = parseSize(0 - Math.abs(100 - Math.abs(h)), 0.5);
      styles["margin-top"] = 0;
    }
  } else if (y === 2) {
    styles["bottom"] = 0;
    styles["margin-top"] = 0;
  } else {
    styles["top"] = 0;
    styles["margin-top"] = 0;
  }
  setStyles(el, styles);
};

export const parseJwt = (token) => {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

export const mobileCheck = () => {
  let check = false;
  (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

export const safariCheck = () => {
  return /^((?!chrome|android).)*\bSafari\b.*$/i.test(navigator.userAgent)
};

export const detectIOS16Above = () => {
  const userAgent = navigator.userAgent;
  const iOSVersionRegex = /OS (\d+)_(\d+)/;
  const match = userAgent.match(iOSVersionRegex);

  if (match) {
    const majorVersion = parseInt(match[1], 10);
    if (majorVersion >= 16) {
      // iOS 16+ detected
      console.log("iOS 16 or above detected");
      return true;
    } else {
      // iOS version below 16
      console.log("iOS version below 16");
      return false;
    }
  } else {
    // iOS not detected or user agent string doesn't match the expected pattern
    console.log("iOS not detected");
  }
};

export const destroyShaka = () => {
  if (window.video) {
    window.video.src = '';
  }
  
  if (window.playerShaka) {
    window.playerShaka.unload();
    window.playerShaka.destroy();
    window.playerShaka = undefined;
    console.log('destroy shaka');
  }

  if (window.playerShaka2) {
    window.playerShaka2.unload();
    window.playerShaka2.destroy();
    window.playerShaka2 = undefined;
    console.log('destroy shaka');
  }
}

export const getCurrentTimeAndDate = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hour = String(now.getHours()).padStart(2, '0');
  const minute = String(now.getMinutes()).padStart(2, '0');
  const second = String(now.getSeconds()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  console.log(formattedDate);
  return formattedDate;
}

export const getCurrentOS = () => {
  if (navigator.userAgent.indexOf('Win') != -1) {
    return 'Windows';
  } else if (navigator.userAgent.indexOf('Mac') != -1) {
    return 'MacOS';
  } else if (navigator.userAgent.indexOf('Linux') != -1) {
    return 'Linux';
  } else {
    return '';
  }
}

export function debounce(func, wait) {
  let timeout
  return function(...args) {
    if (!timeout) {
      func(...args)
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
    }
  }
}

export const preventDefaultForSpace = (e) => {
  if (e.keyCode === 32) {
    e.preventDefault()
  }
}

// Fairplay DRM
const ToBase64 = (u8) => {
  return btoa(String.fromCharCode.apply(null, u8));
}

export const uInt8ArrayToString = (array) => {
  return String.fromCharCode.apply(null, array);
}

const base64DecodeUint8Array = (input) => {
  return Uint8Array.from(atob(input), c => c.charCodeAt(0));
}

export const waitFor = (target, type) => {
  return new Promise(resolve => {
    target.addEventListener(type, resolve, { once: true });
  });
}

export const fetchBuffer = async (url) => {
  let result = await fetch(url);
  let buffer = await result.arrayBuffer();
  return buffer;
}

export const fetchAndAppend = async (sourceBuffer, url) => {
  let buffer = await fetchBuffer(url);
  sourceBuffer.appendBuffer(buffer);
  await waitFor(sourceBuffer, 'updateend');
}

export const fetchAndWaitForEncrypted = async (video, sourceBuffer, url) => {
  let updateEndPromise = fetchAndAppend(sourceBuffer, url);
  let event = await waitFor(video, 'encrypted');
  let session = await encrypted(event);
  await updateEndPromise;
  return session;
}

export const runAndWaitForLicenseRequest = async (session, callback) => {
  let licenseRequestPromise = waitFor(session, 'message');
  await callback();
  let message = await licenseRequestPromise;

  let response = await getResponse(message);
  await session.update(response);
}

export const getResponse = async (event, spcPath, token, keyURI) => { // ADAPT: Tailor this to your own protocol.
  const spcbase64 = ToBase64(new Uint8Array(event.message))
  console.log(spcbase64);
  let licenseResponse = await fetch(spcPath, {
    method: 'POST',
    headers: new Headers({
      'Content-type': 'application/json', 'Token': token,
    }),
    body: JSON.stringify({
      //"assetID" : keyURI.substring(6),
      "spc": spcbase64
    })
  });

  let license = await licenseResponse.text();
  let responseObject = JSON.parse(license.trim());
  let keyResponse = responseObject["ckc"];
  console.log(keyResponse);
  console.log(base64DecodeUint8Array(keyResponse));
  return base64DecodeUint8Array(keyResponse);
}