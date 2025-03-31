import Diagmonds from "../../assets/diagmonds.png"

interface Props{
    Text:string,
    Number:number,
    Color: "purple" | "orange" | "salmon",
}

const errorColor = ["dark:bg-red-400/70","bg-red-800/40"]
export default function(props:Props){
    // This makes a map/dictionary table containing the different colors for the card //
    const colorOptions = new Map<string, string[]>()
    colorOptions.set("purple", ["dark:bg-purple-400/70","bg-purple-800/40"])
    colorOptions.set("orange", ["dark:bg-[#ff9f00]", "bg-[#ff9f00]"])
    colorOptions.set("salmon", ["dark:bg-[#ff8159]", "bg-[#ff8159]"])
    //--------------------------------------------------------------------------------//

    // Grabs the color value //
    let colorOption = colorOptions.get(props.Color) || errorColor // grabs the table based on the color string
    // -------------------- //

    let number = "00"
    if(props.Number > 0)
        number = String(props.Number)

    return (
        <>
            <div className= {`${colorOption[0]} ${colorOption[1]} rounded-lg w-full max-w-7xl pl-2 h-auto relative`}>
                {<h2 className="text-4xl md:text-8xl dark:text-black font-mono">{number}</h2>}
                <h3 className="text-1xl dark:text-black font-bold">{props.Text}</h3>
                <img src={Diagmonds} alt="diamonds" className="absolute top-0 right-0 h-full opacity-50 w-[100%]"></img>
            </div>
        </>
    )
}
