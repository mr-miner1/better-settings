/* eslint-disable */
const { React } = require("powercord/webpack");
const {
  Tooltip,
  Icons: { GitHub, Bin, Sync, Person },
} = require("powercord/components");
const { open: openModal } = require("powercord/modal");
const { shell } = require("electron");
const fs = require("fs");
// const DeleteModal = require("./DeleteModal");
let settings;
module.exports = ({ url, path, server, id, name, type }) => {
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
            onClick={() => shell.openPath(path)}
          >
            <Sync />
          </button>
        </Tooltip>
      ) : null}
      {settings.get("qa_remount", false) == true ? (
        <Tooltip text={`Reload ${type}`}>
          <button
            id="better-settings-remount"
            onClick={() => {
              if (type === "Theme") {
                powercord.styleManager.disable(id);
                powercord.styleManager.enable(id);
              } else {
                powercord.pluginManager.remount(id);
              }
            }}
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
        <Tooltip text={`Delete ${type}`}>
          <button
            id="better-settings-delete"
            onClick={(m) => {
              try {
                // openModal(DeleteModal);
                powercord.api.notices.sendToast("DeleteConfirmation" + name, {
                  header: `Delete ${type} (${name})`,
                  content: `This action is irrevesable!`,
                  buttons: [
                    {
                      text: "Cancel",
                      color: "green",
                      look: "outlined",
                      onClick: () =>
                        powercord.api.notices.closeToast(
                          "DeleteConfirmation" + name
                        ),
                    },
                    {
                      text: "Delete",
                      color: "red",
                      look: "outlined",
                      onClick: () => {
                        try {
                          fs.rmdir(path, { recursive: true }, (e) => {
                            powercord[
                              type == "Theme" ? "styleManager" : "pluginManager"
                            ].unmount(id);
                          });
                        } catch (e) {}
                      },
                    },
                  ],
                  timeout: 5e3,
                });
              } catch (e) {
                console.error(e);
              }
            }}
          >
            <Bin />
          </button>
        </Tooltip>
      ) : null}
    </div>
  );
};
