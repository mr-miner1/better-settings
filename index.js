/* eslint-disable */
const { Plugin } = require("powercord/entities");
const { inject, uninject } = require("powercord/injector");
const {
  React,
  getModule,
  i18n: { Messages },
} = require("powercord/webpack");
const InstalledProduct = require("../pc-moduleManager/components/parts/InstalledProduct.jsx");
const Settings = require("../pc-settings/index.js");
const { open: openModal } = require("powercord/modal");

const PluginSettings = require("./components/Settings");
const SearchTextbox = require("./components/SearchTextbox");

const DisabledUtil = require("./util/DisabledUtil");
const FavouritesUtil = require("./util/FavouritesUtil");
const SearchUtil = require("./util/SearchUtil");
const ShortcutUtil = require("./util/ShortcutUtil");
const CustomContextMenu = require("./util/ContextMenu");
const Customize = require("./util/Customize");
const bd = require("./util/BD-like-settings");
const QuickActions = require("./util/QuickActions");
const ChangeLogModal = require("./components/ChangeLog");
const Themes = require("./util/ThemeSettings");

module.exports = class BetterSettings extends Plugin {
  async startPlugin() {
    this.loadStylesheet("./index.scss");
    powercord.api.settings.registerSettings(this.entityID, {
      category: this.entityID,
      label: this.manifest.name,
      render: PluginSettings,
    });

    const log = (...args) => {
      // console.log("[BetterSettings]", ...args);
    };

    const SettingsView = await getModule(
      (m) => m.displayName === "SettingsView"
    );
    log("[BetterSettings]", "SettingsView");
    log("[BetterSettings]", SettingsView.prototype);
    const settingsModule = await getModule(["open", "saveAccountChanges"]);
    let lastsection = {};
    const thisPlugin = this;

    const autoFocus = (autofocus) => {
      setTimeout(() => {
        if (autofocus === true) {
          log("[BetterSettings]", "focusedElem");
          log(
            "[BetterSettings]",
            document.querySelector(
              `[aria-label="USER_SETTINGS"] ${document.activeElement.className}`
            )
          );
          if (
            document.querySelector(
              `[aria-label="USER_SETTINGS"] ${document.activeElement.className}`
            ) !== undefined
          ) {
            document.getElementById("settingssearch").focus();
          }
        }
      }, 1);
    };

    inject(
      "betterSettings_settingsMount",
      SettingsView.prototype,
      "componentDidMount",
      (args, res) => {
        const autofocus = thisPlugin.settings.get("AutoFocus", true);
        autoFocus(autofocus);
        return res;
      }
    );
    inject(
      "betterSettings_settings",
      SettingsView.prototype,
      "render",
      (_, res) => {
        if (res === null) return res;

        log("[BetterSettings]", "Settings.res");
        log("[BetterSettings]", res);

        const sidebarItems = res.props.sidebar.props.children;
        const selectedItem = res.props.sidebar.props.selectedItem;
        log("[BetterSettings]", sidebarItems);
        log("[BetterSettings]", selectedItem);
        log("[BetterSettings]", "lastsection");
        log("[BetterSettings]", lastsection);

        const autofocus = thisPlugin.settings.get("AutoFocus", true);
        const noreset = thisPlugin.settings.get("noreset", false);
        let settings;

        // Push search textbox
        sidebarItems.unshift(
          React.createElement(SearchTextbox, {
            placeholderText: Messages.SEARCH,
          })
        );

        const sidebarHasItem = (itemName) => {
          return (
            sidebarItems.findIndex((item) => {
              return item.key === itemName;
            }) - 1
          );
        };
        const isUserSettings = sidebarHasItem("changelog") !== -2;
        const isInGuildSettings =
          typeof sidebarItems[1].props.children === "string" && !isUserSettings; // funky!
        const isInChannelSettings =
          typeof sidebarItems[1].props.children !== "string";

        // ID table:
        // 0 - user settings
        // 1 - guild settings
        // 2 - channel settings
        // 3 - gulag
        const sectionID = isUserSettings
          ? 0
          : isInGuildSettings
          ? 1
          : isInChannelSettings
          ? 2
          : 3;

        log("[BetterSettings]", `settingsID: ${sectionID}`);
        log("[BetterSettings]", res);

        settings = document.querySelector(
          `[aria-label="USER_SETTINGS"] .side-8zPYf6`
        );

        if (document.getElementById("settingssearch") == null) {
          if (noreset === true && lastsection[sectionID]) {
            settingsModule.open(lastsection[sectionID]);
          }
          // autoFocus(autofocus);

          // Prompt the user to reinstall because of some weird bug with the entity name
          if (this.entityID === "Better-Settings") {
            let updatenotif = document.createElement("div");
            updatenotif.classList.add("updatenotif");
            updatenotif.textContent =
              "Better Settings had an update that requires you to change the plugin folder name to 'better-settings' (case sensitive) or reinstall the plugin\nsorry for the incovinence!";

            document
              .querySelector(`[aria-label="USER_SETTINGS"] .sidebar-CFHs9e`)
              .append(updatenotif);
          }

          setTimeout(() => {
            settings = document.querySelector(
              `[aria-label="USER_SETTINGS"] .side-8zPYf6`
            );
            if (settings != null && settings.id !== "checked") {
              SearchUtil.search(
                thisPlugin,
                settingsModule,
                document.querySelector(
                  `[aria-label="USER_SETTINGS"] .side-8zPYf6`
                ),
                sidebarItems,
                "USER_SETTINGS"
              );
              FavouritesUtil.favourites(thisPlugin);
              DisabledUtil.disabled(thisPlugin);
              ShortcutUtil.shortcut(thisPlugin, lastsection);
            }
          }, 0);
        }

        // Remember last page (dependant on page)
        if (document.querySelector(`[aria-label="GUILD_SETTINGS"]`) === null) {
          if (res.props.section !== "My Account") {
            lastsection[sectionID] = res.props.section;
          } else if (
            res.props.section !== "OVERVIEW" ||
            res.props.section !== "pc-updater"
          ) {
            lastsection[sectionID] = res.props.section;
          }
        }

        setTimeout(() => {
          settings = document.querySelector(
            `[aria-label="GUILD_SETTINGS"] .side-8zPYf6`
          );
          if (settings != null && settings.id !== "checked") {
            // autoFocus(autofocus);
            SearchUtil.search(
              thisPlugin,
              settingsModule,
              settings,
              190,
              "GUILD_SETTINGS"
            );
            FavouritesUtil.favourites(thisPlugin);
            DisabledUtil.disabled(thisPlugin);
          }
        }, 0);

        return res;
      }
    );

    inject(
      "betterSettings_settingsItems",
      SettingsView.prototype,
      "getPredicateSections",
      (args, items) => {
        // Separate Powercord plugins and give them their own category
        const updaterItem =
          items.findIndex((item) => {
            return item.section === "pc-updater";
          }) + 1;
        const separatePluginsCategory = thisPlugin.settings.get(
          "pluginsCategory",
          false
        );

        // are we somehow running outside of powercord?
        if (updaterItem > 0 && separatePluginsCategory) {
          const pcPluginsCategory = [
            { section: "DIVIDER" },
            { section: "HEADER", label: "Plugins" },
          ];

          items.splice(updaterItem, 0, ...pcPluginsCategory);
        }
        return items;
      }
    );
    inject(
      "betterSettings_contextmenu",
      SettingsView.prototype,
      "render",
      (args, res) => {
        const sidebarHasItem = (itemName) => {
          return (
            res.props.sidebar.props.children.findIndex((item) => {
              return item.key === itemName;
            }) - 1
          );
        };
        const isUserSettings = sidebarHasItem("changelog") !== -2;
        if (isUserSettings) {
          CustomContextMenu.create(
            res.props.sidebar.props.children,
            SettingsView,
            thisPlugin,
            settingsModule
          );
          Customize.setColor();
          Customize.setText();
          Customize.setOpacity();
        }
        return res;
      }
    );
    if (this.settings.get("qa_settings") == true) {
      bd.begin();
      inject(
        "betterSettings_productRenderPrePatch",
        InstalledProduct.prototype,
        "render",
        bd.productRenderPrePatch,
        true
      );
      inject(
        "betterSettings_productRenderPatch",
        InstalledProduct.prototype,
        "render",
        bd.productRenderPatch
      );
      inject(
        "betterSettings_productRenderFooterPatch",
        InstalledProduct.prototype,
        "renderFooter",
        bd.productRenderFooterPatch
      );
      inject(
        "betterSettings_makeSectionPatch",
        Settings.prototype,
        "_makeSection",
        bd.makeSectionPatch
      );
      inject(
        "betterSettings_getPredicateSectionsPatch",
        SettingsView.prototype,
        "getPredicateSections",
        bd.getPredicateSectionsPatch
      );
      inject(
        "betterSettings_openSettings",
        settingsModule,
        "open",
        bd.openPatch,
        true
      );
    }
    inject(
      "betterSettings_quickActionsButtons",
      InstalledProduct.prototype,
      "render",
      QuickActions.buttons
    );
    inject(
      "betterSettings_quickActionsStart",
      InstalledProduct.prototype,
      "render",
      QuickActions.begin,
      true
    );
    inject(
      "betterSettings_changelog",
      SettingsView.prototype,
      "render",
      (_, res) => {
        if (this.settings.get("changelog", false) != true) {
          openModal(ChangeLogModal);
          this.settings.set("changelog", true);
        }
        return res;
      }
    );
    Themes.run("index");
  }
  pluginWillUnload() {
    uninject("betterSettings_settings");
    uninject("betterSettings_settingsItems");
    uninject("betterSettings_settingsMount");
    uninject("betterSettings_contextmenu");
    uninject("betterSettings_productRenderPrePatch");
    uninject("betterSettings_productRenderPatch");
    uninject("betterSettings_productRenderFooterPatch");
    uninject("betterSettings_makeSectionPatch");
    uninject("betterSettings_getPredicateSectionsPatch");
    uninject("betterSettings_openSettings");
    uninject("betterSettings_quickActionsButtons");
    uninject("betterSettings_quickActionsStart");
    uninject("betterSettings_changelog");
    powercord.api.settings.unregisterSettings(this.entityID);
  }
};
