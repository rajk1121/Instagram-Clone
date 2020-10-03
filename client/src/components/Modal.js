import React, { Component } from "react";
import M from "materialize-css";
// import "materialize-css/dist/css/materialize.min.css";

class Modal extends Component {
  componentDidMount() {
    const options = {
      onOpenStart: () => {
        console.log("Open Start");
      },
      onOpenEnd: () => {
        console.log("Open End");
      },
      onCloseStart: () => {
        console.log("Close Start");
      },
      onCloseEnd: () => {
        console.log("Close End");
      },
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: true,
      startingTop: "4%",
      endingTop: "10%"
    };
    M.Modal.init(this.Modal, options);

    // let instance = M.Modal.getInstance(this.Modal);
    // instance.open();
    // instance.close();
    // instance.destroy();
  }

  render() {
      console.log(this.props.Item)
    return (
      <div>
        <a>
          
          <img className="item modal-trigger" 
          data-target={this.props.Item._id} src={this.props.Item.photo}></img>
        </a>

        <div
          ref={Modal => {
            this.Modal = Modal;
          }}
          id={this.props.Item._id}
          className="modal"
        >
          <div className="modal-content">
          <img className="modal-pic"  src={this.props.Item.photo}></img><br></br>
        <p>{this.props.Item.likes.length} Likes</p>
          </div>
          
        </div>
      </div>
    );
  }
}

export default Modal;
