import { Input } from "@chakra-ui/react"
import { EMAIL_MAX_LENGTH, EMAIL_MIN_LENGTH, EMAIL_PASSWORD_MAX_LENGTH, EMAIL_PASSWORD_MIN_LENGTH } from "api/constants"
import { MAIL_SETTINGS_TYPE, useGetSettingsByTypeQuery, useUpdateMailSettingsMutation } from "api/services/appSettingsApi"
import { SpinnerContainer } from "components/spinner/SpinnerContainer"
import { Field } from "formik"
import { SettingsSection } from "./SettingsSection"


export const MailSettingsSection = ({ sectionName }) => {
    const { data: mailSettings, isLoading } = useGetSettingsByTypeQuery({ type: MAIL_SETTINGS_TYPE });
    const [updateMailSettings] = useUpdateMailSettingsMutation();
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
    const initialValues = {
        email: mailSettings?.mailUsername,
        password: mailSettings?.mailPassword
    }
    return (
        <SpinnerContainer isLoading={isLoading}>
            <SettingsSection
                name={sectionName}
                onSubmit={(values) => (updateMailSettings({
                    mailUsername: values.email.split(""),
                    mailPassword: values.password.split(""),
                    type: MAIL_SETTINGS_TYPE
                }))}
                initialValues={initialValues}
                labelsToFields={sectionInputs}
            />
        </SpinnerContainer>
    )
}