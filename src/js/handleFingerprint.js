import { parseJwt } from "./utils/helpers"

export const callFingerprintAPI = (contentId, signKey, fingerprints, onError) => {
  let isFingerprint = false
  let heartbeatInterval
  let fingerprintTimeout
  window.fingerprintTimeout = fingerprintTimeout

  fetch(`https://ondrmstt.vtvcab.vn/license-api/v1/drm/fp/fp-health-check?content_id=${contentId}`)
    .then((response) => response.json())
    .then((data) => {
      isFingerprint = data.fingerprint_setting.is_fingerprint_enabled
      heartbeatInterval = data.fingerprint_setting.advance.heartbeat_interval_in_seconds * 1000
      console.log('call fingerprint API')

      if (isFingerprint) {
        let i = Math.floor(Math.random() * 9)
        fingerprints[i].classList.remove("hide")

        let appName = parseJwt(signKey).app_name
        let appBlocked

        for (let i = 0; i < data.recent_blocked_users?.length; i++) {
          if (data.recent_blocked_users[i]['app_name'] === appName) {
            appBlocked = data.recent_blocked_users[i]
          }
        }

        if (appBlocked?.user_ids.includes(sessionStorage.getItem('app-user-id'))) {
          onError({ errorCode: 403, errorMessage: 'copyright violated user' })
          clearTimeout(window.fingerprintTimeout)
        }

        setTimeout(() => {
          fingerprints.forEach(fingerprint => {
            fingerprint.classList.add("hide")
          })
        }, data.fingerprint_setting.advance.display_duration_in_seconds * 1000)
      }

      if (heartbeatInterval !== 0) window.fingerprintTimeout = setTimeout(() => callFingerprintAPI(contentId, signKey, fingerprints, onError), heartbeatInterval)
    })
}