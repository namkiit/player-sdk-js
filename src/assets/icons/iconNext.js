const iconNext = document.createElementNS("http://www.w3.org/2000/svg", "svg")
const iconNextPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')

iconNext.setAttribute('fill', 'none')
iconNext.setAttribute('width', '32')
iconNext.setAttribute('height', '32')
iconNext.setAttribute('viewBox', '0 0 32 32')

iconNextPath.setAttribute('d', "M23.6 9.33325C23.8209 9.33325 24 9.51234 24 9.73325L24 22.2666C24 22.4875 23.8209 22.6666 23.6 22.6666H20.4C20.1791 22.6666 20 22.4875 20 22.2666V9.73325C20 9.51234 20.1791 9.33325 20.4 9.33325H23.6ZM8.612 22.2841C8.34558 22.4506 8 22.2591 8 21.9449L8 10.055C8 9.74078 8.34558 9.54924 8.612 9.71575L18.1239 15.6607C18.3746 15.8174 18.3746 16.1825 18.1239 16.3391L8.612 22.2841Z")
iconNextPath.setAttribute("fill", "white")
iconNextPath.setAttribute("fillRule", "evenodd")
iconNextPath.setAttribute("clipRule", "evenodd")
iconNextPath.setAttribute("fillOpacity", "0.87")
iconNext.appendChild(iconNextPath)

export default iconNext