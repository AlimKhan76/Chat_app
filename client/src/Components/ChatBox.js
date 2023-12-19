import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { io } from "socket.io-client"
// let socket;
// let ENDPOINT ="https://chat-app-ruby-gamma-89.vercel.app"

// The id of the user currently logged in 
export const ChatBox = (chatInfo) => {
    let localId = JSON.parse(localStorage.getItem("userInfo"))._id

    // Stores the current message data that is being sent
    const [messageData, setMessageData] = useState({})

    // Stores the messages received
    const [messagesReceived, setMessagesReceived] = useState([])

    const navigate = useNavigate()

    const config = {
        headers: {
            token: localId
        }
    }

    function updateScroll() {
        var element = document.getElementById("chatbox");
        element.scrollTop = element.scrollHeight;
    }


    // Fetches all the messages
    const fetchMessages = () => {
        if (chatInfo._id !== "" || chatInfo._id !== undefined) {
            axios.get(`/api/message/fetch/${chatInfo._id}`, config).then((res => {
                if (messagesReceived.length < res.data.length) {
                    setMessagesReceived(res.data)
                }

            }))
                .catch((err) => {
                    console.log(err)
                })
        }

    }
    
     //    Runs the first time the component renders and put the scroller to the bottom
     useEffect(() => {
        fetchMessages()
        updateScroll()
    }, [])

    // Keeps running to see if there are any new messages
    useEffect(() => {
        fetchMessages()
        updateScroll()
    })
    






    // useEffect(()=>{
    //     socket = io(ENDPOINT)
    //     socket.emit("setup", localId)
    //     socket.emit("join chat", chatInfo._id)
    // },[])


    // useEffect(() => {
    // socket.on("message received", (newMessageReceived) => {
    //         console.log(newMessageReceived)
    //         setMessagesReceived([...messagesReceived, newMessageReceived])
    //     })
    //     fetchMessages()
    // }, [])


    // Sends messages 
    const sendMessage = (e) => {
        e.preventDefault()
        const receiverId = chatInfo.users.filter((data) => {
            return data !== localId
        })
        setMessageData({ ...messageData, readBy: receiverId[0], chat: chatInfo._id })
        // socket.emit("new message", messageData)

        axios.post('/api/message/send', { messageData }, config).then((res) => {
            setMessagesReceived([...messagesReceived, res.data])
            document.getElementById("messageForm").reset()
        })
            .catch((err) => {
                console.log(err)
            })
    }



    // Logs the user out
    const handleSignOut = () => {
        localStorage.removeItem("userInfo")
        navigate("/login")
    }

    return (
        <div className='col-span-2 bg-white'>

            <div className='flex w-full shadow-md'>

                <h1 className='text-3xl p-10 w-11/12 '>{chatInfo.username ? chatInfo.username : ""}</h1>

                <div className="group relative ml-3 justify-end flex items-center right-0">
                    <div>
                        <button type="button"
                            className="relative p-2.5 flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset focus:ring-offset-gray-800 hover:bg-gray-200"
                            id="user-menu-button"
                            aria-expanded="false"
                            aria-haspopup="true">
                            {/* <span className="absolute-inset-1.5"></span> */}
                            {/* <span className="sr-only">Open user menu</span> */}
                            <i className=''>Sign Out</i>
                        </button>
                    </div>


                    <div
                        className="hidden group-focus-within:block absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu-button"
                        tabIndex="-1">

                        <button
                            className="hover:cursor-pointer focus:ring-black hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700 w-full"
                            role="menuitem"
                            tabIndex="-1"
                            id="user-menu-item-2"
                            onClick={handleSignOut}>

                            Sign out
                        </button>

                    </div>
                </div>



            </div>

            <div
                className='h-[32rem] mx-10 mt-10 overflow-scroll flex flex-col scrollbar-hide no-overflow-anchoring'
                id='chatbox'>
                {/* <div className=' justify-end  '> */}
                {messagesReceived && messagesReceived.map((data) => {
                    return (
                        <div key={data._id}>
                            <div
                                className={`${data.sender === localId && "float-right !bg-purple-700 text-white "} bg-gray-200 rounded-lg p-2.5 w-fit my-0.5`} key={data._id}>
                                <div >
                                    {data.content}
                                </div>
                                <p className="text-xs">
                                    {data.createdAt !== "" ? data.createdAt.slice(11, 16) : ""}
                                </p>
                            </div>
                        </div>
                    )
                })}
                {/* </div> */}
            </div>


            <form
                id='messageForm'
                className='group flex bottom-0 absolute w-4/6'
                onSubmit={sendMessage} >
                <input
                    type="text"
                    name="content"
                    id=""
                    placeholder='Write your message'
                    className=' text-xl  p-3  w-full  outline-none group-hover:bg-gray-100 group-focus:border-b-gray-300'
                    onChange={(e) => setMessageData({ ...messageData, [e.target.name]: e.target.value })}
                />


                <button type="submit"
                    value="Send"
                    className='px-5 py-3 bg-white group-hover:bg-gray-100 group-focus:border-b-gray-300'>
                    Send</button>
            </form>
        </div>

    )
}
