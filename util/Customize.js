/* eslint-disable */
const FavouritesUtil = require("./FavouritesUtil");
module.exports = class Customize {
  static createColor(color) {
    let itemidlist = powercord.pluginManager.get("better-settings").settings.get("itemidlist"); // prettier-ignore
    let contextelement = powercord.pluginManager.get("better-settings").settings.get("contexttarget"); //prettier-ignore

    itemidlist[contextelement][0] = `#${color.toString(16)}`;

    document.querySelector(
      `[data-item-id="${powercord.pluginManager
        .get("better-settings")
        .settings.get("contexttarget")}"]`
    ).style.color = `#${color.toString(16)}`;

    if (color == 10070709) {
      document.querySelector(
        `[data-item-id="${powercord.pluginManager
          .get("better-settings")
          .settings.get("contexttarget")}"]`
      ).style.color = ``;
      contextelement = powercord.pluginManager
        .get("better-settings")
        .settings.get("contexttarget");
      itemidlist[contextelement][0] = `)`;
    }
  }

  static setColor() {
    let itemidlist = powercord.pluginManager.get("better-settings").settings.get("itemidlist") // prettier-ignore
    for (let i in itemidlist) {
      setTimeout(() => {
        document.querySelector(
          `[data-item-id="${i}"]`
        ).style.color = `${itemidlist[i][0]}`;
      }, 0);
    }
  }

  static createText(text, itemid) {
    let itemidlist = powercord.pluginManager.get("better-settings").settings.get("itemidlist"); // prettier-ignore
    let contextelement = powercord.pluginManager.get("better-settings").settings.get("contexttarget"); //prettier-ignore
    if (text == "") {
      text = itemid;
    }
    itemidlist[contextelement][2] = text;
    document.querySelector(`[data-item-id="${contextelement}"]`).textContent = text; //prettier-ignore
  }

  static setText() {
    let itemidlist = powercord.pluginManager.get("better-settings").settings.get("itemidlist") // prettier-ignore
    for (let i in itemidlist) {
      setTimeout(() => {
        document.querySelector(
          `[data-item-id="${i}"]`
        ).textContent = `${itemidlist[i][2]}`;
      }, 0);
    }
  }
  static createOpacity(opacity) {
    let itemidlist = powercord.pluginManager.get("better-settings").settings.get("itemidlist"); // prettier-ignore
    let contextelement = powercord.pluginManager.get("better-settings").settings.get("contexttarget"); //prettier-ignore
    itemidlist[contextelement][1] = opacity;
    document.querySelector(`[data-item-id="${contextelement}"]`).style.opacity = `${opacity}%` //prettier-ignore
  }
  static setOpacity() {
    let itemidlist = powercord.pluginManager.get("better-settings").settings.get("itemidlist") // prettier-ignore
    for (let i in itemidlist) {
      setTimeout(() => {
        document.querySelector(
          `[data-item-id="${i}"]`
        ).style.opacity = `${itemidlist[i][1]}%`;
      }, 0);
    }
  }
  static addFavorite(value, contextname) {
    contextname = contextname.toUpperCase();
    let favorites = powercord.pluginManager.get("better-settings").settings.get("favorites", ""); //prettier-ignore
    favorites = favorites.toUpperCase();
    favorites = favorites.split(", ");
    if (favorites.indexOf(contextname) == -1 && value == true) {
      favorites.push(contextname);
      favorites = favorites.join(", ");
      powercord.pluginManager.get("better-settings").settings.set("favorites", favorites); //prettier-ignore
      // setInterva(() => {
      let contexttarget = powercord.pluginManager
        .get("better-settings")
        .settings.get("contexttarget");
      contexttarget = document.querySelector(
        `[data-item-id="${contexttarget}"]`
      );
      FavouritesUtil.favoriteOnSave(contexttarget);
      // }, 0);
    } else if (favorites.indexOf(contextname) != -1 && value == false) {
      favorites.splice(favorites.indexOf(contextname), 1);
      favorites = favorites.join(", ");
      powercord.pluginManager.get("better-settings").settings.set("favorites", favorites) //prettier-ignore
      // FavouritesUtil.favourites(powercord.pluginManager.get("better-settings"));
    }
  }
  static setFavorite(val) {
    document.getElementById("favorite-checkbox").checked = val;
    document
      .querySelector(`[for="favorite-checkbox"]`)
      .addEventListener("change", (e) => {
        let ifchecked = e.target.checked;
        if (ifchecked == true) {
          document.getElementById("hidden-checkbox").checked = false;
        }
      });
  }
  static addDisabled(value, contextname) {
    contextname = contextname.toUpperCase();
    let disabled = powercord.pluginManager.get("better-settings").settings.get("baddies", ""); //prettier-ignore
    disabled = disabled.toUpperCase();
    disabled = disabled.split(", ");
    if (disabled.indexOf(contextname) == -1 && value == true) {
      disabled.push(contextname);
      disabled = disabled.join(", ");
      powercord.pluginManager.get("better-settings").settings.set("baddies", disabled); //prettier-ignore
    } else if (disabled.indexOf(contextname) != -1 && value == false) {
      disabled.splice(disabled.indexOf(contextname), 1);
      disabled = disabled.join(", ");
      powercord.pluginManager.get("better-settings").settings.set("baddies", disabled) //prettier-ignore
    }
  }
  static setDisabled(val) {
    document.getElementById("hidden-checkbox").checked = val;
    document
      .querySelector(`[for="hidden-checkbox"]`)
      .addEventListener("change", (e) => {
        let ifchecked = e.target.checked;
        if (ifchecked == true) {
          document.getElementById("favorite-checkbox").checked = false;
        }
      });
  }
};
