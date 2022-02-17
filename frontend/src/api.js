import axios from "axios";

const api = axios.create({
    baseURL: 'http://127.0.0.1:5000',
});


export const listRecords = (url, n_records, prefix, from, until, completion, errorOccurred) => {

    const request = Object({
        url,
        n_records,
        prefix,
        from,
        until
    })
    api.post('/listRecords', request).then(response => {
          completion(response.data)
      }).catch(error => {
          errorOccurred(error.name)
      })
}
