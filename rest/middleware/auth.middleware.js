const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  try {
    //key value
    //authorization Bearer token
    
    const token = req.headers.authorization
      ? req.headers.authorization.split(' ')[1]
      : null;

      

    if (!token) throw new Error('Authentication is missing');

    const decodedData = jwt.verify(token, process.env.SECRET_KEY);

    if (decodedData.isBanned)
      throw new Error('You have been banned by the administrator');

      console.log(decodedData.username);

    req.locals = {
      userId: decodedData.id,
      userType: decodedData.type,
      username: decodedData.username,
    };
    next();
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

const authenticateAdmin = (req, res, next) => {
  try {
    if (!req.headers.authorization)
      throw new Error('Authentication is missing');

    const token = req.headers.authorization.split(' ')[1];

    if (!token) throw new Error('Authentication is missing');

    const decodedData = jwt.verify(token, process.env.SECRET_KEY);

    if (decodedData.isBanned)
      throw new Error('You have been banned by the administrator');
    if (decodedData.type !== "ADMIN") {
      res.status(403).json({ message: 'Not an administrator' });
      return;
    }

    req.locals = {
      userId: decodedData.id,
      userType: decodedData.type,
      username: decodedData.username,
    };
    // res.status(200).json({message: "Preran response"})
    // Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    next();
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

const authenticateMod = (req, res, next) => {
  try {
    if (!req.headers.authorization)
      throw new Error('Authentication is missing');

    const token = req.headers.authorization.split(' ')[1];

    if (!token) throw new Error('Authentication is missing');

    const decodedData = jwt.verify(token, process.env.SECRET_KEY);

    if (decodedData.isBanned)
      throw new Error('You have been banned by the administrator');

    if (decodedData.type === "STANDARD" || decodedData.type === "GHOST") {
      res.status(403).json({ message: 'Not allowed' });
      return;
    }

    req.locals = {
      userId: decodedData.id,
      userType: decodedData.type,
      username: decodedData.username,
    };
    next();
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

exports.authenticate = authenticate;
exports.authenticateAdmin = authenticateAdmin;
exports.authenticateMod = authenticateMod;

