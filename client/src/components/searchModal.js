import React, { Component } from "react";
import M from "materialize-css";
import {Link} from 'react-router-dom'
// import "materialize-css/dist/css/materialize.min.css";

class SearchModal extends Component {
    state = {
        Item : [],
        searchText : ""
    }
    setSearch = (e)=>{
        this.setState({
            searchText : e.target.value
        })
        fetch('/user/search-user',{
            method : "post",
            headers : {
                "Content-type" : "Application/json",
                "Authorization" : "Bearer "+localStorage.getItem('jwt')
            },
            body : JSON.stringify({
                search : this.state.searchText
            })
        }).then(res=>res.json())
        .then(result=>{
            // console.log(result)
            this.setState({
                Item : result.message
            })
        })
    }
  componentDidMount() {
    const options = {
      // onOpenStart: () => {
      //   console.log("Open Start");
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

  render() {
      // console.log(this.state.Item)
    return (
        <div>
        <i data-target="search" className="material-icons modal-trigger " >search</i>
        
        <div
          ref={Modal => {
              this.Modal = Modal;
            }}
          id="search"
          className="modal"
        >
          <div className="modal-content">
            <input type="text" placeholder="Search by Email ....."
                value={this.state.searchText}
                onChange = {this.setSearch}
                ></input>
                <ul className="collection">
                    {
                        this.state.Item.map((item)=>
                        {
                            return(
                               <div>
                                        <li  style={{width:"100%"}} onClick={()=>{this.setState({searchText:"", Item:[]})}}  className="collection-item modal-close">
                                    <Link style={{color:"black"}} to={item.email==JSON.parse(localStorage.getItem('user')).email ? "/profile" : "/show/"+item._id}>
                                    <img className="home-user-pic" src={item.url}></img>{item.email}
                                    </Link>
                                    </li>
                                    <br></br>
                            
                               </div> 
                               )
                        })
                    }
            </ul>
          </div>
          
        </div>
      </div>
        // <div>
        //    
            
        // </div>
              
    );
  }
}

export default SearchModal;
