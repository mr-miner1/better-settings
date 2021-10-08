/* eslint-disable */
const {
  getModule,
  i18n: { Messages },
} = require("powercord/webpack");
const Util = require("./Util");

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
    const baddiecolor = plugin.settings.get(
      "baddiecolor",
      parseInt("dd3a3a", 16)
    );
    //add settingssearchbar
    //eventlistener for when input changes
    document.getElementById("settingssearch").addEventListener("input", () => {
      //search
      let input, value, items;
      input = document.getElementById("settingssearch");
      value = input.value.toLowerCase();
      items = document.getElementsByClassName("item-PXvHYJ");

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
        if (items[i].style.cssText.indexOf("display: none;") == -1) {
          displaycount += 1;
        }
      }
      if (displaycount === 0) {
        for (
          let i = 0;
          i < document.querySelectorAll(".header-2RyJ0Y").length;
          i++
        ) {
          document.querySelectorAll(".header-2RyJ0Y")[i].style =
            "display: none;";
        }
        if (document.getElementsByClassName("noresults")[0] === undefined) {
          noresults = document.createElement("div");
          noresults.classList.add("noresults");
          noresults.textContent = Messages.SEARCH_NO_RESULTS;

          settings.appendChild(noresults);
        }
        for (
          let i = 0;
          i < document.querySelectorAll(".separator-gCa7yv").length;
          i++
        ) {
          document.querySelectorAll(".separator-gCa7yv")[i].style =
            "display:none";
        }
        if (name === "USER_SETTINGS") {
          document.querySelector(".socialLinks-3jqNFy").style = "display:none";
          document.querySelector(".info-1VyQPT").style = "display:none";
        }
      } else if (displaycount < 4) {
        for (
          let i = 0;
          i < document.querySelectorAll(".header-2RyJ0Y").length;
          i++
        ) {
          document.querySelectorAll(".header-2RyJ0Y")[i].style =
            "display: none;";
          document.querySelectorAll(".separator-gCa7yv")[i].style =
            "display: none;";
        }
        if (name === "USER_SETTINGS") {
          document.querySelector(".socialLinks-3jqNFy").style = "display:block";
          document.querySelector(".info-1VyQPT").style = "display:block";
        }
        if (document.getElementsByClassName("noresults")[0] !== undefined) {
          document.getElementsByClassName("noresults")[0].remove();
        }
        document.querySelectorAll(".separator-gCa7yv")[
          document.querySelectorAll(".header-2RyJ0Y").length + 1
        ].style = "display:none";
      } else {
        for (
          let i = 0;
          i < document.querySelectorAll(".header-2RyJ0Y").length;
          i++
        ) {
          document.querySelectorAll(".header-2RyJ0Y")[i].style =
            "display:block";
          document.querySelectorAll(".separator-gCa7yv")[i].style =
            "display:block";
        }
        if (name === "USER_SETTINGS") {
          document.querySelectorAll(".separator-gCa7yv")[
            document.querySelectorAll(".header-2RyJ0Y").length + 1
          ].style = "display:block";
          document.querySelector(".socialLinks-3jqNFy").style = "display:block";
          document.querySelector(".info-1VyQPT").style = "display:block";
        }
        if (document.getElementsByClassName("noresults")[0] !== undefined) {
          document.getElementsByClassName("noresults")[0].remove();
        }
      }
      if (value === "$hidden") {
        let showelements = document.getElementsByClassName(
          "better-settings-bad"
        );
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
    });
    document.getElementById("settingssearch").addEventListener("keyup", (e) => {
      let done = false;
      if (e.key === "Enter") {
        let itemid;
        for (let i = 0; i < items.length; i++) {
          if (
            "display: none".indexOf(items[i].style.cssText) === 0 &&
            items[i].classList[2] === "better-settings-fav" &&
            name === "USER_SETTINGS"
          ) {
            itemid = items[i].getAttribute("data-item-id");
            // console.log(itemid);
            itemid = this.prototype.getItemId(itemid);
            settingsModule.open(itemid);
            done = true;
            break;
          }
        }
        for (let i = 0; i < items.length; i++) {
          if (
            "display: none".indexOf(items[i].style.cssText) === 0 &&
            items[i].classList[2] !== "better-settings-fav" &&
            done === false &&
            name === "USER_SETTINGS"
          ) {
            itemid = items[i].getAttribute("data-item-id");
            // console.log(itemid);
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
    let items = document.getElementsByClassName("item-PXvHYJ");

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
        // document.querySelectorAll(".side-8zPYf6")[0].style.opacity = "100";
        displaycount += 1;
      }
    }
    if (displaycount === 0) {
      for (
        let i = 0;
        i < document.querySelectorAll(".header-2RyJ0Y").length;
        i++
      ) {
        document.querySelectorAll(".header-2RyJ0Y")[i].style = "display: none;";
      }
      if (document.getElementsByClassName("noresults")[0] === undefined) {
        noresults = document.createElement("div");
        noresults.classList.add("noresults");
        noresults.textContent = Messages.SEARCH_NO_RESULTS;

        settings.appendChild(noresults);
      }
      for (
        let i = 0;
        i < document.querySelectorAll(".separator-gCa7yv").length;
        i++
      ) {
        document.querySelectorAll(".separator-gCa7yv")[i].style =
          "display:none";
      }
      if (name === "USER_SETTINGS") {
        document.querySelector(".socialLinks-3jqNFy").style = "display:none";
        document.querySelector(".info-1VyQPT").style = "display:none";
      }
    } else if (displaycount < 4) {
      for (
        let i = 0;
        i < document.querySelectorAll(".header-2RyJ0Y").length;
        i++
      ) {
        document.querySelectorAll(".header-2RyJ0Y")[i].style = "display: none;";
        document.querySelectorAll(".separator-gCa7yv")[i].style =
          "display: none;";
      }
      if (name === "USER_SETTINGS") {
        document.querySelector(".socialLinks-3jqNFy").style = "display:block";
        document.querySelector(".info-1VyQPT").style = "display:block";
      }
      if (document.getElementsByClassName("noresults")[0] !== undefined) {
        document.getElementsByClassName("noresults")[0].remove();
      }
      document.querySelectorAll(".separator-gCa7yv")[
        document.querySelectorAll(".header-2RyJ0Y").length + 1
      ].style = "display:none";
    } else {
      for (
        let i = 0;
        i < document.querySelectorAll(".header-2RyJ0Y").length;
        i++
      ) {
        document.querySelectorAll(".header-2RyJ0Y")[i].style = "display:block";
        document.querySelectorAll(".separator-gCa7yv")[i].style =
          "display:block";
      }
      if (name === "USER_SETTINGS") {
        document.querySelectorAll(".separator-gCa7yv")[
          document.querySelectorAll(".header-2RyJ0Y").length + 1
        ].style = "display:block";
        document.querySelector(".socialLinks-3jqNFy").style = "display:block";
        document.querySelector(".info-1VyQPT").style = "display:block";
      }
      if (document.getElementsByClassName("noresults")[0] !== undefined) {
        document.getElementsByClassName("noresults")[0].remove();
      }
    }
    if (value === "$hidden") {
      let showelements = document.getElementsByClassName("better-settings-bad");
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
