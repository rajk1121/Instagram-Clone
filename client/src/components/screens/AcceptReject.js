import React, {useEffect, useState} from 'react'
import M from 'materialize-css'
const AcceptReject = ()=>{
    const [isLoading, setIsLoading] = useState(true)
    const [pending, setPending] = useState([])
    useEffect(()=>{
        setIsLoading(true)
        fetch('/user/pendingRequest',{
            method : 'get',
            headers : {
                'Authorization': 'Bearer '+localStorage.getItem('jwt')
            }
        }).then(res=>res.json())
        .then((result)=>{
            setPending(result.message)
            setIsLoading(false)
        })
    }, [])
    console.log(pending)
    const accept= (id)=>{
        console.log(id)
        fetch('/user/accept',{
            method : 'put',
            headers : {
                "Content-type":"Application/json",
                'Authorization': 'Bearer '+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                requestedBy : id
            })
        }).then(res=>res.json())
        .then((result)=>{
            if(result.message == 'Accepted'){
                M.toast({html : result.message , classes:"green darken-1"})
                let newPending = pending.filter((item)=>{
                    return !item._id==id
                })
                setPending(newPending)
            }else{

                M.toast({html : result.message , classes:"red darken-1"})
            }
        })
    }
    const reject= (id)=>{
        fetch('/user/cancel',{
            method : 'put',
            headers : {
                "Content-type":"Application/json",
                'Authorization': 'Bearer '+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                requestedBy : id
            })
        }).then(res=>res.json())
        .then((result)=>{
            if(result.message == 'Rejected'){
                let newPending = pending.filter((item)=>{
                    return !item._id==id
                })
                M.toast({html : result.message , classes:"green darken-1"})
                
                setPending(newPending)
            }else{

                M.toast({html : result.message , classes:"red darken-1"})
            }
        })
    }
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
    }else{
        if(pending.length==0){
            return (
                <div className="center">
                    <h4>
                        No Pending Requests for you
                    </h4>
                </div>
            )
        }
        else{
            return(
                pending.map((item)=>{
                    return(
                        <div className="card acceotReject-card">
                            <img src={item.url} style={{marginLeft: "5px"}} className="home-user-pic"></img>
                            <span>{item.Name}</span>
                            <span style={{marginLeft:"1rem"}} className="center">
                                <button className="btn green accept" onClick={()=>accept(item._id)}>Accept</button>
                                <button className="btn red reject" onClick={()=>reject(item._id)}>Reject</button>
                            </span>
                        </div>
                    )
                })
                )
        }
    }
}
export default AcceptReject