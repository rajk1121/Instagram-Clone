import React, {useState, useEffect, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {UserContext} from '../../App'
const Home = (props)=>{
    const history = useHistory()
    const {state, dispatch} = useContext(UserContext)
    // console.log(props)
    // if(!props.isLogged){
    //     console.log("hello")
    //     history.push('/login')
    //     // return
    // }
    // console.log(state)
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(true)
    useEffect(()=>{
        // setData([])
        // console.log("jbjiwwviv")
        fetch('/post/allPost', {
            method:"get",
            headers:{
                "Authorization" : "Bearer "+localStorage.getItem('jwt')
            }
        }).then(res=>res.json())
        .then((result)=>{
            // console.log(result.message)
            console.log("heloo")
            setLoading(false)
            setData(result.message)
        })
    }, [])
    const like = (item)=>{
        // console.log(item._id)
        fetch('/post/like', {
            method: 'put',
            headers : {
                "Content-type": "Application/json",
                'Authorization' : "Bearer "+localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                postId : item._id
            })
        }).then(res=>res.json())
        .then(da=>{
            // console.log(da)
            const newData = data.map((d=>{
                if(d._id == da.obj._id){
                    return da.obj
                }else{
                    return d
                }
            }))
            setData(newData)
        })
    }
    const unLike = (item)=>{
        fetch('/post/unLike', {
            method: 'put',
            headers : {
                "Content-type": "Application/json",
                'Authorization' : "Bearer "+localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                postId : item._id
            })
        }).then(res=>res.json())
        .then(da=>{
            // console.log(da)
            const newData = data.map((d=>{
                if(d._id == da.obj._id){
                    return da.obj
                }else{
                    return d
                }
            }))
            setData(newData)
        })
    }


    if(!isLoading){
        return (
           <div className="home">
               {data.map(item=>{
                    return(
                     <div className="card home-card">
                         <h5>{item.postedBy.Name}</h5>
                         <img className="home-img" src={item.photo} />
                         <i className="material-icons" style={{color: "red"}}>favorite</i>
                         {item.likes.includes(state.id) ? 
                         <i className="material-icons" onClick={()=>{unLike(item)}}>thumb_down</i> : 
                         <i className="material-icons" onClick={()=>{like(item)}}>thumb_up</i>}
                         <p>{item.likes.length} Likes</p>
                         <h6>
                             {item.title}
                         </h6>
                         <p>
                             {item.body}
                         </p>
                         <input type="text" placeholder="Comment ...."/>
                     </div>
                    )
                })}
           </div>
                
        )

    }else{
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
}
export default Home;