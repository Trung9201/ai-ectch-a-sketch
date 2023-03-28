const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"]

const content = $('.content')
const inputRange = $('#input-range')
const size = $('.size')
const colorSelect = $('#color-select')
const btns = $$('.btn')

let color = 'black'
let initSize = 16
let contentBlocks

features()

createGrid(16)
inputRange.value = initSize

function createGrid(gridBlocks) {
    for(let i = 0; i < gridBlocks; i++) {
        for(let j = 0; j < gridBlocks; j++) {
            const div = document.createElement('div')
            content.appendChild(div)
            div.classList.add('content-block')
            contentBlocks = $$('.content-block')
        }
    }
    content.setAttribute('style',`grid-template-columns:repeat(${gridBlocks},1fr);grid-template-rows:repeat(${gridBlocks},1fr)`)
}

function removeGrid(preGridBlocks){
    for(let i = 0; i < preGridBlocks; i++){
        for(let j = 0; j < preGridBlocks; j++){
            content.removeChild($('.content-block'))
        }
    }
}

colorSelect.onchange = () => {
    color = colorSelect.value
}

function randomColor() {
    let iValue = Math.floor(Math.random() * 7)
    return color = colors[iValue]
}

function changeBackground() {
    contentBlocks.forEach(block => {
        block.onmouseover = () => {
            block.setAttribute('style', `background-color: ${color}`)
        }
    });
}

function features() {
    btns.forEach((btn) => {
    btn.onclick = () => {
        $('.btn.active').classList.remove('active')
        btn.classList.add('active')
        checkActive()
    }
})
}

function checkActive() {
    switch ($('.btn.active').id) {
        case 'btn-mode':
            color = 'black'
            changeBackground()
            break;
        case 'btn-rainbow':
            contentBlocks.forEach(block=>block.onmouseover = () =>{
                randomColor();
                block.setAttribute('style',`background-color:${color}`)
            });
            break
        case 'btn-eraser':
            color = 'white'
            changeBackground()
            break;
        case 'btn-clear':
            contentBlocks.forEach(block=>{
                block.removeAttribute('style')
            });
            color = 'white';
            break
        default:
            break
    }
}

inputRange.onchange = () => {
    removeGrid(initSize)
    size.textContent = `${inputRange.value} X ${inputRange.value}`
    createGrid(inputRange.value)
    initSize = inputRange.value
    checkActive()
    features()
}

changeBackground()
