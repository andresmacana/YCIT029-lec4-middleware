import express from "express";

const app = express();

const SECRET_PASSWORD = "password123";

const passwordCheckerMiddleware = (req, res, next) => {
  console.log("headers", req.headers["x-password"]);

  const password = req.headers["x-password"];

  if (!password || password !== SECRET_PASSWORD) {
    res.status(401).send("you entered the wrong password");
  } else {
    next();
  }
};

app.get("/public", (req, res) => {
  res.send("this is public information");
});

app.get("/protected", [passwordCheckerMiddleware], (req, res) => {
  res.send(
    "you should only see this message if you provided the correct password"
  );
});

const PORT = 4003;
app.listen(PORT, () => {
  console.log(`server is now operational on port  ${PORT}`);
});
