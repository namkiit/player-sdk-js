import shaka from "shaka-player"
import { setClass } from "../js/utils/helpers"
import iconCheck from "../assets/icons/iconCheck"

const onPlayerShaka = (video, dataPlayer, onError) => {
  const { src, drm } = dataPlayer
  shaka.polyfill.installAll()

  if (shaka.Player.isBrowserSupported()) {
    let playerShaka = new shaka.Player(video)
    console.log("Shaka version:", shaka.Player.version)

    playerShaka.addEventListener("error", (event) => {
      const errorCode = event?.detail?.data?.[0]?.data?.[1]
      const shakaCode = event?.detail?.code

      switch (errorCode) {
        case 401:
          onError({ errorCode, errorMessage: "expired or invalid sign key!" })
          break
        case 403:
          onError({ errorCode, errorMessage: "copyright violated user" })
          break
        case 0:
          onError({ errorCode, errorMessage: "user using VPN" })
          break
        case null:
          onError({ errorCode: shakaCode })
          break
        default:
          onError({ errorCode, errorMessage: "link error!" })
      }

      playerShaka.unload()
      clearTimeout(window.fingerprintTimeout)
    })

    playerShaka.addEventListener('loaded', () => {
      let audioTracks = playerShaka.getAudioLanguagesAndRoles()
      if (audioTracks.length > 1) window.btnMultiAudio.classList.remove("hide")

      audioTracks.forEach((track, index) => {
        const trackDiv = document.createElement("div")
        switch (track.language) {
          case "vi":
            trackDiv.innerText = "Bình luận truyền hình"
            break
          case "en":
            trackDiv.innerText = "Bình luận tiếng Anh"
            break
          case "fr":
            trackDiv.innerText = "Bình luận tương tác"
            break
          default:
        }
        setClass(trackDiv, `track ${index}`)
        if (index == 0) {
          trackDiv.classList.add("active")
          trackDiv.appendChild(iconCheck)
          if (track.language == "und")
            window.btnMultiAudio.classList.add("hide")
        }

        trackDiv.addEventListener("click", (e) => {
          window.playerShaka.selectAudioLanguage(track.language)

          document.querySelectorAll("[class^='track']").forEach((element) => {
            element.classList.remove("active")
            if (element.childNodes.length > 1)
              element.removeChild(document.querySelectorAll(".icon-check")[0])
          })
          e.target.classList.add("active")
          e.target.appendChild(iconCheck)
        })

        if (track.language !== "und")
          window.divSwitchTrack.appendChild(trackDiv)
      })

      if (window.divSwitchTrack.childNodes.length < 3)
        window.btnMultiAudio.classList.add("hide")


      /* uncomment if you want to add change quality feature */

      // let qualityLevels = playerShaka.getVariantTracks()
      // if (qualityLevels.length > 1) window.btnMultiQuality.classList.remove("hide")

      // qualityLevels.forEach((level, index) => {
      //   const levelDiv = document.createElement("div")
      //   switch (level.width) {
      //     case 256:
      //       levelDiv.innerText = "144p"
      //       break
      //     case 426:
      //       levelDiv.innerText = "240p"
      //       break
      //     case 640:
      //       levelDiv.innerText = "360p"
      //       break
      //      case 864:
      //       levelDiv.innerText = "480p"
      //       break
      //     case 1280:
      //       levelDiv.innerText = "720p"
      //       break
      //     case 1920:
      //       levelDiv.innerText = "1080p"
      //       break
      //   }
      //   setClass(levelDiv, `level ${index}`)
      //   if (index == 0) {
      //     levelDiv.classList.add("active")
      //     levelDiv.appendChild(iconCheck)
      //     if (level.language == "und")
      //       window.btnMultiQuality.classList.add("hide")
      //   }

      //   levelDiv.addEventListener("click", (e) => {
      //     window.playerShaka.selectQualityLanguage(level.language)

      //     document.querySelectorAll("[class^='level']").forEach((element) => {
      //       element.classList.remove("active")
      //       if (element.childNodes.length > 1)
      //         element.removeChild(document.querySelectorAll(".icon-check")[0])
      //     })
      //     e.target.classList.add("active")
      //     e.target.appendChild(iconCheck)
      //   })
      // })
    })

    if (src) {
      drm
        ? configPlayerSetupDRMToday(playerShaka, dataPlayer)
        : configPlayerSetupNoDRMToday(playerShaka)
      playerShaka
        .load(src)
        .then(() => {
          video.play().catch((error) => {
            if (error.name === "NotAllowedError") {
              // fix low power mode prevent autoplay
              window.playCenterMask.classList.remove("hide")
            }
          })
        })
        .catch((error) => {
          const errorCode = error.code
          if (errorCode === undefined) return
          if (errorCode == 1002) {
            onError({ errorCode: 0, errorMessage: "user using VPN" })
          } else onError({ errorCode })
        })
    } else {
      onError({ errorCode: 400, errorMessage: "link error!" })
    }
    window.playerShaka = playerShaka
  } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
    video.src = dataPlayer.src

    video.play().catch((error) => {
      if (error.name === "NotAllowedError") {
        // fix low power mode prevent autoplay
        window.playCenterMask.classList.remove("hide")
      }
    })
  } else {
    onError({ errorMessage: "shaka-player is not supported" })
  }
}

