import {create} from 'zustand';

interface ResponseState {
    isResponse:string,
    setisResponse: (network:string) => void
    }

export const useResponse = create<ResponseState>((set) => ({
    isResponse: "",
    setisResponse: (isResponse:string) => set({isResponse})
}));