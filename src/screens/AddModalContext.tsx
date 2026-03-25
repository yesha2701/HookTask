import { createContext, Dispatch, SetStateAction } from "react";

interface ModalContextType {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

export const ModalContext = createContext<ModalContextType>({
  isModalOpen: false,
  setIsModalOpen: () => {},
});