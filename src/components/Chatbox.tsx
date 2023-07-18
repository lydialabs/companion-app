
import Image from "next/image";
import { useGetHairStyle } from '@/hooks/useGetHairStyle'
import { useContractFunction } from '@/hooks/useContractFunction'
import { contract } from '@/utils/constants'


function incrementNumber(initial: number, max = 6) {
    if (initial === max) {
        return 1
    } else {
        return initial + 1
    }
}

export const Chatbox = () => {
    const { emotion } = useGetHairStyle()

    const { send } = useContractFunction({
        args: [
            contract,
            'updateEmotion',
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

    return <div style={{ marginTop: '100px', width: '400px', height: 'auto', border: '1px black solid', borderRadius: '8px', overflow: 'hidden', backgroundColor: 'white' }}>
        {emotion && <Image
            width={0}
            height={0}
            sizes="100vw"
            className="mx-auto flex-shrink-0"
            style={{ width: '400px' }}
            src={'/emotions/waifu_emotion_' + emotion + '.png'}
            alt=""

        />}

        <input type="text" placeholder="Talk about anything..." style={{ display: 'block', width: '90%', border: '1px black solid', borderRadius: '15px', margin: '20px auto 0' }} />
        <button onClick={() => send(1, incrementNumber(emotion))} style={{ margin: '10px 20px', textDecoration: 'underline', fontSize: '12px', float: 'right' }}>Trigger facial expressions change</button>

    </div>
}