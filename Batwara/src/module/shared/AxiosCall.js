import axios from 'axios';
import {BaseUrl} from '../shared/ConfigUrl'

export default function fetchApi(endUrl, payload={}) {
  const headers = {
    'Content-Type': 'application/json',
  };
  const completeUrl = BaseUrl + endUrl
  console.log("completeUrl:",completeUrl)
  try {
    return axios.post(completeUrl, payload, {headers: headers});
  } catch (err) {
    console.warn('Axios catch error:', err);
  }
}
