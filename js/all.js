const modalShow = document.getElementById("show-modal");
const modal = document.getElementById("modal");
const modalClose = document.getElementById("close-modal");
const bookmarkForm = document.getElementById("bookmark-form");
const websiteNameEl = document.getElementById("website-name");
const websiteUrlEl = document.getElementById("website-url");
const bookmarkContainer = document.getElementById("bookmarkers-container");

let bookmarks = [];

// show modal , focus input
function showModal() {
  modal.classList.add("show-modal");
  websiteNameEl.focus();
}

//addEventListener show modal
modalShow.addEventListener("click", showModal);
//addEventListener close modal
modalClose.addEventListener("click", () =>
  modal.classList.remove("show-modal")
);
//增加視窗事件 按modal以外地方 關閉modal
window.addEventListener("click", (e) => {
  e.target === modal ? modal.classList.remove("show-modal") : false;
});

//form

//validate form
function validate(nameValue, urlValue) {
  const expresssion =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const regex = new RegExp(expresssion);
  if (!nameValue || !urlValue) {
    alert("請輸入網站名字和網址");
    return false;
  }
  if (!urlValue.match(regex)) {
    alert("請輸入有效網址");
    return false;
  }
  //valid
  return true;
}

//build bookmark
function buildBookmarks() {
  bookmarkContainer.textContent = "";
  bookmarks.forEach((bookmark) => {
    const { name, url } = bookmark;
    //item
    const item = document.createElement("div");
    item.classList.add("item");
    //close icon
    const closeIcon = document.createElement("i");
    closeIcon.classList.add("fas", "fa-times");
    closeIcon.setAttribute("title", "Delete Bookmark");
    closeIcon.setAttribute("onclick", `deleteBookmark('${url}')`);
    //favicon | link Container
    const linkInfo = document.createElement("div");
    linkInfo.classList.add("name");
    // Favicon
    const favicon = document.createElement("img");
    favicon.setAttribute(
      "src",
      `https://www.google.com/s2/favicons?domain=${url}`
    );
    favicon.setAttribute("alt", "favicon");
    //link
    const link = document.createElement("a");
    link.setAttribute("href", `${url}`);
    link.setAttribute("target", "_blank");
    link.textContent = name;
    //append to bookmarks container
    linkInfo.append(favicon, link);
    item.append(closeIcon, linkInfo);
    bookmarkContainer.appendChild(item);
  });
}

//delete bookmark
function deleteBookmark(url) {
  console.log("url", url);
  bookmarks.forEach((bookmark, i) => {
    if (bookmark.url === url) {
      bookmarks.splice(i, 1);
    }
  });
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmark();
}

//fetch bookmarks
function fetchBookmark() {
  if (localStorage.getItem("bookmarks")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  } else {
    bookmarks = [
      {
        name: "Jacinto Design",
        url: "https://jacinto.design",
      },
    ];
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
  buildBookmarks();
}

function storeBookmark(e) {
  e.preventDefault();
  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;
  if (!urlValue.includes("https://") && !urlValue.includes("http://")) {
    urlValue = `https://${urlValue}`;
  }
  if (!validate(nameValue, urlValue)) {
    return false;
  }
  const bookmark = {
    name: nameValue,
    url: urlValue,
  };
  bookmarks.push(bookmark);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmark();
  bookmarkForm.reset();
  websiteNameEl.focus();
}

//Event Listener
bookmarkForm.addEventListener("submit", storeBookmark);

//On load
fetchBookmark();
