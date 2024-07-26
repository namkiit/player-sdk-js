# Vinasport-Player-Web

## Bắt đầu

Import file player-sdk.js vào dự án và link với file index.html. Sau khi import thành công, window DOM element sẽ chứa 1 biến là playerSDK.

Biến playerSDK chứa 1 instance là VinasportPlayer.

``` javascript
    const { PlayerSDK } = window.playerSDK;
```

Chúng ta cần truyền vào instance 3 tham số lần lượt là container, infoPlayer và hàm callback handleError.

container là thẻ div chứa player.

``` javascript
    const container = document.querySelector("#container");
```

infoPlayer là object gồm các key chứa thông tin của player.

``` javascript
    const infoPlayer = {
        src: 'https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8',
        contentId: 'example-video',
        signKey: 'your-sign-key',
        licenseServer: 'your-license-server-url',
        fairplayServer: 'your-fairplay-server-url',
        fairplayCertificate: 'your-fairplay-certificate-url',
        drm: true,
        isLive: false,
        allowTimeshift: false,
        isAdOn: false,
        adTagUrl: 'https://pubads.g.doubleclick.net/gampad/ads?' +
          'iu=/21775744923/external/single_ad_samples&sz=640x480&' +
          'cust_params=sample_ct%3Dlinear&ciu_szs=300x250%2C728x90&' +
          'gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=',
        name: 'Set title here.',
        startTime: '2022-10-08T14:00:00.000Z',
        volume: 0.4
    }
```
- src: source của video (string)
- contentId: id của video (string)
- signKey: sign key của video (string)
- licenseServer: license server của video (string)
- drm: true khi video cần sign key để xem, false khi ngược lại (boolean)
- isLive: true khi video dạng livestream, false khi video dạng VOD (boolean)
- allowTimeshift: true khi video live cho phép tua, false khi ngược lại (boolean). Thời gian tua lại so với thời gian hiện tại của video là 1 tiếng.
- isAdOn: true khi muốn player hiển thị quảng cáo lúc đầu vào, false khi ngược lại (boolean)
- adTagUrl: url của quảng cáo muốn player hiển thị (string)
- trackingUrl: url của api tracking time event
- name: tiêu đề của video (string)
- startTime: thời gian bắt đầu (string)
- volume: âm lượng video, có giá trị từ 0 đến 1 (number)

Hàm handleError là function callback trả về mã lỗi khi xảy ra lỗi video.

```javascript
    const handleError = (error) => {
      console.log('error :>> ', error);
    }
```
## Khởi tạo và sử dụng Player

Gọi hàm initialize để khởi tạo player.

```javascript
    let player = new VinasportsPlayer(container, infoPlayer, handleError)
    player.initialize() 
```

Lưu ý rằng mỗi khi chuyển sang link video mới hoặc tắt trang web phải destroy player, nếu không sẽ xảy ra lỗi.

```javascript
    player.destroy() 
```

## Hiển thị lượt views trên video live

Gọi hàm showViews để hiển thị số người xem, hàm nhận 2 tham số kiểu number. Tham số đầu tiên là lượt view thật, tham số thứ 2 là lượt view tối thiểu hiển thị. Ví dụ hàm sau đây hiển thị số người xem là 15260, player sẽ format và làm tròn thành "15.3K". Nếu số người xem nhỏ hơn 100 thì player hiển thị 100 view.

``` javascript
    player.showViews(15260, 100) 
```

## Fingerprint

Tính năng hiển thị fingerprint trên video live có DRM.

``` javascript
    if(isLive) {
        callFingerprintAPI(this.options.contentId, this.options.signKey, fingerprints, checkFingerprint, hideFingerprint, onError);
      }
```

Hàm callFingerprintAPI đã bao gồm trong hàm khởi tạo Player. Hàm sẽ gọi lần đầu khi video là định dạng Live. Hàm này sẽ tự gọi lại sau 1 khoảng thời gian (được lấy từ API Fingerprint Health-Check). Nếu user bị block thì sẽ trả về mã lỗi 403.

Tính năng tracking mốc thời gian ở video đã xem. Hàm nhận tham số đầu vào là một object với những thuộc tính như ở dưới:

```javascript
    player.trackingTime({
        app_id: "ONPlus", // Required, Định danh ứng dụng trên tất cả các nền tảng 
        app_package: "onplus.com.vn", // Required, Định danh ứng dụng trên từng nền tảng 
        user_id: "254785436", // Required, Định danh người dùng 
        advertising_id: "", 
        device_id: "aaaa", // Required, Định danh thiết bị 
        device_model: "", 
        device_brand: "", 
        device_os: "",
        mobile_number: "", 
        fullname: "", 
        address: "", 
        channel_id: "channel_123", // Required, Định danh kênh xem
        channel_title: "channel title", 
        program_id: "", 
        program_title: "", 
        genre: "", 
    })
```

Những thuộc tính nào được đánh dấu là "required" mà truyền vào với giá trị rỗng thì console sẽ báo những thuộc tính còn thiếu.

## Mã lỗi

Mã lỗi được trả về bởi callback function onError.

- Lỗi 0: Người dùng đang sử dụng VPN.
- Lỗi 400: lỗi định dạng link.
- Lỗi 401: sign key sai hoặc hết hạn.
- Lỗi 403: user vi phạm bản quyền & bị block.
- Lỗi 410: user đang sử dụng adblock.

Các lỗi khác sẽ được trả về dưới định dạng number 4 chữ số. Chi tiết xem tại https://shaka-player-demo.appspot.com/docs/api/shaka.util.Error.html