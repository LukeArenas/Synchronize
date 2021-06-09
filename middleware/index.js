const jwt = require('jsonwebtoken')

//MIDDLEWARE CANNOT LOCK DOWN PATHS BECAUSE THERE IS ONLY ONE PATH FOR ALL REQUESTS, THEREFORE IT ONLY SETS METADATA IN GRAPHQL

module.exports = (req, res, next) => {
  //check for auth field
  const header = req.get('Authorization')
  //check if user is authorized
  if (!header) {
    req.isAuth = false
    return next()
  }
  //check token
  const token = header.split(' ')[1]
  //check if token exists
  if (!token || token === '') {
    req.isAuth = false
    return next()
  }
  //decode token
  let decodedToken
  try {
    decodedToken = jwt.verify(token, process.env.TOKEN_KEY)
  } catch (error) {
    req.isAuth = false
    return next()
  }
  //check if token is valid
  if (!decodedToken) {
    req.isAuth = false
    return next()
  }
  //if all steps have been passed, user is authenticated
  req.isAuth = true
  req.userId = decodedToken.userId
  next()
}
