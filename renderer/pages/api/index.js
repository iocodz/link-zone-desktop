import { linkZoneApiUrl } from '../../config';

const axios = require('axios');

export default async function linkZoneRequest(req, res) {
  if (req.method !== 'POST') {
    res.status(400).send({ message: 'Only POST requests allowed' })
    return
  }

  const payload = JSON.parse(req.body)

  axios.post(linkZoneApiUrl, payload, {
    params: {
      api: payload.method
    }
  })
    .then(resp => {
      res.status(200).json({...resp.data})
    })
    .catch(err => {
      res.status(500).json({...err})
    })
    .finally(() => {
      return
    })
}
