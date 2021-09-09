/* eslint-disable */
const { Plugin } = require("powercord/entities");
const { inject, uninject } = require("powercord/injector");
const {getModule} = require('powercord/webpack');
module.exports = class BetterSettings extends Plugin {
  async startPlugin() {
    const pluginsettings = require('./settings');
    this.loadStylesheet('./index.scss');
    powercord.api.settings.registerSettings("BetterSettings", {
      category: this.entityID,
      label: this.manifest.name,
      render: pluginsettings
  })
    const search = (settings, args, name) =>{
      let input, value, items, i
      const baddiecolor = this.settings.get("baddiecolor")
      //add settingssearchbar
      let settingsbar = document.createElement("input");
      let settingsclass = document.createAttribute("class")
      let placeholder = document.createAttribute("placeholder")
      let settingsid = document.createAttribute("id")
      let check = document.createAttribute("id")
      let settingsicon = document.createElement("div")
      let iconclass = document.createAttribute("class")
      iconclass.value = "settingsicon"
      settingsicon.setAttributeNode(iconclass)
      settingsclass.value = "settingssearch";
      settingsid.value = "settingssearch";
      placeholder.value = "Search"
      check.value = "checked"
      settingsbar.setAttributeNode(settingsclass);
      settingsbar.setAttributeNode(settingsid);
      settingsbar.setAttributeNode(placeholder);
      settings.appendChild(settingsbar);
      settings.setAttributeNode(check)
      settings.appendChild(settingsicon)
      //eventlistner for when input changes
      settingsbar.addEventListener('input', () =>{
        //search
        input = document.getElementById('settingssearch');
        value = input.value.toUpperCase();
        items = document.getElementsByClassName('item-PXvHYJ');
        for (i = 0; i < items.length; i++) {
            if (items[i].textContent.toUpperCase().indexOf(value.toUpperCase()) > -1 && value != undefined){
              items[i].style.display = ""
            }else if (value != undefined){
              items[i].style.display = "none";
            }
        }
        let displaycount = 0;
        for (let i = 0; i < items.length; i++) {
          if ("display: none".indexOf(items[i].style.cssText) == 0){
            // document.querySelectorAll(".side-8zPYf6")[0].style.opacity = "100"
            displaycount+=1
          }
        }
          if (displaycount == 0){
            // document.querySelectorAll(".side-8zPYf6")[0].innerHTML = "nothing found uwu :(("
            document.querySelectorAll(".side-8zPYf6")[0].style.opacity = "0"
          }else if (displaycount < 4){
            for (let i = 0; i < document.querySelectorAll(".header-2RyJ0Y").length; i++) {
              document.querySelectorAll(".header-2RyJ0Y")[i].style = "display: none;"
              document.querySelectorAll(".separator-gCa7yv")[i].style = "display: none;"
            }
            document.querySelectorAll(".separator-gCa7yv")[ document.querySelectorAll(".header-2RyJ0Y").length+1].style = "display:none"
            document.querySelectorAll(".side-8zPYf6")[0].style.opacity = "100"
          }else{
            for (let i = 0; i < document.querySelectorAll(".header-2RyJ0Y").length; i++) {
              document.querySelectorAll(".header-2RyJ0Y")[i].style = "display:block"
              document.querySelectorAll(".separator-gCa7yv")[i].style = "display:block"
            }
            document.querySelectorAll(".separator-gCa7yv")[ document.querySelectorAll(".header-2RyJ0Y").length+1].style = "display:block"
            document.querySelectorAll(".side-8zPYf6")[0].style.opacity = "100"
          }
          // }else{
          //   document.querySelectorAll(".side-8zPYf6")[0].style.opacity = "0"
          // }
        if (value == "-BAD"){
          let showelements = document.getElementsByClassName("upgraded-settings-bad")
          for (let i = 0; i < showelements.length; i++) {
            showelements[i].style = `display: block !important; color:#${baddiecolor.toString(16)};`
            setTimeout(() => {
              document.querySelectorAll(".side-8zPYf6")[0].style.opacity = "100"
            }, 10);
          }
          for (let i = 0; i < document.querySelectorAll(".header-2RyJ0Y").length; i++) {
            document.querySelectorAll(".header-2RyJ0Y")[i].style.display = "none"
            document.querySelectorAll(".separator-gCa7yv")[i].style.display = "none"
          }
        }else if (displaycount > 3){
          for (let i = 0; i < document.querySelectorAll(".header-2RyJ0Y").length; i++) {
            document.querySelectorAll(".header-2RyJ0Y")[i].style.display = ""
            document.querySelectorAll(".separator-gCa7yv")[i].style.display = ""
          }
        }
      })
      settingsbar.addEventListener('keyup', (e) =>{
        let done = false
        if (e.key === 'Enter'){
          let itemid
          for (let i = 0; i < items.length; i++) {
            if("display: none".indexOf(items[i].style.cssText) == 0 && items[i].classList[2] == "upgraded-settings-fav" && name == "USER_SETTINGS"){
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
              (itemid == "HypeSquadOnline") ? "Hypesquad Online" :
              // (itemid == "ONLINE") ? "Superior Settings" :
              itemid
              settingsModule.open(itemid)
              done = true
              break
            }
          }
            for (let i = 0; i < items.length; i++) {
            if ("display: none".indexOf(items[i].style.cssText) == 0 && items[i].classList[2] != "upgraded-settings-fav" && done == false && name == "USER_SETTINGS"){
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
              // (itemid == "ONLINE") ? "Superior Settings" :
              itemid
              settingsModule.open(itemid)
              break
            }
          }
        }
      })
  }
  const favorites = () =>{
    const color = this.settings.get("color")
    const favoritemode = this.settings.get("favoritemode")
    if (color !== undefined){
      document.querySelector(`[aria-label*="_SETTINGS"]`).style.cssText = `--favorite-setting-color: #${color.toString(16)}`
    }else{
      document.querySelector(`[aria-label*="_SETTINGS"]`).style.cssText = `--favorite-setting-color: gold`
    }
    let favoritesettings = this.settings.get("favorites")
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
    if (document.getElementsByClassName("side-8zPYf6")[0].id != "favorited" && favoritemode == "ontop"){
    document.getElementsByClassName("side-8zPYf6")[0].appendChild(cont)
    let uwuid = document.createAttribute("id")
    uwuid.value = "favorited"
    document.getElementsByClassName("side-8zPYf6")[0].setAttributeNode(uwuid)
    }
    for (let i = 0; i < allitems.length; i++) {
      for (let q of favorites) {
          if (allitems[i].textContent.toUpperCase() == q.toUpperCase()){
            allitems[i].classList += " upgraded-settings-fav"
            if (favoritemode == "ontop"){
              cont.appendChild(allitems[i])
              document.querySelector(`[aria-label*="_SETTINGS"]`).style.cssText = `--favorite-setting-color: var(--interactive-normal)`
            }else if (favoritemode == "color"){
              allitems[i].style.color = `#${color.toString(16)}`
            }
        }
      }
      cont.appendChild(seperator)
  }
  if (cont.offsetHeight < 40){
    cont.style.display = "none"
  }else{
    cont.style.display = ""
  }
}
const disabled = () =>{
  const baddiecolor = this.settings.get("baddiecolor")
  const baddiemode = this.settings.get("baddiemode")
  const opacity = this.settings.get("opacity")
  let baddiessettings =  this.settings.get("baddies")
  let allitems = document.getElementsByClassName('item-PXvHYJ');
  let baddies = baddiessettings.split(", ")
  for (let i = 0; i < allitems.length; i++) {
    for (let q of baddies) {
        if (allitems[i].textContent.toUpperCase() == q.toUpperCase()){
          allitems[i].classList += " upgraded-settings-bad"
            if (baddiemode == "color"){
            allitems[i].style.color = `#${baddiecolor.toString(16)}`
            } else if (baddiemode == "display"){
              allitems[i].classList += " upgraded-settings-bad-disable"
              allitems[i].style.color = `#${baddiecolor.toString(16)}`
            }
            else if (baddiemode == "opacity"){
              allitems[i].style.opacity = `${opacity}%`
            }
      }
    }
}
}
let lastsection;
const shortcut = (open) =>{
  let shortcutsettings = this.settings.get("shortcutname")
  let key = this.settings.get("shortcutkey")
  key = key.toUpperCase()
  if (key != "NONE"){
    key = key[0]
    let items = document.getElementsByClassName('item-PXvHYJ');
    for (let i = 0; i < items.length; i++) {
        if (items[i].textContent.toUpperCase() == shortcutsettings.toUpperCase()){
        shortcutsettings = items[i].getAttribute("data-item-id")
        //  console.log(shortcutsettings)
        break
        }else if (i == items.length-1){
          // console.log(shortcutsettings)
          shortcutsettings = "BetterSettings"
        }
    }
    document.querySelector(`[aria-label="USER_SETTINGS"]`).addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.code == `Key${key}`){
      settingsModule.open(shortcutsettings)
      }
    })
  }
}
const SettingsView = await getModule(
  m => m.displayName == "SettingsView"
);
let settingsModule = await getModule(["open", "saveAccountChanges"]);
// const sex = await getModule(["open", "saveAccountChanges"])
inject(
  "settingssearch",
  SettingsView.prototype,
  'render',
  (_, res) =>{
    const autofocus = this.settings.get("AutoFocus")
    const noreset = this.settings.get("noreset")
    let settings;
    setTimeout(() => {
      settings = document.querySelector(`[aria-label="USER_SETTINGS"] .sidebar-CFHs9e`)
      if (settings != null && settings.id != "checked"){
        if (noreset == true){
        settingsModule.open(lastsection)
        }
        setTimeout(() => {
          if (autofocus == true){
          document.getElementById('settingssearch').focus()
          }
        },1)
        search(document.querySelector(`[aria-label="USER_SETTINGS"] .sidebar-CFHs9e`), 380, "USER_SETTINGS")
        favorites()
        disabled()
        shortcut(lastsection)
        }
        if (document.querySelector(`[aria-label="GUILD_SETTINGS"]`) == null){
          if (res.props.section != "My Account"){
            lastsection = res.props.section
          }else if (res.props.section != "OVERVIEW"){
            lastsection = res.props.section
          }
        }
        // console.log(res.props.section)
    }, 0);

    setTimeout(() => {
      settings = document.querySelector(`[aria-label="GUILD_SETTINGS"] .sidebar-CFHs9e`)
      if (settings != null && settings.id != "checked"){
        setTimeout(() => {
          if (autofocus == true){
            document.getElementById('settingssearch').focus()
            }
        },1)
        search(document.querySelector(`[aria-label="GUILD_SETTINGS"] .sidebar-CFHs9e`), 190, "GUILD_SETTINGS")
        favorites()
        disabled()
        // shortcut(lastsection)
      }
    }, 0);
    return (res);
  }
);
}
pluginWillUnload() {
  uninject('settingssearch');
  powercord.api.settings.unregisterSettings("BetterSettings")
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