import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"

export const SignUp = () => {

    const [data, setData] = useState({})
    const [error, setError] = useState({});
    const navigate = useNavigate();

    const passwordHandler = () => {
        const password = document.getElementById('password')
        const confirmPassword = document.getElementById('confirmPassword')
        if (password.value !== confirmPassword.value) {
            setError({message :"Password Do Not Match"})
            return false;
        }
        else{
            return true
        }
    
    }


    const signUp = (e) => {

        e.preventDefault();
        if(passwordHandler()){
        axios.post("/api/", { data }).then((res) => {
            if (res.data.success) {
                navigate("/success")
            }
            else {
                console.log(res.data.message)
            }

        })
            .catch((err) => {
                setError(err.response.data)
                setTimeout(() => {
                    setError({})

                }, 1500);
            })}
    }

    return (
        <div className='bg-purple-700 h-screen '>

            <h1 className='text-5xl p-5 items-center justify-center flex'>
                <span className=' text-white'>
                    Sign Up
                </span>
                <span className='px-5 '>
                    /
                    <Link to="/login">Login</Link>
                </span>
            </h1>


            <div className='flex items-center justify-center'>




                {/* <div>
                    <img
                    className='bg-transparent transaprent' src="../../public/Login.png" alt="" />
                </div> */}
                <form className="max-w-screen-lg w-2/4 mx-auto py-5" onSubmit={signUp}
                method='post'>


                    {error.hasOwnProperty('message') &&
                        <div className='  flex pb-5 justify-center items-center'>
                            <div
                                className="bg-red-100 w-3/4 border text-center border-red-400 text-red-700 px-4 py-3 rounded-2xl relative"
                                role="alert">
                                <strong className="font-bold ">{error.message}</strong>
                                <span className=" absolute top-0 bottom-0 right-0 px-4 py-3">
                                    <svg
                                        className="fill-current h-6 w-6  text-red-500"
                                        role="button"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        onClick={() => {
                                            setError({})
                                        }}
                                    >
                                        <title>Close</title>
                                        <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    }

                    
                    <div className="mb-5 ">


                        <input
                            name='email'
                            type="email"
                            id="email"
                            className="border-4 border-white bg-purple-700 text-white 
                            text-lg rounded-2xl block w-full px-10 py-2.5  placeholder:text-white"
                            placeholder='Email ID'
                            required=""
                            onChange={(e) => {
                                setData({ ...data, [e.target.name]: e.target.value })
                            }}
                        />
                    </div>
                    <div className="mb-5">

                        <input
                            name='password'
                            type="password"
                            id="password"
                            className="border-4 border-white bg-purple-700 text-white 
                            text-lg rounded-2xl block w-full px-10 py-2.5  placeholder:text-white"
                            placeholder='Create Password'
                            required=""
                            onChange={(e) => {
                                setData({ ...data, [e.target.name]: e.target.value })
                            }}
                        />
                    </div>
                    <div className="mb-5">

                        <input
                            type="password"
                            id="confirmPassword"
                            className="border-4 border-white bg-purple-700 text-white 
                            text-lg rounded-2xl block w-full px-10 py-2.5  placeholder:text-white"
                            placeholder='Confirm Password'
                            required=""
                        />
                    </div>
                    <div className='items-center justify-center flex'>

                        <button
                            type="submit"
                            className=" text-purple-700 bg-white hover:bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-2xl text-lg w-full sm:w-auto px-5 py-2.5 text-center"
                            >
                            Sign In
                        </button>
                    </div>
                </form>




            </div>



        </div>
    )
}
