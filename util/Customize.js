/* eslint-disable */
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
};
