import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const ChatBox = (chatInfo) => {

    const [messageData, setMessageData] = useState({})
    const [messagesReceived, setMessagesReceived] = useState([])
    const navigate = useNavigate()

    const localId= JSON.parse(localStorage.getItem("userInfo"))._id


    const config = {
        headers: {
            token:  JSON.parse(localStorage.getItem("userInfo"))._id
        }
    }

    const fetchMessages = () => {
        axios.get(`/api/fetch/${chatInfo._id}`, config).then((res => {
            setMessagesReceived(res.data)
            console.log(res)

        }))
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        fetchMessages()
    }, [chatInfo])



    const sendMessage = (e) => {
        e.preventDefault()


        const receiverId = chatInfo.users.filter((data) => {

            return data !==  JSON.parse(localStorage.getItem("userInfo"))._id
        })

        setMessageData({ ...messageData, readBy: receiverId[0], chat: chatInfo._id })

        axios.post('/api/send', { messageData }, config).then((res) => {
            document.getElementById("messageForm").reset()

        })
            .catch((err) => {
                console.log(err)
            })
    }


    const handleSignOut = () => {
        localStorage.removeItem("id")
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

            <div className='h-2/5 mx-10 mt-10 overflow-scroll flex flex-col scrollbar-hide  ' id='chatbox'>
                {/* <div className=' justify-end  '> */}
                {messagesReceived && messagesReceived.map((data) => {
                    return (
                        <div key={data._id}>
                        <div className={`${data.sender === localId && "float-right !bg-purple-700 text-white "} bg-gray-200 rounded-lg p-2.5 w-fit my-0.5  `} key={data._id}>
                        <div >
                            {data.content}
                        </div>
                        <p className="text-xs">{data.createdAt.slice(11,16)}</p>
                        </div>
                        </div>
                    )
                })}
                {/* </div> */}
            </div>


            <form
                id='messageForm'
                className='group flex bottom-0 absolute w-4/6'
                onClick={sendMessage} >
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
