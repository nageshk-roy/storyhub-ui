
import { useEffect,useState } from "react"
import api from "../services/api"

function Notifications(){

const [notifications,setNotifications] = useState([])

useEffect(()=>{

loadNotifications()

},[])

const loadNotifications = async()=>{

try{

const res = await api.get("/notifications")

setNotifications(res.data.data || [])

}catch(error){

console.error(error)

}

}

return(

<div className="max-w-xl mx-auto p-10">

<h1 className="text-3xl font-bold mb-6">
Notifications
</h1>

{notifications.length === 0 && (
<p className="text-gray-500">
No notifications
</p>
)}

{notifications.map(n=>(
<div
key={n.id}
className="border p-4 mb-3 rounded"
>
{n.message}
</div>
))}

</div>

)

}

export default Notifications

