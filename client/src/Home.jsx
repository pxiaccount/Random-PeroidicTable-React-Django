import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Home = () => {
    const API_URL = 'http://localhost:8000/api/'
    const [atomicNumber, setAtomicNumber] = useState({ number: [] })
    const [randomElement, setRandomElement] = useState(null)
    const [inputValue, setInputValue] = useState('')
    const [answer, setAnswer] = useState('')
    const [reveal, setReveal] = useState(false)
    const [filter, setFilter] = useState(0)
    const [minNum, setMinNum] = useState(0)
    const [darkMode, setDarkMode] = useState(true)

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
        let randomI;
        const min = Math.ceil(minNum);
        if (filter) {
            randomI = Math.floor(Math.random() * (filter - min + 1)) + min;
        } else {
            randomI = Math.floor(Math.random() * (atomicNumber.number.length - min + 1)) + min;
        }
        const element = atomicNumber.number.find(elem => elem.atomic_number === randomI);
        setRandomElement(element);
        if (answer) {
            setAnswer('');
            setReveal(reveal => !reveal);
        }
        setReveal(false);
    }

    const revealAnswer = () => {
        setReveal(reveal => !reveal)
        if (!reveal) {
            setAnswer(randomElement.symbol + ` (${randomElement.name}) Group:${randomElement.group}`)
        } else {
            setAnswer('')
        }
    }

    const checkElement = () => {
        if (randomElement && inputValue) {
            if (randomElement.name.toLowerCase() === inputValue.toLowerCase() | randomElement.symbol.toLowerCase() === inputValue.toLowerCase()) {
                setAnswer('Correct!')
            } else {
                setAnswer('Wrong')
            }
        }
    }

    const switchMode = () => {
        setDarkMode(darkMode => !darkMode)
    }

    return (
        <div className={`min-h-screen flex items-center justify-center bg-gray-100`}>
            <button>Mode</button>
            <div className={`bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-4`}>
                <h1 className={`text-3xl font-bold text-center text-gray-800`}>Random Periodic Table</h1>

                <div id="answer" className={`text-center text-lg font-medium`}>
                    {answer}
                </div>

                <div id="atomicnumber" className={`text-center text-4xl font-bold text-gray-700`}>
                    {randomElement && (
                        <div>{randomElement.atomic_number}</div>
                    )}
                </div>

                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key == 'Enter') {
                            checkElement();
                        }
                    }}
                    placeholder="Enter element name..."
                    className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />

                <div className={`flex flex-col gap-2 w-full`}>
                    <div className={`grid grid-cols-2 gap-2`}>
                        <button
                            onClick={() => getRandomElement()}
                            className={`w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600`}>
                            Random
                        </button>
                        <button
                            onClick={() => revealAnswer()}
                            className={`w-full bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600`}>
                            Reveal/Hide Answer
                        </button>
                    </div>
                    <button
                        onClick={() => checkElement()}
                        className={`w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600`}>
                        Submit
                    </button>
                </div>

                <div className={`text-center space-y-2`}>
                    <div className={`text-gray-600 font-medium`}>Filter Atomic Numbers</div>
                    <div className={`space-y-2`}>
                        <div>
                            <label className={`block text-sm text-gray-600 mb-1`}>Minimum (1-118)</label>
                            <input
                                type="number"
                                min="1"
                                max="118"
                                value={minNum}
                                onChange={(e) => setMinNum(e.target.value)}
                                placeholder="Enter minimum atomic number"
                                className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                        </div>
                        <div>
                            <label className={`block text-sm text-gray-600 mb-1`}>Maximum (1-118)</label>
                            <input
                                type="number"
                                min="1"
                                max="118"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                placeholder="Enter maximum atomic number"
                                className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home