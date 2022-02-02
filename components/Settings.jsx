/* eslint-disable */
const {
  React,
  getModule,
  getModuleByDisplayName,
} = require("powercord/webpack");
const {
  Category,
  SwitchItem,
  TextInput,
} = require("powercord/components/settings");
let note = "";

const { tabBar, tabBarItem } = getModule(["tabBar", "tabBarItem"], false);
const TabBar = getModuleByDisplayName("TabBar", false);
module.exports = class PluginSettings extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      favouriteSettings: false,
      badSettings: false,
      shortcuts: false,
      tips: false,
      bd: false,
      tab: "General",
      qa: false,
    };
  }
  generalSettings() {
    const { getSetting, updateSetting, toggleSetting } = this.props;
    if (this.state.tab == "General") {
      return (
        <div>
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
            value={getSetting("settings_button", false)}
            onChange={() => {
              toggleSetting("settings_button");
            }}
            note="Button next to the search bar to open settings for the plugin"
          >
            Settings Button
          </SwitchItem>
          <SwitchItem
            value={getSetting("show_changelogs", true)}
            onChange={() => {
              toggleSetting("show_changelogs");
            }}
            note="enable or disable seeing changelogs when there is a plugin update"
          >
            Show Changelogs
          </SwitchItem>
          <Category
            name="Favorites"
            // description="Customize Your Embeds"
            opened={this.state.favouriteSettings}
            onChange={() =>
              this.setState({
                favouriteSettings: !this.state.favouriteSettings,
              })
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
        </div>
      );
    } else {
      return (
        <div>
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
            name="Quick Actions"
            // description="orignally made by Оocrop#4420 now maintained by me"
            opened={this.state.qa}
            onChange={() => this.setState({ qa: !this.state.qa })}
          >
            <SwitchItem
              value={getSetting("qa_settings", true)}
              onChange={() => {
                toggleSetting("qa_settings");
              }}
              note="renders settings in the plugin card itself"
            >
              Settings
            </SwitchItem>
            <SwitchItem
              value={getSetting("qa_github", true)}
              onChange={() => {
                toggleSetting("qa_github");
              }}
              note="redirects you to the plugin/theme repo"
            >
              GitHub
            </SwitchItem>
            <SwitchItem
              value={getSetting("qa_folder", true)}
              onChange={() => {
                toggleSetting("qa_folder");
              }}
              note="opens the plugin/theme folder"
            >
              Open Folder
            </SwitchItem>
            <SwitchItem
              value={getSetting("qa_delete", true)}
              onChange={() => {
                toggleSetting("qa_delete");
              }}
              note="deletes the plugin/theme from inside discord"
            >
              Delete
            </SwitchItem>
            <SwitchItem
              value={getSetting("qa_remount", false)}
              onChange={() => {
                toggleSetting("qa_remount");
              }}
              note="reloads the plugin/theme"
            >
              Reload
            </SwitchItem>
          </Category>
        </div>
      );
    }
  }
  render() {
    const { getSetting, updateSetting, toggleSetting } = this.props;

    return (
      <div className="BetterSettingsSettings">
        <TabBar
          className={["bs-settings-tab-bar", tabBar].filter(Boolean).join(" ")}
          selectedItem={this.state.tab}
          onItemSelect={(item) => this.setState({ tab: item, section: null })}
          look={TabBar.Looks.BRAND}
          type={TabBar.Types.TOP}
        >
          <TabBar.Item className={tabBarItem} id="General">
            General
          </TabBar.Item>
          <TabBar.Item className={tabBarItem} id="Plugins">
            Plugins
          </TabBar.Item>
        </TabBar>
        {this.generalSettings()}
      </div>
    );
  }
};
