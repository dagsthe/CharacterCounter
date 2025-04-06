import {useEffect, useState} from 'react';

import Header from './components/Header'
import { ThemeProvider } from "./components/theme-provider"
import { Textarea } from "./components/ui/textarea"
import { Checkbox } from "./components/ui/checkbox"
import Numbercard from "./components/ui/numbercard"
import Slider from "./components/ui/slider"
import Typewriter from "./components/ui/typewriter"


function App() {
  const [characterCount, setCharacterCount] = useState(0)
  const [wordCount, setWordCount] = useState(0)
  const [lineCount, setLineCount] = useState(0)
  const [ignoreSpace, setIgnoreSpace] = useState(false)
  const [uniqueLetters, setLetter] = useState<{[letter:string]: number}>({})
  const [letterToPercentage, setPercentage] = useState<{[letter:string]: number}>({})

  const [text, setText] = useState("Start typing here... (or paste your text)")
  const textChanged = (event : React.ChangeEvent<HTMLTextAreaElement>) => {
    let text = event.target.value
    setText(text)
    if(text.length == 0){
      setText("Start typing here... (or paste your text)")
    }

    if(ignoreSpace)
      setCharacterCount(text.replace(/\s+/g,"").length)
    else
      setCharacterCount(text.length)

    // Split the text into words based on spaces and filter out empty strings
    const words = text.trim().split(/\s+/).filter(Boolean);
    setWordCount(words.length);  // Set the word count

    // Count lines (split by newline and filter out empty lines)
    const lines = text.split("\n").filter(Boolean);
    setLineCount(lines.length);
    console.log(ignoreSpace)

    const letters = text.replace(/[^a-zA-Z]/g, '').toLowerCase(); // Remove non-alphabetic characters and make it lowercase
    // Create a new object to avoid mutating the previous state
    const newUniqueLetters:{[key:string]:number} = {};
    
    for (const letter of letters){ // Adds unique letter to table
      if(newUniqueLetters[letter] == null)
        newUniqueLetters[letter] = 1
      else
        newUniqueLetters[letter] += 1
    }
    setLetter(newUniqueLetters)

    let sum = 0 // get total letters
    for (let letter in newUniqueLetters){
      let amount:number = newUniqueLetters[letter]
      sum += amount
    }

    // Calculate percentage of each letter and update the state
    let newLetterToPercentage:{[key:string]:number} = {}
    for (let letter in newUniqueLetters){
      let amount:number = newUniqueLetters[letter]
      let percentage = Math.round((amount / sum) * 100)
      newLetterToPercentage[letter] = percentage
    }
    setPercentage(newLetterToPercentage)
  }

  // Updates IgnoreSpace State from checkbox
  const checkBoxChanged = (checked:boolean) => {
    setIgnoreSpace(checked)
    if(checked)
      setCharacterCount(text.replace(/\s+/g, "").length)
    else
      setCharacterCount(text.length)
  }

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className='w-[80%] mx-auto'>
          <Header></Header>
          <div className='text-4xl md:text-7xl font-bold justify-center mt-5 mx-auto text-center'>
            <Typewriter Text='Analyze your text in real-time.'></Typewriter>
          </div>
          
          <Textarea placeholder={text} onChange={textChanged} className='h-36 mt-10'></Textarea>
          
          {/* This is to create the checkbox that ignores spaces as characters */}
          <div className='mt-5'>
            <Checkbox id="excludespaces" onCheckedChange={checkBoxChanged}></Checkbox>
            <label htmlFor='excludespaces' className='ml-2 font-semibold' >
              Exclude Spaces
            </label>
          </div>


          {/* This creates the cards to count the actual characters */}
          <div className='flex flex-row gap-5 justify-center mt-3'>
            <Numbercard Text='Total Characters' Color="purple" Number={characterCount}></Numbercard>
            <Numbercard Text='Word Count' Color="orange" Number={wordCount}></Numbercard>
            <Numbercard Text='Line Count' Color="salmon" Number={lineCount}></Numbercard>
          </div>

          {/* LETTER COUNT */}
          <h1 className='text-4xl mt-5 font-semibold font-mono opacity-80'>Letter Count</h1>
          <div className='flex flex-col mt-5 gap-5'>
            {Object.keys(uniqueLetters).map((letter) => (
              <Slider Letter={letter.toUpperCase()} Amount={uniqueLetters[letter]} Percentage={letterToPercentage[letter]}></Slider>
            ))}
          </div>
          <div className='h-20'></div> {/* Creates padding at the bottom */}

        </div>
      </ThemeProvider>
    </>
  )
}

export default App
