import { Input } from "@chakra-ui/react"
import { EMAIL_MAX_LENGTH, EMAIL_MIN_LENGTH, EMAIL_PASSWORD_MAX_LENGTH, EMAIL_PASSWORD_MIN_LENGTH } from "api/contants"
import { Field } from "formik"
import { SettingsSection } from "./SettingsSection"


export const MailSettingsSection = ({sectionName}) => {
    const sectionInputs = {
        "Email username":
            <Field
                as={Input}
                id="email-username-input"
                name="email"
                type="email"
                variant="outline"
                minLength={EMAIL_MIN_LENGTH}
                maxLength={EMAIL_MAX_LENGTH}
            />,
        "Email password":
            <Field
                as={Input}
                id="email-password-input"
                name="password"
                type="password"
                variant="outline"
                minLength={EMAIL_PASSWORD_MIN_LENGTH}
                maxLength={EMAIL_PASSWORD_MAX_LENGTH}
            />
    }
    return (
        <SettingsSection
            name={sectionName}
            onSubmit={(values, { }) => console.log(values)}
            initialValues={{ "email": "", password: "" }}
            labelsToFields={sectionInputs}
        />
    )
}