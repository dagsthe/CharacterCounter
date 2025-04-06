import {useState, useEffect} from "react"

interface Props{
    Text:string
}

export default function(props:Props){
    const [displayedText, setText] = useState("")
    
    useEffect(() => {
        let i = 0
        const interval = setInterval(()=>{
            let char = props.Text[i]
            if(char == undefined){
                clearInterval(interval)
                return
            }

            setText( (prev) => prev + char)
            i += 1

        }, 75)
    
        return () => clearInterval(interval)
    },[props.Text])

    return <div>{displayedText}</div>
}