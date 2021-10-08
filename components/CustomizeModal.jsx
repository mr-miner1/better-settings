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
    let itemid = powercord.pluginManager
      .get("better-settings")
      .settings.get("contexttarget");
    itemid =
      itemid === "MyAccount"
        ? "My Account"
        : itemid === "ProfileCustomization"
        ? "User Profile"
        : itemid === "PrivacynSafety"
        ? "Privacy & Safety"
        : itemid === "AuthorizedApps"
        ? "Authorized Apps"
        : itemid === "DiscordNitro"
        ? "Discord Nitro"
        : itemid === "NitroServerBoost"
        ? "Server Boost"
        : itemid === "LibraryInventory"
        ? "Gift Inventory"
        : itemid === "VoicenVideo"
        ? "Voice & Video"
        : itemid === "TextnImages"
        ? "Text & Images"
        : itemid === "StreamerMode"
        ? "Streamer Mode"
        : itemid === "GameActivity"
        ? "Activity Status"
        : itemid === "HypeSquadOnline"
        ? "HypeSquad Online"
        : itemid === "changelog"
        ? "Change Log"
        : itemid === "Windows"
        ? "Windows Settings"
        : itemid === "pc-moduleManager-themes"
        ? "Themes"
        : itemid === "pc-updater"
        ? "Updater"
        : itemid === "pc-general"
        ? "General Settings"
        : itemid === "pc-moduleManager-plugins"
        ? "Plugins"
        : itemid;
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
            placeholder={itemid} //prettier-ignore
          >
            Text Content
          </TextInput>

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
            color={Button.Colors.BLUE}
            // disabled={this.state.alias == "" && this.state.text == ""}
            onClick={() => {
              if (color != undefined) {
                Customize.createColor(color);
              }
              if (textcont != undefined) {
                Customize.createText(textcont, itemid);
              }
              if (opacity != undefined) {
                Customize.createOpacity(opacity);
              }
              textcont = undefined;
              color = undefined;
              opacity = undefined;
              closeModal();
            }}
          >
            Save
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
