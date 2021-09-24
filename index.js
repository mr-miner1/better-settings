/* eslint-disable */
const {Plugin} = require("powercord/entities");
const {inject, uninject} = require("powercord/injector");
const {React, getModule, i18n: {Messages}} = require('powercord/webpack');
module.exports = class BetterSettings extends Plugin {
    async startPlugin() {
        const pluginsettings = require('./settings');
        this.loadStylesheet('./index.scss');
        powercord.api.settings.registerSettings(this.entityID, {
            category: this.entityID,
            label: this.manifest.name,
            render: pluginsettings
        })
        const search = (settings, args, name) => {
            let input, value, items, i
            const baddiecolor = this.settings.get("baddiecolor", parseInt("dd3a3a", 16))
            //add settingssearchbar
            //eventlistner for when input changes
            document.getElementById("settingssearch").addEventListener('input', () => {
                //search
                input = document.getElementById('settingssearch');
                value = input.value.toUpperCase();
                items = document.getElementsByClassName('item-PXvHYJ');
                for (i = 0; i < items.length; i++) {
                    if (items[i].textContent.toUpperCase().indexOf(value.toUpperCase()) > -1 && value != undefined) {
                        items[i].style.display = ""
                    } else if (value != undefined) {
                        items[i].style.display = "none";
                    }
                }
                let noresults;
                let noresultsclass;
                let displaycount = 0;
                for (let i = 0; i < items.length; i++) {
                    if ("display: none".indexOf(items[i].style.cssText) == 0) {
                        // document.querySelectorAll(".side-8zPYf6")[0].style.opacity = "100"
                        displaycount += 1
                    }
                }
                if (displaycount == 0) {
                    for (let i = 0; i < document.querySelectorAll(".header-2RyJ0Y").length; i++) {
                        document.querySelectorAll(".header-2RyJ0Y")[i].style = "display: none;"
                    }
                    if (document.getElementsByClassName("noresults")[0] == undefined) {
                        noresults = document.createElement("div")
                        noresultsclass = document.createAttribute("class")
                        noresultsclass.value = "noresults"
                        noresults.textContent = Messages.SEARCH_NO_RESULTS;
                        noresults.setAttributeNode(noresultsclass)
                        settings.appendChild(noresults)
                    }
                    for (let i = 0; i < document.querySelectorAll(".separator-gCa7yv").length; i++) {
                        document.querySelectorAll(".separator-gCa7yv")[i].style = "display:none"
                    }
                    if (name == "USER_SETTINGS") {
                        document.querySelector(".socialLinks-3jqNFy").style = "display:none"
                        document.querySelector(".info-1VyQPT").style = "display:none"
                    }
                } else if (displaycount < 4) {
                    for (let i = 0; i < document.querySelectorAll(".header-2RyJ0Y").length; i++) {
                        document.querySelectorAll(".header-2RyJ0Y")[i].style = "display: none;"
                        document.querySelectorAll(".separator-gCa7yv")[i].style = "display: none;"
                    }
                    if (name == "USER_SETTINGS") {
                        document.querySelector(".socialLinks-3jqNFy").style = "display:block"
                        document.querySelector(".info-1VyQPT").style = "display:block"
                    }
                    if (document.getElementsByClassName("noresults")[0] != undefined) {
                        document.getElementsByClassName("noresults")[0].remove()
                    }
                    document.querySelectorAll(".separator-gCa7yv")[document.querySelectorAll(".header-2RyJ0Y").length + 1].style = "display:none"
                } else {
                    for (let i = 0; i < document.querySelectorAll(".header-2RyJ0Y").length; i++) {
                        document.querySelectorAll(".header-2RyJ0Y")[i].style = "display:block"
                        document.querySelectorAll(".separator-gCa7yv")[i].style = "display:block"
                    }
                    if (name == "USER_SETTINGS") {
                        document.querySelectorAll(".separator-gCa7yv")[document.querySelectorAll(".header-2RyJ0Y").length + 1].style = "display:block"
                        document.querySelector(".socialLinks-3jqNFy").style = "display:block"
                        document.querySelector(".info-1VyQPT").style = "display:block"
                    }
                    if (document.getElementsByClassName("noresults")[0] != undefined) {
                        document.getElementsByClassName("noresults")[0].remove()
                    }
                }
                if (value == "$HIDDEN") {
                    let showelements = document.getElementsByClassName("better-settings-bad")
                    for (let i = 0; i < showelements.length; i++) {
                        showelements[i].style = `display: block !important; color:#${baddiecolor.toString(16)};`
                    }
                    if (document.getElementsByClassName("noresults")[0] != undefined) {
                        document.getElementsByClassName("noresults")[0].remove()
                    }
                }
            })
            document.getElementById("settingssearch").addEventListener('keyup', (e) => {
                let done = false
                if (e.key === 'Enter') {
                    let itemid
                    for (let i = 0; i < items.length; i++) {
                        if ("display: none".indexOf(items[i].style.cssText) == 0 && items[i].classList[2] == "better-settings-fav" && name == "USER_SETTINGS") {
                            itemid = items[i].getAttribute("data-item-id")
                            // console.log(itemid)
                            itemid =
                                (itemid == "MyAccount") ? "My Account" :
                                    (itemid == "ProfileCustomization") ? "Profile Customization" :
                                        (itemid == "PrivacynSafety") ? "Privacy & Safety" :
                                            (itemid == "AuthorizedApps") ? "Authorized Apps" :
                                                (itemid == "DiscordNitro") ? "Discord Nitro" :
                                                    (itemid == "NitroServerBoost") ? "Nitro Server Boost" :
                                                        (itemid == "LibraryInventory") ? "Library Inventory" :
                                                            (itemid == "VoicenVideo") ? "Voice & Video" :
                                                                (itemid == "TextnImages") ? "Text & Images" :
                                                                    (itemid == "StreamerMode") ? "Streamer Mode" :
                                                                        (itemid == "GameActivity") ? "Game Activity" :
                                                                            (itemid == "HypeSquadOnline") ? "HypeSquad Online" :
                                                                                itemid
                            settingsModule.open(itemid)
                            done = true
                            break
                        }
                    }
                    for (let i = 0; i < items.length; i++) {
                        if ("display: none".indexOf(items[i].style.cssText) == 0 && items[i].classList[2] != "better-settings-fav" && done == false && name == "USER_SETTINGS") {
                            itemid = items[i].getAttribute("data-item-id")
                            // console.log(itemid)
                            itemid =
                                (itemid == "MyAccount") ? "My Account" :
                                    (itemid == "ProfileCustomization") ? "Profile Customization" :
                                        (itemid == "PrivacynSafety") ? "Privacy & Safety" :
                                            (itemid == "AuthorizedApps") ? "Authorized Apps" :
                                                (itemid == "DiscordNitro") ? "Discord Nitro" :
                                                    (itemid == "NitroServerBoost") ? "Nitro Server Boost" :
                                                        (itemid == "LibraryInventory") ? "Library Inventory" :
                                                            (itemid == "VoicenVideo") ? "Voice & Video" :
                                                                (itemid == "TextnImages") ? "Text & Images" :
                                                                    (itemid == "StreamerMode") ? "Streamer Mode" :
                                                                        (itemid == "GameActivity") ? "Game Activity" :
                                                                            (itemid == "HypesquadOnline") ? "Hypesquad Online" :
                                                                                itemid
                            settingsModule.open(itemid)
                            break
                        }
                    }
                }
            })
        }
        const favorites = () => {
            const color = this.settings.get("color", parseInt("d4af37", 16))
            const favoritemode = this.settings.get("favoritemode", "ontop")
            if (color !== undefined) {
                document.querySelector(`[aria-label*="_SETTINGS"]`).style.cssText = `--favorite-setting-color: #${color.toString(16)}`
            } else {
                document.querySelector(`[aria-label*="_SETTINGS"]`).style.cssText = `--favorite-setting-color: gold`
            }
            const favoritesettings = this.settings.get("favorites", "")
            let allitems = document.getElementsByClassName('item-PXvHYJ');
            let favorites = favoritesettings.split(", ")
            let cont = document.createElement("div")
            let contclass = document.createAttribute("class")
            let contheader = document.createElement("div")
            let header = document.createAttribute("class")
            let seperator = document.createElement("div")
            let seperatorclass = document.createAttribute("class")
            seperatorclass.value = "separator-gCa7yv"
            seperator.setAttributeNode(seperatorclass)
            header.value = "header-2RyJ0Y"
            contheader.textContent = "Favorites"
            contheader.setAttributeNode(header)
            contclass.value = "fav-cont"
            cont.setAttributeNode(contclass)
            cont.appendChild(contheader)
            if (document.getElementsByClassName("side-8zPYf6")[0].classList[1] != "favorited" && favoritemode == "ontop") {
                document.getElementsByClassName("side-8zPYf6")[0].appendChild(cont)
                document.getElementsByClassName("side-8zPYf6")[0].className += " favorited"
            }
            for (let i = 0; i < allitems.length; i++) {
                for (let q of favorites) {
                    if (allitems[i].textContent.toUpperCase() == q.toUpperCase()) {
                        allitems[i].classList += " better-settings-fav"
                        if (favoritemode == "ontop") {
                            cont.appendChild(allitems[i])
                            document.querySelector(`[aria-label*="_SETTINGS"]`).style.cssText = `--favorite-setting-color: var(--interactive-normal)`
                        } else if (favoritemode == "color") {
                            allitems[i].style.color = `#${color.toString(16)}`
                        }
                    }
                }
                cont.appendChild(seperator)
            }
            if (cont.offsetHeight < 40) {
                cont.style.display = "none"
            } else {
                cont.style.display = ""
            }
        }
        const disabled = () => {
            const baddiecolor = this.settings.get("baddiecolor", parseInt("dd3a3a", 16))
            const baddiemode = this.settings.get("baddiemode", "display")
            const opacity = this.settings.get("opacity", 30)
            let baddiessettings = this.settings.get("baddies", "")
            let allitems = document.getElementsByClassName('item-PXvHYJ');
            let baddies = baddiessettings.split(", ")
            for (let i = 0; i < allitems.length; i++) {
                for (let q of baddies) {
                    if (allitems[i].textContent.toUpperCase() == q.toUpperCase()) {
                        allitems[i].classList += " better-settings-bad"
                        if (baddiemode == "color") {
                            allitems[i].style.color = `#${baddiecolor.toString(16)}`
                        } else if (baddiemode == "display") {
                            allitems[i].classList += " better-settings-bad-disable"
                            allitems[i].style.color = `#${baddiecolor.toString(16)}`
                        } else if (baddiemode == "opacity") {
                            allitems[i].style.opacity = `${opacity}%`
                        }
                    }
                }
            }
        }
        let lastsection;
        const shortcut = (open) => {
            let shortcutsettings = this.settings.get("shortcutname", "Better Settings")
            let key = this.settings.get("shortcutkey", "NONE")
            key = key.toUpperCase()
            if (key != "NONE") {
                key = key[0]
                let items = document.getElementsByClassName('item-PXvHYJ');
                for (let i = 0; i < items.length; i++) {
                    if (items[i].textContent.toUpperCase() == shortcutsettings.toUpperCase()) {
                        shortcutsettings = items[i].getAttribute("data-item-id")
                        //  console.log(shortcutsettings)
                        break
                    } else if (i == items.length - 1) {
                        // console.log(shortcutsettings)
                        shortcutsettings = "Better Settings"
                    }
                }
                document.querySelector(`[aria-label="USER_SETTINGS"]`).addEventListener("keydown", (e) => {
                    if (e.ctrlKey && e.code == `Key${key}`) {
                        settingsModule.open(shortcutsettings)
                    }
                })
            }
        }
        const SettingsView = await getModule(
            m => m.displayName == "SettingsView"
        );
// console.log(SettingsView.prototype.props.sidebar.props.children)
        let settingsModule = await getModule(["open", "saveAccountChanges"]);
// const sex = await getModule(["open", "saveAccountChanges"])
        const create = (res) => {
            let settingsinput = React.createElement("input", {id: "settingssearch", placeholder: Messages.SEARCH}, null)
            let settingsicon = React.createElement("div", {class: "settingsicon"}, null)
            res.props.sidebar.props.children.push(React.createElement("div", {class: "searchdiv"}, [settingsinput, settingsicon]))
//   let favoritelist = []
//   setTimeout(() => {

//   const favoritesettings = this.settings.get("favorites", "")
//   let allitems = document.getElementsByClassName('item-PXvHYJ');
//   let favorites = favoritesettings.split(", ")
//   // let cont = document.getElementsByClassName("fav-cont")[0]
//   const favoritemode = this.settings.get("favoritemode", "ontop")
//   if (favoritemode == "ontop"){
//     // document.getElementsByClassName("side-8zPYf6")[0].appendChild(cont)
//     // document.getElementsByClassName("side-8zPYf6")[0].className+= " favorited"
//   for (let i = 0; i < allitems.length; i++) {
//     for (let q of favorites) {
//         if (allitems[i].textContent.toUpperCase() == q.toUpperCase()){
//           allitems[i].classList += " better-settings-fav"
//           // if (favoritemode == "ontop"){
//             favoritelist.push(React.createElement("div",{class: allitems[i].className}, null))
//             document.querySelector(`[aria-label*="_SETTINGS"]`).style.cssText = `--favorite-setting-color: var(--interactive-normal)`
//           // }else if (favoritemode == "color"){
//           //   allitems[i].style.color = `#${color.toString(16)}`
//           // }
//       }
//     }
//     // cont.appendChild(seperator)
// }
// // if (cont.offsetHeight < 40){
// //   cont.style.display = "none"
// // }else{
// //   cont.style.display = ""
// // }
//   }
// }, 0);
// let favheader = React.createElement("div", {class: "header-2RyJ0Y"}, "Favorites")
// let favseperator = React.createElement("div", {class: "separator-gCa7yv"}, null)
// favoritelist.push(favseperator)
// favoritelist.unshift(favheader)
// console.log(favoritelist)
// // setTimeout(() => {
//   res.props.sidebar.props.children.push(React.createElement("div", {class: "fav-cont"}, favoritelist))
// // }, 10);
// console.log(res.props.sidebar.props.children)
// }
        }
        inject(
            "settingssearch",
            SettingsView.prototype,
            'render',
            (_, res) => {
                const autofocus = this.settings.get("AutoFocus", true)
                const noreset = this.settings.get("noreset", false)
                let settings;
                create(res)
                settings = document.querySelector(`[aria-label="USER_SETTINGS"] .side-8zPYf6`)
                // console.log(res.props, document.getElementById("settingssearch"))
                if (document.getElementById("settingssearch") == null) {
                    if (noreset == true) {
                        settingsModule.open(lastsection)
                    }
                    setTimeout(() => {
                        if (autofocus == true) {
                            document.getElementById('settingssearch').focus()
                        }
                    }, 1)
                    if (this.entityID == "Better-Settings") {
                        let updatenotif = document.createElement("div");
                        let updatenotifclass = document.createAttribute("class")
                        updatenotifclass.value = "updatenotif"
                        updatenotif.setAttributeNode(updatenotifclass)
                        updatenotif.textContent = "Better Settings had an update that requires you to change the plugin folder name to 'better-settings' (capital sensitive) or reinstall the plugin\nsorry for the incovinence!"
                        document.querySelector(`[aria-label="USER_SETTINGS"] .sidebar-CFHs9e`).append(updatenotif)
                    }
                    setTimeout(() => {
                        search(document.querySelector(`[aria-label="USER_SETTINGS"] .side-8zPYf6`), 380, "USER_SETTINGS")
                        favorites()
                        disabled()
                        shortcut(lastsection)
                    }, 0);
                }
                if (document.querySelector(`[aria-label="GUILD_SETTINGS"]`) == null) {
                    if (res.props.section != "My Account") {
                        lastsection = res.props.section
                    } else if (res.props.section != "OVERVIEW") {
                        lastsection = res.props.section
                    }
                }
                // console.log(res.props.section)
                // }, 0);

                setTimeout(() => {
                    settings = document.querySelector(`[aria-label="GUILD_SETTINGS"] .side-8zPYf6`)
                    if (settings != null && settings.id != "checked") {
                        setTimeout(() => {
                            if (autofocus == true) {
                                document.getElementById('settingssearch').focus()
                            }
                        }, 1)
                        search(document.querySelector(`[aria-label="GUILD_SETTINGS"] .side-8zPYf6`), 190, "GUILD_SETTINGS")
                        favorites()
                        disabled()
                    }
                }, 0);
                return (res);
            }
        );
    }

    pluginWillUnload() {
        uninject('settingssearch');
        powercord.api.settings.unregisterSettings(this.entityID)
    }

// openPatch(args) {
//   if (
//     !args[0].startsWith("pc-") &&
//     powercord.api.settings.tabs[args[0]] &&
//     !_this.settings.get(args[0])
//   )
//     _this.openedSettings = args[0];
//   return args;
// }
};