/* eslint-disable */
const {
  getModule,
  i18n: { Messages },
} = require("powercord/webpack");
const Util = require("./Util");
let { header, separator, item: item_class } = getModule(["side"], false);
let socialLinks;
getModule(["socialLinks"]).then((socialLinksModule) => {
  socialLinks = "." + socialLinksModule.socialLinks;
});
header = "." + header;
separator = "." + separator;
let info = ".info-3pQQBb";
module.exports = class SearchUtil {
  getItemId(itemid) {
    return (itemid =
      itemid === "MyAccount"
        ? "My Account"
        : itemid === "ProfileCustomization"
        ? "Profile Customization"
        : itemid === "PrivacynSafety"
        ? "Privacy & Safety"
        : itemid === "AuthorizedApps"
        ? "Authorized Apps"
        : itemid === "DiscordNitro"
        ? "Discord Nitro"
        : itemid === "NitroServerBoost"
        ? "Nitro Server Boost"
        : itemid === "LibraryInventory"
        ? "Library Inventory"
        : itemid === "VoicenVideo"
        ? "Voice & Video"
        : itemid === "TextnImages"
        ? "Text & Images"
        : itemid === "StreamerMode"
        ? "Streamer Mode"
        : itemid === "GameActivity"
        ? "Game Activity"
        : itemid === "HypeSquadOnline"
        ? "HypeSquad Online"
        : itemid);
  }

  searchFunc(term, item) {
    return Util.fuzzysearch(term, item);
  }

  static search(plugin, settingsModule, settings, sidebarItems, name) {
    //add settingssearchbar
    //eventlistener for when input changes
    document.getElementById("settingssearch").addEventListener("input", () => {
      //search
      let input, value, items, search_hidden;
      input = document.getElementById("settingssearch");
      value = input.value.toLowerCase();
      items = document.getElementsByClassName(item_class);
      search_hidden = plugin.settings.get("search_hidden", false);

      let resultsCount = 0;
      if (value.startsWith("$")) {
        value = value.replace("$", "");
        search_hidden = true;
      }
      // Search algorithm
      for (let i = 0; i < items.length; i++) {
        if (
          value !== undefined &&
          this.prototype.searchFunc(value, items[i].textContent.toLowerCase())
        ) {
          items[i].style.display = null;
          resultsCount++;
        } else if (value !== undefined) {
          items[i].style.display = "none";
        }
      }

      let noresults;
      let displaycount = 0;

      for (let i = 0; i < items.length; i++) {
        if (items[i].style.cssText.indexOf("display: none;") == -1) {
          displaycount += 1;
        }
      }
      if (displaycount === 0) {
        for (let i = 0; i < document.querySelectorAll(header).length; i++) {
          document.querySelectorAll(header)[i].style = "display: none;";
        }
        if (document.getElementsByClassName("noresults")[0] === undefined) {
          noresults = document.createElement("div");
          noresults.classList.add("noresults");
          noresults.textContent = Messages.SEARCH_NO_RESULTS;

          settings.appendChild(noresults);
        }
        for (let i = 0; i < document.querySelectorAll(separator).length; i++) {
          document.querySelectorAll(separator)[i].style = "display:none";
        }
        if (name === "USER_SETTINGS") {
          document.querySelector(socialLinks).style = "display:none";
          document.querySelector(info).style = "display:none";
        }
      } else if (displaycount < 4) {
        for (let i = 0; i < document.querySelectorAll(header).length; i++) {
          document.querySelectorAll(header)[i].style = "display: none;";
          document.querySelectorAll(separator)[i].style = "display: none;";
        }
        if (name === "USER_SETTINGS") {
          document.querySelector(socialLinks).style = "display:block";
          document.querySelector(info).style = "display:block";
        }
        if (document.getElementsByClassName("noresults")[0] !== undefined) {
          document.getElementsByClassName("noresults")[0].remove();
        }
        if (name === "USER_SETTINGS") {
          document.querySelectorAll(separator)[
            document.querySelectorAll(header).length + 1
          ].style = "display:none";
        }
      } else {
        for (let i = 0; i < document.querySelectorAll(header).length; i++) {
          document.querySelectorAll(header)[i].style = "display:block";
          document.querySelectorAll(separator)[i].style = "display:block";
        }
        if (name === "USER_SETTINGS") {
          document.querySelectorAll(separator)[
            document.querySelectorAll(header).length + 1
          ].style = "display:block";
          document.querySelector(socialLinks).style = "display:block";
          document.querySelector(info).style = "display:block";
        }
        if (document.getElementsByClassName("noresults")[0] !== undefined) {
          document.getElementsByClassName("noresults")[0].remove();
        }
      }
      if (search_hidden && value.length > 1) {
        let showelements = document.getElementsByClassName("bs-hidden");
        for (let i = 0; i < showelements.length; i++) {
          showelements[i].classList.add("bs-not-hidden");
          showelements[i].classList.remove("bs-hidden");
        }
        if (value == "hidden") {
          showelements = document.getElementsByClassName("bs-not-hidden");
          for (let i = 0; i < showelements.length; i++) {
            showelements[i].style = `display: block !important;`;
          }
          if (document.getElementsByClassName("noresults")[0] !== undefined) {
            document.getElementsByClassName("noresults")[0].remove();
          }
        }
      } else if (value.length < 1) {
        let showelements = document.getElementsByClassName("bs-not-hidden");
        for (let i = 0; i < showelements.length; i++) {
          showelements[i].classList.remove("bs-not-hidden");
          showelements[i].classList.add("bs-hidden");
        }
      }
    });
    document.getElementById("settingssearch").addEventListener("keyup", (e) => {
      let done = false;
      if (e.key === "Enter" && name == "USER_SETTINGS") {
        let itemid;
        let items = document.getElementsByClassName(item_class);
        for (let i = 0; i < items.length; i++) {
          if (
            items[i].style.cssText.indexOf("display: none") == -1 &&
            items[i].classList[2] === "better-settings-fav" &&
            name === "USER_SETTINGS"
          ) {
            itemid = items[i].getAttribute("data-item-id");
            itemid = this.prototype.getItemId(itemid);
            settingsModule.open(itemid);
            done = true;
            break;
          }
        }
        for (let i = 0; i < items.length; i++) {
          if (
            items[i].style.cssText.indexOf("display: none") == -1 &&
            !items[i].classList.contains("better-settings-fav") &&
            done === false &&
            name === "USER_SETTINGS" &&
            !items[i].classList.contains("bs-hidden")
          ) {
            itemid = items[i].getAttribute("data-item-id");
            itemid = this.prototype.getItemId(itemid);
            settingsModule.open(itemid);
            break;
          }
        }
      }
    });
  }

  static searchImpl() {
    //search
    let input = document.getElementById("settingssearch");
    let value = input.value.toLowerCase();
    let items = document.getElementsByClassName(item_class);

    let resultsCount = 0;

    // Search algorithm
    for (let i = 0; i < items.length; i++) {
      if (
        value !== undefined &&
        this.prototype.searchFunc(value, items[i].textContent.toLowerCase())
      ) {
        items[i].style.display = null;
        resultsCount++;
      } else if (value !== undefined) {
        items[i].style.display = "none";
      }
    }

    let noresults;
    let displaycount = 0;

    for (let i = 0; i < items.length; i++) {
      if ("display: none".indexOf(items[i].style.cssText) === 0) {
        displaycount += 1;
      }
    }
    if (displaycount === 0) {
      for (let i = 0; i < document.querySelectorAll(header).length; i++) {
        document.querySelectorAll(header)[i].style = "display: none;";
      }
      if (document.getElementsByClassName("noresults")[0] === undefined) {
        noresults = document.createElement("div");
        noresults.classList.add("noresults");
        noresults.textContent = Messages.SEARCH_NO_RESULTS;

        settings.appendChild(noresults);
      }
      for (let i = 0; i < document.querySelectorAll(separator).length; i++) {
        document.querySelectorAll(separator)[i].style = "display:none";
      }
      if (name === "USER_SETTINGS") {
        document.querySelector(socialLinks).style = "display:none";
        document.querySelector(info).style = "display:none";
      }
    } else if (displaycount < 4) {
      for (let i = 0; i < document.querySelectorAll(header).length; i++) {
        document.querySelectorAll(header)[i].style = "display: none;";
        document.querySelectorAll(separator)[i].style = "display: none;";
      }
      if (name === "USER_SETTINGS") {
        document.querySelector(socialLinks).style = "display:block";
        document.querySelector(info).style = "display:block";
      }
      if (document.getElementsByClassName("noresults")[0] !== undefined) {
        document.getElementsByClassName("noresults")[0].remove();
      }
      document.querySelectorAll(separator)[
        document.querySelectorAll(header).length + 1
      ].style = "display:none";
    } else {
      for (let i = 0; i < document.querySelectorAll(header).length; i++) {
        document.querySelectorAll(header)[i].style = "display:block";
        document.querySelectorAll(separator)[i].style = "display:block";
      }
      if (name === "USER_SETTINGS") {
        document.querySelectorAll(separator)[
          document.querySelectorAll(header).length + 1
        ].style = "display:block";
        document.querySelector(socialLinks).style = "display:block";
        document.querySelector(info).style = "display:block";
      }
      if (document.getElementsByClassName("noresults")[0] !== undefined) {
        document.getElementsByClassName("noresults")[0].remove();
      }
    }
    if (value === "$hidden") {
      let showelements = document.getElementsByClassName("bs-hidden");
      for (let i = 0; i < showelements.length; i++) {
        showelements[
          i
        ].style = `display: block !important; color:#${baddiecolor.toString(
          16
        )};`;
      }
      if (document.getElementsByClassName("noresults")[0] !== undefined) {
        document.getElementsByClassName("noresults")[0].remove();
      }
    }
  }
};
