import { useToast } from "@chakra-ui/react"
import { useEffect } from "react"


export const useErrorToast = (errorState) => {
    const toast = useToast();
    const id = "show-error-toast"
    useEffect(() => {
        if (errorState && !toast.isActive(id)) {
            toast({
                id,
                title: "boo"
            })
        }
    }, [errorState, toast])
}