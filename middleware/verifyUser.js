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
    console.log(payload, "this is user payload");
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: error });
  }
};

const verifyAdmin = async (req, res, next, userRole) => {
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
    if (payload?.role !== "admin") {
      return res
        .status(401)
        .json({ success: false, message: "unauthorized role access" });
    }
    console.log(payload?.role, "this is user role");
    next();
  } catch (error) {
    console.log(error);
  }
};
const verifydonor = async (req, res, next, userRole) => {
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
    if (payload?.role !== "donor") {
      return res
        .status(401)
        .json({ success: false, message: "unauthorized role access" });
    }
    console.log(payload?.role, "this is user role");
    next();
  } catch (error) {
    console.log(error);
  }
};
const verifyVolunteer = async (req, res, next, userRole) => {
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
    if (payload?.role !== "volunteer") {
      return res
        .status(401)
        .json({ success: false, message: "unauthorized role access" });
    }
    console.log(payload?.role, "this is user role");
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { verifyUser, verifyAdmin };
