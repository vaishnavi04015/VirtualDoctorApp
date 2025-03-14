import { useLocation, useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";


const UserRoom=()=>
{
    const {roomId} = useParams();
    const k= useLocation();
    let{name} = k.state;

    const MyMeeting=async(element)=>{
        // const appID = 107875332;
        // const serverSecret = "d90fb33171bd2297687d5456546d6a01";
        const appID = 1688398390;
        const serverSecret = "193564b660cc5280e9e3c2a23f1d4ab4";
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
              url:`https://virtualdoctorapp-frontend.onrender.com/userRoom/${roomId}`
            }],
            scenario:{
                mode:ZegoUIKitPrebuilt.OneONoneCall,
            },
            showScreenSharingButton:false,
        })
        
    }
    
    return(<div className="h-[91.3vh]">
        <div className="h-[100%]" ref={MyMeeting}/>
    </div>)
}

export default UserRoom;

