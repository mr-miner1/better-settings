/* eslint-disable */
const { React } = require("powercord/webpack");
const {
  Tooltip,
  Icons: { Gear },
} = require("powercord/components");
module.exports = ({ placeholderText, openSettings, settingsButton }) => {
  return (
    <div className="searchdiv">
      <div className="searchinp">
        <input id="settingssearch" placeholder={placeholderText}></input>
        <div className="settingsicon"></div>
      </div>
      {settingsButton == true ? (
        <Tooltip text="Open Settings" className="bs-open-settings">
          <button onClick={() => openSettings("better-settings")}>
            <Gear />
          </button>
        </Tooltip>
      ) : null}
    </div>
  );
};
