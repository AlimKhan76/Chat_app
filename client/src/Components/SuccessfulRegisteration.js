import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const SuccessfulRegisteration = () => {
    const navigate= useNavigate()

    useEffect(() => {
      setTimeout(()=>{
        navigate("/login")
      },1000)
      
    }, [navigate])
    

    return (
        <div className='bg-purple-700 h-screen flex'>
            <div className="flex items-center justify-center w-screen ">

            <div className="bg-white rounded-xl h-40 shadow-2xl w-5/12 justify-center flex items-center">
            <h1 className='text-center text-3xl'>
                Your Registeration has been Successful
                </h1>

            </div>
            </div>
        </div>
    )
}
