import React, { useState } from 'react';

const LogIn = ({ userInfo, setUserInfo, socket }) => {
    const [userName, setUserName] = useState('');
    const [roomNumber, setRoomNumber] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault()
        setUserInfo({
            userName,
            roomNumber
        })
        socket.emit('join_room', roomNumber)

    }

    const handleUserName = (event) => {
        setUserName(event.target.value)
    }

    const handleRoomNumber = (event) => {
        setRoomNumber(event.target.value);
    }

    return (
        <div>
            <div className='w-[90%]'>
                <h1 className='font-bold text-3xl mb-5 mt-10'>Please Log In</h1>
                <p className='text-red-500 font-bold'>Note : This is a demo project for exploring socket.io. You have to join the same room to start conversation</p>
            </div>
            <form onSubmit={handleSubmit} className='mx-auto bg-blue-500 w-[90%] lg:w-[700px] flex justify-center items-center py-10 px-6 rounded-lg'>
                <div className='w-full'>
                    <div className='flex flex-col text-start mb-5'>
                        <label className='font-bold text-white text-xl'>User Name</label>
                        <input onChange={handleUserName} type="text" required placeholder="Type here" className="input input-bordered w-full" />
                    </div>
                    <div className='flex flex-col text-start'>
                        <label className='font-bold text-white text-xl'>Room Number</label>
                        <input onChange={handleRoomNumber} type="number" required placeholder="Type here" className="input input-bordered w-full" />
                    </div>
                    <button type='submit' className='btn btn-primary w-full mt-5'>Log In</button>
                </div>
            </form>
        </div>
    );
};

export default LogIn;