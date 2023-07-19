"use client";
import { shortenAddress } from "@usedapp/core";
import { useWalletConnect } from '@/hooks/useConnectWallet'


export const Wallet = () => {
    const { account, deactivate, activateBrowserWallet } = useWalletConnect();

    return (
        <div className="text-white">
            {account ? (
                <>
                    {shortenAddress(account)}{" "}
                    <button onClick={deactivate} style={{ textDecoration: "underline" }}>
                        Disconnect
                    </button>
                </>
            ) : (
                <button
                    onClick={activateBrowserWallet}
                    className="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                    Connect Metamask
                </button>
            )}
        </div>
    );
};
