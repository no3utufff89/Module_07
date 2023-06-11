import {renderPosts} from "./blogs/renderPosts.js";
import {controls} from "./blogs/controls.js";
import {getPageNumber} from "./blogs/getPageNumber.js";
import {loadData} from "./article/getArticleData.js";
import {openMenu} from "./common/menu.js";
import {pageElements} from "./common/pageElements.js";

let page = getPageNumber();
pageElements()
renderPosts(page);
controls();
loadData();
openMenu()
