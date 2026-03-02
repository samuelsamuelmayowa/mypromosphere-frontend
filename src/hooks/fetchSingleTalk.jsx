// import { useQuery } from '@tanstack/react-query'
// import axios from "axios";
// const api_fetch_talk = import.meta.env.VITE_TALK;


// const FetchSingleTalk = (id, 	description	) => {
//   return useQuery({
//     queryKey: ["singlepromotalk", id, 	description	],
//     const encodedDescription = encodeURIComponent(queryKey[2])
//     queryFn: ({ queryKey }) => axios.get(`${api_fetch_talk}/${queryKey[1]}/${queryKey[2]}`),
//     enabled: !!id && !!description,
//   })
// }

// export default FetchSingleTalk
import { useQuery } from '@tanstack/react-query';
import axios from "axios";

const api_fetch_talk = import.meta.env.VITE_TALK;

const FetchSingleTalk = (id, description) => {
  let d;
  return useQuery({
    queryKey: ["singlepromotalk", id, description],
    queryFn: ({ queryKey }) => {
      const encodedDescription = encodeURIComponent(queryKey[2]);
      return axios.get(`${api_fetch_talk}/${queryKey[1]}/${encodedDescription}`);
    },
    enabled: !!id && !!description,
  });
};

export default FetchSingleTalk;
