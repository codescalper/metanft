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
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Network.Ethereum" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Network.ETH_MAINNET">
            Ethereum <FaEthereum />
          </SelectItem>
          <SelectItem value="MATIC_MAINNET">Polygon</SelectItem>
          <SelectItem value="Network.OPT_MAINNET">
            Solana <TbCurrencySolana />
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectNetwok;
