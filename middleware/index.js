const jwt = require('jsonwebtoken')

//MIDDLEWARE CANNOT LOCK DOWN PATHS BECAUSE THERE IS ONLY ONE PATH FOR ALL REQUESTS, THEREFORE IT ONLY SETS METADATA IN GRAPHQL

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization') //checks for auth field

  //check if user is authorized, but if not, add field to request isAuth so rest of API can check auth status
  if (!authHeader) {
    req.isAuth = false
    return next()
  }

  const token = authHeader.split(' ')[1]
  //check for valid token
  if (!token || token === '') {
    req.isAuth = false
    return next()
  }

  //decode token
  let decodedToken
  try {
    decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`)
  } catch (err) {
    req.isAuth = false
    return next()
  }

  //check for valid decoded token
  if (!decodedToken) {
    req.isAuth = false
    return next()
  }

  //if everything checks out, user is authenticated
  req.isAuth = true
  req.userId = decodedToken.userId
  next()
}
