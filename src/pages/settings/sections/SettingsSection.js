import { Box, Button, Flex, FormLabel, Grid, GridItem, Heading, Link } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";


export const SettingsSection = ({ name, initialValues, onSubmit, labelsToFields }) => {
    const anchor = name.replace(" ", "_");
    return (
        <Box direction="column" w="100%" my="2rem" pe="4rem">
            <Flex role="group" pb="1.5rem">
                <Heading id={anchor} as="h3" me={2} fontSize="3xl" alignSelf="start">{name}</Heading>
                <Link opacity={0} _groupHover={{ opacity: 1 }} fontSize="3xl" href={"#" + anchor}>#</Link>
            </Flex>
            <Formik w="100%" initialValues={initialValues} onSubmit={onSubmit}>
                {({ handleSubmit, values, errors }) => (
                    <Form width="100%" onSubmit={handleSubmit}>
                        <Grid alignItems="center" width="100%" templateColumns="repeat(10, 1fr)" gap={8}>
                            {
                                Object.entries(labelsToFields).map(([label, field], i) => (
                                    <React.Fragment key={i}>
                                        <GridItem key={field.props.id + "_lc"} colSpan={3}>{createLabel(field.props.id, label)}</GridItem>
                                        <GridItem key={field.props.id + "_ic"} colSpan={7}>{field}</GridItem>
                                    </React.Fragment>
                                ))
                            }
                        </Grid>
                        <Flex mt={12} justifyContent="end"><Button px="3rem" type="submit">Save</Button></Flex>
                    </Form>
                )
                }
            </Formik >
        </Box>)
}

export const createLabel = (forId, value) => <FormLabel m={0} textAlign="end" htmlFor={forId}>{value}</FormLabel>