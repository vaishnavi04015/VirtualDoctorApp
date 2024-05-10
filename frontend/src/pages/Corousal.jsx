import { useEffect, useState } from "react";
import About from "../../public/About.json";
import AboutCard from "./AboutCard";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

const Corousal=()=>
{

    let [data,setData] = useState(About);
    let [n1,setN1]= useState(0);
    let [n2,setN2] = useState(4);

    const handleNext=()=>
    {
        setN1(n1+1);
        setN2(n2+1);
    }

    const handlePrev=()=>
    {
        setN2(n2-1);
        setN1(n1-1);
    }    
   
    return(<div className="flex w-[100%]">
        <button onClick={handlePrev} className={`${n1>0 ? "visible" :"invisible"}`}><GrPrevious size={40} /></button>
      <div className="flex w-[90%]  justify-between">
      {
        data.map((temp,key)=>{
          if(key>=n1 && key<n2)
            {
                return <AboutCard image={temp.image} issue={temp.issue} price={temp.price}/>
            }
        })
      }
      </div>
      <button onClick={handleNext} className={`${n2<data.length ? "visible" :"invisible"}`}><GrNext size={40}/></button>
    </div>)
}

export default Corousal;