const configPlayerSetupNoDRMToday = (playerShaka) => {
  playerShaka.configure({
    streaming: {
      rebufferingGoal: 0,
      bufferingGoal: 24,
      bufferBehind: 10,
      retryParameters: {
        timeout: 10000, // timeout in ms, after which we abort 0 means never
        maxAttempts: 3, // the maximum number of requests before we fail
        baseDelay: 1000, // the base delay in ms between retries
        backoffFactor: 2, // the multiplicative backoff factor between retries
        fuzzFactor: 0.5, // the fuzz factor to apply to each retry delay
      },
      alwaysStreamText: true, // relevant subtitle function
    },
    manifest: {
      retryParameters: {
        timeout: 10000, // timeout in ms, after which we abort 0 means never
        maxAttempts: 3, // the maximum number of requests before we fail
        baseDelay: 1000, // the base delay in ms between retries
        backoffFactor: 2, // the multiplicative backoff factor between retries
        fuzzFactor: 0.5, // the fuzz factor to apply to each retry delay
      },
      dash: {
        ignoreMinBufferTime: true,
      },
    },
    abr: {
      defaultBandwidthEstimate: 250000,
    },
  })
}

const configPlayerSetupDRMToday = (playerShaka, dataPlayer) => {
  const { licenseServer, contentId, signKey } = dataPlayer
  playerShaka.configure({
    drm: {
      servers: { "com.widevine.alpha": licenseServer },
      advanced: {
        "com.widevine.alpha": {
          videoRobustness: "SW_SECURE_CRYPTO",
          audioRobustness: "SW_SECURE_CRYPTO",
        },
      },
      retryParameters: {
        timeout: 10000, // timeout in ms, after which we abort 0 means never
        maxAttempts: 2, // the maximum number of requests before we fail
        baseDelay: 1000, // the base delay in ms between retries
        backoffFactor: 2, // the multiplicative backoff factor between retries
        fuzzFactor: 0.5, // the fuzz factor to apply to each retry delay
      },
    },
    streaming: {
      rebufferingGoal: 0,
      bufferingGoal: 24,
      bufferBehind: 10,
      retryParameters: {
        timeout: 10000, // timeout in ms, after which we abort 0 means never
        maxAttempts: 3, // the maximum number of requests before we fail
        baseDelay: 1000, // the base delay in ms between retries
        backoffFactor: 2, // the multiplicative backoff factor between retries
        fuzzFactor: 0.5, // the fuzz factor to apply to each retry delay
      },
      alwaysStreamText: true, // relevant subtitle function
    },
    manifest: {
      retryParameters: {
        timeout: 10000, // timeout in ms, after which we abort 0 means never
        maxAttempts: 3, // the maximum number of requests before we fail
        baseDelay: 1000, // the base delay in ms between retries
        backoffFactor: 2, // the multiplicative backoff factor between retries
        fuzzFactor: 0.5, // the fuzz factor to apply to each retry delay
      },
      dash: {
        ignoreMinBufferTime: true,
      },
    },
    abr: {
      defaultBandwidthEstimate: 250000,
    },
  })

  playerShaka.getNetworkingEngine().registerRequestFilter((type, request) => {
    if (type === shaka.net.NetworkingEngine.RequestType.LICENSE) {
      request.uris[0] += `?content_id=${contentId}`
      request.headers["Token"] = signKey
    }
  })

  playerShaka.getNetworkingEngine().registerResponseFilter((type, response) => {
    // Alias some utilities provided by the library.
    const StringUtils = shaka.util.StringUtils
    const Uint8ArrayUtils = shaka.util.Uint8ArrayUtils

    // Only manipulate license responses:
    if (type == shaka.net.NetworkingEngine.RequestType.LICENSE) {
      // This is the wrapped license, which is a JSON string.
      const wrappedString = StringUtils.fromUTF8(response.data)
      // Parse the JSON string into an object.
      const wrapped = JSON.parse(wrappedString)

      // This is a base64-encoded version of the raw license.
      const rawLicenseBase64 = wrapped.data
      // Decode that base64 string into a Uint8Array and replace the response
      // data.  The raw license will be fed to the Widevine CDM.
      response.data = Uint8ArrayUtils.fromBase64(rawLicenseBase64)

      // Read additional fields from the server.
      // The server we are using in this tutorial does not send anything useful.
      // In practice, you could send any license metadata the client might need.
      // Here we log what the server sent to the JavaScript console for
      // inspection.
      console.log(wrapped)

      window.fingerprints.forEach((fingerprint) => {
        fingerprint.innerHTML = wrapped.app_user_info.visual_code
      })
      sessionStorage.setItem("app-user-id", wrapped.app_user_info.app_user_id)
    }
  })
}

export default onPlayerShaka