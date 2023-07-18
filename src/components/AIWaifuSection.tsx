"use client";
import { DAppProvider, Goerli } from '@usedapp/core'
import Navbar from "@/components/Navbar";
import { Chatbox } from './Chatbox'

const config = {
    readOnlyChainId: Goerli.chainId,
    readOnlyUrls: {
        [Goerli.chainId]: 'https://goerli.infura.io/v3/3f0c8a84d8154101b2194cce04ece15e',
    },
    networks: [Goerli],
    notifications: {
        checkInterval: 500,
        expirationPeriod: 5000,
    },
    autoConnect: true,
    gasLimitBufferPercentage: 10,
}

interface AIWaifuSectionProps {
    userId: any
}

export const AIWaifuSection = ({ userId }: AIWaifuSectionProps) => {
    return <DAppProvider config={config}>
        <Navbar userId={userId} />
        <Chatbox />
    </DAppProvider>
}