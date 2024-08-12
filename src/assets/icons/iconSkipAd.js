const iconSkipAd = document.createElementNS("http://www.w3.org/2000/svg", "svg")
const iconSkipAdPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')

iconSkipAd.setAttribute('fill', 'none')
iconSkipAd.setAttribute('width', '20')
iconSkipAd.setAttribute('height', '20')
iconSkipAd.setAttribute('viewBox', '0 0 20 20')

iconSkipAdPath.setAttribute('d', "M14.6 5.83594C14.8209 5.83594 15 6.01502 15 6.23594L15 13.7693C15 13.9902 14.8209 14.1693 14.6 14.1693H12.9C12.6791 14.1693 12.5 13.9902 12.5 13.7693V6.23594C12.5 6.01502 12.6791 5.83594 12.9 5.83594L14.6 5.83594ZM5.612 13.7868C5.34558 13.9533 5 13.7617 5 13.4476L5 6.55764C5 6.24346 5.34558 6.05193 5.612 6.21844L11.1239 9.6634C11.3746 9.82007 11.3746 10.1851 11.1239 10.3418L5.612 13.7868Z")
iconSkipAdPath.setAttribute("fill", "#000E2B")
iconSkipAdPath.setAttribute("fillRule", "evenodd")
iconSkipAdPath.setAttribute("clipRule", "evenodd")
iconSkipAd.appendChild(iconSkipAdPath)

export default iconSkipAd