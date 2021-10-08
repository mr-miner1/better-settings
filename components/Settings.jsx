/* eslint-disable */
const { React } = require("powercord/webpack");
const {
  TabBar,
  SelectInput,
  Category,
  SwitchItem,
  SliderInput,
  TextInput,
  RadioGroup,
  ColorPickerInput,
} = require("powercord/components/settings");

module.exports = class PluginSettings extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      favouriteSettings: false,
      badSettings: false,
      shortcuts: false,
      tips: false,
    };
  }

  render() {
    const { getSetting, updateSetting, toggleSetting } = this.props;

    return (
      <div className="BetterSettingsSettings">
        <SwitchItem
          value={getSetting("AutoFocus", true)}
          onChange={() => {
            toggleSetting("AutoFocus");
          }}
          note="Automatically focus the search box whenever opening settings"
        >
          Auto-Focus
        </SwitchItem>
        <SwitchItem
          value={getSetting("noreset", false)}
          onChange={(v) => {
            toggleSetting("noreset");
          }}
          note="Re-open the last settings section you had open"
        >
          Don't reset settings on close
        </SwitchItem>
        <SwitchItem
          value={getSetting("pluginsCategory", false)}
          onChange={(v) => {
            toggleSetting("pluginsCategory");
          }}
          note="Give plugins their own section in the sidebar"
        >
          Separate Plugins Category
        </SwitchItem>
        <Category
          name="Favorites"
          // description="Customize Your Embeds"
          opened={this.state.favouriteSettings}
          onChange={() =>
            this.setState({ favouriteSettings: !this.state.favouriteSettings })
          }
        >
          <TextInput
            defaultValue={getSetting("favorites", "")}
            onChange={(v) => {
              updateSetting("favorites", v);
            }}
            note={'seperate arguements with ", "'}
            placeholder={"My Account, Plugins, Better Settings"}
          >
            Favorites List
          </TextInput>
        </Category>
        <Category
          name="Hidden"
          // description="Customize Your Embeds"
          opened={this.state.badSettings}
          onChange={() =>
            this.setState({ badSettings: !this.state.badSettings })
          }
        >
          <TextInput
            defaultValue={getSetting("baddies", "")}
            onChange={(v) => {
              updateSetting("baddies", v);
            }}
            note={'seperate arguements with ", "'}
            placeholder={"My Account, Plugins, Better Settings"}
          >
            Hidden List
          </TextInput>
        </Category>
        <Category
          name="Tips & Tricks"
          description=""
          opened={this.state.tips}
          onChange={() => this.setState({ tips: !this.state.tips })}
        >
          <div className="uwu colorStandard-2KCXvj size14-e6ZScH description-3_Ncsb formText-3fs7AJ modeDefault-3a2Ph1">
            1. Searching $hidden in settings give you a list of all your
            disabled settings
            <br></br>
            2. Searching supports auto fill, ie: if u searched "Conn" and
            pressed enter it would open the Connections tab for you - broken
            currently
            <br></br>
            3. RightClicking a setting on the sidebar opens a cool context menu
            <br></br>
            4. Fact: You are cute 😳
          </div>
        </Category>
      </div>
    );
  }
};
