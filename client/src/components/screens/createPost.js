import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import M from 'materialize-css'
// import {useState} from 'react-router-dom'
const CreatePost = (props)=>{
    const history = useHistory()
    
    // if(!props.isLogged){
    //     history.push('/login')
    //     // return
    // }
    const [title, setTitle] = useState()
    const [body, setBody] = useState()
    const [file, setFile] = useState()
    const [photo, setUrl] = useState()
    useEffect(()=>{
        if(photo){
            fetch('/post/createPost',{
                method : "post",
                headers:{
                    "Content-type":"application/json",
                    "Authorization" : "Bearer "+localStorage.getItem('jwt')
                },
                body :JSON.stringify( {title, body, photo})
            }).then(res=>res.json())
            .then((data)=>{
                if(data.message=="Successfull"){
                    M.toast({html : data.message , classes : "green darken-1"})
                    history.push('/profile')
                }else{

                    M.toast({html : data.message , classes : "red darken-1"})
                }
            })
        }
    }, [photo])
    const request = ()=>{
        if(!title || !body || !file){
            
            M.toast({html : "Provide all data" , classes : "red darken-1"})
            return;
        }
        const fileData = new FormData()
        fileData.append("file", file)
        fileData.append("upload_preset", "inst-clone")
        fileData.append("cloud_name", "duhj89kch")
        
        console.log("dbhodq")
        fetch('https://api.cloudinary.com/v1_1/duhj89kch/image/upload',{
            method:"post",
            body : fileData
        }).then(res=>res.json())
        .then((data)=>{
            console.log(data)
            setUrl(data.url)
            
        }).catch((err)=>{
            console.log(err)
        })
    }
    
    return(
        <div className="card create-post">
            <h4 className="create-post-text">Create Post</h4>
            <input type="text" placeholder="Title ..." 
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            />
            <input type="text" placeholder="Body ..." 
            value={body}
            onChange={(e)=>setBody(e.target.value)}
            />
            <div className="file-field input-field">
                <div className="btn">
                    <span>File</span>
                    <input type="file"
                    onChange={e=>setFile(e.target.files[0])}
                    />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button className="btn waves-effect waves-light blue darken-1" onClick={request}>Create Post
            </button>
        </div>
    )

}
export default CreatePost