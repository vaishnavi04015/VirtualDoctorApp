import React, { useState } from 'react'
import { toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const UserRegistration = () => {


    const [user, setUser] = useState({
        userName:"",
        email:"",
        phone:"",
        password:""
    })

    const handleInput = (e)=>{
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]:value,
        })
        console.log(user);
    }

    const handleForm = async  (e) =>{
        e.preventDefault();

        const response = await fetch("http://localhost:5000/auth/register",{
            method:"POST",
            headers:{
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(user)
        })

        if (response.ok) {
            setUser({
                userName:"",
                email:"",
                phone:"",
                password:""
            })

            console.log(user);
            toast.success("Registered Successfully !")
        }
    }
  return (
    <div>
    <form onSubmit={handleForm}>
        <div  className='mb-2'>
            <label htmlFor='userName'>Full Name</label>
            <input className='ml-3 border-2 border-slate-400 rounded-md' value={user.userName}  onChange={handleInput} type='text' id='userName' name='userName' required placeholder=' Full name' />
        </div>
        <div  className='mb-2'>
            <label htmlFor='email'>Email</label>
            <input className='ml-3 border-2 border-slate-400 rounded-md' value={user.email}  onChange={handleInput} type='text' id='email' name='email' required placeholder=' Email' />
        </div>
        <div  className='mb-2'>
            <label htmlFor='phone'>Phone</label>
            <input className='ml-3 border-2 border-slate-400 rounded-md' value={user.phone}  onChange={handleInput}  name='phone' id='phone' type='text' required placeholder=' Phone' />
        </div>
        <div  className='mb-2'>
            <label htmlFor='password'>Password</label>
            <input className='ml-3 border-2 border-slate-400 rounded-md' value={user.password}  onChange={handleInput}  type='password' id='password' name='password' required placeholder=' ******' />
        </div>
        <button className='p-2 border-2 border-emerald-600' type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default UserRegistration