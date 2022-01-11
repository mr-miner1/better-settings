/* eslint-disable*/
const { React, contextMenu } = require("powercord/webpack");
const { ContextMenu } = require("powercord/components");
const CustomizeModal = require("../components/CustomizeModal");
const { open } = require("powercord/modal");
const { getModule } = require("powercord/webpack");
let target;
module.exports = class CustomContextMenu {
  static create(res, args, plugin, settingsModule) {
    let itemidlist = {};
    for (let i in res) {
      if (res[i].key != parseInt(res[i].key)) {
        if (res[i].key != null) {
          let item = res[i];
          let itemname = item.props.children;
          if (typeof itemname == "object") {
            itemname = "Discord Nitro";
          }
          let iteminfo = [];
          iteminfo.push(undefined);
          iteminfo.push(100);
          iteminfo.push(itemname);
          itemidlist[item.key] = iteminfo;
          item.props.onContextMenu = (args) => {
            target = item.key;
            let context_menu_items = [];
            context_menu_items.push({
              type: "button",
              name: "Open",
              id: "better-settings-open",
              onClick: () => {
                settingsModule.open(target);
              },
            });
            context_menu_items.push({
              type: "button",
              name: "Customize",
              id: "better-settings-customize",
              onClick: () => {
                open(CustomizeModal);
              },
            });
            let menu = React.createElement(ContextMenu, {
              itemGroups: [context_menu_items],
            });
            let menucont = React.createElement(
              "div",
              { id: "better-settings-context-menu" },
              menu
            );
            try {
              for (let i in itemidlist) {
                if (itemidlist[i][2] == item.props.children) {
                  plugin.settings.set("target_name", itemname);
                } else if (itemidlist[i][2] == target) {
                  plugin.settings.set("target_name", itemname);
                }
              }
              plugin.settings.set("target", item);
              plugin.settings.set("target_id", target);
              contextMenu.openContextMenu(args, () => menucont);
            } catch (error) {
              console.error(error);
            }
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
      // if (plugin.settings.get("itemidlist")[i][2] != itemidlist[i][2]) {
      //   count += 1;
      //   if (count > 17) {
      //     console.warn("Renamed settings reset due to change of language!");
      //     for (let a in plugin.settings.get("itemidlist")) {
      //       plugin.settings.get("itemidlist")[a][2] = itemidlist[a][2];
      //     }
      //   }
      // }
    }
  }
};
