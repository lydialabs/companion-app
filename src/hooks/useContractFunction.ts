import { useContractFunction as useContractFunctionUseDapp } from '@usedapp/core'
import { useEffect, useState } from 'react'

export function useContractFunction({ args = [], onSuccess, onError }: any) {
    // @ts-ignore
    const { send, state } = useContractFunctionUseDapp.apply(this, args)
    const [mining, setMining] = useState<boolean>(false)
    const [success, setIsSuccess] = useState<boolean>(false)

    useEffect(() => {
        switch (state?.status) {
            case 'Exception':
                if (state?.errorMessage === 'user rejected transaction') {
                    window.alert('Transaction rejected')
                } else {
                    window.alert(state?.errorMessage)
                }
                setMining(false)
                break
            case 'PendingSignature':
            case 'Mining':
                setMining(true)
                break
            case 'Success':
                setMining(false)
                setIsSuccess(true)
                if (onSuccess) onSuccess()
                break
            default:
                if (state?.status !== 'None') {
                    setMining(false)
                    if (onError) onError()
                }
                break
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state?.status])

    return { send, mining, success }
}
