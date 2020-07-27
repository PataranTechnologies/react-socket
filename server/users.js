users=[]


const addUser=({id,name,room})=>{

    name=name.trim();
    room=room.trim();

    const est=users.find((user)=>user.name===name && user.room===room)
    if(est)
    {
        return {error:"User with given name already exists"};
    
    }

    const user={id,name,room}
    users.push(user);
    return {user};
}




const removeUser=(id)=>
{
    var index=users.findIndex((user)=>user.id===id)
    return users.splice(index,1);
}

const getUser=(id)=>
{
    return users.find((user)=>user.id===id)
}

const getUsersByRoom=()=>
{

    return users.filter((user)=>user.room===room)
}


module.exports={addUser,removeUser,getUser,getUsersByRoom};