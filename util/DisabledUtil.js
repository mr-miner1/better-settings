/* eslint-disable */
module.exports = class DisabledUtil {
  static disabled(plugin, res) {
    let baddiessettings = plugin.settings.get("baddies", "");
    let hidden_items = [];
    let hidden_list = baddiessettings.toUpperCase().split(", ");
    let sidebar_items = res.props.sidebar.props.children;
    for (let item of sidebar_items) {
      if (typeof item.props.children == "string") {
        if (hidden_list.indexOf(item.props.children.toUpperCase()) != -1) {
          item.props.className = "bs-hidden";
          hidden_items.push(item);
        }
      } else if (
        typeof item.props.children == "object" &&
        hidden_list.indexOf(item.props.children.props.label.toUpperCase()) != -1
      ) {
        item.props.className = "bs-hidden";
        hidden_items.push(item);
      }
    }
    module.exports = hidden_items;
  }
};
