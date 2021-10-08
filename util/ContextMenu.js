/* eslint-disable*/
const { React, contextMenu } = require("powercord/webpack");
const { ContextMenu } = require("powercord/components");
const CustomizeModal = require("../components/CustomizeModal");
const { open } = require("powercord/modal");
const { getModule } = require("powercord/webpack");
let target;
module.exports = class CustomContextMenu {
  static yes(res, args, plugin, settingsModule) {
    let itemidlist = {};
    for (let i in res) {
      if (res[i].key != parseInt(res[i].key)) {
        if (res[i].key != null) {
          let iteminfo = [];
          let itemid = res[i].key;
          itemid =
            itemid === "My Account"
              ? "MyAccount"
              : itemid === "Profile Customization"
              ? "ProfileCustomization"
              : itemid === "Privacy & Safety"
              ? "PrivacynSafety"
              : itemid === "Authorized Apps"
              ? "AuthorizedApps"
              : itemid === "Discord Nitro"
              ? "DiscordNitro"
              : itemid === "Nitro Server Boost"
              ? "NitroServerBoost"
              : itemid === "Library Inventory"
              ? "LibraryInventory"
              : itemid === "Voice & Video"
              ? "VoicenVideo"
              : itemid === "Text & Images"
              ? "TextnImages"
              : itemid === "Streamer Mode"
              ? "StreamerMode"
              : itemid === "Game Activity"
              ? "GameActivity"
              : itemid === "Hypesquad Online"
              ? "HypesquadOnline"
              : itemid;
          iteminfo.push("");
          iteminfo.push(100);
          setTimeout(() => {
            iteminfo.push(
              document.querySelector(`[data-item-id="${itemid}"]`).textContent
            );
          }, 0);
          itemidlist[itemid] = iteminfo;
          // delete itemidlist[null];
          res[i].props.onContextMenu = (args) => {
            target = args.target.getAttribute("data-item-id");
            let items = [];
            // items.push({
            //   type: "checkbox",
            //   name: "Add Favorite",
            //   id: "better-settings-favorite",
            //   // onChange: this.setState
            // });
            // items.push({
            //   type: "checkbox",
            //   name: "Hide",
            //   id: "better-settings-hide",
            //   color: "colorDanger",
            // });
            items.push({
              type: "button",
              name: "Open",
              id: "better-settings-open",
              onClick: () => {
                let openid = target;
                openid =
                  openid === "MyAccount"
                    ? "My Account"
                    : openid === "ProfileCustomization"
                    ? "Profile Customization"
                    : openid === "PrivacynSafety"
                    ? "Privacy & Safety"
                    : openid === "AuthorizedApps"
                    ? "Authorized Apps"
                    : openid === "DiscordNitro"
                    ? "Discord Nitro"
                    : openid === "NitroServerBoost"
                    ? "Nitro Server Boost"
                    : openid === "LibraryInventory"
                    ? "Library Inventory"
                    : openid === "VoicenVideo"
                    ? "Voice & Video"
                    : openid === "TextnImages"
                    ? "Text & Images"
                    : openid === "StreamerMode"
                    ? "Streamer Mode"
                    : openid === "GameActivity"
                    ? "Game Activity"
                    : openid === "HypeSquadOnline"
                    ? "HypeSquad Online"
                    : openid;
                settingsModule.open(openid);
              },
            });
            items.push({
              type: "button",
              name: "Customize",
              id: "better-settings-customize",
              onClick: () => {
                open(CustomizeModal);
              },
            });
            let menu = React.createElement(ContextMenu, {
              itemGroups: [items],
            });
            let menucont = React.createElement(
              "div",
              { id: "better-settings-context-menu" },
              menu
            );
            plugin.settings.set("contexttarget", target);
            contextMenu.openContextMenu(args, () => menucont);
          };
        }
      }
    }
    if (plugin.settings.get("itemidlist") == null) {
      plugin.settings.set("itemidlist", itemidlist);
    }
    for (let i in itemidlist) {
      if (plugin.settings.get("itemidlist")[i] == null) {
        plugin.settings.get("itemidlist")[i] = itemidlist[i];
      }
    }
    let count = 0;
    for (let i in plugin.settings.get("itemidlist")) {
      if (itemidlist[i] == null) {
        delete plugin.settings.get("itemidlist")[i];
      }
      setTimeout(() => {
        // console.log(
        //   plugin.settings.get("itemidlist")[i][2] != itemidlist[i][2]
        // );
        if (plugin.settings.get("itemidlist")[i][2] != itemidlist[i][2]) {
          count += 1;
          if (count > 17) {
            console.warn("Renamed settings reset due to change of language!");
            for (let a in plugin.settings.get("itemidlist")) {
              plugin.settings.get("itemidlist")[a][2] = itemidlist[a][2];
            }
          }
        }
      }, 0);
    }
    // console.log(plugin.settings.get("itemidlist"));
  }
};
