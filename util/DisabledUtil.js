module.exports = class DisabledUtil {
    static disabled (plugin) {
        const baddiecolor = plugin.settings.get("baddiecolor", parseInt("dd3a3a", 16));
        const baddiemode = plugin.settings.get("baddiemode", "display");
        const opacity = plugin.settings.get("opacity", 30);
        let baddiessettings = plugin.settings.get("baddies", "");

        let allitems = document.getElementsByClassName('item-PXvHYJ');
        let baddies = baddiessettings.split(", ");

        for (let i = 0; i < allitems.length; i++) {
            for (let q of baddies) {
                if (allitems[i].textContent.toUpperCase() == q.toUpperCase()) {
                    allitems[i].classList += " better-settings-bad";
                    if (baddiemode == "color") {
                        allitems[i].style.color = `#${baddiecolor.toString(16)}`;
                    } else if (baddiemode == "display") {
                        allitems[i].classList += " better-settings-bad-disable";
                        allitems[i].style.color = `#${baddiecolor.toString(16)}`;
                    } else if (baddiemode == "opacity") {
                        allitems[i].style.opacity = `${opacity}%`;
                    }
                }
            }
        }
    }
}