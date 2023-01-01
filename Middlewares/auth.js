import argon2 from "argon2";
import jwt from "jsonwebtoken";

const auth = {
  hashPassword: (req, res, next) => {
    const password = req.body.password;

    const hash = argon2.hash(password, {
      type: argon2.argon2d,
      memoryCost: 2 ** 16,
      hashLength: 50,
    });
    hash.then((hashedPassword) => {
      delete req.body.password;
      req.body.hashedPassword = hashedPassword;

      next();
    });
  },
  verifyPassword: (req, res) => {
    argon2
      .verify(req.user.hashedPassword, req.body.password)
      .then((isVerified) => {
        if (isVerified) {
          const payload = { sub: req.user.id };

          const token = jwt.sign(payload, process.env.JWT_SECRET);
          delete req.user.hashedPassword;
          res.send({ token, user: req.user });
        } else {
          res.status(401).send("popoopo");
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },
  verifyToken: (req, res, next) => {
    try {
      const authorizationHeader = req.get("Authorization");

      if (authorizationHeader == null) {
        throw new Error("Authorization header is missing");
      }

      const [type, token] = authorizationHeader.split(" ");

      if (type !== "Bearer") {
        throw new Error("Authorization header has not the 'Bearer' type");
      }

      req.payload = jwt.verify(token, process.env.JWT_SECRET);

      next();
    } catch (err) {
      console.error(err);
      res.status(401).send("azerty");
    }
  },
};

export default auth;
