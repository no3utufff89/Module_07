/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/blogs/getBlogs.js
let postsPerPage = 8;
const getPosts = async page => {
  const request = await fetch(`https://gorest.co.in/public-api/posts?page=${page}&per_page=${postsPerPage}`);
  const data = await request.json();
  return data;
};
;// CONCATENATED MODULE: ./src/js/blogs/getPageElements.js
const getPageElements = () => {
  const blogsList = document.querySelector('.blogs-list');
  const listPagination = document.querySelector('.pagination__list');
  const paginationBlock = document.querySelector('.pagination');
  const paginationArrow = document.querySelectorAll('.pagination__arrow');
  return {
    blogsList,
    paginationBlock,
    listPagination,
    paginationArrow
  };
};
;// CONCATENATED MODULE: ./src/js/blogs/builder.js

const createBlog = ({
  id,
  title
}) => {
  const li = document.createElement('li');
  li.className = 'blogs-list__item blog-card';
  li.innerHTML = `
    <div class="blog-card__pic">
                        <img src="./img/blog_01.png" alt="Картинка блога" class="blog-card__img">
                    </div>
                     <div class="blog-card__content">
                            <a href="article.html?id=${id}"class="blog-card__link">
                                <h3 class="blog-card__title">${title}</h3>
                            </a>
                            <div class="blog-card__time-info">
                                <div class="card-date">
                                    <span class="card-date__date">25</span>
                                    <span class="card-date__month">октября</span>
                                    <span class="card-date__year">2021</span>,&nbsp;
                                </div>
                                <div class="card-time">
                                    <span class="card-time__hour">12</span>
                                    :
                                    <span class="card-time__minute">45</span>
                                </div>
                            </div>
                            <div class="blog-card__stat">
                                <div class="views">
                                    <svg class="blogs-list__icon icon" width="24" height="25">
                                        <use class="views-icon" href="./img/sprite.svg#eye-icon" ></use>
                                    </svg>
                                    <span class="views-number">
                                    1.2
                                </span>
                                    к
                                </div>
                                <div class="comments">
                                    <svg class="blogs-list__icon icon" width="24" height="24">
                                        <use class="comments-icon" href="./img/sprite.svg#chat-icon" ></use>
                                    </svg>
                                    <span class="comments-number">0</span>
                                </div>
                            </div>
                        </div>
  `;
  return li;
};
const createPaginationLi = (page, liActive) => {
  const li = document.createElement('li');
  li.className = `pagination__item ${liActive}`;
  const a = document.createElement('a');
  a.textContent = page;
  a.style.cssText = `
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    `;
  if (page === 1) {
    a.href = `./blog.html`;
  } else {
    a.href = `./blog.html?page=${page}`;
  }
  li.append(a);
  a.addEventListener('click', e => {
    e.preventDefault();
    let page = +new URLSearchParams(a.search).get('page');
    window.history.pushState({}, '', `?page=${page}`);
    renderPosts(page);
    if (page === 0) {
      window.history.pushState({}, '', `${window.location.pathname}`);
    }
  });
  return li;
};
;// CONCATENATED MODULE: ./src/js/blogs/pagination.js


const {
  paginationArrow,
  listPagination
} = getPageElements();
const pagination = ({
  pages
}, page) => {
  listPagination.innerHTML = '';
  if (page === 0) {
    page = 1;
  }
  let pageLength = page - 1;
  let counter = page + 1;
  let liActive = '';
  if (page === 1) {
    pageLength = page;
    counter = pageLength + 2;
    paginationArrow[0].classList.add('not-active');
  } else {
    paginationArrow[0].classList.remove('not-active');
  }
  if (page === pages) {
    pageLength = page - 2;
    counter = page;
    paginationArrow[1].classList.add('not-active');
  }
  for (pageLength; pageLength <= counter; pageLength++) {
    if (page === pageLength) {
      liActive = 'is-active';
    } else {
      liActive = '';
    }
    listPagination.append(createPaginationLi(pageLength, liActive));
  }
};
;// CONCATENATED MODULE: ./src/js/blogs/renderPosts.js




const {
  blogsList
} = getPageElements();
const renderPosts = async page => {
  try {
    blogsList.innerHTML = '';
    const {
      data: posts,
      meta
    } = await getPosts(page);
    let paginationInfo = meta.pagination;
    posts.forEach(post => {
      blogsList.append(createBlog(post));
    });
    pagination(paginationInfo, page);
  } catch (error) {}
};
;// CONCATENATED MODULE: ./src/js/blogs/getPageNumber.js
const getPageNumber = () => {
  let page = +new URLSearchParams(window.location.search).get('page');
  if (page === 0) {
    page = 1;
  }
  return page;
};
;// CONCATENATED MODULE: ./src/js/blogs/controls.js



