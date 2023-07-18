import { useCall } from '@usedapp/core'
import { contract } from '@/utils/constants'

export const useGetHairStyle = () => {
    const { value, error } =
        useCall({
            contract: contract,
            method: 'waifus',
            args: [1],
        }) ?? {}
    if (error) {
        console.error(error.message)
    }

    return { name: value?.[0], emotion: value?.[2], hairstyle: value?.[1] }

}