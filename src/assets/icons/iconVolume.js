const iconVolume = document.createElementNS("http://www.w3.org/2000/svg", "svg");
const iconVolumePath1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
const iconVolumePath2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');

iconVolume.setAttribute('fill', 'none');
iconVolume.setAttribute('width', '32');
iconVolume.setAttribute('height', '32');
iconVolume.setAttribute('viewBox', '0 0 32 32');

iconVolumePath1.setAttribute('d', "M15.2182 7.22145C15.4497 7.31744 15.6475 7.4799 15.7867 7.68832C15.9259 7.89673 16.0001 8.14173 16 8.39234V23.5986C16 23.8492 15.9256 24.0942 15.7864 24.3025C15.6472 24.5108 15.4493 24.6732 15.2178 24.7691C14.9862 24.865 14.7315 24.8901 14.4857 24.8412C14.2399 24.7923 14.0142 24.6717 13.837 24.4945L9.13948 19.7971H5.86253C5.52645 19.7971 5.20413 19.6635 4.96649 19.4259C4.72884 19.1883 4.59534 18.8659 4.59534 18.5299V13.4611C4.59534 13.125 4.72884 12.8027 4.96649 12.5651C5.20413 12.3274 5.52645 12.1939 5.86253 12.1939H9.13948L13.837 7.49643C14.0142 7.31911 14.24 7.19834 14.4859 7.14939C14.7317 7.10044 14.9866 7.12552 15.2182 7.22145Z");
iconVolumePath1.setAttribute("fill", "white");
iconVolumePath1.setAttribute("fillOpacity", "0.87");
iconVolume.appendChild(iconVolumePath1);

iconVolumePath2.setAttribute('d', "M21.9014 7.03508C22.139 6.79752 22.4612 6.66406 22.7973 6.66406C23.1333 6.66406 23.4555 6.79752 23.6932 7.03508C24.8714 8.21059 25.8059 9.60729 26.4428 11.145C27.0798 12.6826 27.4067 14.331 27.4048 15.9954C27.4067 17.6598 27.0798 19.3081 26.4428 20.8458C25.8059 22.3835 24.8714 23.7802 23.6932 24.9557C23.4542 25.1865 23.1341 25.3142 22.8018 25.3114C22.4696 25.3085 22.1517 25.1752 21.9168 24.9403C21.6818 24.7053 21.5486 24.3875 21.5457 24.0552C21.5428 23.723 21.6705 23.4029 21.9014 23.1639C22.8443 22.2237 23.5921 21.1063 24.1016 19.8761C24.6112 18.6458 24.8724 17.327 24.8704 15.9954C24.8704 13.1949 23.7375 10.663 21.9014 8.82689C21.6638 8.58925 21.5303 8.267 21.5303 7.93098C21.5303 7.59497 21.6638 7.27271 21.9014 7.03508ZM18.3165 10.6187C18.4342 10.5009 18.5739 10.4074 18.7278 10.3436C18.8816 10.2799 19.0465 10.247 19.213 10.247C19.3795 10.247 19.5444 10.2799 19.6983 10.3436C19.8521 10.4074 19.9919 10.5009 20.1095 10.6187C20.8165 11.3241 21.3771 12.1622 21.7592 13.0849C22.1413 14.0076 22.3373 14.9967 22.336 15.9954C22.3372 16.9941 22.1412 17.9831 21.7591 18.9058C21.377 19.8285 20.8164 20.6666 20.1095 21.3721C19.8718 21.6098 19.5493 21.7434 19.213 21.7434C18.8767 21.7434 18.5543 21.6098 18.3165 21.3721C18.0787 21.1343 17.9451 20.8118 17.9451 20.4755C17.9451 20.1393 18.0787 19.8168 18.3165 19.579C18.7881 19.1091 19.1621 18.5506 19.417 17.9355C19.6719 17.3205 19.8026 16.6611 19.8016 15.9954C19.8027 15.3296 19.672 14.6702 19.4171 14.0552C19.1622 13.4402 18.7881 12.8816 18.3165 12.4118C18.1987 12.2941 18.1052 12.1543 18.0414 12.0005C17.9776 11.8467 17.9448 11.6818 17.9448 11.5152C17.9448 11.3487 17.9776 11.1838 18.0414 11.03C18.1052 10.8761 18.1987 10.7364 18.3165 10.6187Z");
iconVolumePath2.setAttribute("fill", "white");
iconVolumePath2.setAttribute("fillOpacity", "0.87");
iconVolume.appendChild(iconVolumePath2);

export default iconVolume;