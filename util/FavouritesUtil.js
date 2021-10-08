/* eslint-disable */
const { React, getModule } = require("powercord/webpack");

const { item, header, separator } = getModule(
  ["header", "separator", "themed", "item"],
  false
);

module.exports = class FavouritesUtil {
  static favourites(plugin) {
    // const color = plugin.settings.get("color", parseInt("d4af37", 16));
    const favoritemode = plugin.settings.get("favoritemode", "ontop");

    // if (color !== undefined) {
    //   document.querySelector(
    //     `[aria-label*="_SETTINGS"]`
    //   ).style.cssText = `--favorite-setting-color: #${color.toString(16)}`;
    // } else {
    //   document.querySelector(
    //     `[aria-label*="_SETTINGS"]`
    //   ).style.cssText = `--favorite-setting-color: gold`;
    // }
    const favoritesettings = plugin.settings.get("favorites", "");

    let allitems = document.getElementsByClassName(item);
    let favorites = favoritesettings.split(", ");

    // const cont = React.createElement("div", { className: "fav-cont" },
    //     React.createElement("div", { className: header }, "Favourites")
    // );

    // let separator = React.createElement("div", { className: separator });

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
        "favorited" &&
      favoritemode == "ontop"
    ) {
      document.getElementsByClassName("side-8zPYf6")[0].appendChild(cont);
      document.getElementsByClassName("side-8zPYf6")[0].className +=
        " favorited";
    }
    for (let i = 0; i < allitems.length; i++) {
      for (let q of favorites) {
        if (allitems[i].textContent.toUpperCase() == q.toUpperCase()) {
          allitems[i].classList += " better-settings-fav";
          if (favoritemode == "ontop") {
            cont.appendChild(allitems[i]);
          }
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
};
