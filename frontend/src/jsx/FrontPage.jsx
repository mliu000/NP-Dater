import { useState } from 'react'
import '../css/FrontPage.css'

// Sets up the front page
export default function FrontPage() {
    const [count, setCount] = useState(5)

    return (
        <>
            <h1></h1>
            <button onClick={() => {
                if (count % 2 === 1) {
                    setCount(3 ^ count);
                } else {
                    setCount(count + 1);
                }
            }}>Here is the button</button>
            <h1>Test</h1>
            <h2>Test 2</h2>
            <h3>Test 3</h3>
            <h4>Test 4</h4>
            <h5>Test 5</h5>
            <p>Count {count}</p>
        </>
    )
}
