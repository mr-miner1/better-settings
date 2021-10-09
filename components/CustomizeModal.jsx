/* eslint-disable */
const { React } = require("powercord/webpack");
const { Modal } = require("powercord/components/modal");
const { close: closeModal } = require("powercord/modal");
const { FormTitle, Button } = require("powercord/components");
const {
  ColorPickerInput,
  TextInput,
  SliderInput,
} = require("powercord/components/settings");
const Customize = require("../util/Customize");
let color;
let textcont;
let opacity;
// let textcont;
module.exports = class CustomizeModal extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    let contextname = powercord.pluginManager.get("better-settings").settings.get("contexttargetname"); //prettier-ignore
    let favorites = powercord.pluginManager.get("better-settings").settings.get("favorites", ""); //prettier-ignore
    let hidden = powercord.pluginManager.get("better-settings").settings.get("baddies", ""); //prettier-ignore
    favorites = favorites.toUpperCase();
    hidden = hidden.toUpperCase();
    if (favorites.indexOf(contextname.toUpperCase()) != -1) {
      setTimeout(() => {
        Customize.setFavorite(true);
        Customize.setDisabled(false);
      }, 0);
    } else if (hidden.indexOf(contextname.toUpperCase()) != -1) {
      setTimeout(() => {
        Customize.setFavorite(false);
        Customize.setDisabled(true);
      }, 0);
    } else {
      setTimeout(() => {
        Customize.setFavorite(false);
        Customize.setDisabled(false);
      }, 0);
    }
    // if (favorites.indexOf(contextname.toUpperCase()) == -1) {
    //   setTimeout(() => {
    //     Customize.setFavorite(false);
    //     // Customize.setDisabled(true);
    //   }, 0);
    // }
    return (
      <Modal className="powercord-text">
        <Modal.Header>
          <FormTitle tag="h4">Customize</FormTitle>
        </Modal.Header>

        <Modal.Content>
          <ColorPickerInput
            default={""}
            onChange={(v) => {
              color = v;
            }}
          >
            Color
          </ColorPickerInput>
          <TextInput
            defaultValue={powercord.pluginManager.get("better-settings").settings.get("itemidlist")//prettier-ignore
            [powercord.pluginManager.get("better-settings").settings.get("contexttarget")][2]} //prettier-ignore
            onChange={(v) => {
              textcont = v;
            }}
            // note={''}
            placeholder={contextname}
          >
            Custom Name
          </TextInput>
          <div className="better-settings-checkbox-cont">
            <label
              className={"better-settings-checkbox"}
              for={"favorite-checkbox"}
            >
              <label for={"favorite-checkbox"}>Favorite</label>
              <input
                type={"checkbox"}
                id={"favorite-checkbox"}
                // checked={favorites.indexOf(contextname.toUpperCase()) != -1}
                // value={"on"}
              ></input>
            </label>
            <label
              className={"better-settings-checkbox"}
              for={"hidden-checkbox"}
            >
              <label for={"hidden-checkbox"}>Hide</label>
              <input type={"checkbox"} id={"hidden-checkbox"}></input>
            </label>
          </div>
          <div
            className={"divider-3573oO dividerDefault-3rvLe-"}
            style={{ marginBottom: "20px" }}
          ></div>
          {/* hi */}
          <SliderInput
            minValue={0}
            maxValue={100}
            initialValue={powercord.pluginManager.get("better-settings").settings.get("itemidlist")//prettier-ignore
            [powercord.pluginManager.get("better-settings").settings.get("contexttarget")][1]} //prettier-ignore
            markers={[0, 25, 50, 75, 100]}
            defaultValue={powercord.pluginManager.get("better-settings").settings.get("itemidlist")//prettier-ignore
            [powercord.pluginManager.get("better-settings").settings.get("contexttarget")][1]} //prettier-ignore
            onValueChange={(change) => (opacity = change)}
          >
            Opacity
          </SliderInput>
        </Modal.Content>

        <Modal.Footer>
          <Button
            color={Button.Colors.GREEN}
            // disabled={this.state.alias == "" && this.state.text == ""}
            onClick={() => {
              if (color != undefined) {
                Customize.createColor(color);
              }
              if (textcont != undefined) {
                Customize.createText(textcont, contextname);
              }
              if (opacity != undefined) {
                Customize.createOpacity(opacity);
              }
              Customize.addFavorite(
                document.getElementById("favorite-checkbox").checked,
                contextname
              );
              Customize.addDisabled(
                document.getElementById("hidden-checkbox").checked,
                contextname
              );
              textcont = undefined;
              color = undefined;
              opacity = undefined;
              closeModal();
            }}
          >
            Save
          </Button>
          <Button
            color={Button.Colors.RED}
            // disabled={this.state.alias == "" && this.state.text == ""}
            onClick={() => {
              Customize.createColor(10070709);
              Customize.createText(powercord.pluginManager.get("better-settings").settings.get("contexttargetname")); //prettier-ignore
              Customize.createOpacity(100);
              Customize.addFavorite(false, contextname);
              Customize.addDisabled(false, contextname);
              textcont = undefined;
              color = undefined;
              opacity = undefined;
              closeModal();
            }}
            style={{ marginRight: "8px" }}
          >
            Reset
          </Button>
          <Button
            color={Button.Colors.TRANSPARENT}
            look={Button.Looks.LINK}
            onClick={closeModal}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
};
