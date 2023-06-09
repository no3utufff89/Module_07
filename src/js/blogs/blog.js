import {renderPosts} from "./renderPosts.js";
import {controls} from "./controls.js";
import {getPageNumber} from "./getPageNumber.js";
let page = getPageNumber();

renderPosts(page);
controls();

