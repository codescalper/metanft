"use client"
import { useResponse } from "@/hooks/useResponse";

export default function Home(){
    const { isResponse :data} = useResponse();
    
    console.log(data);
    return(
        <>
                <h1 className='selection:bg-yellow-300 text-3xl font-bold tracking-tighter mt-10 sm:text-3xl xl:text-7xl  space-y-4 text-center'> <span className='text-gradient selection:bg-yellow-300 selection:text-black'>Metadata</span> of the NFT </h1>
                <div className="xl:w-1/2 mx-auto relative w-3/4">

                </div>

        </>
    )
    
}

