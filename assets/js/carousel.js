function component_carousel_init(component) {
    Array.prototype.slice.call(component.childNodes).filter((e)=>e.nodeName=="#text").forEach((e)=>e.parentNode.removeChild(e))
    function scroll(outer, inner, back) {
    let scroll = outer.scrollLeft
    let width = outer.clientWidth
    let iwidth = inner.clientWidth
    let count = inner.childElementCount
    let cwidth = inner.children[0].clientWidth
    let dcount = Math.round(width / cwidth)
    let pos = Math.round(scroll / cwidth)
    if (back) {
      if (pos == 0) {
        outer.scrollLeft = iwidth - width
      } else {
        outer.scrollLeft = (pos-1) * cwidth
      }
    } else {
      //if (pos == count - dcount) {
      if (scroll >= iwidth - width) {
        outer.scrollLeft = 0
      } else {
        outer.scrollLeft = (pos+1)*cwidth
      }
    }
  }

  let outer = document.createElement('div')
  let wrapp = document.createElement('div')

  outer.className = 'component_carousel_outer'
  wrapp.className = 'component_carousel_wrapp'

  component.style.width = '-webkit-max-content'
  component.style.width = '-moz-max-content'
  component.style.width = 'max-content'
  outer.style.overflow = 'hidden'
  component.style.overflow = 'hidden'

  component.parentElement.insertBefore(wrapp, component)
  component.parentElement.removeChild(component)
  wrapp.appendChild(outer)
  outer.appendChild(component)
  outer.style.position = 'relative'

  for (i=1;i<=2;i++) {
    let button = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    button.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    button.setAttribute('viewBox', '0 0 100 100')
    button.setAttribute('preserveAspectRatio', 'none')
    let path = button.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'path'))
    if (i%2) {
      path.setAttribute('d', 'M 0,50 100,0 100,100 0,50')
      button.style.left = '.6em'
      button.addEventListener('click', () => {scroll(outer, component, 1); reset()})
    } else {
      path.setAttribute('d', 'M 100,50 0,0 0,100 100,50')
      button.style.right = '.6em'
      button.addEventListener('click', () => {scroll(outer, component, 0); reset()})
    }

    wrapp.appendChild(button)
  }

  var timer
  function reset() {
    clearInterval(timer)
    timer = window.setInterval(scroll, 5000, outer, component)
  }
  reset()
}

component_carousel_init(document.querySelector('.component_carousel_wrapper'))
