/* eslint-disable */
/*
MIT License

Copyright (c) 2020 Oocrop

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

const {
  React: { createElement },
  i18n: { Messages },
} = require("powercord/webpack");
const { findInReactTree } = require("powercord/util");
const {
  Card,
  Clickable,
  Divider,
  Icons: { Close, Gear },
  Tooltip,
} = require("powercord/components");
const ErrorBoundary = require("../../pc-settings/components/ErrorBoundary.jsx");
var _this;
// i have no idea what any of this does
// 😆😀😄😅🤩😁😸😃😃
module.exports = class bd {
  static begin() {
    _this = powercord.pluginManager.get("better-settings");
  }
  static getPredicateSectionsPatch(_, res) {
    return res.filter((s) => JSON.stringify(s) !== "{}");
  }

  static makeSectionPatch(_, res) {
    if (
      res.section.startsWith("pc-") ||
      !_this.settings.get("hide_all_plugins", false) ||
      _this.settings.get(res.section) ||
      _this.openedSettings === res.section
    )
      return (
        _this.openedSettings === res.section &&
          (_this.openedSettings = undefined),
        res
      );
    return {};
  }

  static productRenderPrePatch() {
    if (this.props.isAPlugin === false || this.settingsTab !== undefined)
      return [];
    if (this.props.plugin === undefined && this.props.theme === undefined) {
      const plugin = [...powercord.pluginManager.plugins.values()].find(
        (p) => JSON.stringify(p.manifest) == JSON.stringify(this.props.product)
      );
      if (!plugin) {
        this.props.isAPlugin = false;
        return [];
      }
      this.props.plugin = plugin;
    }
    const tabs = Object.values(powercord.api.settings.tabs);
    if (
      (this.props.settingsTab =
        powercord.api.settings.tabs[this.props.plugin.entityID] ||
        tabs.find((t) => t.category === this.props.plugin.entityID)) &&
      this.props.settingsTab
    ) {
      this.props.hasSettings = true;
      this.props.goToSettings = () => this.setState({ renderSettings: true });
    } else this.props.hasSettings = false;
    const key = Object.keys(powercord.api.settings.tabs).find(
      (k) =>
        powercord.api.settings.tabs[k].category === this.props.plugin.entityID
    );
    if (
      this.props.hasSettings &&
      key &&
      (this.props.plugin.entityID.startsWith("pc-") ||
        _this.settings.get(this.props.plugin.entityID))
    ) {
      this.props.hasSettings = true;
      this.props.goToSettings = () => _this.settingsModule.open(key);
      return [];
    }
    return [];
  }

  static productRenderPatch(_, res) {
    if (
      res === null ||
      !this.props.isEnabled ||
      this.props.isAPlugin === false ||
      this.props.hasSettings === false
    )
      return res;
    if (!this.props.hasSettings || !this.state?.renderSettings) return res;
    const Settings = this.props.settingsTab.render;
    return createElement(Card, { className: "powercord-product" }, [
      this.renderHeader(),
      createElement(Divider),
      createElement(
        "div",
        { style: { display: "flex", "flex-direction": "column" } },
        [
          createElement(
            "div",
            {
              style: {
                width: "24px",
                float: "right",
                "align-self": "flex-end",
                margin: "5px",
              },
            },
            createElement(
              Tooltip,
              { text: Messages.CLOSE },
              createElement(
                Clickable,
                {
                  onClick: () =>
                    this.setState({
                      renderSettings: false,
                    }),
                },
                createElement(Close)
              )
            )
          ),
        ]
      ),
      createElement(
        "div",
        null,
        createElement(ErrorBoundary, null, createElement(Settings))
      ),
    ]);
  }

  static productRenderFooterPatch(_, res) {
    const icon = findInReactTree(
      findInReactTree(res, (c) => c.props?.text === "Settings"),
      (c) => c.type === Gear
    );
    if (icon) icon.props = { style: { width: "24px", cursor: "pointer" } };
    return res;
  }

  static openPatch(args) {
    //! Causes some issues with powercord and plugin setting tabs not loading when qa_settings is true
    /*if (
      !args[0].startsWith("pc-") &&
      powercord.api.settings.tabs[args[0]] &&
      !_this.settings.get(args[0])
    )
      _this.openedSettings = args[0];
    return args; */
  }
};
