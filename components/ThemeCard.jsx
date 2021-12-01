const { React } = require("powercord/webpack");
const {
  Tooltip,
  Icons: { Gear, Close },
} = require("powercord/components");
useState = React.useState;
module.exports = ({ theme_name, render_list }) => {
  let [card_open, openCard] = useState("none");
  const cardClick = () => {
    try {
      if (card_open === "none") openCard((card_open = ""));
      else if (card_open === "") openCard((card_open = "none"));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="bs-theme-card" id={`bs-${theme_name}-card`}>
      <div
        className="card-header"
        onClick={() => {
          cardClick();
        }}
      >
        <span className="card-title">{theme_name}</span>
        <button className="card-button">
          {card_open == "none" ? <Gear /> : <Close />}
        </button>
      </div>
      <div className="card-separator" style={{ display: card_open }}></div>
      <div className="card-content" style={{ display: card_open }}>
        {render_list}
      </div>
    </div>
  );
};
