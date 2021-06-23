// import { useState } from 'react';
// import axios from 'axios';

// const initialRequestInfo = {
//   error: null,
//   data: null,
//   loading: false,
// }

// export default function useApi(config) {

//   const [requestInfo, setRequestInfo] = useState(initialRequestInfo);
    

//   async function call() {
//     setRequestInfo({
//       ...initialRequestInfo,
//       loading: true,
//     })
//     const response = await axios(config);

//     setRequestInfo({
//       ...initialRequestInfo,
//       data: response.data,
//     }) 

//     if (config.onCompleted) {
//       config.onCompleted(response);
//     }
//   }

//   return [
//     call,
//     requestInfo
//   ]
// }