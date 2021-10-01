/* eslint-disable */
const { Plugin } = require("powercord/entities");
const { inject, uninject } = require("powercord/injector");
const { React, getModule, i18n: { Messages } } = require('powercord/webpack');

const PluginSettings = require('./components/Settings');
const SearchTextbox = require('./components/SearchTextbox');

const DisabledUtil = require('./util/DisabledUtil');
const FavouritesUtil = require('./util/FavouritesUtil');
const SearchUtil = require('./util/SearchUtil');
const ShortcutUtil = require('./util/ShortcutUtil');

module.exports = class BetterSettings extends Plugin {
    async startPlugin() {

        this.loadStylesheet('./index.scss');
        powercord.api.settings.registerSettings(this.entityID, {
            category: this.entityID,
            label: this.manifest.name,
            render: PluginSettings
        });

        console.log(this.entityID);

        // console.log(getModule("aa"));

        const SettingsView = await getModule(
            m => m.displayName === "SettingsView"
        );
        console.log('SettingsView');
        console.log(SettingsView.prototype);

        const settingsModule = await getModule([ "open", "saveAccountChanges" ]);

        let lastsection;
        const thisPlugin = this;

        inject(
            "bettersettings_settings",
            SettingsView.prototype,
            'render',
            (_, res) => {

                const sidebarItems = res.props.sidebar.props.children;
                const selectedItem = res.props.sidebar.props.selectedItem;

                console.log("Settings.res");
                console.log(res);
                console.log(sidebarItems);
                console.log(selectedItem);

                const autofocus = this.settings.get("AutoFocus", true);
                const noreset = this.settings.get("noreset", false);
                let settings;

                // Push search textbox
                sidebarItems.unshift(
                    React.createElement(SearchTextbox, { placeholderText: Messages.SEARCH })
                );

                const sidebarHasItem = ((itemName) => { sidebarItems.findIndex((item) => { return item.key === itemName }) - 1; });
                const isUserSettings = !(sidebarHasItem("changelog") < 0);
                const isInGuildSettings = !(sidebarHasItem("GUILD_PREMIUM") < 0);
                const isInChannelSettings = !(sidebarHasItem("OVERVIEW") < 0) && !isInGuildSettings;

                settings = document.querySelector(`[aria-label="USER_SETTINGS"] .side-8zPYf6`);

                if (document.getElementById("settingssearch") == null) {
                    if (noreset === true) {
                        settingsModule.open(lastsection);
                    }
                    setTimeout(() => {
                        if (autofocus === true) {
                            document.getElementById('settingssearch').focus();
                        }
                    }, 1)

                    // Prompt the user to reinstall because of some weird bug with the entity name
                    if (this.entityID === "Better-Settings") {
                        // let updatenotif = document.createElement("div");
                        // let updatenotifclass = document.createAttribute("class");
                        // updatenotifclass.value = "updatenotif";
                        // updatenotif.setAttributeNode(updatenotifclass);
                        // updatenotif.textContent = "Better Settings had an update that requires you to change the plugin folder name to 'better-settings' (capital sensitive) or reinstall the plugin\nsorry for the incovinence!";

                        let updatenotif = document.createElement("div");
                        updatenotif.classList.add("updatenotif");
                        updatenotif.textContent = "Better Settings had an update that requires you to change the plugin folder name to 'better-settings' (case sensitive) or reinstall the plugin\nsorry for the incovinence!";

                        document.querySelector(`[aria-label="USER_SETTINGS"] .sidebar-CFHs9e`).append(updatenotif);
                    }

                    setTimeout(() => {
                        SearchUtil.search(thisPlugin, settingsModule, document.querySelector(`[aria-label="USER_SETTINGS"] .side-8zPYf6`), sidebarItems, "USER_SETTINGS");
                        FavouritesUtil.favourites(thisPlugin);
                        DisabledUtil.disabled(thisPlugin);
                        ShortcutUtil.shortcut(thisPlugin, lastsection);
                    }, 0);
                }

                if (document.querySelector(`[aria-label="GUILD_SETTINGS"]`) == null) {
                    if (res.props.section !== "My Account") {
                        lastsection = res.props.section;
                    } else if (res.props.section !== "OVERVIEW") {
                        lastsection = res.props.section;
                    }
                }

                setTimeout(() => {
                    settings = document.querySelector(`[aria-label="GUILD_SETTINGS"] .side-8zPYf6`);
                    if (settings != null && settings.id !== "checked") {
                        setTimeout(() => {
                            if (autofocus === true) {
                                document.getElementById('settingssearch').focus();
                            }
                        }, 1);
                        SearchUtil.search(thisPlugin, settingsModule, document.querySelector(`[aria-label="GUILD_SETTINGS"] .side-8zPYf6`), 190, "GUILD_SETTINGS");
                        FavouritesUtil.favourites(thisPlugin);
                        DisabledUtil.disabled(thisPlugin);
                    }
                }, 0);

                return (res);
            }
        );

        inject(
            "bettersettings_settingsItems",
            SettingsView.prototype,
            'getPredicateSections',
            (args, items) => {

                // Separate Powercord plugins and give them their own category
                const updaterItem = items.findIndex((item) => { return item.section === "pc-updater" }) + 1;
                const separatePluginsCategory = this.settings.get("pluginsCategory", false);
                console.log(`separatePluginsCategory ${separatePluginsCategory}`);

                // are we somehow running outside of powercord?
                if (updaterItem >= 0
                    && separatePluginsCategory) {

                    const pcPluginsCategory = [
                        { section: "DIVIDER" },
                        { section: "HEADER", label: "Plugins" },
                    ];

                    items.splice(updaterItem, 0, ...pcPluginsCategory);
                }

                return items;
            }
        );
    }

    pluginWillUnload() {
        uninject('bettersettings_settings');
        uninject('bettersettings_settingsItems');
        powercord.api.settings.unregisterSettings(this.entityID);
    }
};