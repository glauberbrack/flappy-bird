function newElement(tagName, className){
    const newElem = document.createElement(tagName)
    newElem.className = className
    
    return newElem
}

function Barrier(reverse = false){
    this.element = newElement('div', 'barrier')
    
    const border = newElement('div', 'border')
    const body = newElement('div', 'body')

    this.element.appendChild(reverse ? body : border)
    this.element.appendChild(reverse ? border : body)

    this.setHeight = height => body.style.height = `${height}px`
}

// const b = new Barrier(true)
// b.setHeight(200)
// document.querySelector('[tp-flappy]').appendChild(b.element)

function DoubleBarriers(height, openspace, position){
    this.element = newElement('div', 'double-barriers')

    this.higher = new Barrier(true)
    this.bottom = new Barrier(false)

    this.element.appendChild(this.higher.element)
    this.element.appendChild(this.bottom.element)
}

