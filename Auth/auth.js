import argon2 from "argon2";
import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const auth = {
  hashPassword: (req, res, next) => {
    argon2
      .hash(req.body.password, hashingOptions)
      .then((hashedPassword) => {
        req.body.hashedPassword = hashedPassword;
        delete req.body.password;

        next();
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },
  verifyPassword: (req, res) => {
    argon2
      .verify(req.user.hashedPassword, req.body.password, hashingOptions)
      .then((isVerified) => {
        if (isVerified) {
          const token = jwt.sign({ sub: req.user.id }, JWT_SECRET, {
            algorithm: "HS512",
          });
          delete req.user.hashedPassword;
          res.send({ token, user: req.user });
        } else {
          res.sendStatus(401);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },
  verifyToken: (req, res, next) => {
    try {
      const [type, token] = req.headers.authHeader.split(" ");
      if (type !== "Bearer") throw new Error("Only Bearer token allowed");
      req.payload = jwt.verify(token, JWT_SECRET);
      next();
    } catch (err) {
      console.error(err);
      res.sendStatus(401);
    }
  },
};

export default auth;
