
const AboutCard=(props)=>
{
    

    return(<div className="w-80 h-72 shadow-xl rounded-lg border">

      <img src={props.image} className="rounded-t-lg "/>
      <p className=" font-semibold text-center mt-4">{props.issue}</p> 
      <p className=" font-medium text-gray-500 text-center mt-1">{props.price}</p>
   
    </div>)
}

export default AboutCard;