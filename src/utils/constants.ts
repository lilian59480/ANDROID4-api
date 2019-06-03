import jwt from "jsonwebtoken";

const algorithm = "HS512";
const issuer = "com.ig2i.chat";
const subject = "chat";

const jwtVerifyOptions: jwt.VerifyOptions = {
    algorithms: [algorithm],
    issuer: issuer,
    subject: subject
};

const jwtSignOptions: jwt.SignOptions = {
    algorithm: algorithm,
    expiresIn: "24h",
    issuer: issuer,
    encoding: "utf-8",
    subject: subject
};

export default {
    jwtVerifyOptions,
    jwtSignOptions
};
