import './main.css'
import './theme.css'
import resume from './resume.md?raw'

const pagesWrapper = document.querySelector('.pages-wrapper') as HTMLDivElement

import markdownIt from 'markdown-it'
import underline from 'markdown-it-underline'

let md = markdownIt({
    html: true,
    linkify: true,
    typographer: true,
})

md.use(underline)

let pages = resume.split('---')
let HTMLPages: HTMLDivElement[] = [];

pages.forEach((page) => {
    let div = document.createElement('div')
    div.className = 'page'
    div.innerHTML = md.render(md.render(page))
    pagesWrapper.appendChild(div)
    HTMLPages.push(div);
})



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

const resetZoom = () => {
    scale = 1;
    HTMLPages.forEach(page => {
        // page.style.transform = `scale(${scale})`;
        page.style.width = `${scale * 100}%`;
        page.style.fontSize = `${scale * 10}px`;
    });
}

const zoomIn = document.querySelector('.zoomIn');
const zoomOut = document.querySelector('.zoomOut');
const resetZoomButton = document.querySelector('.resetZoom');

if (resetZoomButton)
    resetZoomButton.addEventListener('click', resetZoom);

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

// Print button


const printResume = () => {

    // On reset le zoom

    resetZoom();

    // On clone le DOM
    const save = document.body.innerHTML;

    // On récupère les pages

    const pages = document.createElement('div');

    pagesWrapper.childNodes.forEach((page, index) => {
        pages.appendChild(page.cloneNode(true));
    });


    // On supprime tout
    document.body.innerHTML = '';

    // On ajoute le clone
    document.body.appendChild(pages);

    document.querySelectorAll<HTMLDivElement>('.page').forEach((page) => {
        page.style.fontSize = '1em';
    });

    // On imprime

    window.print();

    // On supprime tout
    document.body.innerHTML = '';

    // On remet tout en place

    document.body.innerHTML = save;

}

const printButton = document.querySelector('.print');


if (printButton) {
    printButton.addEventListener('click', () => {
        printResume();
    });
}


// Prevent default 

window.addEventListener('wheel', function (event) {
    if (event.ctrlKey) {
        event.preventDefault();
    }
}, { passive: false });

window.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.key === 'p') {
        event.preventDefault();
        printResume();
    }
}, { passive: false });
