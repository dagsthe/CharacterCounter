interface Props{
    Letter:string,
    Amount:number,
    Percentage:number,
}

export default function(props:Props){
    return(
        <>
            <div className="flex flex-row font-mono">
                <h1 className="text-2xl font-bold opacity-90">{props.Letter}</h1>
                <div className="w-[50%] md:w-[70%] lg:w-[80%] ml-5 mr-5 rounded-2xl dark:bg-slate-800 bg-slate-300 overflow-hidden">
                    <div className= {`dark:bg-[#744f9a] bg-[#9E82B1] h-full rounded-2xl`} style={{width:`${props.Percentage}%`}}></div>
                </div>
                <h1 className="text-2xl font-extralight opacity-60">{props.Amount} ({props.Percentage}%)</h1>
            </div>
        </>
    )
}