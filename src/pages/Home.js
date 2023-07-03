import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

export default function Home() {
    const [polls, setPolls] = useState([])
    
    useEffect(() => {
        const polls = [
            {
                id:"1",
                title:"Favourite Language"
            },
            {
                id:"2",
                title:"Favourite food"
            }
        ]
        const fetchPolls = async () =>{
            const response = await fetch('http://localhost:8000/polls')
            const {polls} = await response.json()
            setPolls(polls);
            console.log(polls)
            console.log(polls)
        }
        fetchPolls() // call the function

        setPolls(polls)
    }, [])


    return (
        <div className='container mx-auto px-5'>
            <h1 className='text-5xl text-center my-10'>Welcome to Voting Platform</h1>

            <div className="w-full max-w-3xl mx-auto bg-white shadow">
                    {polls.map((poll, index) => (
                        <div key={index} className='w-full px-4 py-4 border-b border-gray-400 flex justify-between'>
                            {poll.pollTitle}

                            <Link className='cursor-pointer hover:text-blue-600 text-blue-500'  to={`/polls/${poll.pollId}`}>View poll</Link>
                        </div>
                    ))}
            </div>
        </div>
    )
}


export async function loader(){
    const response = await fetch('http://localhost:8000/polls')
    const {polls} = await response.json()
    return polls
}