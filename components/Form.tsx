"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import SelectNetwok from "./Select"
import { useNetwork } from "@/hooks/useNetwork"
import { useResponse } from "@/hooks/useResponse";

import axios from "axios"
const formSchema = z.object({
  contractAddress: z.string().refine(value => value.length === 42, "Must be a valid contract address"),
  tokenId: z.string().refine(value => value.length > 0, "Must be a valid token ID"),
  network: z.enum(["Network.ETH_MAINNET", "Network.MATIC_MAINNET", "Network.OPT_MAINNET", "ethereum"]),
});

export default function NFTForm() {
  const { isNetwork } = useNetwork();
  const { setisResponse } = useResponse();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contractAddress: "",
      tokenId: "",
      network: "ethereum",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
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
            })
            .catch(error => {
                console.error('Error fetching metadata:', error);
            });
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
                <FormLabel>Network</FormLabel>
                <FormControl>
                  <SelectNetwok />
                </FormControl>
                <FormDescription>
                  This is your unique token ID.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}
