/* eslint-disable */
const FavouritesUtil = require("./FavouritesUtil");
const { getModule } = require("powercord/webpack");
const { inject, uninject } = require("powercord/injector");
module.exports = class Customize {
  static async createColor(color, plugin) {
    const SettingsView = await getModule(
      (m) => m.displayName === "StandardSidebarView"
    );
    let itemidlist = plugin.settings.get("itemidlist");
    let target_id = plugin.settings.get("target_id");
    // let target = plugin.settings.get("target");
    itemidlist[target_id][0] = `#${color.toString(16)}`;
    if (color == 10070709) {
      itemidlist[target_id][0] = undefined;
    }

    // dom for live updates cuz i couldnt figure anything else out, not heaving taxing so it should be fine
    if (document.querySelector(`[data-item-id="${target_id}"]`)) {
      document.querySelector(
        `[data-item-id="${target_id}"]`
      ).style.color = `#${color.toString(16)}`;

      if (color == 10070709) {
        document.querySelector(
          `[data-item-id="${target_id}"]`
        ).style.color = ``;
      }
    }
  }

  static setColor(res, plugin) {
    let itemidlist = plugin.settings.get("itemidlist");
    for (let i in itemidlist) {
      res.props.sidebar.props.children.find(find).props.color =
        itemidlist[i][0];
      function find(item) {
        return item.key == i;
      }
    }
  }

  static createText(text, itemid, plugin) {
    try {
      let itemidlist = plugin.settings.get("itemidlist");
      let target_id = plugin.settings.get("target_id");
      if (text == "") {
        text = itemid;
      }
      itemidlist[target_id][2] = text;
      plugin.settings.set("itemidlist", itemidlist);
      if (document.querySelector(`[data-item-id="${target_id}"]`)) {
        document.querySelector(`[data-item-id="${target_id}"]`).textContent =
          text;
      }
    } catch (error) {
      console.error(error);
    }
  }

  static setText(res, plugin) {
    let itemidlist = plugin.settings.get("itemidlist");
    for (let i in itemidlist) {
      res.props.sidebar.props.children.find(find).props.children =
        itemidlist[i][2];
      function find(item) {
        return item.key == i;
      }
    }
  }
  static createOpacity(opacity, plugin) {
    // let itemidlist = plugin.settings.get("itemidlist");
    // let target_id = plugin.settings.get("target_id");
    // itemidlist[contextelement][1] = opacity;
    // document.querySelector(
    //   `[data-item-id="${contextelement}"]`
    // ).style.opacity = `${opacity}%`;

    try {
      let itemidlist = plugin.settings.get("itemidlist");
      let target_id = plugin.settings.get("target_id");

      itemidlist[target_id][1] = opacity;
      plugin.settings.set("itemidlist", itemidlist);
      if (document.querySelector(`[data-item-id="${target_id}"]`)) {
        document.querySelector(
          `[data-item-id="${target_id}"]`
        ).style.opacity = `${opacity}%`;
      }
    } catch (error) {
      console.error(error);
    }
  }
  static setOpacity(res, plugin) {
    // let itemidlist = plugin.settings.get("itemidlist");
    // for (let i in itemidlist) {
    //   res.props.sidebar.props.children.find(find).props.style = {{color: `red`}};
    //   function find(item) {
    //     return item.key == i;
    //   }
    // }
  }
  static addFavorite(value, contextname, plugin, textcont) {
    try {
      let itemidlist = plugin.settings.get("itemidlist");
      let target_id = plugin.settings.get("target_id");
      contextname = itemidlist[target_id][2].toUpperCase();
      let favorites = plugin.settings.get("favorites", "");
      favorites = favorites.toUpperCase();
      favorites = favorites.split(", ");
      if (favorites.indexOf(contextname) == -1 && value == true) {
        favorites.push(contextname);
        favorites = favorites.join(", ");
        plugin.settings.set("favorites", favorites);
        // target_id = document.querySelector(`[data-item-id="${target_id}"]`);
        // FavouritesUtil.favoriteOnSave(target_id);
      } else if (favorites.indexOf(contextname) != -1 && value == false) {
        if (favorites.indexOf(contextname) != -1)
          favorites.splice(favorites.indexOf(contextname), 1);
        else if (favorites.indexOf(textcont) != -1)
          favorites.splice(favorites.indexOf(textcont), 1);
        favorites = favorites.join(", ");
        plugin.settings.set("favorites", favorites);
        // FavouritesUtil.favourites(powercord.pluginManager.get("better-settings"));
      }
    } catch (e) {
      console.error(e);
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
