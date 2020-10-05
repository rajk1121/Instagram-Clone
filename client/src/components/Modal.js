import React, { Component } from "react";
import M from "materialize-css";
// import "materialize-css/dist/css/materialize.min.css";

class Modal extends Component {
  state = {
    Item :  this.props.Item
  }
  
  componentDidMount() {
    // console.log('hello')
    // this.setprops({
    //   Item : this.props.Item
    // })
    const options = {
      // onOpenStart: () => {
      //   // console.log("Open Start");
      // },
      // onOpenEnd: () => {
      //   console.log("Open End");
      // },
      // onCloseStart: () => {
      //   console.log("Close Start");
      // },
      // onCloseEnd: () => {
      //   console.log("Close End");
      // },
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
   postComment=(item, comment)=>{
    fetch('/post/comment',{
        method: "put",
        headers:{
            "Content-type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem('jwt')
        },
        body: JSON.stringify({
            comment: comment,
            postId : item._id,
        })
    }).then(res=>res.json())
    .then((result)=>{
        // console.log(result)
        if(result.message == 'Commented'){
           
          M.toast({html:result.message , classes: "green darken-1"})
          let item = {...this.props.Item}
          item.comments.push({
            user : {_id : JSON.parse(localStorage.getItem('user')).id},
            text : comment
          })
          this.setState({
            Item : item
          })
        }else{
            
            M.toast({html:result.message , classes: "red darken-1"})
        }
    })
}

  render() {
      // console.log(this.props.Item)
      if(this.props.Item.length==0){
        return(
          <div></div>
        )
      }
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
        <h5>Comments</h5>
              {
                  this.props.Item.comments.map(result=>{
                      return (
                          <div>
                              <h6><span style={{"fontWeight": "bold"}}>{result.user._id==JSON.parse(localStorage.getItem('user')).id ? "You" : result.user.Name}</span> <span>{result.text}</span></h6>
                          </div>
                      )
                  })
              }
              <form onSubmit={(e)=>{
                  e.preventDefault()
                  this.postComment(this.props.Item,e.target[0].value )
                  e.target[0].value=""
              }}>
                <input type="text" placeholder="Comment ...."/>  
                <button type="submit" className="btn waves-effect blue darken-1" >
                    <i class="material-icons">send</i>
                </button>
              </form>
          </div>
          
        </div>
      </div>
    );
  }
}

export default Modal;
