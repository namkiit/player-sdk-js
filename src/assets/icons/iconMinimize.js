const iconMinimize = document.createElementNS("http://www.w3.org/2000/svg", "svg");
const iconMinimizePath1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
const iconMinimizePath2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
const iconMinimizePath3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
const iconMinimizePath4 = document.createElementNS('http://www.w3.org/2000/svg', 'path');

iconMinimize.setAttribute('fill', 'none');
iconMinimize.setAttribute('width', '32');
iconMinimize.setAttribute('height', '32');
iconMinimize.setAttribute('viewBox', '0 0 32 32');

iconMinimizePath1.setAttribute('d', "M12 5.33333C12 4.97971 11.8595 4.64057 11.6095 4.39052C11.3594 4.14048 11.0203 4 10.6667 4C10.313 4 9.97391 4.14048 9.72386 4.39052C9.47381 4.64057 9.33333 4.97971 9.33333 5.33333V8.66667C9.33333 8.84348 9.2631 9.01305 9.13807 9.13807C9.01305 9.2631 8.84348 9.33333 8.66667 9.33333H5.33333C4.97971 9.33333 4.64057 9.47381 4.39052 9.72386C4.14048 9.97391 4 10.313 4 10.6667C4 11.0203 4.14048 11.3594 4.39052 11.6095C4.64057 11.8595 4.97971 12 5.33333 12H8.66667C9.55072 12 10.3986 11.6488 11.0237 11.0237C11.6488 10.3986 12 9.55072 12 8.66667V5.33333Z");
iconMinimizePath1.setAttribute("fill", "white");
iconMinimizePath1.setAttribute("fillOpacity", "0.87");
iconMinimize.appendChild(iconMinimizePath1);

iconMinimizePath2.setAttribute('d', "M12 26.6667C12 27.0203 11.8595 27.3594 11.6095 27.6095C11.3594 27.8595 11.0203 28 10.6667 28C10.313 28 9.97391 27.8595 9.72386 27.6095C9.47381 27.3594 9.33333 27.0203 9.33333 26.6667V23.3333C9.33333 23.1565 9.2631 22.987 9.13807 22.8619C9.01305 22.7369 8.84348 22.6667 8.66667 22.6667H5.33333C4.97971 22.6667 4.64057 22.5262 4.39052 22.2761C4.14048 22.0261 4 21.687 4 21.3333C4 20.9797 4.14048 20.6406 4.39052 20.3905C4.64057 20.1405 4.97971 20 5.33333 20H8.66667C9.55072 20 10.3986 20.3512 11.0237 20.9763C11.6488 21.6014 12 22.4493 12 23.3333V26.6667Z");
iconMinimizePath2.setAttribute("fill", "white");
iconMinimizePath2.setAttribute("fillOpacity", "0.87");
iconMinimize.appendChild(iconMinimizePath2);

iconMinimizePath3.setAttribute('d', "M21.3333 4C20.9797 4 20.6406 4.14048 20.3905 4.39052C20.1405 4.64057 20 4.97971 20 5.33333V8.66667C20 9.55072 20.3512 10.3986 20.9763 11.0237C21.6014 11.6488 22.4493 12 23.3333 12H26.6667C27.0203 12 27.3594 11.8595 27.6095 11.6095C27.8595 11.3594 28 11.0203 28 10.6667C28 10.313 27.8595 9.97391 27.6095 9.72386C27.3594 9.47381 27.0203 9.33333 26.6667 9.33333H23.3333C23.1565 9.33333 22.987 9.2631 22.8619 9.13807C22.7369 9.01305 22.6667 8.84348 22.6667 8.66667V5.33333C22.6667 4.97971 22.5262 4.64057 22.2761 4.39052C22.0261 4.14048 21.687 4 21.3333 4Z");
iconMinimizePath3.setAttribute("fill", "white");
iconMinimizePath3.setAttribute("fillOpacity", "0.87");
iconMinimize.appendChild(iconMinimizePath3);

iconMinimizePath4.setAttribute('d', "M20 26.6667C20 27.0203 20.1405 27.3594 20.3905 27.6095C20.6406 27.8595 20.9797 28 21.3333 28C21.687 28 22.0261 27.8595 22.2761 27.6095C22.5262 27.3594 22.6667 27.0203 22.6667 26.6667V23.3333C22.6667 23.1565 22.7369 22.987 22.8619 22.8619C22.987 22.7369 23.1565 22.6667 23.3333 22.6667H26.6667C27.0203 22.6667 27.3594 22.5262 27.6095 22.2761C27.8595 22.0261 28 21.687 28 21.3333C28 20.9797 27.8595 20.6406 27.6095 20.3905C27.3594 20.1405 27.0203 20 26.6667 20H23.3333C22.4493 20 21.6014 20.3512 20.9763 20.9763C20.3512 21.6014 20 22.4493 20 23.3333V26.6667Z");
iconMinimizePath4.setAttribute("fill", "white");
iconMinimizePath4.setAttribute("fillOpacity", "0.87");
iconMinimize.appendChild(iconMinimizePath4);

export default iconMinimize;