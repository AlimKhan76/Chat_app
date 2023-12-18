import React, { useEffect, useState } from 'react'
import axios from "axios"
import { ChatBox } from './ChatBox'
import { io } from "socket.io-client"

var ENDPOINT ="https://chat-app-ruby-gamma-89.vercel.app"
var socket
export const Chat = () => {
    const [userInfo, setUserInfo] = useState([])
    const [chatInfo, setChatInfo] = useState([])
    const [existedChats, setExistedChats] = useState([])
    const [connection, setConnection] = useState([])

    const config = {
        headers: {
            token: JSON.parse(localStorage.getItem("userInfo"))._id
        }
    }

    useEffect(() => {
        socket = io(ENDPOINT, { transports: ['websocket'] })
        socket.on("Online", ((arg) => setConnection([...connection, arg])))
        // => { console.log(localId) })

        existingChatSearcher()
    }, [])


    const searchHandler = (email) => {


        if (email !== "") {
            socket.on("Online", ((arg) => setConnection([...connection, arg])))
            axios.get(`/api/search/${email}`, config).then((res) => {
                setUserInfo(res.data.user)

            })
                .catch((err) => {
                    console.log(err)
                })
        }
        else {
            setUserInfo([])
        }
    }


    const chatLoader = (receiverId) => {
        axios.get(`/api/${receiverId}`, config).then((res) => {
            setChatInfo(res.data[0])
        })
            .catch((err) => {
                console.log(err)
            })
    }

    const chatRetreiver = (chatId) => {
        axios.get(`/api/${chatId}`, config).then((res) => {
            setChatInfo(res.data[0])
        })
            .catch((err) => {
                console.log(err)
            })
    }



    const existingChatSearcher = () => {
        axios.get(`/api/chat/${JSON.parse(localStorage.getItem("userInfo"))._id}`, config).then((res) => {
            setExistedChats(res.data)
        })
            .catch((err) => {
                console.log(err)
            })
    }



    return (
        <div className='bg-purple-700 h-screen grid grid-cols-3 overflow-hidden'>

            <div className='py-5 max-h-max float-left'>
                <h1 className='text-3xl text-white mx-10'>Chat of
                    {" " + JSON.parse(localStorage.getItem("userInfo")).email}</h1>


                <div className='flex items-center justify-center my-5'>
                    <input
                        type="text"
                        name="search"
                        id=""
                        placeholder='Search here'
                        className='bg-transparent bg-white bg-opacity-10 text-xl p-2.5 w-11/12 rounded-lg placeholder:text-white  text-white'
                        onKeyUp={(e) => searchHandler(e.target.value)}
                    />
                </div>

                {/* {console.log(connection)} */}
                {userInfo.length !== 0 ? userInfo.map((data) => {
                    return (

                        <div className='flex items-center justify-start p-3 hover:bg-purple-100 hover:bg-opacity-40' key={data._id} onClick={() => chatLoader(data._id)}>

                            <div className='ml-5 '>
                                <img src="data:image/png;base64,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" alt="" className='w-12 rounded-2xl' />
                            </div>

                            <h1 className='text-2xl px-4 text-white' >
                                {data.email}
                            </h1>
                            <div className='text-white px-5'>
                                {/* {connection.map((id) => {
                                    console.log("the id is "+ id)
                                    return (
                                        // id.equals(data._id) &&
                                        <span
                                            className={`max-w-sm ${id === data._id} && "text-green-500"}`} >{id == data._id ? "Online" : "Offline"}</span>)

                                })} */}


                            </div>

                        </div>
                    )
                })
                    : existedChats.map((data) => {
                        return (

                            <div className='flex items-center justify-start p-3 hover:bg-purple-100 hover:bg-opacity-40' key={data._id} onClick={() => chatRetreiver(data._id)}>

                                <div className='ml-5 '>
                                    <img src="data:image/png;base64,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" alt="" className='w-12 rounded-2xl' />
                                </div>

                                <h1 className='text-2xl px-4 text-white' >
                                    {data.username}
                                </h1>

                                <div className='text-white px-5'>


                                    {/* <span className='max-w-sm '>kfkajfhaskjhfkjahfkah</span> */}
                                </div>
                            </div>
                        )
                    })
                }









            </div>
            {/* <div className='col-span-2 bg-white'>
                <div>
                    <h1 className='text-3xl p-10 shadow-md'>Alex Fleming</h1>
                </div>
                <div className='h-72 m-10 '>
                    <div>hielkjljal</div>

                    <div className='float-right'>
                        hdsjghfjsgjfjgjfgj
                    </div>
                </div>

                <div className='group flex bottom-0 absolute w-4/6 '>
                    <input
                        type="text"
                        name=""
                        id=""
                        placeholder='Write your message'
                        className=' text-3xl  p-5  w-full  outline-none group-hover:bg-gray-100 group-focus:border-b-gray-300'
                    />


                    <input type="button" value="Send"
                        className='px-5 group-hover:bg-gray-100 group-focus:border-b-gray-300'
                    />
                </div>
            </div> */}

            <ChatBox {...chatInfo} />




        </div>
    )
}
