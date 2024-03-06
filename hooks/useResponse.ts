import { create } from 'zustand';

interface ResponseState {
  isResponse: {
    imageUrl?: string;
    name?: string;
    description?: string;
    symbol?: string;
    totalSupply?: number;
    tokenType?: string;
    address?: string;
    contractDeployer?: string;
    twitterUsername?: string;
    discordUrl?: string;
  };
  setisResponse: (network: object) => void;
}

export const useResponse = create<ResponseState>((set) => ({
  isResponse: {
    imageUrl: '',
    name: '',
    description: '',
    symbol: '',
    totalSupply: 0,
    tokenType: '',
    address: '',
    contractDeployer: '',
    twitterUsername: '',
    discordUrl: '',
  },
  setisResponse: (isResponse: object) => set({ isResponse }),
}));
