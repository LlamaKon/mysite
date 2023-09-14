import * as Todo from './libs/todo.js';

const navEl = document.querySelector('#nav');
const coverEl = document.querySelector('#cover');

const appNames = ['TODO', 'タイピング練習', 'パズル', 'メモリー'];
let idStr;

appNames.forEach(appName => {
    
    const menu = document.createElement('a');
    menu.classList.add('nav__menu');
    menu.textContent = appName;

    menu.addEventListener('click', () => {
        coverEl.classList.remove('active');
        const appEls = document.querySelectorAll('.app');

        appEls.forEach(appEl => {
            appEl.classList.remove('active');
        })

        if (appName === 'TODO') {
            idStr = 'todo';
        } else if (appName === 'タイピング練習') {
            idStr = 'typing';
        } else if (appName === 'パズル') {
            idStr = 'slide-puzzle';
        } else if (appName === 'メモリー') {
            idStr = 'memory-card';
        }

        const appEl = document.getElementById(idStr);
        appEl.classList.add('active');
        const navMenus = document.querySelectorAll('.nav__menu');
        navMenus.forEach(navMenu => {
            navMenu.classList.remove('active');
        })
        menu.classList.add('active');
    })

    navEl.appendChild(menu);
})