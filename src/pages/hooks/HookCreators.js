import { HOOK_TYPE_SEND_EMAIL } from "api/contants";
import { useCreateEmailHookMutation } from "api/services/hooksApi";

const { HStack, Stack, Input, Heading, FormLabel, Button, Center } = require("@chakra-ui/react");
const { Formik, Form, Field } = require("formik")



export const EmailHookCreator = ({ onClose }) => {
    const [createHook, { isLoading }] = useCreateEmailHookMutation();
    return (
        <Formik
            initialValues={{}}
            onSubmit={(values, { setSubmitting }) => {
                createHook({
                    name: values.name,
                    description: values.description,
                    emailAddress: { address: values.email },
                    type: HOOK_TYPE_SEND_EMAIL
                })
                setSubmitting(false)
                onClose();
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
                            isRequired
                            placeholder="Some description here"
                        />
                        <FormLabel htmlFor="description">Email address for letters with reports</FormLabel>
                        <Field
                            as={Input}
                            id="email"
                            name="email"
                            type="string"
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