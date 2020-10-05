import React, {useState, useEffect, useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {UserContext} from '../../App'
import M from 'materialize-css'
const Home = (props)=>{
    const history = useHistory()
    const {state, dispatch} = useContext(UserContext)
    // console.log(state)
    // console.log(props)
    // if(!props.isLogged){
    //     console.log("hello")
    //     history.push('/login')
    //     // return
    // }
    // console.log(state)
    const [data, setData] = useState([])
    // console.log("data", data)
    const [isLoading, setLoading] = useState(true)
    // const [comment, setComment] = useState()
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
            // console.log("heloo")
            setLoading(false)
            // console.log(result.message)
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
                    da.obj.postedBy = d.postedBy
                    da.obj.comments = d.comments
                    return da.obj
                }else{
                    return d
                }
            }))
            setData(newData)
        })
    }
    const postComment=(item, comment)=>{
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
                const newData = data.map((d=>{
                    if(d._id == result.obj._id){
                        result.obj.postedBy = d.postedBy
                        return result.obj
                    }else{
                        return d
                    }
                }))
                setData(newData)
            }else{
                
                M.toast({html:result.message , classes: "red darken-1"})
            }
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
                    da.obj.comments = d.comments
                    da.obj.postedBy = d.postedBy
                    return da.obj
                }else{
                    return d
                }
            }))
            setData(newData)
        })
    }

    if(!state){
        return(
            <div></div>
        )
    }
    if(!isLoading){
        if(data.length==0){
            return(
            <h3 className="no-post">Sorry {state.Name}, No Posts to display</h3>
            )
        }
        return (
           <div className="home">
               {data.map(item=>{
                    return(
                     <div className="card home-card">
                         <div className="post-contents">
                           
                            <h5> <img src={item.postedBy.url} className="home-user-pic"></img>
                                <Link to={item.postedBy.Name==state.Name ? "/profile" : "/show/"+item.postedBy._id}> {item.postedBy.Name==state.Name ? "You" : item.postedBy.Name}</Link>
                            </h5>
                         </div>
                         <img className="home-img" src={item.photo} />
                         <div className="post-contents">
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
                            <h5>Comments</h5>
                            {
                                item.comments.map(result=>{
                                    return (
                                        <div>
                                            <h6><span style={{"fontWeight": "bold"}}>{result.user._id==state.id ? "You" : result.user.Name}</span> <span>{result.text}</span></h6>
                                        </div>
                                    )
                                })
                            }
                            <form onSubmit={(e)=>{
                                e.preventDefault()
                                postComment(item,e.target[0].value )
                                e.target[0].value=""
                            }
                                
                                }>
                                <input type="text" placeholder="Comment ...."/>  
                                <button type="submit" className="btn waves-effect blue darken-1" >
                                    <i class="material-icons">send</i>
                                </button>
                            </form>
                         </div>
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