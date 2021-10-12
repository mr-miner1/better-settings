/* eslint-disable */
const { React, getModule } = require("powercord/webpack");

const { item, header, separator } = getModule(
  ["header", "separator", "themed", "item"],
  false
);

module.exports = class FavouritesUtil {
  static favourites(plugin) {
    const favoritesettings = plugin.settings.get("favorites", "");

    let allitems = document.getElementsByClassName(item);
    let favorites = favoritesettings.split(", ");

    let contheader = document.createElement("div");
    contheader.textContent = "Favourites";
    contheader.classList.add(header);

    let separatorElem = document.createElement("div");
    separatorElem.classList.add(separator);

    let cont = document.createElement("div");
    cont.classList.add("fav-cont");
    cont.appendChild(contheader);

    if (
      document.getElementsByClassName("side-8zPYf6")[0].classList[1] !=
      "favorited"
    ) {
      document.getElementsByClassName("side-8zPYf6")[0].appendChild(cont);
      document.getElementsByClassName("side-8zPYf6")[0].className +=
        " favorited";
    }
    for (let i = 0; i < allitems.length; i++) {
      for (let q of favorites) {
        if (allitems[i].textContent.toUpperCase() == q.toUpperCase()) {
          allitems[i].classList += " better-settings-fav";
          cont.appendChild(allitems[i]);
        }
      }
      cont.appendChild(separatorElem);
    }
    if (cont.offsetHeight < 40) {
      cont.style.display = "none";
    } else {
      cont.style.display = "";
    }
  }
  static favoriteOnSave(element) {
    let cont = document.getElementsByClassName("fav-cont")[0];
    if (cont.style[0] == "display") {
      // favorites(powercord.pluginManager.get("better-settings"));
      cont.style.display = "";
    }
    cont.appendChild(element);
    document.querySelector(".fav-cont .separator-gCa7yv").remove();
    let separatorElem = document.createElement("div");
    separatorElem.classList.add(separator);
    cont.appendChild(separatorElem);
  }
};
