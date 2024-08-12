const iconForward = document.createElementNS("http://www.w3.org/2000/svg", "svg")
const iconForwardPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')

iconForward.setAttribute('fill', 'none')
iconForward.setAttribute('width', '32')
iconForward.setAttribute('height', '32')
iconForward.setAttribute('viewBox', '0 0 32 32')

iconForwardPath.setAttribute('d', "M27 17.9976C26.4477 17.9976 26.0052 18.4465 25.9501 18.996C25.787 20.6211 25.2277 22.1869 24.3147 23.5533C23.2159 25.1978 21.6541 26.4795 19.8268 27.2364C17.9996 27.9933 15.9889 28.1913 14.0491 27.8055C12.1093 27.4196 10.3275 26.4672 8.92894 25.0687C7.53041 23.6702 6.57801 21.8883 6.19215 19.9485C5.8063 18.0087 6.00433 15.998 6.76121 14.1708C7.51809 12.3435 8.79981 10.7817 10.4443 9.68292C12.0888 8.58411 14.0222 7.99762 16 7.99762L19.6 7.99762C19.8209 7.99762 20 8.1767 20 8.39762V12.0319C20 12.3883 20.4309 12.5668 20.6828 12.3148L25.7172 7.28046C25.8734 7.12425 25.8734 6.87098 25.7172 6.71478L20.6828 1.68046C20.4309 1.42847 20 1.60694 20 1.9633V5.59762C20 5.81853 19.8209 5.99762 19.6 5.99762L16 5.99762C13.6266 5.99762 11.3066 6.70141 9.33316 8.01998C7.35977 9.33856 5.8217 11.2127 4.91345 13.4054C4.0052 15.5981 3.76756 18.0109 4.23058 20.3387C4.6936 22.6665 5.83649 24.8047 7.51472 26.4829C9.19296 28.1611 11.3312 29.304 13.6589 29.767C15.9867 30.2301 18.3995 29.9924 20.5922 29.0842C22.7849 28.1759 24.6591 26.6379 25.9776 24.6645C27.1105 22.969 27.7896 21.0177 27.9584 18.9965C28.0043 18.4461 27.5523 17.9976 27 17.9976ZM19.63 22.1276C19.1882 22.1384 18.7499 22.046 18.35 21.8576C17.995 21.6774 17.6894 21.413 17.46 21.0876C17.2085 20.7079 17.032 20.2836 16.94 19.8376C16.8219 19.2855 16.7648 18.7221 16.77 18.1576C16.766 17.5931 16.823 17.0298 16.94 16.4776C17.0339 16.0321 17.2102 15.6082 17.46 15.2276C17.6894 14.9022 17.995 14.6378 18.35 14.4576C18.7499 14.2692 19.1882 14.1768 19.63 14.1876C20.0455 14.156 20.4621 14.2313 20.8402 14.4063C21.2183 14.5814 21.5453 14.8504 21.79 15.1876C22.3057 16.0745 22.5491 17.0934 22.49 18.1176C22.5491 19.1418 22.3057 20.1607 21.79 21.0476C21.5546 21.3996 21.2317 21.6842 20.853 21.8736C20.4743 22.0629 20.0528 22.1505 19.63 22.1276ZM19.63 20.9076C19.8316 20.9196 20.0325 20.8744 20.2095 20.777C20.3864 20.6797 20.5322 20.5343 20.63 20.3576C20.869 19.8898 20.9957 19.3728 21 18.8476V17.4676C21.0216 16.9518 20.9223 16.4381 20.71 15.9676C20.5982 15.7963 20.4455 15.6556 20.2657 15.5583C20.0858 15.4609 19.8845 15.4099 19.68 15.4099C19.4755 15.4099 19.2742 15.4609 19.0944 15.5583C18.9145 15.6556 18.7618 15.7963 18.65 15.9676C18.4377 16.4381 18.3384 16.9518 18.36 17.4676L18.36 18.8476C18.3394 19.3665 18.4386 19.8832 18.65 20.3576C18.7454 20.5319 18.8879 20.6759 19.0611 20.7732C19.2344 20.8704 19.4315 20.917 19.63 20.9076ZM10.6299 20.8176V21.9976L15.7799 21.9976V20.7676L13.9999 20.7676L13.9999 14.2676H12.5399L10.2199 15.5676L10.7699 16.6276L12.6299 15.6276L12.6299 20.8176H10.6299Z")
iconForwardPath.setAttribute("fill", "white")
iconForwardPath.setAttribute("fillRule", "evenodd")
iconForwardPath.setAttribute("clipRule", "evenodd")
iconForwardPath.setAttribute("fillOpacity", "0.87")
iconForward.appendChild(iconForwardPath)

export default iconForward