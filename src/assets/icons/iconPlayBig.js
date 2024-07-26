const iconPlayBig = document.createElementNS("http://www.w3.org/2000/svg", "svg");
const iconPlayBigPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
const iconPlayBigCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
iconPlayBig.setAttribute('fill', 'none');
iconPlayBig.setAttribute('width', '120');
iconPlayBig.setAttribute('height', '120');
iconPlayBig.setAttribute('viewBox', '0 0 120 120');

iconPlayBigCircle.setAttribute('cx', '60');
iconPlayBigCircle.setAttribute('cy', '60');
iconPlayBigCircle.setAttribute('r', '50');
iconPlayBigCircle.setAttribute('fill', '#05173A');
iconPlayBigCircle.setAttribute('opacity', '0.8');
iconPlayBig.appendChild(iconPlayBigCircle);

iconPlayBigPath.setAttribute('d', "M49.8702 40.9702C49.2045 40.5466 48.3333 41.0248 48.3333 41.8139V79.0039C48.3333 79.7929 49.2045 80.2712 49.8702 79.8475L79.0909 61.2525C79.7084 60.8596 79.7084 59.9582 79.0909 59.5652L49.8702 40.9702Z");
iconPlayBigPath.setAttribute("fill", "#52B5F9");
iconPlayBig.appendChild(iconPlayBigPath);


export default iconPlayBig;