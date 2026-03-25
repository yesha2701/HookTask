import React, { useState } from "react";
import ToDo from "./ToDo";
import { ModalContext } from "./AddModalContext";

const ToDoScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <ModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
      <ToDo />
    </ModalContext.Provider>
  );
};

export default ToDoScreen;
