import jwt from 'jsonwebtoken';

export const verifyAdmin = async (req, res, next) => {
  try {
    console.log(1);

    console.log(req.cookies);

    const token = req.headers['token'] || req.cookies['token'];
    console.log(1);

    console.log(token);

    if (!token) {
      return res.status(401).json({
        messasge: 'anathorized request',
      });
    }
    console.log(1);


    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(1);

    console.log(decodedToken);
    console.log(1);


    if (decodedToken !== (process.env.ADMIN_USER + process.env.ADMIN_PASS)) {
      return res.status(401).json({
        success: false,
        message: 'Not Authorized Login Again',
      });
    }
    console.log(1);

    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: `${error.message} + "this is catch bolck"`,
    });
  }
};
