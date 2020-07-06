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

    this.getPosition = () => parseInt(this.element.style.left.split('px')[0])

    this.setPosition = position => this.element.style.left = `${position}px`

    this.getWidth = () => this.element.clientWidth

    this.randomOpenScace()
    this.setPosition(position)
}

function Barriers(height, width, openspace, space, pointNotification){
    this.pairs = [
        new DoubleBarriers(height, openspace, width),
        new DoubleBarriers(height, openspace, width + space),
        new DoubleBarriers(height, openspace, width + space * 2),
        new DoubleBarriers(height, openspace, width + space * 3)
    ]

    const displacement = 3

    this.animate = () => {
        this.pairs.forEach(pair => {
            pair.setPosition(pair.getPosition() - displacement)

            if(pair.getPosition() < pair.getWidth()){
                pair.setPosition(pair.getPosition() + space * this.pairs.length)
                pair.randomOpenScace()
            }

            const middle = width / 2
            const middleCross = pair.getPosition() + displacement >= middle
                && pair.getPosition() < middle
            if(middleCross) pointNotification()
        })
    }
}


const barriers = new Barriers(700, 1200, 300, 400)

const gameArea = document.querySelector('[tp-flappy]')
barriers.pairs.forEach(pair => gameArea.appendChild(pair.element))

setInterval(() => {
    barriers.animate()
}, 20)


