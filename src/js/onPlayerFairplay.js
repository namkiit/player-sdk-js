import { waitFor, getResponse, uInt8ArrayToString } from "./utils/helpers"

const onPlayerFairplay = async (video, dataPlayer, onError) => {
    let serverCertificatePath = dataPlayer.fairplayCertificate
    let serverProcessSPCPath = dataPlayer.fairplayServer

    try {
        let response = await fetch(serverCertificatePath)
        window.certificate = await response.arrayBuffer()
        startVideo();
    } catch (e) {
        onError(`Could not load certificate at ${serverCertificatePath}`)
    }

    async function startVideo() {
        video.addEventListener('error', onerror, false);
        video.src = dataPlayer.src
        let event = await waitFor(video, 'encrypted');
        console.log(event)
        await encrypted(event);
    }

    function onerror(event) {
        onError('A video playback error occurred')
    }

    async function encrypted(event) {
        console.log('encrypted event')
        try {
            let initDataType = event.initDataType;
            if (initDataType !== 'skd') {
                onError(`Received unexpected initialization data type "${initDataType}"`);
                return;
            }
            console.log(initDataType);
            let video = event.target;
            if (!video.mediaKeys) {
                let access = await navigator.requestMediaKeySystemAccess("com.apple.fps", [{
                    initDataTypes: [initDataType],
                    videoCapabilities: [{ contentType: 'application/vnd.apple.mpegurl', robustness: '' }],
                    distinctiveIdentifier: 'not-allowed',
                    persistentState: 'not-allowed',
                    sessionTypes: ['temporary'],
                }]);

                let keys = await access.createMediaKeys();
                await keys.setServerCertificate(window.certificate);
                await video.setMediaKeys(keys);
            }

            let initData = event.initData;
            let keyURI = uInt8ArrayToString(new Uint8Array(initData));
            let session = video.mediaKeys.createSession();

            session.generateRequest(initDataType, initData);
            console.log(session);
            let message = await waitFor(session, 'message');
            console.log('message', message);
            let response = await getResponse(message, serverProcessSPCPath, dataPlayer.signKey, keyURI);

            await session.update(response);
            console.log(session);
            return session;
        } catch (e) {
            onError(`Could not start encrypted playback due to exception "${e}"`)
        }
    }
}

export default onPlayerFairplay