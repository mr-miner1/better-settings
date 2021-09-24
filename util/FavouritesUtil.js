module.exports = class FavouritesUtil {
    static favourites (plugin) {
        const color = plugin.settings.get("color", parseInt("d4af37", 16));
        const favoritemode = plugin.settings.get("favoritemode", "ontop");
        if (color !== undefined) {
            document.querySelector(`[aria-label*="_SETTINGS"]`).style.cssText = `--favorite-setting-color: #${color.toString(16)}`;
        } else {
            document.querySelector(`[aria-label*="_SETTINGS"]`).style.cssText = `--favorite-setting-color: gold`;
        }
        const favoritesettings = plugin.settings.get("favorites", "");
        let allitems = document.getElementsByClassName('item-PXvHYJ');
        let favorites = favoritesettings.split(", ");
        let cont = document.createElement("div");
        let contclass = document.createAttribute("class");
        let contheader = document.createElement("div");
        let header = document.createAttribute("class");
        let seperator = document.createElement("div");
        let seperatorclass = document.createAttribute("class");
        seperatorclass.value = "separator-gCa7yv";
        seperator.setAttributeNode(seperatorclass);
        header.value = "header-2RyJ0Y";
        contheader.textContent = "Favorites";
        contheader.setAttributeNode(header);
        contclass.value = "fav-cont";
        cont.setAttributeNode(contclass);
        cont.appendChild(contheader);
        if (document.getElementsByClassName("side-8zPYf6")[0].classList[1] != "favorited" && favoritemode == "ontop") {
            document.getElementsByClassName("side-8zPYf6")[0].appendChild(cont);
            document.getElementsByClassName("side-8zPYf6")[0].className += " favorited";
        }
        for (let i = 0; i < allitems.length; i++) {
            for (let q of favorites) {
                if (allitems[i].textContent.toUpperCase() == q.toUpperCase()) {
                    allitems[i].classList += " better-settings-fav";
                    if (favoritemode == "ontop") {
                        cont.appendChild(allitems[i]);
                        document.querySelector(`[aria-label*="_SETTINGS"]`).style.cssText = `--favorite-setting-color: var(--interactive-normal)`;
                    } else if (favoritemode == "color") {
                        allitems[i].style.color = `#${color.toString(16)}`;
                    }
                }
            }
            cont.appendChild(seperator);
        }
        if (cont.offsetHeight < 40) {
            cont.style.display = "none";
        } else {
            cont.style.display = "";
        }
    }
}