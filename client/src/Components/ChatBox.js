import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const ChatBox = (chatInfo) => {

    const [messageData, setMessageData] = useState({})
    const [messagesReceived, setMessagesReceived]= useState([])


    const config = {
        headers: {
            token: localStorage.getItem("id")
        }
    }

    const fetchMessages = () => {
        axios.get(`/api/fetch/${chatInfo._id}`, config).then((res => {
            setMessagesReceived(res.data)
            console.log(messagesReceived)

        }))
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        fetchMessages()
    }, [messageData])



    const sendMessage = (e) => {
        e.preventDefault()


        const receiverId = chatInfo.users.filter((data) => {

            return data !== localStorage.getItem("id");
        })

        setMessageData({ ...messageData, readBy: receiverId[0], chat: chatInfo._id })

        axios.post('/api/send', { messageData }, config).then((res) => {
            console.log(res)
            document.getElementById("messageForm").reset()

        })
            .catch((err) => {
                console.log(err)
            })
    }



    return (

        <div className='col-span-2 bg-white'>
            <div>
                <h1 className='text-3xl p-10 shadow-md'>{chatInfo.username ? chatInfo.username : ""}</h1>
            </div>

            <div className='h-72 m-10 overflow-auto'>
            {messagesReceived && messagesReceived.map((data)=>{
                return(
                    <div>{data.content}</div>
    
                    )
                })}
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
                    className=' text-3xl  p-5  w-full  outline-none group-hover:bg-gray-100 group-focus:border-b-gray-300'
                    onChange={(e) => setMessageData({ ...messageData, [e.target.name]: e.target.value })}
                />


                <button type="submit"
                    value="Send"
                    className='px-5 group-hover:bg-gray-100 group-focus:border-b-gray-300'>
                    Send</button>
            </form>
        </div>

    )
}
