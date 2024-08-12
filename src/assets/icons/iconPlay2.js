const iconPlay2 = document.createElementNS("http://www.w3.org/2000/svg", "svg")
const iconPlayPath2 = document.createElementNS('http://www.w3.org/2000/svg', 'path')
iconPlay2.setAttribute('fill', 'none')
iconPlay2.setAttribute('width', '32')
iconPlay2.setAttribute('height', '32')
iconPlay2.setAttribute('viewBox', '0 0 32 32')
iconPlayPath2.setAttribute('d', "M12.1707 7.03083C10.3069 5.97638 8 7.32138 8 9.46141L8 23.0248C8 25.1648 10.3084 26.5106 12.1715 25.4553L24.1424 18.6705C26.0318 17.6009 26.031 14.8789 24.1424 13.8093L12.1699 7.03083H12.1707Z")
iconPlayPath2.setAttribute("fill", "white")
iconPlayPath2.setAttribute("fillOpacity", "0.87")
iconPlay2.appendChild(iconPlayPath2)

export default iconPlay2