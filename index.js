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

        const SettingsView = await getModule(
            m => m.displayName == "SettingsView"
        );
        const settingsModule = await getModule([ "open", "saveAccountChanges" ]);

        let lastsection;
        const thisPlugin = this;

        inject(
            "settingssearch",
            SettingsView.prototype,
            'render',
            (_, res) => {
                const autofocus = this.settings.get("AutoFocus", true);
                const noreset = this.settings.get("noreset", false);
                let settings;

                // Push search textbox
                res.props.sidebar.props.children.unshift(
                    React.createElement(SearchTextbox, { placeholderText: Messages.SEARCH })
                );

                settings = document.querySelector(`[aria-label="USER_SETTINGS"] .side-8zPYf6`);

                if (document.getElementById("settingssearch") == null) {
                    if (noreset == true) {
                        settingsModule.open(lastsection);
                    }
                    setTimeout(() => {
                        if (autofocus == true) {
                            document.getElementById('settingssearch').focus();
                        }
                    }, 1)
                    if (this.entityID == "Better-Settings") {
                        let updatenotif = document.createElement("div");
                        let updatenotifclass = document.createAttribute("class");
                        updatenotifclass.value = "updatenotif";
                        updatenotif.setAttributeNode(updatenotifclass);
                        updatenotif.textContent = "Better Settings had an update that requires you to change the plugin folder name to 'better-settings' (capital sensitive) or reinstall the plugin\nsorry for the incovinence!";
                        document.querySelector(`[aria-label="USER_SETTINGS"] .sidebar-CFHs9e`).append(updatenotif);
                    }
                    setTimeout(() => {
                        SearchUtil.search(thisPlugin, settingsModule, document.querySelector(`[aria-label="USER_SETTINGS"] .side-8zPYf6`), 380, "USER_SETTINGS");
                        FavouritesUtil.favourites(thisPlugin);
                        DisabledUtil.disabled(thisPlugin);
                        ShortcutUtil.shortcut(thisPlugin, lastsection);
                    }, 0);
                }

                if (document.querySelector(`[aria-label="GUILD_SETTINGS"]`) == null) {
                    if (res.props.section != "My Account") {
                        lastsection = res.props.section;
                    } else if (res.props.section != "OVERVIEW") {
                        lastsection = res.props.section;
                    }
                }

                setTimeout(() => {
                    settings = document.querySelector(`[aria-label="GUILD_SETTINGS"] .side-8zPYf6`);
                    if (settings != null && settings.id != "checked") {
                        setTimeout(() => {
                            if (autofocus == true) {
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
    }

    pluginWillUnload() {
        uninject('settingssearch');
        powercord.api.settings.unregisterSettings(this.entityID);
    }
};