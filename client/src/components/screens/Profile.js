import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
const Profile = (props)=>{
    const history = useHistory()
    const [myPics, setPics] = useState([])
    useEffect(()=>{
        fetch('/post/myPosts', {
            method : "get",
            headers : {
                "Authorization" :"Bearer "+localStorage.getItem('jwt')
            }
        }).then(res=>res.json())
        .then((data)=>{
            console.log(data)
            setPics(data.message)
        })
    }, [])
    // if(!props.isLogged){
    //     history.push('/login')
    //     return
    // }
    return (
       <div style={{
           margin: "0px auto",
           maxWidth: "70%"
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
                            width: "105%"
                        }}>
                            <h6>40 Posts</h6>
                            <h6>40 Folowers</h6>
                            <h6>40 Following</h6>
                        </div>
                    </div>
           </div>
           <div className="gallery">
                {myPics.map((item)=>{
                    return(
                        <img className="item" src={item.photo}></img>
                    )
                    
                })}
            </div>
       </div>
            
    )
}
export default Profile;