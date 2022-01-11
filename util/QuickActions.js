/* eslint-disable*/
const fs = require("fs");
const path = require("path");

const {
  React: { createElement },
} = require("powercord/webpack");
const footer = require("../components/QuickActions");
module.exports = class QuickActions {
  static begin() {
    if (this.props.plugin === undefined) {
      const plugin = [...powercord.pluginManager.plugins.values()].find(
        (p) => JSON.stringify(p.manifest) == JSON.stringify(this.props.product)
      );
      if (!plugin) {
        this.props.isAPlugin = false;
        return [];
      }
      this.props.plugin = plugin;
    }
    return [];
  }
  static buttons(_, res) {
    let pluginpath = this.props.plugin.entityPath;
    let pluginid = this.props.plugin.entityID;
    try {
      let gitfile = fs.readFileSync(
        path.resolve(pluginpath, ".git", "config"),
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
      if (
        this.props.plugin.manifest.discord &&
        this.props.plugin.manifest.discord.startsWith("discord.gg")
      ) {
        res.props.children[3].props.children[1].props.children.push(
          createElement(footer, {
            url: url,
            pluginpath: pluginpath,
            server: `https://${this.props.plugin.manifest.discord}`,
            id: pluginid,
          })
        );
      } else {
        res.props.children[3].props.children[1].props.children.push(
          createElement(footer, {
            url: url,
            pluginpath: pluginpath,
            server: "none",
            id: pluginid,
          })
        );
      }
    } catch (error) {
      let pluginpath = this.props.plugin.entityPath;
      if (
        this.props.plugin.manifest.discord &&
        this.props.plugin.manifest.discord.startsWith("discord.gg")
      ) {
        res.props.children[3].props.children[1].props.children.push(
          createElement(footer, {
            url: "none",
            pluginpath: pluginpath,
            server: `https://${this.props.plugin.manifest.discord}`,
            id: pluginid,
          })
        );
      } else {
        res.props.children[3].props.children[1].props.children.push(
          createElement(footer, {
            url: "none",
            pluginpath: pluginpath,
            server: "none",
            id: pluginid,
          })
        );
      }
    }
    return res;
  }
};
