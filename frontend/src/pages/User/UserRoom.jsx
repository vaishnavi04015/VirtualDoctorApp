import { useLocation, useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";


const UserRoom=()=>
{
    const {roomId} = useParams();
    const k= useLocation();
    let{name} = k.state;

    const MyMeeting=async(element)=>{
        const appID = 107875332;
        const serverSecret = "d90fb33171bd2297687d5456546d6a01";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            roomId,
            Date.now().toString(),
            name
        );
        const zc = ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom({
            container:element,
            sharedLinks:[{
              name:'Copy Link',
              url:`http://localhost:5173/userRoom/${roomId}`
            }],
            scenario:{
                mode:ZegoUIKitPrebuilt.OneONoneCall,
            },
            showScreenSharingButton:false,
        })
        
    }
    
    return(<div>
        <div ref={MyMeeting}/>
    </div>)
}

export default UserRoom;

