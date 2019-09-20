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

var minimize = getElementById("minimize");
minimize.addEventListener("click", minimizeInfo);

var info = getElementById("info");
info.addEventListener("click", getInfo);

function openMenu() {
    var iconValue = getElementValueById("icon");
    var sideBar = getElementById("side-nav-bar");
    if (iconValue == "close") {
        sideBar.style.display= "block";
        setElementValueById("icon", "open");
    }
    if (iconValue == "open") {
        sideBar.style.display= "none";
        setElementValueById("icon", "close");
    }
}

function minimizeInfo() {
   var taskInfo = getElementsByClass("task-info");
   taskInfo[0].style.display="none";
   var sideBar = getElementById("side-nav-bar");
   sideBar.style.width="23.8%";
}

function getInfo() {
   var taskInfo = getElementsByClass("task-info");
   var sideBar = getElementById("side-nav-bar");
   sideBar.style.width="32.8%";
   taskInfo[0].style.display="block";
}
