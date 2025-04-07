import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Home = () => {
    const API_URL = 'http://localhost:8000/api/'
    const [atomicNumber, setAtomicNumber] = useState({ number: [] })
    const [randomElement, setRandomElement] = useState(null)
    const [inputValue, setInputValue] = useState('')
    const [answer, setAnswer] = useState('')
    const [linkVisiblity, setLinkVisibility] = useState('hidden')
    const [reveal, setReveal] = useState(false)
    const [filter, setFilter] = useState(0)

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
        let randomI
        if (filter) {
            randomI = Math.floor(Math.random() * filter)
        } else {
            randomI = Math.floor(Math.random() * atomicNumber.number.length)
        }
        setRandomElement(atomicNumber.number[randomI])
        if (answer) {
            setAnswer('')
            setReveal(reveal => !reveal)
        }
        setReveal(false)
        setLinkVisibility('hidden')
        // console.log(atomicNumber.number[randomI])
    }

    const revealAnswer = () => {
        setReveal(reveal => !reveal)
        setLinkVisibility('hidden')
        if (!reveal) {
            setAnswer(randomElement.symbol + ` (${randomElement.name})`)
        } else {
            setAnswer('')
        }
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
        if (filter) {
            getRandomElement(filter)
        } else {
            getRandomElement(atomicNumber.number.length)
        }
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
            <button onClick={() => getRandomElement()}>Random</button><br />
            <button onClick={() => checkElement()}>Submit</button>
            <button onClick={() => revealAnswer()}>Reveal/Hide Answer</button>
            <br /><br />
            Filter atomic number (0 is default):
            <br />
            <input
                type="number"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder='Enter element name...'
            />
        </>
    )
}

export default Home