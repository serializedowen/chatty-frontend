import { useState, useEffect } from "react";
import axios from "../config/axios";

type Props = {
  roomId: string;
  component: (message: any[]) => JSX.Element;
};

export default function MessageCache(props: Props) {
  const [cache, setcache] = useState({});

  useEffect(() => {
    if (props.roomId) {
      // if (!cache[props.roomId]) {
      axios.get(`/api/room/${props.roomId}/messages`).then(res => {
        setcache(cache => ({ ...cache, [props.roomId]: res.data.messages }));
      });
      // }
    }

    //   return () => {
    //     cleanup;
    //   };
  }, [props.roomId]);

  return props.component(cache[props.roomId] || []);
}
