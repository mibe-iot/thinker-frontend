import { Input } from "@chakra-ui/react"
import { WIFI_PASSWORD_MIN_LENGTH, WIFI_SSID_MIN_LENGTH } from "api/contants"
import { Field } from "formik"
import { SettingsSection } from "./SettingsSection"


export const WifiSettingsSection = ({sectionName}) => {
    const sectionInputs = {
        "Wi-Fi network name":
            <Field
                as={Input}
                id="wifi-ssid-input"
                name="ssid"
                type="string"
                variant="outline"
                minLength={WIFI_SSID_MIN_LENGTH}
            />,
        "Wi-Fi password":
            <Field
                as={Input}
                id="wifi-password-input"
                name="password"
                type="password"
                variant="outline"
                minLength={WIFI_PASSWORD_MIN_LENGTH}
            />
    }
    return (
        <SettingsSection
            name={sectionName}
            onSubmit={(values, { }) => console.log(values)}
            initialValues={{ "ssid": "", password: "" }}
            labelsToFields={sectionInputs}
        />
    )
}