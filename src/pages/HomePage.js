import React, { useState } from 'react'
import Barcode from "react-barcode"

function HomePage() {
    const [text, setText] = useState('')
    const [barcode, setBarcode] = useState('Enter a barcode')
    const [brand, setBrand] = useState('')
    const [color, setColor] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [displacement, setDisplacement] = useState('')
    const [generated, setGenerated] = useState(false)
    const [barcodeText, setBarcodeText] = useState('')

    const decode = (event) => {
        event.preventDefault();
        if (text === '' || text.length !== 12) {
            alert("Please enter a valid barcode")
        } else {
            const brand = text.charAt(0)
            const color = text.substr(1, 3)
            let price = text.substr(4, 4)
            const category = text.charAt(8)
            let displacement = text.substr(9, 3)
            price = price * 10
            displacement = displacement * 10
            const newtext = 'Brand: ' + brand + "\nColor: " + color + '\nPrice: ' + price + '\nCategory: ' + category + '\nDisplacement: ' + displacement
            setBarcode(newtext)
        }
    }

    const encode = (event) => {
        event.preventDefault();
        if (brand.length === 1 && color.length === 3 && price !== '' && price < 100000 && category.length === 1 && displacement !== '' && displacement < 10000) {
            let genPrice = Math.round(price/10);
            switch (genPrice.toString().length) {
                case 1:
                    genPrice = '000' + genPrice
                    break;
                case 2:
                    genPrice = '00' + genPrice
                    break;
                case 3:
                    genPrice = '0' + genPrice
                    break;
                default:
                    break;
            }
            let genDisplacement = Math.round(displacement/10);
            switch (genDisplacement.toString().length) {
                case 1:
                    genDisplacement = '00' + genDisplacement
                    break;
                case 2:
                    genDisplacement = '0' + genDisplacement
                    break;
                default:
                    console.log("default")      
            }

            const convertedText = brand + color + genPrice + category + genDisplacement
            setBarcodeText(convertedText)
            setGenerated(true)
        } else {
            alert("Please enter valid values")
        }
    }

    return (
        <div>
            <h1>Decoder</h1>
            <form onSubmit={(event) => decode(event)}>
                <label>Barcode: </label>
                <input type="text" value={text} name="barcode" onChange={event => { event.preventDefault(); setText(event.target.value); }} />
                <button type="submit">Decode</button>
            </form>
            <label>Decodierter Barcode: </label>
            <textarea name="decoded" rows="10" value={barcode}></textarea>
            <form onSubmit = {(event) => encode(event)}>
                <h1>Encoder</h1>
                <label>Brand: </label>
                <input type = "text" value = {brand} name = "brand" onChange={event => { event.preventDefault(); setBrand(event.target.value); }}/>
                <br/>
                <label>Color: </label>
                <input type = "text" value = {color} name = "color" onChange={event => { event.preventDefault(); setColor(event.target.value); }}/>
                <br/>
                <label>Price: </label>
                <input type = "text" value = {price} name = "price" onChange={event => { event.preventDefault(); setPrice(event.target.value); }}/>
                <br/>
                <label>Category: </label>
                <input type = "text" value = {category} name = "category" onChange={event => { event.preventDefault(); setCategory(event.target.value); }}/>
                <br/>
                <label>Displacement: </label>
                <input type = "text" value = {displacement} name = "displacement" onChange={event => { event.preventDefault(); setDisplacement(event.target.value); }}/>
                <br/>
                <h4>Barcode-type: Code 128</h4>
                <button type = "submit">Generate</button>
            </form>
            {generated ? <Barcode value = {barcodeText} /> : <h1>Generate a barcode</h1>}
        </div>
    )
}

export default HomePage
