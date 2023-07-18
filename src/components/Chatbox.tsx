
import Image from "next/image"; import { useWalletConnect } from '@/hooks/useConnectWallet'
import { useGetHairStyle } from '@/hooks/useGetHairStyle'
import { useContractFunction } from '@/hooks/useContractFunction'
import { contract } from '@/utils/constants'


function incrementNumber(initial: number, max = 7) {
    if (initial === max) {
        return 1
    } else {
        return initial + 1
    }
}

export const Chatbox = () => {
    const { account, activateBrowserWallet } = useWalletConnect()
    const { hairstyle } = useGetHairStyle()

    const { send } = useContractFunction({
        args: [
            contract,
            'getHaircut',
            {
                transactionName: 'wrap',
            },
        ],
        onSuccess() {
            window.alert('Successfully approved.')
        },
        onError() {
            window.alert('Approve transaction failed')
        },
    })

    return <div style={{ marginTop: '200px' }}>
        <button onClick={() => activateBrowserWallet()}>Connect wallet</button>
        <br />
        {account}
        <br />
        <button onClick={() => send(1, incrementNumber(hairstyle))}>Change hair style</button>


        {hairstyle && <Image
            width={0}
            height={0}
            sizes="100vw"
            className="mx-auto h-60 w-60 flex-shrink-0"
            src={'/hairstyles/' + hairstyle + '.png'}
            alt=""
        />}

    </div>
}