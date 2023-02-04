import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom'

const Chat = ({ userInfo, socket }) => {

    const [msgContent, setMsgContent] = useState('');
    const [msgList, setMsgList] = useState([])
    const [receivedMsg, setReceivedMsg] = useState(null)

    const handleSend = async () => {
        const msgData = {
            authorName: userInfo.userName,
            msgContent,
            time: `${new Date(Date()).getMinutes()} : ${new Date(Date()).getSeconds()}`,
            room: userInfo.roomNumber
        }

        await socket.emit('send_message', msgData)
        setMsgList((list) => [...list, msgData])
        setMsgContent('')
    }

    const handleMsgContent = (event) => {
        setMsgContent(event.target.value)
    }

    useEffect(() => {
        socket.on('receive_msg', (data) => {
            setReceivedMsg(data)
        })
    }, [socket])

    useEffect(() => {
        if (receivedMsg) {
            setMsgList(list => [...list, receivedMsg])
        }
    }, [receivedMsg])


    return (
        <div className='bg-gray-500 w-[90%] lg:w-[700px] mx-auto mb-10 px-5 pb-2 rounded-xl py-5 mt-5'>
            {
                msgList.length == 0 && <p className='text-white text-xl font-bold'>Start conversation</p>
            }
            <ScrollToBottom className='h-[400px] border-2 mb-5 rounded-lg overflow-y-scroll'>
                {
                    msgList?.map(msgInfo => msgInfo?.authorName === userInfo?.userName ? <div className="chat chat-end">
                        <div className="chat-bubble chat-bubble-info">{msgInfo?.msgContent}</div>
                    </div>
                        :
                        <div className="chat chat-start">
                            <div className="chat-bubble chat-bubble-primary">{msgInfo?.msgContent}</div>
                        </div>
                    )
                }
            </ScrollToBottom>
            <div className='flex'>
                <input value={msgContent} onChange={handleMsgContent} type="text" placeholder="Type here" className="input input-bordered input-primary w-full" />
                <button disabled={!msgContent} onClick={handleSend} className='btn btn-circle btn-primary ml-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                </button>
            </div>
        </div >
    );
};

export default Chat;