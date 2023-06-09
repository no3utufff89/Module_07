console.log(1)
import {renderPosts} from "./blogs/renderPosts.js";
import {controls} from "./blogs/controls.js";
import {getPageNumber} from "./blogs/getPageNumber.js";
let page = getPageNumber();

renderPosts(page);
controls();