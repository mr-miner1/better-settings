/* eslint-disable */
const { React, getModule } = require("powercord/webpack");
const { Modal } = require("powercord/components/modal");
const { close: closeModal } = require("powercord/modal");
const { FormTitle, Button } = require("powercord/components");
module.exports = class ChangeLogModal extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Modal className="powercord-text">
        <Modal.Header>
          <FormTitle tag="h4">Better Settings v1.4</FormTitle>
          <span style={{ fontSize: "10px" }}>28/10/21</span>
        </Modal.Header>
        <div
          className="separator-gCa7yv"
          style={{ height: "1px", margin: "0px 10px 8px 10px" }}
        ></div>
        <Modal.Content>
          <img
            style={{ height: "190px" }}
            src="https://i.imgur.com/rOSLtHp.png"
          ></img>
          <div
            className="separator-gCa7yv"
            style={{ height: "1px", margin: "8px 10px" }}
          ></div>
          <div className="bd-cl-content">
            <b style={{ fontSize: "17px" }}>Quick Actions</b>
            <span>Settings - Renders settings in the plugin card itself</span>
            <span>GitHub - Redirects you to the GitHub Repo</span>
            <span>Open Folder - Opens the plugin folder</span>
            <span>Reload Plugin - Reloads the plugin</span>
            <span>Delete Plugin - Deletes the plugin</span>
          </div>
          <div
            className="separator-gCa7yv"
            style={{ height: "1px", margin: "8px 10px" }}
          ></div>
        </Modal.Content>

        <Modal.Footer>
          <Button color={Button.Colors.GREEN} onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
};
