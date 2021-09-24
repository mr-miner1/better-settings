/* eslint-disable */
const { React, getModule, i18n: { Messages } } = require('powercord/webpack');

/*
 const {
 TabBar,
 SelectInput,
 Category,
 SwitchItem,
 SliderInput,
 TextInput,
 RadioGroup,
 ColorPickerInput
 } = require('powercord/components/settings'); */

module.exports = ({ placeholderText }) => {

    return (
        <div className='searchdiv'>
            <input id='settingssearch'
                   placeholder={placeholderText}
            ></input>   
            <div className='settingsicon'></div>
        </div>
    );
}