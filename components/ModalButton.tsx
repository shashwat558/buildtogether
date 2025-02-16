"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import ProjectForm from "./ProjectForm";
import { Button } from "./ui/button";

const ModalButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button variant="outline" onClick={() => setIsModalOpen(true)}>New Project</Button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ProjectForm />
      </Modal>
    </>
  );
};

export default ModalButton;
