import Image from "next/image";
import React, { useEffect } from "react";
import { useCompletion } from "ai/react";
import { useGetCharacter } from "@/hooks/useGetCharacter";
import { useContractFunction } from "@/hooks/useContractFunction";
import { useGetEmotionByText, emotions } from "@/hooks/useGetEmotionByText";

function swapKeysAndValues(obj: any) {
  const swapped = {};
  for (const key in obj) {
    //@ts-ignore
    swapped[obj[key]] = key;
  }
  return swapped;
}

function cloneEventObj(eventObj: any) {
  const overrideObj = {};

  function EventCloneFactory(overProps: any) {
    for (var x in overProps) {
      //@ts-ignore
      this[x] = overProps[x];
    }
  }

  EventCloneFactory.prototype = eventObj;
  //@ts-ignore
  return new EventCloneFactory(overrideObj);
}

let tempEvent: any = null;

import { contract } from "@/utils/constants";

const example = {
  name: "Alice",
  title: "I love talking about books",
  imageUrl: "/alex.png",
  llm: "chatgpt",
  phone: "OPTIONAL_COMPANION_PHONE_NUMBER",
};

export const Chatbox = () => {
  const { emotion } = useGetCharacter();

  let {
    completion,
    input,
    isLoading,
    handleInputChange,
    handleSubmit,
    stop,
    setInput,
    setCompletion,
  } = useCompletion({
    api: "/api/" + example.llm,
    headers: { name: example.name },
  });

  const { emotionByText, fetchingEmotion } = useGetEmotionByText(
    completion.replace("Alice: ", "")
  );
  console.log("v1");

  const emotionNumber =
    !fetchingEmotion && emotionByText ? emotionByText : emotion;

  useEffect(() => {
    if (completion) {
      setInput("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completion]);

  useEffect(() => {
    if (input?.startsWith("(Alice") && tempEvent) {
      handleSubmit(tempEvent);
      setInput(input?.split(") ")?.[1]);
    }
  }, [input]);

  const { send, mining } = useContractFunction({
    args: [
      contract,
      "updateEmotion",
      {
        transactionName: "wrap",
      },
    ],
    onSuccess() {
      window.alert("Successfully changed.");
    },
    onError() {
      window.alert("Transaction failed");
    },
  });

  return (
    <div
      style={{
        marginTop: "100px",
        width: "400px",
        height: "auto",
        border: "1px black solid",
        borderRadius: "8px",
        overflow: "hidden",
        backgroundColor: "white",
        position: "relative",
      }}
    >
      {emotion && (
        <div className={completion && !fetchingEmotion ? "up-and-down" : ""}>
          <Image
            width={0}
            height={0}
            sizes="100vw"
            className={"mx-auto flex-shrink-0"}
            style={{ width: "400px" }}
            src={
              "/emotions/waifu_emotion_" + (emotionByText || emotion) + ".png"
            }
            alt=""
          />
        </div>
      )}

      {completion && !fetchingEmotion && (
        <div
          className="chat-bubble"
          style={{
            fontSize: "14px",
            position: "absolute",
            padding: "20px",
            top: "230px",
            left: "100px",
            maxWidth: "280px",
            border: "1px black solid",
            borderRadius: "10px",
            backgroundColor: "white",
            zIndex: 2,
            color: "black",
          }}
        >
          {completion}
        </div>
      )}

      <form
        onSubmit={async (event) => {
          tempEvent = cloneEventObj(event);

          if (emotionByText) {
            handleSubmit(event);
          } else {
            event.preventDefault();
            const chatText = !emotionByText
              ? `(Alice's current emotion is ${
                  //@ts-ignore
                  swapKeysAndValues(emotions)[emotionNumber]
                }) ` + input
              : input;
            setInput(chatText);
          }
        }}
        style={{
          display: "block",
          width: "100%",
          margin: "20px auto 0",
        }}
      >
        <input
          className="chat-input"
          value={input}
          onChange={handleInputChange}
          disabled={isLoading && !completion}
          placeholder="Talk about anything..."
          style={{
            display: "block",
            width: "90%",
            border: "1px black solid",
            borderRadius: "15px",
            margin: "auto",
            padding: "10px",
            color: "black",
          }}
        />
      </form>
      <button
        onClick={() => send(1, emotionNumber)}
        disabled={mining}
        style={{
          margin: "10px 20px",
          textDecoration: "underline",
          fontSize: "12px",
          float: "right",
          color: "black",
        }}
      >
        {mining ? "Saving..." : "Save this facial expression"}
      </button>
    </div>
  );
};
