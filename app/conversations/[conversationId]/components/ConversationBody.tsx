"use client";

import useConversation from "@/app/hooks/useConversation";
import { FullMessageType } from "@/app/types";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface ConversationBodyProps {
  initMessages: FullMessageType[];
}

const ConversationBody: React.FC<ConversationBodyProps> = ({
  initMessages,
}) => {

  const [messages, setMessages] = useState(initMessages)
  const bottomRef = useRef<HTMLDivElement>(null)
  const {conversationId} = useConversation()

  useEffect(() => {
    
    axios.post(`/api/conversations/${conversationId}/seen`)
  
  }, [conversationId])
  

  return (
    <div
      className="
        flex-1
        overflow-y-auto
      "
    >
      {
        messages.map((m, i) => (
          <MessageBox
            isLast={i === messages.length - 1}
            key={m.id}
            data={m}
          />
        ))
      }
      <div className="pt-24" ref={bottomRef}></div>
    </div>
  );
};

export default ConversationBody;
