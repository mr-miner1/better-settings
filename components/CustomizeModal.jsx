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
    const plugin = powercord.pluginManager.get("better-settings");
    let target_name = plugin.settings.get("target_name");
    let favorites = plugin.settings.get("favorites", "");
    let hidden = plugin.settings.get("baddies", "");
    favorites = favorites.toUpperCase();
    hidden = hidden.toUpperCase();
    if (favorites.indexOf(target_name.toUpperCase()) != -1) {
      setTimeout(() => {
        Customize.setFavorite(true);
        Customize.setDisabled(false);
      }, 0);
    } else if (hidden.indexOf(target_name.toUpperCase()) != -1) {
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
    if (favorites.indexOf(target_name.toUpperCase()) == -1) {
      setTimeout(() => {
        Customize.setFavorite(false);
      }, 0);
    }
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
            defaultValue={
              plugin.settings.get("itemidlist")[
                plugin.settings.get("target_id")
              ][2]
            }
            onChange={(v) => {
              textcont = v;
            }}
            // note={''}
            placeholder={target_name}
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
                // checked={favorites.indexOf(target_name.toUpperCase()) != -1}
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
            initialValue={
              plugin.settings.get("itemidlist")[
                plugin.settings.get("target_id")
              ][1]
            }
            markers={[0, 25, 50, 75, 100]}
            defaultValue={
              plugin.settings.get("itemidlist")[
                plugin.settings.get("target_id")
              ][1]
            }
            onValueChange={(change) => (opacity = change)}
            disabled={true}
          >
            Opacity (Broken Right Now)
          </SliderInput>
        </Modal.Content>

        <Modal.Footer>
          <Button
            color={Button.Colors.GREEN}
            // disabled={this.state.alias == "" && this.state.text == ""}
            onClick={() => {
              if (color != undefined) {
                Customize.createColor(color, plugin);
              }
              if (textcont != undefined) {
                Customize.createText(textcont, target_name, plugin);
              }
              if (opacity != undefined) {
                Customize.createOpacity(opacity, plugin);
              }
              Customize.addFavorite(
                document.getElementById("favorite-checkbox").checked,
                target_name,
                plugin,
                textcont
              );
              Customize.addDisabled(
                document.getElementById("hidden-checkbox").checked,
                target_name
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
              Customize.createColor(10070709, plugin);
              Customize.createText(plugin.settings.get("target_name"));
              Customize.createOpacity(100, plugin);
              Customize.addFavorite(false, target_name, plugin, textcont);
              Customize.addDisabled(false, target_name);
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
