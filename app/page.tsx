'use client'
import Image from "next/image";
import {createClient} from "@/utils/supabase/client";
import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";

export default function Home() {
  
  const router = useRouter();
  const supabase = createClient();
  const [session, setSession] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [success, setSuccess] = useState(false);
  const [propertiesFound, setPropertiesFound] = useState(0);
  const handleClick = async() =>{
    try{

      const {data, error} = await supabase.from("status").select("*");
      if(error){
        alert("Error getting the activity status. If persists please report the issue.");
        return;
      }else{
        if (data[0].active === true){
          alert("There is a scan in progress. Please wait");
          setDisableButton(true)
        }else{
          const response = await fetch('http://localhost:8000/startscan');
          const data = await response.json();
          if (data.success === true){
            setDisableButton(true);
            setSuccess(true);
          }else{
            alert("Error starting the scan, server-side issue. If persists please report the issue");
          }
        }
      }
    }catch(err){
      console.error(err);
    }
  }

 return (
   <>
    <div className = 'w-[100%] h-[50%] text-center items-center pt-10'>
        <h1 className ='text-3xl'>Hi, start the scan whenever you need one.</h1>
        <button className='bg-slate-900 font-semibold rounded py-2 text-white p-10 mt-10'
          onClick={handleClick}>Click to run</button>
          {success && <p> The scan has started!</p>}
    </div>
   </>
 ) 
}
