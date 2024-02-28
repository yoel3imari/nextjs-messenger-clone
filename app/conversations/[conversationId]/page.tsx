import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import EmptyState from "@/app/components/EmptyState";
import ConversationHeader from "./components/ConversationHeader";
import ConversationBody from "./components/ConversationBody";
import MessageForm from "./components/MessageForm";

interface IParams {
  conversationId: string;
}

const ConversationId = async ({ params }: { params: IParams }) => {

  const conversation = await getConversationById(params.conversationId)

  if(!conversation) {
    return (
      <div className="
        lg:pl-80
        h-full
      ">
        <div className="
          h-full
          flex
          flex-col
        ">
          <EmptyState />
        </div>
      </div>
    )
  }

  const messages = await getMessages(params.conversationId)


  return (
    <div className="
      lg:pl-72
      h-full
    ">
      <div className="
        h-full
        flex
        flex-col
      ">
        <ConversationHeader conversation={conversation} />
        <ConversationBody initMessages={messages} />
        <MessageForm />
      </div>
    </div>
  );
};

export default ConversationId;
