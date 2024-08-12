const iconLive = document.createElementNS("http://www.w3.org/2000/svg", "svg")
const iconLivePath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
const iconLiveCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
iconLive.setAttribute('fill', 'none')
iconLive.setAttribute('width', '53')
iconLive.setAttribute('height', '24')
iconLive.setAttribute('viewBox', '0 0 53 24')

iconLiveCircle.setAttribute('cx', '9')
iconLiveCircle.setAttribute('cy', '12')
iconLiveCircle.setAttribute('r', '3')
iconLiveCircle.setAttribute('fill', '#EF4035')
iconLive.appendChild(iconLiveCircle)

iconLivePath.setAttribute('d', "M17.0043 17V6.81818H18.8487V15.4538H23.3331V17H17.0043ZM26.7784 6.81818V17H24.9339V6.81818H26.7784ZM30.138 6.81818L32.7878 14.8324H32.8922L35.5371 6.81818H37.5655L33.976 17H31.699L28.1145 6.81818H30.138ZM38.9066 17V6.81818H45.5288V8.36435H40.7511V11.1286H45.1857V12.6747H40.7511V15.4538H45.5685V17H38.9066Z")
iconLivePath.setAttribute("fill", "white")
iconLivePath.setAttribute("fillOpacity", "0.87")
iconLive.appendChild(iconLivePath)


export default iconLive