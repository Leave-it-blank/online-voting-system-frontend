import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom';

import Button from '../components/Button'

export default function ViewPoll() {
    const polldata = useLoaderData();
    const [ip, setIp] = useState(null)
    const [poll, setPoll] = useState(polldata)
    const [voted, setVoted] = useState(false)

    
    const fetchClientIpAddress = async () => {
        const response = await fetch('https://ipapi.co/json')

        const data = await response.json()

        setIp(data.ip)
    }

    useEffect(() => {
        fetchClientIpAddress()    
 
    }, [  ])

    const vote = async (choice) => {
        try{

       const data = await fetch(`http://localhost:8000/poll/${poll.pollId}/vote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: ip,
                vote: choice,
                id: poll.pollId,
            })
        })

        setVoted(true)
        } 
        catch(err){
            console.log(err)
        }
    }

    const getTotalVotes = () => {
        let totalVotes = 0
         return totalVotes;
    }
 

    return (
        <div className="container mx-auto mt-16 px-5">
            <h1 className="my-5 text-3xl text-center">
                Welcome to Polar Voting Platform
            </h1>

            {poll ? (
                <div className="w-full max-w-3xl mx-auto bg-white shadow">
                    <header className='px-5 py-4 flex justify-between items-center'>
                        {poll.pollTitle}
                        {voted && <span>{getTotalVotes()} votes</span>}

                        <Button onClick={() => setVoted(true)}>View results</Button>
                    </header>
                   { poll.pollOptions.map((choice, index) => {
                        return (
                            <div className='px-5 py-4 border-t border-gray-400 flex justify-between items-center' key={index}>
                                {choice}
                              <Button onClick={() => vote(choice)}>Vote</Button> 
                            </div>
                        
                        )})   
                        }
 
                </div>
            ) : null}
        </div>
    )
}


export async function loader(params){
    console.log(params)
    const response = await fetch('http://localhost:8000/poll/' + params.id)
    const {poll} = await response.json()
   
    return poll;
}