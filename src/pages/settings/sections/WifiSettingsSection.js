import { Input } from "@chakra-ui/react"
import { WIFI_PASSWORD_MIN_LENGTH, WIFI_SSID_MIN_LENGTH } from "api/constants"
import { APP_SETTINGS_TYPE, useGetAppSettingsQuery, useUpdateAppSettingsMutation } from "api/services/appSettingsApi"
import { Field } from "formik"
import { SettingsSection } from "./SettingsSection"


export const WifiSettingsSection = ({ sectionName }) => {
    const { data: wifiSettings, isLoading } = useGetAppSettingsQuery();
    const [updateAppSettings] = useUpdateAppSettingsMutation();
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
    const initialValues = {
        ssid: wifiSettings?.ssid,
        password: wifiSettings?.password
    }
    return (
        isLoading
            ? <></>
            : <SettingsSection
                name={sectionName}
                onSubmit={(values) => (updateAppSettings({
                    ssid: values.ssid.split(""),
                    password: values.password.split(""),
                    type: APP_SETTINGS_TYPE
                }))}
                initialValues={initialValues}
                labelsToFields={sectionInputs}
            />
    )
}