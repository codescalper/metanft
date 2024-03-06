"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import SelectNetwok from "./Select"
import { useNetwork } from "@/hooks/useNetwork"
import { useResponse } from "@/hooks/useResponse";

import { useState } from "react"
const formSchema = z.object({
  contractAddress: z.string().refine(value => value.length === 42, "Must be a valid contract address"),
  tokenId: z.string().refine(value => value.length > 0, "Must be a valid token ID"),
  network: z.enum(["Network.ETH_MAINNET", "Network.MATIC_MAINNET", "Network.OPT_MAINNET", "ethereum"]),
});

export default function NFTForm() {
  const router = useRouter();
  const { isNetwork } = useNetwork();
  const [isLoading, setIsLoading] = useState(false);
  const { setisResponse } = useResponse();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contractAddress: "",
      tokenId: "",
      network: "ethereum",
    },
  })

  const Spinner = () => (
    <svg
      className="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4c-2.19 0-4.17-.896-5.657-2.343z"
      ></path>
    </svg>
  );

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true); 
    if (isNetwork === "Network.ETH_MAINNET" || isNetwork === "Network.MATIC_MAINNET" || isNetwork === "Network.OPT_MAINNET") {
        values.network = isNetwork;
        


        const requestData = {
            contractAddress: values.contractAddress,
            tokenId: values.tokenId,
            network: values.network
        };

        console.log(requestData);

        fetch('https://assignment1-we2b.onrender.com/getNFTMetadata', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
            .then(response => {
                if (!response.ok) {
                  
                  throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setisResponse(data);
                router.push('/metanft')
            })
            .catch(error => {
                console.error('Error fetching metadata:', error);
            }).finally(() => {
              setIsLoading(false); 
          });;
    }
}


  return (
    <div className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8  max-w-full ">
          <FormField
            control={form.control}
            name="contractAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contract Address</FormLabel>
                <FormControl>
                  <Input className="dark:bg-[primary]" placeholder="Paste NFT contract address" {...field} />
                </FormControl>
                <FormDescription>
                  This is the contract address of the NFT.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tokenId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Token ID</FormLabel>
                <FormControl>
                  <Input className="dark:bg-[primary]" placeholder="Enter Token ID" {...field} />
                </FormControl>
                <FormDescription>
                  This is your unique token ID.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="network"
            render={({ field }) => (
              <FormItem>

                <FormLabel className="text-center ">Network</FormLabel>
                <FormControl>
                  <SelectNetwok />
                </FormControl>
                <FormDescription>
                 Select the network of the NFT.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center ">
          <Button className="max-w-5xl lg:w-[360px] text-center" type="submit" disabled={isLoading}>
            {isLoading ? <> Fetching <Spinner /> </> : "Fetch metadata"}
          </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
