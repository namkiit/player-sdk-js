const iconPauseBig = document.createElementNS("http://www.w3.org/2000/svg", "svg")
const iconPauseBigPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
const iconPauseBigCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
iconPauseBig.setAttribute('fill', 'none')
iconPauseBig.setAttribute('width', '120')
iconPauseBig.setAttribute('height', '120')
iconPauseBig.setAttribute('viewBox', '0 0 120 120')

iconPauseBigCircle.setAttribute('cx', '60')
iconPauseBigCircle.setAttribute('cy', '60')
iconPauseBigCircle.setAttribute('r', '50')
iconPauseBigCircle.setAttribute('fill', '#05173A')
iconPauseBigCircle.setAttribute('opacity', '0.8')
iconPauseBig.appendChild(iconPauseBigCircle)

iconPauseBigPath.setAttribute('d', "M65.8333 80.4193H77.5V39.5859H65.8333V80.4193ZM42.5 80.4193H54.1667V39.5859H42.5V80.4193Z")
iconPauseBigPath.setAttribute("fill", "#52B5F9")
iconPauseBig.appendChild(iconPauseBigPath)


export default iconPauseBig