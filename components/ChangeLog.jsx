/* eslint-disable */
const { React, getModule } = require("powercord/webpack");
const { Modal } = require("powercord/components/modal");
const { close: closeModal } = require("powercord/modal");
const { FormTitle, Button, Divider } = require("powercord/components");
module.exports = class ChangeLogModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.image = "https://i.imgur.com/ODtkNQT.png";
    this.version = "v1.6";
    this.plugin = "Better Settings";
    this.date = "02/02/22";
    this.content_title = "QOL Update";
    this.github = "https://github.com/mr-miner1/better-settings";
  }
  render() {
    return (
      <Modal className="powercord-text">
        <Modal.Header>
          <FormTitle tag="h4">
            {this.plugin} {this.version}
          </FormTitle>
          <span style={{ fontSize: "10px" }}>{this.date}</span>
        </Modal.Header>
        <Modal.Content>
          <img
            style={{ height: "190px", marginTop: "20px", borderRadius: "5px" }}
            src={this.image}
          ></img>
          <Divider />
          <div className="bs-cl-content">
            <b style={{ fontSize: "17px", marginBottom: "5px" }}>
              {this.content_title}
            </b>

            <p>Quick Delete now has a confimation toast</p>
            <p>Quick Actions available for themes as well</p>
            <p>
              Add optional button next to search bar to open the plugin's
              settings
            </p>
            <p>
              You can now disable seeing these pesky changlelogs in settings too
            </p>
          </div>
        </Modal.Content>

        <Modal.Footer>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Button
              color={Button.Colors.GREY}
              onClick={() => window.open(this.github)}
            >
              Github
            </Button>
            <Button color={Button.Colors.RED} onClick={closeModal}>
              Close
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
};
