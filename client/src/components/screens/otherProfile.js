import React, {useState, useEffect, useContext} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {UserContext} from '../../App'
import M from 'materialize-css'
import Modal from '../Modal'
const OtherProfile = ()=>{
    const {state, dispatch} = useContext(UserContext)
    // console.log(state)
    const history = useHistory()
    const [myPics, setPics] = useState([])
    const [myInfo, setInfo] = useState()
    const [isLoading, setLoading] = useState(true)
    // console.log(myInfo)
    // console.log(myPics)
    const [show, setShow] = useState("")
    const {userId} = useParams()
    if(localStorage.getItem('user')){
      if(userId == JSON.parse(localStorage.getItem('user')).id){
          history.push('/profile')
      }

    }
    useEffect(()=>{
        setLoading(true)
         if(!localStorage.getItem('user')){
          
        }else{
        fetch('/user/fetchUser/'+userId, {
            method : "get",
            headers : {
                "Authorization" :"Bearer "+localStorage.getItem('jwt')
            }
        }).then(res=>res.json())
        .then((data)=>{
            console.log(data)
            if(data.isPending && !data.isFollowing){
                setShow("hideRequested")
            }else if(!data.isPending && !data.isFollowing){
                setShow("hideFollow")
            }else if(!data.isPending && data.isFollowing){
                setShow("showUnfollow")
                data.user.isFollowing = data.isFollowing
                setPics(data.message)
              }
              setInfo(data.user)
            setLoading(false)
            // isFollowing = true
        })
      }
    }, [userId])
    // myPics.length==0 ?
    //            <h3 className="no-post">Sorry, No Posts to display</h3>
    //         :
    //         myPics.map((item)=>{
    //             return(
    //                 <Modal className="item" Item={item}></Modal>
    //             )
                
    //         })
    let FollowButton = []
    let galleryArray = []
    console.log(show)
    const cancelRequest = ()=>{
      console.log('cancelFollow')
      fetch('/user/cancelRequest', {
        method : 'put',
        headers : {
          "Content-type":"application/json",
          'Authorization' : 'Bearer '+localStorage.getItem('jwt')
        },
        body : JSON.stringify({
          toFollow : userId
        })
      }).then(res=>res.json())
      .then((result)=>{
        if(result.message=='Request Cancelled'){
          M.toast({html : result.message , classes:'green dareken-1'})
          setShow('hideFollow')
        }else{
          M.toast({html : result.message , classes:'red dareken-1'})
        }
      })
    }
    const requestFollow=()=>{
      console.log('requestFollow')
        fetch('/user/follow',{
            method:"put",
            headers:{
                "Content-type":"application/json",
                "Authorization" : "Bearer "+localStorage.getItem('jwt')
            },
            body : JSON.stringify({
                toFollow : userId
            })
        }).then(res=>res.json())
        .then(result=>{
            // let newInfo = result.user
            // newInfo.isFollowing = true
            // setInfo(newInfo)
            if(result.message =='Request Sent'){
              
              M.toast({html : result.message, classes:"green darken-1"})
              setShow('hideRequested')
            }else{

              M.toast({html : result.message, classes:"red darken-1"})
            }
        })
    }
    const requestUnFollow=()=>{
      
      console.log('requestUnFollow')
        fetch('/user/unFollow',{
            method:"put",
            headers:{
                "Content-type":"application/json",
                "Authorization" : "Bearer "+localStorage.getItem('jwt')
            },
            body : JSON.stringify({
                toUnFollow : userId
            })
        }).then(res=>res.json())
        .then(result=>{
            // let newInfo = result.user
            // newInfo.isFollowing = false
            // // console.log(newInfo)
            // setInfo(newInfo)
            if(result.message=='Un Followed'){
              M.toast({html : result.message, classes:"green darken-1"})
              setShow('hideFollow')
            }else{
              M.toast({html : result.message, classes:"red darken-1"})
            }
        })
    }
    if(show=="hideRequested"){
      FollowButton.push(
        <button className="btn blue" onClick={cancelRequest}>Cancel Request</button> 
      )
      galleryArray.push(
        <h4>Account is Private.</h4>
      )
    }else if(show=="hideFollow"){
      FollowButton.push(
        <button className="btn blue" onClick={requestFollow}>Follow</button> 
      )
      galleryArray.push(
        <h4>Account is Private.</h4>
      )
    }else if(show=='showUnfollow'){
      FollowButton.push(
        <button className="btn blue" onClick={requestUnFollow}>Unfollow</button> 
      )
      galleryArray =  myPics.map((item)=>{
            return(
                <Modal className="item" Item={item}></Modal>
            )
            
        })
    }
    // if(!props.isLogged){
    //     history.push('/login')
    //     return
    // }
    if(isLoading){
        return(
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
    else{
      return (
        <div style={{
            margin: "0px auto",
            maxWidth: "80%"
        }}>
            <div style={{
                display: "flex",
                justifyContent: "space-around",
                margin:"18px 0px",
                borderBottom: "1px solid grey",
                padding: "15px 0"
             }}>
                 <div>
                     <img src={myInfo.url} style={{height:"150px", width:"160px",borderRadius:"50%"}} />
                 </div>
             
                 <div>
                         <h4>
                             {myInfo.Name}
                         </h4>
                         <div style={{
                             display: "flex",
                             justifyContent:"space-between",
                             width: "105%",
                             flexWrap:"wrap",
                         }}>
                             <h6>{myPics.length} Posts</h6>
                             <h6>{myInfo.followers.length} Folowers</h6>
                             <h6>{myInfo.following.length} Following</h6>
                             {FollowButton}
                         </div>
                     </div>
            </div>
            <div className="gallery">
                {galleryArray}
             </div>
        </div>
             
     )
    }
}
export default OtherProfile;