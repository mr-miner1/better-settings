/* eslint-disable */
const { React, getModule } = require("powercord/webpack");
const { Modal } = require("powercord/components/modal");
const { close: closeModal } = require("powercord/modal");
const { FormTitle, Button, Divider } = require("powercord/components");
module.exports = class ChangeLogModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.image =
      "https://en.karabayyazilim.com/uploads/blogs/reactjs-nedir-2019-06-24-091546/reactjs-nedir-2019-06-24-091546-0.jpg";
    this.version = "v1.5";
    this.plugin = "Better Settings";
    this.date = "12/01/21";
    this.content_title = "Now using React instead of DOM";
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
          <div className="bd-cl-content">
            <b style={{ fontSize: "17px" }}>{this.content_title}</b>
            <span>Faster</span>
            <span>Less Bloaty</span>
            <span>Resource Efficient</span>
            <span>Cooler Customizations</span>
            <span style={{ fontSize: "12px" }}>
              Searching is still using DOM but hopefully not for long!
            </span>
            <span style={{ fontSize: "12px" }}>
              Also opacity doesnt work right now
            </span>
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
