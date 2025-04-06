import { ModeToggle } from './mode-toggle'
import Logo from '../assets/logo.png'

export default function(){
    return (
        <>
            <div className='mt-10 md:mb-10 lg:mb-20 relative'>
                <div className='flex flex-row gap-5'>
                    <img src={Logo} alt="logo" className='aspect-square w-auto max-w-[30px] md:max-w-[60px] h-auto dark:invert opacity-80 cursor-pointer' onClick={() => window.location.reload()}></img>
                    <h1 className="text-2x md:text-5xl font-bold w-auto font-mono opacity-80">Character Counter</h1>
                </div>
                
                <div className='absolute bottom-[0%] right-[0%]'><ModeToggle></ModeToggle></div> 
            </div>
        </>
    )
}