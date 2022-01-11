/* eslint-disable */
const { React } = require("powercord/webpack");
const {
  Tooltip,
  Icons: { GitHub, Bin, Sync, Person },
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
      {url != "none" && settings.get("qa_github", true) == true ? (
        <Tooltip text="GitHub">
          <a id="better-settings-github" href={url} target="_blank">
            <GitHub />
          </a>
        </Tooltip>
      ) : null}
      {settings.get("qa_folder", true) == true ? (
        <Tooltip text="Open Folder">
          <button
            id="better-settings-open"
            onClick={() => shell.openPath(pluginpath)}
          >
            <Sync />
          </button>
        </Tooltip>
      ) : null}
      {settings.get("qa_remount", false) == true ? (
        <Tooltip text="Reload Plugin">
          <button
            id="better-settings-remount"
            onClick={() => powercord.pluginManager.remount(id)}
          >
            <Sync />
          </button>
        </Tooltip>
      ) : null}
      {server != "none" ? (
        <Tooltip text="Support Server">
          <a id="better-settings-server" href={server} target="_blank">
            <Person />
          </a>
        </Tooltip>
      ) : null}
      {settings.get("qa_delete", true) == true ? (
        <Tooltip text="Double Click To Delete Plugin">
          <button
            id="better-settings-delete"
            onDoubleClick={(m) => {
              fs.rmdir(pluginpath, { recursive: true }, (err) => {});
              m.target.src = "https://svgur.com/i/bXm.svg";
              console.error("plugin deleted");
              m.target.style.color = "#ED4245";
              setTimeout(() => {
                m.target.style.color = "#ED4245";
              }, 500);
            }}
            onClick={(m) => {
              m.target.style.color = "pink";
              setTimeout(() => {
                m.target.style.color = "white";
              }, 500);
              console.warn("Double Click To Delete Plugin");
            }}
          >
            <Bin />
          </button>
        </Tooltip>
      ) : null}
    </div>
  );
};
