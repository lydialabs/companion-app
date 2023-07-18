"use client";
import { DAppProvider, Goerli } from '@usedapp/core'

const config = {
    readOnlyChainId: Goerli.chainId,
    readOnlyUrls: {
        [Goerli.chainId]: 'https://goerli.infura.io/v3/3f0c8a84d8154101b2194cce04ece15e',
    },
}

export const AIWaifuSection = () => {

    return <DAppProvider config={config}>
        Peter
    </DAppProvider>
}