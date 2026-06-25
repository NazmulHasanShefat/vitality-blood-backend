const dotenv = require("dotenv");
dotenv.config();

const { createRemoteJWKSet, jwtVerify } = require("jose-cjs");

const JWKS = createRemoteJWKSet(
  new URL(`${process.env.JWKS_URL}/api/auth/jwks`),
);

const verifyUser = async (req, res, next) => {
  const authHeaders = req?.headers?.authorization;
  if (!authHeaders) {
    return res
      .status(401)
      .json({ success: false, message: "unauthorized token not found" });
  }
  const userToken = authHeaders.split(" ")[1];
  console.log(userToken);
  if (!userToken) {
    return res
      .status(401)
      .json({ success: false, message: "unauthorized token" });
  }
  try {
    const { payload } = await jwtVerify(userToken, JWKS);
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: error });
  }
};



// VERIFY ADMIN =========================================================================
const verifyAdminAndVolunteer = async (req, res, next) => {
  const authHeaders = req?.headers?.authorization;
  if (!authHeaders) {
    return res
      .status(401)
      .json({ success: false, message: "unauthorized token not found" });
  }
  const userToken = authHeaders.split(" ")[1];
  console.log(userToken);
  if (!userToken) {
    return res
      .status(401)
      .json({ success: false, message: "unauthorized token" });
  }
  try {
    const { payload } = await jwtVerify(userToken, JWKS);
    if (payload?.role !== "admin" && payload?.role !== "volunteer") {
      return res
        .status(401)
        .json({ success: false, message: "unauthorized role access" });
    }
    console.log(payload, "this is user role");
    next();
  } catch (error) {
    console.log(error);
  }
};


module.exports = { verifyUser, verifyAdminAndVolunteer };
