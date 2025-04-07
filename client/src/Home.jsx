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
    }

    const revealAnswer = () => {
        setReveal(reveal => !reveal)
        setLinkVisibility('hidden')
        if (!reveal) {
            setAnswer(randomElement.symbol + ` (${randomElement.name}) Group:(${randomElement.group})`)
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
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-4">
                <h1 className="text-3xl font-bold text-center text-gray-800">Random Periodic Table</h1>

                <div id="answer" className="text-center text-lg font-medium">
                    {answer}
                </div>

                <div id="link"
                    className="text-center cursor-pointer text-blue-600 hover:text-blue-800 underline"
                    style={{ visibility: linkVisiblity }}>
                    <a onClick={handleLink}>Random Again?</a>
                </div>

                <div id="atomicnumber" className="text-center text-4xl font-bold text-gray-700">
                    {randomElement && (
                        <div>{randomElement.atomic_number}</div>
                    )}
                </div>

                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter element name..."
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="flex flex-col gap-2 w-full">
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            onClick={() => getRandomElement()}
                            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                            Random
                        </button>
                        <button
                            onClick={() => revealAnswer()}
                            className="w-full bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600">
                            Reveal/Hide Answer
                        </button>
                    </div>
                    <button
                        onClick={() => checkElement()}
                        className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                        Submit
                    </button>
                </div>

                <div className="text-center space-y-2">
                    <div className="text-gray-600">Filter atomic number (0 is default):</div>
                    <input
                        type="number"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
        </div>
    )
}

export default Home