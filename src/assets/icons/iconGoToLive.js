const iconGoToLive = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
const iconGoToLiveRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
const iconGoToLivePath1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
const iconGoToLivePath2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
const iconGoToLivePath3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
const iconGoToLivePath4 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
const iconGoToLivePath5 = document.createElementNS('http://www.w3.org/2000/svg', 'path');

iconGoToLive.setAttribute('fill', 'none');
iconGoToLive.setAttribute('width', '32');
iconGoToLive.setAttribute('height', '32');
iconGoToLive.setAttribute('viewBox', '0 0 32 32');

iconGoToLiveRect.setAttribute('x', '8');
iconGoToLiveRect.setAttribute('y', '14.6666');
iconGoToLiveRect.setAttribute('width', '20');
iconGoToLiveRect.setAttribute('height', '9.33333');
iconGoToLiveRect.setAttribute('rx', '1');
iconGoToLiveRect.setAttribute('fill', 'white');
iconGoToLiveRect.setAttribute('fillOpacity', '0.87');
iconGoToLive.appendChild(iconGoToLiveRect);

iconGoToLivePath1.setAttribute('d', 'M12 21.3333H14.6588V20.7259H12.7749V17.3333H12V21.3333Z');
iconGoToLivePath1.setAttribute('fill', '#020202');
iconGoToLive.appendChild(iconGoToLivePath1);

iconGoToLivePath2.setAttribute('d', 'M16.1062 17.3333H15.3313V21.3333H16.1062V17.3333Z');
iconGoToLivePath2.setAttribute('fill', '#020202');
iconGoToLive.appendChild(iconGoToLivePath2);

iconGoToLivePath3.setAttribute('d', 'M17.5175 17.3333H16.6675L18.1734 21.3333H19.1299L20.6379 17.3333H19.7857L18.6746 20.4818H18.6308L17.5175 17.3333Z');
iconGoToLivePath3.setAttribute('fill', '#020202');
iconGoToLive.appendChild(iconGoToLivePath3);

iconGoToLivePath4.setAttribute('d', 'M21.2013 21.3333H24V20.7259H21.9762V19.6341H23.8392V19.0267L21.9762 19.0267V17.9407L23.9833 17.9407V17.3333L21.2013 17.3333V21.3333Z');
iconGoToLivePath4.setAttribute('fill', '#020202');
iconGoToLive.appendChild(iconGoToLivePath4);

iconGoToLivePath5.setAttribute('d', 'M24.4714 8.1952L28 10.6666C28.2603 10.927 28.2603 11.3491 28 11.6094L24.4714 13.8047C24.2111 14.065 23.7889 14.065 23.5286 13.8047C23.2682 13.5443 23.2682 13.1222 23.5286 12.8619L25.9191 11.8047L10 11.8047C7.42267 11.8047 5.33333 13.894 5.33333 16.4713V18.4713C5.33333 18.8395 5.03486 19.138 4.66667 19.138C4.29848 19.138 4 18.8395 4 18.4713V16.4713C4 13.1576 6.68629 10.4713 10 10.4713L25.9191 10.4714L23.5286 9.13801C23.2682 8.87766 23.2682 8.45555 23.5286 8.1952C23.7889 7.93485 24.2111 7.93485 24.4714 8.1952Z');
iconGoToLivePath5.setAttribute('fill', 'white');
iconGoToLivePath5.setAttribute('fillOpacity', '0.87');
iconGoToLivePath5.setAttribute('fillRule', 'evenodd');
iconGoToLivePath5.setAttribute('clipRule', 'evenodd');
iconGoToLive.appendChild(iconGoToLivePath5);

export default iconGoToLive;