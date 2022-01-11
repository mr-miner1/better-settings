const { React, getModule } = require("powercord/webpack");
const { item, header, separator } = getModule(
  ["header", "separator", "themed", "item"],
  false
);
module.exports = ({ elements }) => {
  return (
    <div>
      <div className={header}>Favorites</div>
      {elements}
      <div className={separator}></div>
    </div>
  );
};
