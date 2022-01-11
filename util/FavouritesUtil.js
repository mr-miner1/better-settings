/* eslint-disable */
const { React, getModule } = require("powercord/webpack");
const Favorites = require("../components/Favorites.jsx");
const { header, separator } = getModule(
  ["header", "separator", "themed", "item"],
  false
);

module.exports = class FavouritesUtil {
  static favourites(plugin, res) {
    const favoritesettings = plugin.settings.get("favorites", "").toUpperCase();
    let favorites = favoritesettings.split(", ");
    let sidebarItems = res.props.sidebar.props.children;
    let favorited_items = [];
    for (let item of sidebarItems) {
      if (
        item.key != parseInt(item.key) &&
        sidebarItems.indexOf(item) !== 0 &&
        typeof item.props.children !== "object" &&
        item.props.children
      ) {
        if (favorites.indexOf(item.props.children.toUpperCase()) != -1) {
          favorited_items.push(item);
        }
      }
    }
    if (favorited_items.length > 0) {
      sidebarItems.unshift(
        React.createElement("div", { className: separator })
      );
      for (let item of favorited_items) {
        sidebarItems.unshift(item);
      }
      sidebarItems.unshift(
        React.createElement("div", {
          className: header,
          children: "Favorites",
        })
      );
    }
    let count = 0;
    for (let item = sidebarItems.length; item > -1; item--) {
      if (
        favorited_items.indexOf(sidebarItems[item]) != -1 &&
        count < favorited_items.length
      ) {
        count++;
        sidebarItems.splice(item, 1);
        // sidebarItems[item].props.children = "red";
      }
      // }
    }
  }
  // static favoriteOnSave(element) {
  // let cont = document.getElementsByClassName("fav-cont")[0];
  // if (cont.style[0] == "display") {
  // favorites(powercord.pluginManager.get("better-settings"));
  // cont.style.display = "";
  // }
  //   cont.appendChild(element);
  //   document.querySelector(".fav-cont .separator-gCa7yv").remove();
  //   let separatorElem = document.createElement("div");
  //   separatorElem.classList.add(separator);
  //   cont.appendChild(separatorElem);
  // }
  // }
};
