import { useEffect, useState } from "react"
import useActiveList from "./useActiveList"
import { Channel, Members } from "pusher-js"
import { pusherClient } from "../libs/pusher"

const useActiveChannel = () => {
  const {set, add, remove} = useActiveList()
  const [active, setActive] = useState<Channel | null>(null)

  useEffect(() => {
    let channel = active
    if(!channel) {
      channel = pusherClient.subscribe('presence-user')
      setActive(channel)
    }

    channel.bind('pusher:subscription_succeeded', (members: Members) => {
      const initMembers: string[] = []
      members.each((m: Record<string, any>) => initMembers.push(m.id));
      set(initMembers)
    })

    channel.bind('pusher:member_added', (member:Record<string, any>) => add(member.id))
    channel.bind('pusher:member_removed', (member:Record<string, any>) => remove(member.id))

    return () => {
      if(active) {
        pusherClient.unsubscribe('presence-user')
        setActive(null)
      }
    }

  }, [active, set, add, remove])

}

export default useActiveChannel