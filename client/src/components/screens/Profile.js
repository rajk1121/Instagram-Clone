import React from 'react'
const Profile = ()=>{
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
                    <img src="https://www.postplanner.com/hs-fs/hub/513577/file-2886416984-png/blog-files/facebook-profile-pic-vs-cover-photo-sq.png?width=250&height=250&name=facebook-profile-pic-vs-cover-photo-sq.png" style={{height:"160opx", width:"160px",borderRadius:"80px"}} />
                </div>
                <div>
                        <h4>
                            Rajat Kumar
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
               <img className="item" src="https://www.postplanner.com/hs-fs/hub/513577/file-2886416984-png/blog-files/facebook-profile-pic-vs-cover-photo-sq.png?width=250&height=250&name=facebook-profile-pic-vs-cover-photo-sq.png"></img>
               <img className="item" src="https://www.postplanner.com/hs-fs/hub/513577/file-2886416984-png/blog-files/facebook-profile-pic-vs-cover-photo-sq.png?width=250&height=250&name=facebook-profile-pic-vs-cover-photo-sq.png"></img>
               <img className="item" src="https://www.postplanner.com/hs-fs/hub/513577/file-2886416984-png/blog-files/facebook-profile-pic-vs-cover-photo-sq.png?width=250&height=250&name=facebook-profile-pic-vs-cover-photo-sq.png"></img>
               <img className="item" src="https://www.postplanner.com/hs-fs/hub/513577/file-2886416984-png/blog-files/facebook-profile-pic-vs-cover-photo-sq.png?width=250&height=250&name=facebook-profile-pic-vs-cover-photo-sq.png"></img>
               <img className="item" src="https://www.postplanner.com/hs-fs/hub/513577/file-2886416984-png/blog-files/facebook-profile-pic-vs-cover-photo-sq.png?width=250&height=250&name=facebook-profile-pic-vs-cover-photo-sq.png"></img>
               <img className="item" src="https://www.postplanner.com/hs-fs/hub/513577/file-2886416984-png/blog-files/facebook-profile-pic-vs-cover-photo-sq.png?width=250&height=250&name=facebook-profile-pic-vs-cover-photo-sq.png"></img>
               <img className="item" src="https://www.postplanner.com/hs-fs/hub/513577/file-2886416984-png/blog-files/facebook-profile-pic-vs-cover-photo-sq.png?width=250&height=250&name=facebook-profile-pic-vs-cover-photo-sq.png"></img>
           </div>
       </div>
            
    )
}
export default Profile;