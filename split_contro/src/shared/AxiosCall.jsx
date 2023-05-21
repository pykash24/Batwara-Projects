import axios from 'axios';
import {BaseUrl} from '../shared/ConfigUrl'

export default function fetchApi(endUrl, payload={},token='') {
  console.log('token--',token);
  const headers = {
    'Content-Type': 'application/json',
  };
  if(token){
    headers={...headers,
      "Authorization":`Bearer ${token}`}
  }
  const completeUrl = BaseUrl + endUrl
  console.log("completeUrl:",completeUrl)
  try {
    return axios.post(completeUrl, payload, {headers: headers});
  } catch (err) {
    console.warn('Axios catch error:', err);
  }
}
