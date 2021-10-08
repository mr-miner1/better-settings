/* eslint-disable */
module.exports = class ShortcutUtil {
    static shortcut(plugin, open) {
        let shortcutsettings = plugin.settings.get("shortcutname", "Better Settings");
        let key = plugin.settings.get("shortcutkey", "NONE");
        key = key.toUpperCase();
        if (key != "NONE") {
            key = key[0];
            let items = document.getElementsByClassName('item-PXvHYJ');

            for (let i = 0; i < items.length; i++) {
                if (items[i].textContent.toUpperCase() == shortcutsettings.toUpperCase()) {
                    shortcutsettings = items[i].getAttribute("data-item-id");
                    //  console.log(shortcutsettings);
                    break
                } else if (i == items.length - 1) {
                    // console.log(shortcutsettings);
                    shortcutsettings = "Better Settings";
                }
            }

            document.querySelector(`[aria-label="USER_SETTINGS"]`).addEventListener("keydown", (e) => {
                if (e.ctrlKey && e.code == `Key${key}`) {
                    settingsModule.open(shortcutsettings);
                }
            });
        }
    }
}