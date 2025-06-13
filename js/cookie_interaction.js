const card = document.querySelector('#card')
let clicked = false
const lastClickPos = { x: 0, deg: 0 }
let deg = 0
const zRotation = Math.random() * 40 - 20
let startTime = 0

// touch / drag start
card.addEventListener('pointerdown', mouseDownFunc)
// touch / drag moving
window.addEventListener('pointermove', mouseMoveFunc)
card.addEventListener('mouseenter', () => {
    if (clicked || Date.now() < startTime + 500) return
    lastClickPos.deg = deg + 10
    card.style.transform = `perspective(2000px) rotateY(${lastClickPos.deg}deg) rotateZ(${zRotation}deg)`
})
card.addEventListener('mouseleave', () => {
    if (clicked || Date.now() < startTime + 500) return
    lastClickPos.deg = deg - 10
    card.style.transform = `perspective(2000px) rotateY(${lastClickPos.deg}deg) rotateZ(${zRotation}deg)`
})
// touch / drag end
window.addEventListener('pointerup', mouseUpFunc)
window.addEventListener('pointercancel', mouseUpFunc)
// window.addEventListener('touchcancel', mouseUpFunc)

function mouseUpFunc() {
    clicked = false
    card.classList.remove("grabbing")
    document.body.classList.remove("grabbing")
    lastClickPos.deg = deg
}

function mouseDownFunc(event) {
    clicked = true
    lastClickPos.x = event.clientX || event.targetTouces[0].pageX
    card.classList.add("grabbing")
    document.body.classList.add("grabbing")
}

function mouseMoveFunc(event) {
    if (!clicked) {
        return
    }
    const x = event.clientX || event.targetTouces[0].pageX
    const width = window.innerWidth
    const ratio = (x - lastClickPos.x) / (width * .5)
    deg = lastClickPos.deg + ratio * 180

    card.style.transform = `perspective(2000px) rotateY(${deg}deg) rotateZ(${zRotation}deg)`
}


var colors = ["HotPink", "DeepPink", "Salmon", "red", "orange", "Gold", "yellow", "greenyellow", "green", "cyan", "SkyBlue", "blue", "blueviolet", "darkorchid"];
var currentIndex = 0;

setInterval(function() {
	document.body.style.cssText = "background-color: " + colors[currentIndex];
	currentIndex++;
	if (currentIndex == undefined || currentIndex >= colors.length) {
		currentIndex = 0;
	}
}, 1000);
document.addEventListener("DOMContentLoaded", () => {
    card.style.transform = "perspective(2000px) translateZ(2000px) rotateX(10deg) rotateY(-60deg) rotateZ(5deg)"
    requestAnimationFrame(() => {
        card.style.transform = `perspective(2000px) rotateY(0deg) rotateZ(${zRotation}deg)`
        startTime = Date.now()
    })
})