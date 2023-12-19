import React, { useEffect, useState } from 'react'
import axios from "axios"
import { ChatBox } from './ChatBox'
// import { io } from "socket.io-client"

// var ENDPOINT ="https://chat-app-ruby-gamma-89.vercel.app"
// var socket
// The id of the user currently logged in 
export const Chat = () => {
    const localId = JSON.parse(localStorage.getItem("userInfo"))._id

    // Stores the data of the user logged in
    const [userInfo, setUserInfo] = useState([])

    // Stores the info of the chat in which the user is active
    const [chatInfo, setChatInfo] = useState([])

    // Stores the list of the chats that the user have already interacted with
    const [existedChats, setExistedChats] = useState([])

    // const [connection, setConnection] = useState([])

    const config = {
        headers: {
            token: localId
        }
    }

    // Search the email typed by the user whether there is a user of that email or not
    const searchHandler = (email) => {

        if (email !== "") {
            // socket.on("Online", ((arg) => setConnection([...connection, arg])))
            axios.get(`/api/chat/search/${email}`, config).then((res) => {
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

    //  Loads the chat of the email selected
    const chatLoader = (receiverId) => {
        axios.get(`/api/chat/load/${receiverId}`, config).then((res) => {
            setChatInfo(res.data[0])
        })
            .catch((err) => {
                console.log(err)
            })
    }


    const chatRetreiver = (chatId) => {
        axios.get(`/api/chat/${chatId}`, config).then((res) => {
            setChatInfo(res.data[0])
            // document.getElementById("search").value=""
        })
            .catch((err) => {
                console.log(err)
            })
    }


    // Searches if there are any existing chats of the user using user id
    const existingChatSearcher = () => {
        axios.get(`/api/chat/user/${localId}`, config).then((res) => {
            setExistedChats(res.data)

        })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        // socket = io(ENDPOINT, { transports: ['websocket'] })
        // socket.on("Online", ((arg) => setConnection([...connection, arg])))
        // => { console.log(localId) })
        existingChatSearcher()
    }, [])


    return (
        <div className='bg-gradient-to-b from-pink-400  to-purple-800 min-h-screen h-fit grid grid-cols-3 overflow-hidden'>

            <div className='py-5 max-h-max float-left'>
                <h1 className='text-3xl text-white mx-10'>Chat of
                    {" " + JSON.parse(localStorage.getItem("userInfo")).email}</h1>


                <div className='flex items-center justify-center my-5'>
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder='Search here'
                        className='bg-inherit bg-white bg-opacity-10 text-xl p-2.5 w-11/12 rounded-lg placeholder:text-white  text-white'
                        onKeyUp={(e) => searchHandler(e.target.value)}
                    />
                </div>

                {/* {console.log(connection)} */}
                {userInfo.length !== 0 ? userInfo.map((data) => {
                    return (
                        // Card of the searched email
                        <div className='flex items-center justify-start p-3 hover:bg-purple-100 hover:bg-opacity-40' key={data._id} onClick={() => chatLoader(data._id)}>

                            <div className='ml-5 '>
                                <img
                                    src=" https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                                    alt="img.png"
                                    className='w-12 rounded-full' />
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
                                    <img
                                        src=" https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                                        alt="img.png"
                                         className='w-12 rounded-2xl' />
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
            
           {/* The data of the chat being send to ChatBox */}
            <ChatBox {...chatInfo} />




        </div>
    )
}
