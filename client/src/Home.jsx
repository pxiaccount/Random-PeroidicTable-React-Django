import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Home = () => {
    const API_URL = 'http://localhost:8000/api/'
    const [atomicNumber, setAtomicNumber] = useState({ number: [] })
    const [randomElement, setRandomElement] = useState(null)
    const [inputValue, setInputValue] = useState('')
    const [answer, setAnswer] = useState('')
    const [linkVisiblity, setLinkVisibility] = useState('hidden')

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
        // console.log(atomicNumber.number[randomI])
    }

    const checkElement = () => {
        if (randomElement && inputValue) {
            if (randomElement.name.toLowerCase() === inputValue.toLowerCase() | randomElement.symbol.toLowerCase() === inputValue.toLowerCase()) {
                setAnswer('Correct!')
                setLinkVisibility('visible')
            } else {
                setAnswer('Wrong')
            }
        }
    }

    const handleLink = () => {
        getRandomElement()
        setLinkVisibility('hidden')
        setAnswer('')
    }

    return (
        <>
            <h1>Random Periodic Table</h1>
            <div id="answer">{answer}</div>
            <div id="link" style={{ visibility: linkVisiblity, color: 'blue', textDecoration: 'underline' }}><a onClick={handleLink}>Random Again?</a></div>
            <div id="atomicnumber">
                {randomElement && (
                    <div>{randomElement.atomic_number}</div>
                )}
            </div>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder='Enter element name...'
            />
            <button onClick={getRandomElement}>Random</button><br />
            <button onClick={() => checkElement()}>Submit</button>
        </>
    )
}

export default Home