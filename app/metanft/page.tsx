"use client"
import { useResponse } from "@/hooks/useResponse";
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { BsTwitterX } from "react-icons/bs";
import { FaDiscord } from "react-icons/fa";
import { useEffect, useState } from "react";


  

export default function Home(){
    const { isResponse :data } = useResponse();
   
    const [serverName, setServerName] = useState("");

    useEffect(() => {
        if (data?.discordUrl) {
            const discordUrl = data.discordUrl;
            const inviteCode = discordUrl.split("/").pop();

            fetch(`https://discord.com/api/invites/${inviteCode}`)
                .then(response => response.json())
                .then(data => {
                    if (data.guild) {
                        setServerName(data.guild.name);
                    }
                })
                .catch(error => {
                    console.error('Error fetching server name:', error);
                });
        }
    }, [data]);

    console.log(data);
    return(
        <>
                <h1 className='selection:bg-yellow-300 text-3xl font-bold tracking-tighter mt-10 sm:text-3xl xl:text-7xl  space-y-4 text-center'> <span className='text-gradient selection:bg-yellow-300 selection:text-black'>Metadata</span> of the NFT </h1>
                <Card className="xl:w-1/2 mx-auto relative w-3/4">
                <div className="bg-card rounded-lg shadow-md p-6">
                    <img src={data.imageUrl} alt={data.name} className="w-full h-auto rounded-lg mb-4" />
                    <h2 className="text-2xl font-bold text-muted-foreground underline underline-offset-4 decoration-orange-800 mb-2">{data.name}</h2>
                    <p className="text-gray-200 mb-4">{data.description}</p>
                    <p className="text-gray-200 text-wrap mb-2"><span className="font-semibold text-muted-foreground underline underline-offset-4 decoration-orange-800 ">Symbol:</span> {data.symbol}</p>
                    <p className="text-gray-200 text-wrap mb-2"><span className="font-semibold text-muted-foreground underline underline-offset-4 decoration-orange-800">Total Supply:</span> {data.totalSupply}</p>
                    <p className="text-gray-200 text-wrap mb-2"><span className="font-semibold text-muted-foreground underline underline-offset-4 decoration-orange-800">Token Type:</span> {data.tokenType}</p>
                    <p className="text-gray-200 text-wrap mb-2"><span className="font-semibold text-muted-foreground underline underline-offset-4 decoration-orange-800">Contract Address:</span> {data.address}</p>
                    <p className="text-gray-200 text-wrap mb-2"><span className="font-semibold text-muted-foreground underline underline-offset-4 decoration-orange-800">Contract Deployer:</span> {data.contractDeployer}</p>
                    <p className="text-gray-200 text-wrap mb-2"><span className="font-semibold text-muted-foreground underline underline-offset-4 decoration-orange-800">Twitter Username:</span> <Badge variant="outline"><BsTwitterX className="mr-[0.5rem]" /> {data.twitterUsername} </Badge></p>
                    <p className=" text-wrap mb-2 font-semibold underline underline-offset-4 text-muted-foreground decoration-orange-800">Discord Server:{"  "}{"  "}<a href={data.discordUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline"><Badge variant="outline"> {"  "}<FaDiscord className="mr-[0.5rem]" />  {serverName} </Badge></a></p>
                </div>
            </Card>

        </>
    )
    
}

