const errorHandler = require("../helper/errorHandler")
const axios = require("axios") 

exports.addressAutoComplete = async (req, res, next) => {
  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${req.body.input}&key=${process.env.GOOGLE_API_KEY}&sessiontoken=${req.body.sessionToken}&location=${req.body.location.lat},${req.body.location.lng}&radius=500&component=country:ca`)   

    if (response.data.status !== "OK") {
      errorHandler(500, [response.data.status])
    }

    res.status(200).json({
      results: response.data.predictions
    })
  } catch (error) {
    if (!error.status) {
      error.status = 500
    }
    next(error)
  }
}

exports.getMapApi = async (req, res, next) => {
  try {
    const googleApi = await axios.get(`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&libraries=places`)

    res.status(200).json({api: googleApi.data})
  } catch (error) {
    if (!error.status) {
      error.status = 500
    }
    next(error)
  }
}