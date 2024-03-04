import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNetwork } from "@/hooks/useNetwork";
import { FaEthereum } from "react-icons/fa";
import { TbCurrencySolana } from "react-icons/tb";

const SelectNetwok = () => {
  const { isNetwork, setIsNetwork } = useNetwork();

  const handleNetworkChange = (value: string) => {
    setIsNetwork(value);
  };

  return (
    <div>
      <Select onValueChange={handleNetworkChange}>
        <SelectTrigger className="max-w-5xl lg:w-full flex items-center "> 
          <SelectValue placeholder="Ethereum" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Network.ETH_MAINNET">
          <span className="flex items-center">
              Ethereum <FaEthereum className="ml-[0.5rem]" />
              </span>
          </SelectItem>
          <SelectItem value="MATIC_MAINNET">Polygon</SelectItem>
          <SelectItem value="Network.OPT_MAINNET">
          <span className="flex items-center">
            Solana <TbCurrencySolana className="ml-[0.5rem]"   />
            </span>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectNetwok;
