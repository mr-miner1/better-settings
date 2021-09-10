/* eslint-disable */
const { React } = require('powercord/webpack');
const {TabBar, SelectInput, Category, SwitchItem, SliderInput, TextInput, RadioGroup, ColorPickerInput } = require('powercord/components/settings');
module.exports = class pluginsettings extends React.PureComponent {
    constructor (props) {
        super(props);
        this.state = { 
            favsettings: false,
            badsettings: false,
            shortcuts: false,
            tips: false
        };
      }
    render() {
        const { getSetting, toggleSetting, updateSetting } = this.props
        return(
            <div className="BetterSettingsSettings">
                 <SwitchItem
                        value={this.props.getSetting('AutoFocus', true)}
                        onChange={() => {this.props.toggleSetting('AutoFocus', true);}}
                        note="Auto select input on launch">
                        Auto Focus
                    </SwitchItem>
                    <SwitchItem
                        value={this.props.getSetting('noreset')}
                        onChange={(v) => {this.props.toggleSetting('noreset', v.value);}}
                        note="Reopen the last settings section you had open">
                        Dont Reset Settings On Close
                    </SwitchItem>
                    <Category
                        name='Shortcuts'
                        description="early beta, feedback appreciated."
                        opened={ this.state.shortcuts }
                        onChange={() => this.setState({ shortcuts: !this.state.shortcuts })}>
                        {/* <SwitchItem
                            value={this.props.getSetting('shortcut', true)}
                            onChange={() => {this.props.toggleSetting('shortcut', true);}}
                            note="Allows you to open settings using a keyboard shortcut">
                            Settings Shortcut [CTRL + SHIFT + S]
                        </SwitchItem> */}
                        <TextInput
                        defaultValue={getSetting("shortcutname", "Better Settings")} 
                        onChange={(v) => {updateSetting("shortcutname", v)}}
                        // note={'c'}
                        placeholder={"My Account"}>
                        Shortcut Name
                        </TextInput>
                        <TextInput
                        defaultValue={getSetting("shortcutkey", "none")} 
                        onChange={(v) => {updateSetting("shortcutkey", v)}}
                        note={'should be a sigunlar alphabet\n "none" to disable'}
                        placeholder={"A"}>
                        Shortcut Key
                    </TextInput>
                    </Category>
                <Category
                    name='Favorites'
                    // description="Customize Your Embeds"
                    opened={ this.state.favsettings }
                    onChange={() => this.setState({ favsettings: !this.state.favsettings })}>
                    <TextInput 
                        defaultValue={getSetting("favorites", "")} 
                        onChange={(v) => {updateSetting("favorites", v)}}
                        note={'seperate arguements with ", "'}
                        placeholder={"My Account, Plugins, Better Settings"}>
                        Favorites
                    </TextInput>
                    <RadioGroup
                            onChange={(v) => {updateSetting('favoritemode', v.value)}}
                            value={getSetting('favoritemode', "ontop")}
                            options={[
                            {
                                name: 'OnTop',
                                desc: 'Favorited settings show up On top of all the Settings',
                                value: "ontop",
                            },
                            {
                                name: 'Colored',
                                desc: 'favorited settings are colored',
                                value: "color",
                            }
                            ]}>
                            Display
                        </RadioGroup>
                            <ColorPickerInput
                            default = {parseInt("d4af37", 16)}
                            onChange={
                                (v) => {updateSetting("color", v)
                                // document.body.style.cssText = `--favorite-setting-color: #${v.toString(16)}`;
                            }}>
                                Color
                            </ColorPickerInput>
                </Category>
                <Category
                    name='Baddies'
                    // description="Customize Your Embeds"
                    opened={this.state.badsettings}
                    onChange={() => this.setState({ badsettings: !this.state.badsettings })}>
                         <TextInput 
                        defaultValue={getSetting("baddies", "")} 
                        onChange={(v) => {updateSetting("baddies", v)}}
                        note={'seperate arguements with ", "\nSearch "-bad" to view them'}
                        placeholder={"My Account, Plugins, Better Settings"}>
                        Baddies
                    </TextInput>
                    <RadioGroup
                    onChange={(v) => {updateSetting('baddiemode', v.value)}}
                    value={getSetting('baddiemode', "display")}
                    options={[
                    {
                        name: 'Display Off',
                        desc: 'Baddie settings get removed',
                        value: "display",
                    },
                    {
                        name: 'Colored',
                        desc: 'Baddie settings are colored',
                        value: "color",
                    },
                    {
                        name: 'Opacity',
                        desc: 'Baddie settings are less visible',
                        value: "opacity",
                    }
                    ]}>
                    Display
                </RadioGroup>
                    <ColorPickerInput
                    default = {parseInt("dd3a3a", 16)}
                    onChange={
                        (v) => {updateSetting("baddiecolor", v)
                    }}>
                        Color
                    </ColorPickerInput>
                    <SliderInput
					stickToMarkers
					minValue={0}
					maxValue={100}
					initialValue={getSetting('opacity', 30)}
					markers={[0,10, 20, 30, 40, 50, 60, 70, 80,90,100]}
					defaultValue={30}
					onValueChange={(change) => updateSetting('opacity', change)}
      	>Opactiy</SliderInput>
                </Category>
                <Category
                name='Tips & Tricks'
                description=""
                opened={ this.state.tips }
                onChange={() => this.setState({ tips: !this.state.tips })}>
                    <div
                    className="uwu colorStandard-2KCXvj size14-e6ZScH description-3_Ncsb formText-3fs7AJ modeDefault-3a2Ph1">
                        1. Searching -bad in settings give you a list of all your disabled settings
                        <br></br>
                        2. Searching supports auto fill, ie: if u searched "Conn" and pressed enter it would open the Connections tab for you
                        <br></br>
                        3. Fact: You are cute 😳
                    </div>
                </Category>
            </div>
        )
    }
}