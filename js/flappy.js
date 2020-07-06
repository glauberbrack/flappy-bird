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

function DoubleBarriers(height, openspace, position){
    this.element = newElement('div', 'double-barriers')

    this.higher = new Barrier(true)
    this.bottom = new Barrier(false)

    this.element.appendChild(this.higher.element)
    this.element.appendChild(this.bottom.element)

    this.randomOpenScace = () => {
        const higherHeight = Math.random() * (height - openspace)
        const bottomHeight = height - openspace - higherHeight

        this.higher.setHeight(higherHeight)
        this.bottom.setHeight(bottomHeight)
    }

    this.getX = () => parent(this.element.style.left.split('px'))

    this.setX = position => this.element.style.left = `${position}px`

    this.getWidth = () => this.element.clientWidth

    this.randomOpenScace()
    this.setX(position)
}


// const b = new DoubleBarriers(700, 200,800)
// document.querySelector('[tp-flappy]').appendChild(b.element)

