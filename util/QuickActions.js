/* eslint-disable*/
const fs = require("fs");
const path = require("path");
const {
  React: { createElement },
} = require("powercord/webpack");
const footer = require("../components/QuickActions");
const Divider = require("powercord/components/Divider.jsx");

module.exports = class QuickActions {
  static begin() {
    let settings = powercord.pluginManager.get("better-settings").settings;
    if (
      !(
        settings.get(`qa_github`) ||
        settings.get(`qa_remount`) ||
        settings.get(`qa_folder`) ||
        settings.get(`qa_delete`)
      )
    ) {
      return [];
    }
    if (this.props.plugin === undefined && this.props.theme === undefined) {
      const plugin = [...powercord.pluginManager.plugins.values()].find(
        (p) => JSON.stringify(p.manifest) == JSON.stringify(this.props.product)
      );
      if (!plugin) {
        this.props.isAPlugin = false;
        themeChecker(this);
        return [];
      }
      this.props.plugin = plugin;
    }
    return [];
    function themeChecker(_this) {
      for (let theme of powercord.styleManager.themes.values()) {
        if (theme.manifest.name == _this.props.product.name) {
          _this.props.theme = theme;
        }
      }
    }
  }
  static buttons(_, res) {
    let settings = powercord.pluginManager.get("better-settings").settings;
    if (
      !(
        settings.get(`qa_github`) ||
        settings.get(`qa_remount`) ||
        settings.get(`qa_folder`) ||
        settings.get(`qa_delete`)
      )
    ) {
      return res;
    }
    let folder, id, name, server, type;
    if (!this.props.theme) {
      folder = this.props.plugin.entityPath;
      id = this.props.plugin.entityID;
      name = this.props.plugin.manifest.name;
      server =
        this.props.plugin.manifest.discord &&
        this.props.plugin.manifest.discord.startsWith("discord.gg")
          ? `https://${this.props.plugin.manifest.discord}`
          : "none";
      type = "Plugin";
    } else {
      folder = this.props.theme.entityPath;
      id = this.props.theme.entityID;
      name = this.props.theme.manifest.name;
      server =
        this.props.theme.manifest.discord &&
        this.props.theme.manifest.discord.startsWith("discord.gg")
          ? `https://${this.props.theme.manifest.discord}`
          : "none";
      type = "Theme";
      this.props.plugin = this.props.theme;
    }
    if (id.startsWith("pc-")) return res;
    let product_footer;
    if (this.props.theme) {
      product_footer = createElement(
        "div",
        {
          className: "powercord-product-footer",
        },
        []
      );
    } else {
      product_footer = res.props.children[3].props.children[1];
    }
    try {
      let gitfile = fs.readFileSync(
        path.resolve(folder, ".git", "config"),
        "utf8"
      );
      gitfile = gitfile.split("\n").map((e) => e.trim());
      let url = "";
      for (var i = 0; i < gitfile.length; i++) {
        if (gitfile[i].startsWith("url = ")) {
          url = gitfile[i].replace(".git", "").replace("url = ", "");
          break;
        }
      }
      product_footer.props.children.push(
        createElement(footer, {
          url: url,
          path: folder,
          server: server,
          id: id,
          name: name,
          type: type,
        })
      );
    } catch (error) {
      if (
        this.props.plugin.manifest.discord &&
        this.props.plugin.manifest.discord.startsWith("discord.gg")
      ) {
        product_footer.props.children.push(
          createElement(footer, {
            url: "none",
            path: folder,
            server: `https://${this.props.plugin.manifest.discord}`,
            id: id,
            name: name,
            type: type,
          })
        );
      } else {
        product_footer.props.children.push(
          createElement(footer, {
            url: "none",
            path: folder,
            server: "none",
            id: id,
            name: name,
            type: type,
          })
        );
      }
    }
    if (!this.props.theme) {
      res.props.children[3].props.children[1] = product_footer;
    } else {
      res.props.children[2] = createElement(Divider);
      res.props.children[3] = product_footer;
    }
    return res;
  }
};
