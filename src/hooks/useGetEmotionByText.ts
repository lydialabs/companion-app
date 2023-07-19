import { useEffect, useState } from "react"

export const emotions = { joy: 1, sadness: 2, love: 3, surprise: 4, fear: 5, anger: 6 }

export const useGetEmotionByText = (text: any) => {
    const [emotionByText, setEmotionByText] = useState(null)
    const [fetchingEmotion, setFetchingEmotion] = useState(false)

    useEffect(() => {
        if (text) {
            setFetchingEmotion(true)
            fetch(
                "https://api-inference.huggingface.co/models/bhadresh-savani/distilbert-base-uncased-emotion",
                {
                    headers: { Authorization: "Bearer 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" },
                    method: "POST",
                    body: JSON.stringify(text),
                }
            ).then(response => response.json()).then(data => {
                const currentEmotion = data?.[0]?.[0]?.label
                // @ts-ignore
                if (currentEmotion && emotions[currentEmotion]) {
                    // @ts-ignore
                    setEmotionByText(emotions[currentEmotion])
                }
                setFetchingEmotion(false)
            }).catch(err => {
                setFetchingEmotion(false)

            })
        }
    }, [text])

    return { emotionByText, fetchingEmotion }
}