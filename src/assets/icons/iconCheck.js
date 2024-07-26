const iconCheck = document.createElementNS("http://www.w3.org/2000/svg", "svg");
const iconCheckPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');

iconCheck.setAttribute('fill', 'none');
iconCheck.setAttribute('width', '16');
iconCheck.setAttribute('height', '16');
iconCheck.setAttribute('viewBox', '0 0 16 16');
iconCheck.setAttribute('class', 'icon-check');

iconCheckPath.setAttribute('d', "M2.66699 8L6.66699 12L13.3337 4");
iconCheckPath.setAttribute("stroke", "white");
iconCheckPath.setAttribute("stroke-opacity", "0.87");
iconCheckPath.setAttribute("stroke-width", "2");
iconCheckPath.setAttribute("stroke-linecap", "round");
iconCheckPath.setAttribute("stroke-linejoin", "round");
iconCheck.appendChild(iconCheckPath);

export default iconCheck;