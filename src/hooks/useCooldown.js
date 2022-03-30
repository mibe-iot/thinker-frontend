import { useEffect, useState } from "react"


export const useCooldown = (cooldownTime = 500) => {
    const [isCooledDown, setCooledDown] = useState(false);

    useEffect(() => {
        let cooldownTimer;
        if(!isCooledDown) {
            cooldownTimer = window.setTimeout(
                () => setCooledDown(true),
                cooldownTime
            )
        }
        return () => window.clearTimeout(cooldownTimer);
    }, [isCooledDown, cooldownTime])
    return [isCooledDown, () => setCooledDown(false)]
}