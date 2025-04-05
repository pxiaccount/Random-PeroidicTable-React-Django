import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Home = () => {
    const API_URL = 'http://localhost:8000/api/'
    const [atomicNumber, setAtomicNumber] = useState({ number: [] })
    const [randomElement, setRandomElement] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(API_URL)
                setAtomicNumber({
                    number: result.data
                })
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [])

    const getRandomElement = () => {
        const randomI = Math.floor(Math.random() * atomicNumber.number.length)
        setRandomElement(atomicNumber.number[randomI])
        console.log(atomicNumber.number[randomI])
    }

    return (
        <>
            <h1>Random Perodic Table</h1>
            <div id="atomicnumber">
                {randomElement && (
                    <div>{randomElement.atomic_number}</div>
                )}
            </div>
            <input type="text" placeholder='Enter element name...' />
            <button onClick={getRandomElement}>Random</button>
            <button>Submit</button>
        </>
    )
}

export default Home