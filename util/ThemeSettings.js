/* eslint-disable */
const fs = require("fs");
const path = require("path");
const PluginSettings = require("../components/Settings");
const {
  React,
  getModule,
  getModuleByDisplayName,
} = require("powercord/webpack");
const {
  Category,
  SwitchItem,
  TextInput,
} = require("powercord/components/settings");
const ThemeCard = require("../components/ThemeCard");
module.exports = class Themes {
  static run(where) {
    let switchitem;
    let input;
    let cardrenderlist = [];
    for (let [name, theme] of powercord.styleManager.themes.entries()) {
      if (theme.manifest.themesettings != null) {
        let themepath = theme.entityPath;
        themepath = path.resolve(themepath, theme.manifest.themesettings);
        let bsswitch;
        fs.readFile(themepath, (err, file) => {
          try {
            const settingsfile = JSON.parse(file);
            let objsize = 0;
            let renderlist = [];
            for (let i in settingsfile) {
              objsize += 1;
              let settings = settingsfile[i];
              let settingsobj = {};

              let writeobj = settingsfile;
              writeobj[i].value =
                settings.value == undefined
                  ? settings.defaultValue
                  : settings.value;
              fs.writeFileSync(
                themepath,
                JSON.stringify(writeobj),
                (err) => {}
              );

              if (settings.type.toUpperCase() == "SWITCH") {
                switchitem = React.createElement(SwitchItem, {
                  note: settings.note,
                  children: settings.name,
                  value: settings.value,
                  defaultValue: settings.defaultValue,
                  onChange: (m) => {
                    switchitem.props.value = !switchitem.props.value;
                    settings.value = switchitem.props.value;
                    bsswitch = document.querySelector(
                      `.bs-switch${i} .container-3auIfb`
                    );
                    settingsobj[i] = settings.value;
                    writeobj[i].value = settings.value;
                    fs.writeFileSync(
                      themepath,
                      JSON.stringify(writeobj),
                      (err) => {}
                    );

                    let themestyle = document.getElementById(`theme-${name}`);
                    themestyle.classList = "";
                    if (objsize == 1) {
                      themestyle.textContent += `:root {`;
                    }
                    for (let c in settingsobj) {
                      if (settings.value == true) {
                        bsswitch.classList =
                          " container-3auIfb bs-switch bs-switch-true";
                        bsswitch.value = true;
                        bsswitch.checked = true;
                        document.body.style.setProperty(c, settings.valueon);
                      } else {
                        bsswitch.classList =
                          "container-3auIfb bs-switch bs-switch-false";
                        bsswitch.value = false;
                        bsswitch.checked = false;
                        document.body.style.setProperty(c, settings.valueoff);
                      }
                    }
                    themestyle.classList += ` ${i}`;
                    themestyle.textContent += `}`;
                  },
                });

                settingsobj[i] = settings.value;
                let themestyle = document.getElementById(`theme-${name}`);

                if (themestyle.classList.length < objsize) {
                  if (objsize == 1) {
                    themestyle.textContent += `:root {`;
                  }
                  for (let c in settingsobj) {
                    if (settingsobj[i] == true) {
                      themestyle.textContent += `${c}: ${settings.valueon};`;
                    } else {
                      themestyle.textContent += `${c}: ${settings.valueoff};`;
                    }
                  }
                  themestyle.classList += ` ${i}`;
                } else if (themestyle.classList.length == objsize) {
                  themestyle.textContent += `}`;
                }
                renderlist.push(
                  React.createElement(
                    "div",
                    { className: "bs-switch" + i },
                    switchitem
                  )
                );
              }

              if (settings.type.toUpperCase() == "INPUT") {
                input = React.createElement(TextInput, {
                  children: settings.name,
                  defaultValue: settings.value,
                  placeholder: settings.placeholder,
                  onChange: (m) => {
                    settings.value = m;
                    settingsobj[i] = settings.value;
                    writeobj[i].value = settings.value;
                    fs.writeFileSync(
                      themepath,
                      JSON.stringify(writeobj),
                      (err) => {}
                    );

                    for (const c in settingsobj) {
                      document.body.style.setProperty(c, settings.value);
                    }
                  },
                });

                settingsobj[i] = settings.value;
                let themestyle = document.getElementById(`theme-${name}`);

                if (themestyle.classList.length < objsize) {
                  if (objsize == 1) {
                    themestyle.textContent += `:root {`;
                  }
                  for (let c in settingsobj) {
                    themestyle.textContent += `${c}: ${settings.value}`;
                  }
                  themestyle.classList += ` ${i}`;
                } else if (themestyle.classList.length == objsize) {
                  themestyle.textContent += `}`;
                }
                renderlist.push(
                  React.createElement(
                    "div",
                    { className: "bs-input bs-input" + i },
                    input
                  )
                );
              }
            }

            if (renderlist.length == objsize) {
              let card = React.createElement(
                ThemeCard,
                {
                  theme_name: name,
                  render_list: renderlist,
                },
                renderlist
              );
              if (where == "index") {
                cardrenderlist.push(card);
                powercord.pluginManager
                  .get("better-settings")
                  .settings.set("renderlist", cardrenderlist);
              }
            }
          } catch (err) {
            console.error(err);
          }
        });
      }
    }
  }
};
