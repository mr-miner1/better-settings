/* eslint-disable */
const { React, getModule, i18n: { Messages } } = require('powercord/webpack');

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