import React, { useState } from 'react'

function HomePage() {
    const [text, setText] = useState('')

    return (
        <div>
            <form>
                <label>Barcode: </label>
                <input type="text" value = {text} name="barcode" onChange={event => setText(event.target.value)} />
                <button type="submit">Decodieren</button>
            </form>
            <label>Decodierter Barcode: </label>
            <textarea name = "decoded" rows = "10"></textarea>
        </div>
    )
}

export default HomePage
