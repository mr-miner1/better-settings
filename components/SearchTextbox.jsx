/* eslint-disable */
const { React } = require("powercord/webpack");

module.exports = ({ placeholderText }) => {
  return (
    <div className="searchdiv">
      <input id="settingssearch" placeholder={placeholderText}></input>
      <div className="settingsicon"></div>
    </div>
  );
};
