import { useResponse } from "@/hooks/useResponse";

export default function Home(){
    const { isResponse :data} = useResponse();
    console.log(data);
    return(
        <>
        
        </>
    )
    
}

