import { Button, Flex, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { EmailHookCreator } from "./HookCreators";



export const CreateHookModal = ({ isOpen, onOpen, onClose: closeModal }) => {
    const [hookType, setHookType] = useState(undefined);
    const initialRef = useRef();
    if (!isOpen) {
        return <></>
    }

    const onClose = () => {
        closeModal();
    }
    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                initialFocusRef={initialRef}
                size="4xl"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader me={{ base: 6, sm: 0 }}>
                            <Heading mb={4}>Create new hook: </Heading>
                            <Select defaultValue={hookType} mb={8} placeholder="Select hook type" onChange={e => setHookType(e.target.value)}>
                                <option value="sendEmail">Send-email hook</option>
                            </Select>
                    </ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        {
                            hookType &&
                                hookType === "sendEmail" ? <EmailHookCreator onClose={onClose} />
                                : <></>
                        }
                    </ModalBody>
                    <ModalFooter>
                        <Button ref={initialRef} variant="outline" onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
