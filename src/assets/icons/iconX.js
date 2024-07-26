const iconVolume = document.createElementNS("http://www.w3.org/2000/svg", "svg");
const iconVolumePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');

iconVolume.setAttribute('fill', 'none');
iconVolume.setAttribute('width', '24');
iconVolume.setAttribute('height', '24');
iconVolume.setAttribute('viewBox', '0 0 24 24');

iconVolumePath.setAttribute('d', "M2.32352 4.31962C2.74968 3.89346 3.44061 3.89346 3.86677 4.31962L9.64258 10.0954L15.4184 4.31962C15.8445 3.89346 16.5355 3.89346 16.9616 4.31962C17.3878 4.74577 17.3878 5.43671 16.9616 5.86286L11.1858 11.6387L16.9616 17.4145C17.3878 17.8406 17.3878 18.5316 16.9616 18.9577C16.5355 19.3839 15.8445 19.3839 15.4184 18.9577L9.64258 13.1819L3.86677 18.9577C3.44061 19.3839 2.74968 19.3839 2.32352 18.9577C1.89737 18.5316 1.89737 17.8406 2.32352 17.4145L8.09933 11.6387L2.32352 5.86286C1.89737 5.43671 1.89737 4.74577 2.32352 4.31962Z");
iconVolumePath.setAttribute("fill", "white");
iconVolumePath.setAttribute("fillRule", "evenodd");
iconVolumePath.setAttribute("clipRule", "evenodd");

iconVolume.appendChild(iconVolumePath);

export default iconVolume;