const {
  paginationBlock
} = getPageElements();
let page;
const controls = () => {
  try {
    paginationBlock.addEventListener('click', e => {
      let target = e.target;
      page = getPageNumber();
      if (target.closest('.pagination__arrow_left')) {
        if (page > 2) {
          page--;
          window.history.pushState({}, '', `?page=${page}`);
          renderPosts(page);
        } else {
          page = 1;
          window.history.pushState({}, '', `${window.location.pathname}`);
          renderPosts(page);
        }
      }
      if (target.closest('.pagination__arrow_right')) {
        page = getPageNumber();
        page++;
        window.history.pushState({}, '', `?page=${page}`);
        renderPosts(page);
      }
    });
  } catch (error) {}
};
;// CONCATENATED MODULE: ./src/js/article/getPageElements.js
const getPageElements_getPageElements = () => {
  const titleText = document.querySelector('.article__title');
  const sidebarText = document.querySelectorAll('.bread-crumbs__link');
  const contentText = document.querySelector('.article__text');
  const infoAuthor = document.querySelector('.author');
  return {
    titleText,
    sidebarText,
    contentText,
    infoAuthor
  };
};
;// CONCATENATED MODULE: ./src/js/article/getArticleData.js

const {
  titleText,
  sidebarText,
  contentText,
  infoAuthor
} = getPageElements_getPageElements();
const dataPost = async () => {
  const id = new URLSearchParams(window.location.search).get('id');
  if (id) {
    const request = await fetch(`https://gorest.co.in/public-api/posts/${id}`);
    const {
      data
    } = await request.json();
    return data;
  }
};
const dataAuthor = async id => {
  const request = await fetch(`https://gorest.co.in/public-api/users/${id}`);
  const {
    data
  } = await request.json();
  return data;
};
const loadData = async () => {
  try {
    const {
      title,
      body,
      user_id: userId
    } = await dataPost();
    const {
      name
    } = await dataAuthor(userId);
    titleText.textContent = title;
    sidebarText[sidebarText.length - 1].textContent = title;
    contentText.textContent = body;
    // infoAuthor.textContent = name;
  } catch (error) {}
};
;// CONCATENATED MODULE: ./src/js/common/pageElements.js
const pageElements = () => {
  const headerMenuItem = document.querySelectorAll('.menu-item');
  const menuItemBlock = document.querySelectorAll('.menu-item__block');
  const headerSubMenuList = document.querySelectorAll('.menu-item__list');
  const menuArrowBtn = document.querySelectorAll('.menu-item__btn-open');
  const menuBtn = document.querySelector('.menu-btn');
  const headerNav = document.querySelector('.header__nav');
  return {
    headerMenuItem,
    menuItemBlock,
    headerSubMenuList,
    menuArrowBtn,
    menuBtn,
    headerNav
  };
};
;// CONCATENATED MODULE: ./src/js/common/menu.js

const openMenu = () => {
  // Вытаскиваем элементы
  const {
    headerMenuItem,
    menuItemBlock,
    menuArrowBtn,
    headerSubMenuList,
    menuBtn,
    headerNav
  } = pageElements();

  // Функция открытия/закрытия меню
  const menuAction = () => {
    if (menuBtn.classList.contains('active')) {
      menuBtn.classList.remove('active');
      headerNav.classList.remove('active');
      headerSubMenuList.forEach(item => {
        item.classList.remove('active');
        item.removeAttribute('style');
        menuArrowBtn.forEach(item => {
          item.classList.remove('menu-item__btn-close');
        });
      });
    } else {
      menuBtn.classList.add('active');
      headerNav.classList.add('active');
    }
  };
  const subMenu = () => {
    menuArrowBtn.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        for (let i = 0; i < headerMenuItem.length; i += 1) {
          if (index === i) {
            if (headerSubMenuList[i].classList.contains('active')) {
              headerSubMenuList[i].removeAttribute('style');
              menuArrowBtn[i].classList.remove('menu-item__btn-close');
            } else {
              headerSubMenuList[i].style.height = `${headerSubMenuList[i].scrollHeight}px`;
              menuArrowBtn[i].classList.add('menu-item__btn-close');
            }
            headerSubMenuList[i].classList.toggle('active');
          }
        }
      });
    });
  };
  subMenu();
  // Вешааем события
  menuBtn.addEventListener('click', menuAction);
};
;// CONCATENATED MODULE: ./src/js/index.js






let js_page = getPageNumber();
pageElements();
renderPosts(js_page);
controls();
loadData();
openMenu();
/******/ })()
;