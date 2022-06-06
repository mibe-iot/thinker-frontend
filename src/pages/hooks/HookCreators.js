import { Button, Center, FormLabel, Heading, Input, Stack, useToast } from "@chakra-ui/react";
import { useCreateEmailHookMutation } from "api/services/hooksApi";
import { SpinnerContainer } from "components/spinner/SpinnerContainer";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { isError } from "react-query";
import { coalesceOrEmpty } from "utils/utils";




export const EmailHookCreator = ({ onClose }) => {
    const [isSaving, setSaving] = useState(false);
    const [createHook, { isLoading, isSuccess }] = useCreateEmailHookMutation();
    const toast = useToast();
    const toastId = "save-new-hook-error";

    useEffect(() => {
        if (isSaving && !isLoading) {
            if (isSuccess) {
                setSaving(false)
                onClose();
            } else if (isError) {
                setSaving(false)
                !toast.isActive(toastId) && toast({
                    position: "top",
                    title: "An error occurred",
                    description: "Something bad happened while trying to save hook. Please, try again",
                    isClosable: true,
                    status: "error"
                })
            }
        }
    }, [isLoading, isSaving, isSuccess, onClose, toast])

    if (isLoading) {
        return <SpinnerContainer isLoading={true}></SpinnerContainer>
    }

    return (
        <Formik
            initialValues={{}}
            onSubmit={(values) => {
                console.log({
                    name: values.name,
                    description: coalesceOrEmpty(values.description, ""),
                    emailAddress: { address: values.email }
                })
                console.log({
                    "name": "string",
                    "description": "string",
                    "emailAddress": {
                        "address": "ilboogl@gmail.com"
                    },
                    "type": "string"
                })
                createHook({
                    name: values.name,
                    description: coalesceOrEmpty(values.description, ""),
                    emailAddress: { address: values.email }
                })
                setSaving(true)
            }}
        >
            {({ handleSubmit, errors, touched }) => (
                <Form onSubmit={handleSubmit}>
                    <Stack mb="2rem" direction="column" gap={1}>
                        <Heading mb={4}>Send email hook</Heading>
                        <FormLabel htmlFor="name">Hook name</FormLabel>
                        <Field
                            as={Input}
                            id="name"
                            name="name"
                            type="string"
                            variant="outline"
                            isRequired
                            placeholder="Hook name to identify it"
                        />
                        <FormLabel htmlFor="description">Hook description</FormLabel>
                        <Field
                            as={Input}
                            id="description"
                            name="description"
                            type="string"
                            variant="outline"
                            placeholder="Some description here"
                        />
                        <FormLabel htmlFor="description">Email address for letters with reports</FormLabel>
                        <Field
                            as={Input}
                            id="email"
                            name="email"
                            type="email"
                            variant="outline"
                            isRequired
                            placeholder="email@gmail.com"
                        />

                    </Stack>
                    <Center><Button px={36} type="submit" >Save</Button></Center>
                </Form>
            )}
        </Formik>
    )
}