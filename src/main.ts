import './main.css'
import './theme.css'
import resume from './resume.md?raw'

const pagesWrapper = document.querySelector('.pages-wrapper') as HTMLDivElement

import markdownIt from 'markdown-it'

let md = markdownIt({
    html: true,
    linkify: true,
    typographer: true,
})

let pages = resume.split('---')
let HTMLPages: HTMLDivElement[] = [];

pages.forEach((page) => {
    let div = document.createElement('div')
    div.className = 'page'
    div.innerHTML = md.render(md.render(page))
    pagesWrapper.appendChild(div)
    HTMLPages.push(div);
})

window.addEventListener('wheel', function (event) {
    if (event.ctrlKey) {
        event.preventDefault();
    }
}, { passive: false });

let scale = 1;


const zoomInHandler = () => {
    scale = scale + 0.1;
    HTMLPages.forEach(page => {
        // page.style.transform = `scale(${scale})`;
        page.style.width = `${scale * 100}%`;
        page.style.fontSize = `${scale * 10}px`;
    });
}

const zoomOutHandler = () => {
    if (scale <= 0.2) {
        return;
    }
    scale = scale - 0.1;
    HTMLPages.forEach(page => {
        // page.style.transform = `scale(${scale})`;
        page.style.width = `${scale * 100}%`;
        page.style.fontSize = `${scale * 10}px`;


    });
}

const zoomIn = document.querySelector('.zoomIn');
const zoomOut = document.querySelector('.zoomOut');

if (zoomIn)
    zoomIn.addEventListener('click', zoomInHandler);

if (zoomOut)
    zoomOut.addEventListener('click', zoomOutHandler);

// Ajout d'un evenement ctrl + molette pour zoomer

pagesWrapper.addEventListener('wheel', (e) => {
    if (e.ctrlKey) {
        if (e.deltaY < 0) {
            zoomInHandler();
        } else {
            zoomOutHandler();
        }
    }
});

// Ajout d'un evenemtn shift + molette pour scroller horizontalement

pagesWrapper.addEventListener('wheel', (e) => {
    if (e.shiftKey) {
        pagesWrapper.scrollLeft += e.deltaY;
    }
});
