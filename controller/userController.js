const fetchUser = async (req, res)=>{
    try{
        res.json({
            message: "Hello User"
        })
    }catch(err){
        res.status(400).json({
            message : "Error Occured"
        })
    }
}

module.exports = {fetchUser}