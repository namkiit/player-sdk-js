const iconPause = document.createElementNS("http://www.w3.org/2000/svg", "svg");
const iconPausePath1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
const iconPausePath2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');

iconPause.setAttribute('fill', 'none');
iconPause.setAttribute('width', '32');
iconPause.setAttribute('height', '32');
iconPause.setAttribute('viewBox', '0 0 32 32');

iconPausePath1.setAttribute('d', "M9.51318 6.66406C9.03186 6.66406 8.57025 6.85527 8.22991 7.19561C7.88957 7.53595 7.69836 7.99756 7.69836 8.47888L7.69836 23.5159C7.69836 24.5177 8.5114 25.3307 9.51318 25.3307H13.1428C13.6241 25.3307 14.0857 25.1395 14.4261 24.7992C14.7664 24.4588 14.9576 23.9972 14.9576 23.5159L14.9576 8.47888C14.9576 7.99756 14.7664 7.53595 14.4261 7.19561C14.0857 6.85527 13.6241 6.66406 13.1428 6.66406L9.51318 6.66406Z");
iconPausePath1.setAttribute("fill", "white");
iconPausePath1.setAttribute("fillOpacity", "0.87");
iconPause.appendChild(iconPausePath1);

iconPausePath2.setAttribute('d', "M18.8465 6.66406C18.3652 6.66406 17.9036 6.85527 17.5632 7.19561C17.2229 7.53595 17.0317 7.99756 17.0317 8.47888L17.0317 23.5159C17.0317 24.5177 17.8447 25.3307 18.8465 25.3307H22.4761C22.9574 25.3307 23.419 25.1395 23.7594 24.7992C24.0997 24.4588 24.2909 23.9972 24.2909 23.5159L24.2909 8.47888C24.2909 8.24055 24.244 8.00456 24.1528 7.78438C24.0616 7.56419 23.9279 7.36413 23.7594 7.19561C23.5909 7.02709 23.3908 6.89341 23.1706 6.80221C22.9504 6.711 22.7144 6.66406 22.4761 6.66406L18.8465 6.66406Z");
iconPausePath2.setAttribute("fill", "white");
iconPausePath2.setAttribute("fillOpacity", "0.87");
iconPause.appendChild(iconPausePath2);

export default iconPause;