import axios from "axios";

const api = axios.create({
    baseURL: 'http://127.0.0.1:5000',
});


export const listRecords = (data, completion, errorOccurred) => {
    api.post('/listRecords', data).then(response => {
          completion(response.data)
      }).catch(error => {
          errorOccurred(error.name)
      })
}

export const listMetadataFormats = (url, completion, errorOccurred) => {
    const request = {
        url
    }

    api.post('/listMetadataFormats', request).then(response => {
        completion(response.data)
    }).catch(error => {
        errorOccurred(error)
    })
}

export const listSets = (url, completion, errorOccurred) => {
    const request = {
        url
    }

    api.post('/listSets', request).then(response => {
        completion(response.data)
    }).catch(error => {
        errorOccurred(error)
    })
}