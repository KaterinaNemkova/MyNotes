import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";

const EditNoteModal=({isOpen,onClose,note,onSave})=>{
    const [title,setTitle]=useState(note.title)
    const [description,setDescription]=useState(note.description);

    const handleSave=()=>{
        onSave({...note,title,description});
    };
    
    return(
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
        <ModalHeader>Редактировать заметку</ModalHeader>
        <ModalBody>
            <Input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Введите заголовок">
            </Input>
            <Textarea 
             value={description}
             onChange={(e)=>setDescription(e.target.value)}
             placeholder="Введите описание">
            </Textarea>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={handleSave}>
            Сохранить
          </Button>
          <Button onClick={onClose}>Отмена</Button>
        </ModalFooter>
        </ModalContent>
    </Modal>
    );
};

export default EditNoteModal;







    