/* eslint-disable */
const { React } = require("powercord/webpack");
const {
  Tooltip,
  Icons: { GitHub, Gear },
} = require("powercord/components");

const { shell } = require("electron");
const fs = require("fs");
let settings;
module.exports = ({ url, pluginpath, server, id }) => {
  let constructor = (props) => {
    settings = powercord.pluginManager.get("better-settings").settings;
  };
  return (
    <div className="quickactions">
      {constructor()}
      {url != "none" && settings.get("qa_github") == true ? (
        <Tooltip text="GitHub">
          <a id="better-settings-github" href={url} target="_blank">
            <GitHub />
          </a>
        </Tooltip>
      ) : null}
      {settings.get("qa_folder") == true ? (
        <Tooltip text="Open Folder">
          <button
            id="better-settings-open"
            onClick={() => shell.openPath(pluginpath)}
          >
            <img src="https://svgur.com/i/bWn.svg"></img>
          </button>
        </Tooltip>
      ) : null}
      {settings.get("qa_remount") == true ? (
        <Tooltip text="Reload Plugin">
          <button
            id="better-settings-remount"
            onClick={() => powercord.pluginManager.remount(id)}
          >
            <img src="https://svgur.com/i/bYQ.svg"></img>
          </button>
        </Tooltip>
      ) : null}
      {server != "none" ? (
        <Tooltip text="Support Server">
          <a id="better-settings-server" href={server} target="_blank">
            <img src="https://svgur.com/i/bVs.svg"></img>
          </a>
        </Tooltip>
      ) : null}
      {settings.get("qa_delete") == true ? (
        <Tooltip text="Double Click To Delete Plugin">
          <button
            id="better-settings-delete"
            onDoubleClick={(m) => {
              fs.rmdir(pluginpath, { recursive: true }, (err) => {});
              m.target.src = "https://svgur.com/i/bXm.svg";
              console.error("plugin deleted");
              m.target.style.transform = "scale(1.2)";
              setTimeout(() => {
                m.target.src = "https://svgur.com/i/bXm.svg";
              }, 500);
            }}
            onClick={(m) => {
              document.getElementsByClassName("powercord-product");
              m.target.src = "https://svgur.com/i/bXm.svg";
              m.target.style.filter = "brightness(2)";
              setTimeout(() => {
                m.target.src = "https://svgur.com/i/bX6.svg";
                m.target.style.filter = "";
              }, 500);
              console.warn("Double Click To Delete Plugin");
            }}
          >
            <img src="https://svgur.com/i/bX6.svg"></img>
          </button>
        </Tooltip>
      ) : null}
    </div>
  );
};
