import React, { useState, useEffect } from 'react';
import axios from '../config/axios';
export default function MessageCache(props) {
  const [cache, setcache] = useState({});

  useEffect(() => {
    if (props.roomId) {
      // if (!cache[props.roomId]) {
      axios.get(`/api/room/${props.roomId}/messages`).then(res => {
        setcache({ ...cache, [props.roomId]: res.data.messages });
      });
      // }
    }

    //   return () => {
    //     cleanup;
    //   };
  }, [props.roomId]);

  return props.component(cache[props.roomId] || []);
}
