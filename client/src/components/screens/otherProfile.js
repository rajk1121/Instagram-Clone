import React, {useState, useEffect, useContext} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {UserContext} from '../../App'
import M from 'materialize-css'
import Modal from '../Modal'
const OtherProfile = ()=>{
    const {state, dispatch} = useContext(UserContext)
    console.log(state)
    const history = useHistory()
    const [myPics, setPics] = useState([])
    const [myInfo, setInfo] = useState()
    console.log(myInfo)
    const [isFollowing, setIsFollowing] = useState({})
    const {userId} = useParams()
    if(userId == JSON.parse(localStorage.getItem('user')).id){
        history.push('/profile')
    }
    useEffect(()=>{
        fetch('/user/fetchUser/'+userId, {
            method : "get",
            headers : {
                "Authorization" :"Bearer "+localStorage.getItem('jwt')
            }
        }).then(res=>res.json())
        .then((data)=>{
            console.log(data)
            data.user.isFollowing = data.isFollowing
            setInfo(data.user)
            setPics(data.message)
            // isFollowing = true
        })
    }, [userId])
    const requestFollow=()=>{
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
            let newInfo = result.user
            newInfo.isFollowing = true
            setInfo(newInfo)
            M.toast({html : result.message, classes:"green darken-1"})
        })
    }
    const requestUnFollow=()=>{
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
            let newInfo = result.user
            newInfo.isFollowing = false
            console.log(newInfo)
            setInfo(newInfo)
            M.toast({html : result.message, classes:"green darken-1"})
        })
    }
    // if(!props.isLogged){
    //     history.push('/login')
    //     return
    // }
    if(!myInfo){
        return(
            <div></div>
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
                    <img src={myInfo.url} style={{height:"150px", width:"160px",borderRadius:"50%"}} />
                </div>
            
                <div>
                        <h4>
                            {myInfo.Name}
                        </h4>
                        <div style={{
                            display: "flex",
                            justifyContent:"space-between",
                            width: "105%"
                        }}>
                            <h6>{myPics.length} Posts</h6>
                            <h6>{myInfo.followers.length} Folowers</h6>
                            <h6>{myInfo.following.length} Following</h6>
                            {myInfo.isFollowing ? 
                            <button className="btn blue" onClick={requestUnFollow}>Unfollow</button> : 
                            <button className="btn blue" onClick={requestFollow}>Follow</button>
                            }
                        </div>
                    </div>
           </div>
           <div className="gallery">
               {myPics.length==0 ?
               <h3 className="no-post">Sorry, No Posts to display</h3>
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
export default OtherProfile;