# Player-SDK-JS

A video player SDK that plays adaptive media formats (such as DASH & HLS) in a browser, using [ShakaJS](https://github.com/shaka-project/shaka-player).

## Getting Started

1. Clone the project:

   - `https://github.com/namkiit/player-sdk-js.git`

2. Navigate to the project directory and install all dependencies:

   - `npm install`

3. To build the SDK, use the following command:

   - `npm run build`

   Alternatively, to listen for changes in development mode, use:

   - `npm run dev`

4. Import `player-sdk.js` file to your project.

## Player Initialization and Usage

Upon successful import, the window DOM element will contain a variable named `playerSDK`. The `playerSDK` variable contains an instance of `PlayerSDK`.

```javascript
const { PlayerSDK } = window.playerSDK
```

The player instance requires three parameters: `container`, `infoPlayer`, and the callback function `handleError`.

`container`: The div element that will contain the player.

```javascript
const container = document.querySelector("#container")
```

`infoPlayer`: An object with various properties defining the player's behavior and content.

```javascript
const infoPlayer = {
  src: "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
  contentId: "example-video",
  signKey: "your-sign-key",
  licenseServer: "your-license-server-url",
  fairplayServer: "your-fairplay-server-url",
  fairplayCertificate: "your-fairplay-certificate-url",
  drm: true,
  isLive: false,
  allowTimeshift: false,
  isAdOn: false,
  adTagUrl:
    "https://pubads.g.doubleclick.net/gampad/ads?" +
    "iu=/21775744923/external/single_ad_samples&sz=640x480&" +
    "cust_params=sample_ct%3Dlinear&ciu_szs=300x250%2C728x90&" +
    "gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=",
  name: "Set title here.",
  startTime: "2022-10-08T14:00:00.000Z",
  volume: 0.4,
};
```

- `src`: source URL of the video (string)
- `contentId`: ID of the video (string)
- `signKey`: sign key of the video (string)
- `licenseServer`: license server URL of the video (string)
- `drm`: true if the video requires a sign key to view, false otherwise (boolean)
- `isLive`: true if the video is a livestream, false if it's VOD (boolean)
- `allowTimeshift`: true if live video allows seeking, false otherwise (boolean). The maximum rewind time from the current live time is 1 hour.
- `isAdOn`: true to show ads at the beginning, false otherwise (boolean)
- `adTagUrl`: URL of the ad to display (string)
- `trackingUrl`: URL of the API for tracking time events
- `name`: title of the video (string)
- `startTime`: start time of the video (string)
- `volume`: volume of the video, ranging from 0 to 1 (number)

<b>Note:</b> You need to implement Google IMA SDK to use ads features

```javascript
<script src="//imasdk.googleapis.com/js/sdkloader/ima3.js"></script>
```

`handleError` is a callback function that returns an error code when a video error occurs.

```javascript
const handleError = (error) => {
  console.log("error :>> ", error)
};
```

Call the `initialize` function to initialize the player.

```javascript
let player = new PlayerSDK(container, infoPlayer, handleError)
player.initialize()
```

Ensure all the player instances are destroyed when switching to a new video link or closing the web page to prevent errors. In ReactJS, put this in the cleanup function:

```javascript
player.destroy();
```

## Displaying Views on Live Video

Call the `showViews` function to display the number of viewers. The function takes two number parameters. The first parameter is the actual number of views, and the second parameter is the minimum number of views to display. For example, the following function call displays 15,260 viewers, which the player will format and round to "15.3K". If the number of viewers is less than 100, the player will display 100 views.

```javascript
player.showViews(15260, 100);
```

## Fingerprint

The feature to display a fingerprint on DRM live videos.

```javascript
if (isLive) {
  callFingerprintAPI(
    this.options.contentId,
    this.options.signKey,
    fingerprints,
    checkFingerprint,
    hideFingerprint,
    onError
  )
}
```

The `callFingerprintAPI` function is included in the Player initialization function. It will be called the first time when the video is in Live format. This function will automatically be called again after a certain period (obtained from the Fingerprint Health-Check API). If the user is blocked, it will return error code 403.

## Error Codes

Error codes are returned by the `onError` callback function.

- Error 0: The user is using a VPN.
- Error 400: Link format error.
- Error 401: Incorrect or expired sign key.
- Error 403: User violated copyright and is blocked.
- Error 410: User is using an adblocker.

Other errors will be returned in a 4-digit number format. For details, see [Shaka Player Error Codes](https://shaka-player-demo.appspot.com/docs/api/shaka.util.Error.html).
