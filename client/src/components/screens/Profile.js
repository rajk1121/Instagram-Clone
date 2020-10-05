import React, {useState, useEffect, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {UserContext} from '../../App'
import Modal from '../Modal'
const Profile = (props)=>{
    const {state, dispatch} = useContext(UserContext)
    // console.log(state)
    const history = useHistory()
    const [myPics, setPics] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [sub, setSub] = useState({
        followers: 0,
        following : 0
    })
    useEffect(()=>{
        fetch('/post/myPosts', {
            method : "get",
            headers : {
                "Authorization" :"Bearer "+localStorage.getItem('jwt')
            }
        }).then(res=>res.json())
        .then((data)=>{
            // let newData = {...data}
            // newData.pics = data.message
            // newData.following = data.user.following
            // newData.followers = data.u
            // console.log(data.message)
            setPics(data.message)
            setSub({
                followers: data.user.followers.length,
                following : data.user.following.length
            })
            setLoading(false)
        })
    }, [])
    // if(!props.isLogged){
    //     history.push('/login')
    //     return
    // }
    if(!state){
        return(
            <div></div>
        )
    }
    if(isLoading){
        return (
                    
            <div class="preloader-wrapper big active">
            <div class="spinner-layer spinner-blue">
              <div class="circle-clipper left">
                <div class="circle"></div>
              </div><div class="gap-patch">
                <div class="circle"></div>
              </div><div class="circle-clipper right">
                <div class="circle"></div>
              </div>
            </div>
      
            <div class="spinner-layer spinner-red">
              <div class="circle-clipper left">
                <div class="circle"></div>
              </div><div class="gap-patch">
                <div class="circle"></div>
              </div><div class="circle-clipper right">
                <div class="circle"></div>
              </div>
            </div>
      
            <div class="spinner-layer spinner-yellow">
              <div class="circle-clipper left">
                <div class="circle"></div>
              </div><div class="gap-patch">
                <div class="circle"></div>
              </div><div class="circle-clipper right">
                <div class="circle"></div>
              </div>
            </div>
      
            <div class="spinner-layer spinner-green">
              <div class="circle-clipper left">
                <div class="circle"></div>
              </div><div class="gap-patch">
                <div class="circle"></div>
              </div><div class="circle-clipper right">
                <div class="circle"></div>
              </div>
            </div>
          </div>
        )
    }
    return (
       <div style={{
           margin: "0px auto",
           maxWidth: "80%"
       }}>
           <div style={{
               display: "flex",
               justifyContent: "space-around",
               margin:"18px 0px",
               borderBottom: "1px solid grey"
            }}>
                <div>
                    <img src={JSON.parse(localStorage.getItem('user')).url} style={{height:"150px", width:"160px",borderRadius:"50%"}} />
                </div>
            
                <div>
                        <h4>
                            {JSON.parse(localStorage.getItem('user')).Name}
                        </h4>
                        <div style={{
                            display: "flex",
                            justifyContent:"space-between",
                            width: "105%",
                            flexWrap:"wrap",
                        }}>
                            <h6>{myPics.length} Posts</h6>
                            <h6>{sub.followers} Folowers</h6>
                            <h6>{sub.following} Following</h6>
                        </div>
                    </div>
           </div>
           <div className="gallery">
               {myPics.length==0 ?
               <h3 className="no-post">Sorry {state.Name}, No Posts to display</h3>
            :
            myPics.map((item)=>{
                return(
                    <Modal className="item" Item={item}></Modal>
                )
                
            })
            }
            </div>
       </div>
            
    )
}
export default Profile;