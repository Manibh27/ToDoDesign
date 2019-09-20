function getElementById(id) {
    return document.getElementById(id);
}

function getElementsByClass(className) {
    return document.getElementsByClassName(className);
}

function getElementValueById(id) {
    return document.getElementById(id).value;
}

function setElementValueById(id, value) {
    document.getElementById(id).value = value;
}

var menuBtn = getElementById("icon");
menuBtn.addEventListener("click", openMenu);

var newList = getElementById("new-list");
newList.addEventListener("click", openMenu);

function openMenu() {
    var iconValue = getElementValueById("icon");
    if (iconValue == "close") {
        var sideBar = getElementById("side-nav-bar");
        sideBar.style.width= "20%";
        var sideBarDesc = getElementsByClass("icon-description");
        sideBarDesc[0].style.display="block";
        sideBarDesc[1].style.display="block";
        sideBarDesc[2].style.display="block";
        var taskMenu = getElementsByClass("action-description");
        taskMenu[0].style.display="block";
        var addList = getElementsByClass("new-list");
        addList[0].style.display="block";
        setElementValueById("icon", "open");
   }

    if (iconValue == "open") {
        var sideBar = getElementById("side-nav-bar");
        sideBar.style.width= "0%";
        var sideBarDesc = getElementsByClass("icon-description");
        sideBarDesc[0].style.display="none";
        sideBarDesc[1].style.display="none";
        sideBarDesc[2].style.display="none";
        var taskMenu = getElementsByClass("action-description");
        taskMenu[0].style.display="none";
        var addList = getElementsByClass("new-list");
        addList[0].style.display="none";
        setElementValueById("icon", "close");
   }
}
