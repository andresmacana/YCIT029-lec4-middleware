import express from "express";

const app = express();

//const SECRET_PASSWORD = "pasword123";

function middleware1(req, res, next) {
  console.log("middleware1");
  if (true) {
    res.send("first checked");
  } else {
    next();
  }
}

function middleware2(req, res, next) {
  console.log("middleware2");
  next();
}

function middleware3(req, res, next) {
  console.log("middleware3, request has benn received");
  next();
}

app.use(express.json());
app.get("/", [middleware1, middleware2, middleware3], (req, res) => {
  res.send("hello");
  console.log("response was sent");
});

app.get("/:param1", (req, res) => {
  console.log(req.params.param1);
  res.status(202).json({ theParam: req.params.param1 });
});
/* app.post("/:param1", [express.json()], (req, res) => {
  console.log(req.params.param1);

  const body = req.body;
  res.status(202).json({ theParam: req.params.param1, theBody: body });
}); */

app.post("/:param1", (req, res) => {
  const body = req.body; // can acces the request body thanks to the previous middleware (express.json())
  res.status(202).json({
    theParam: req.params.param1,
    theBody: body,
  });
});

/* app.post("/:param1", [express.json()], (req, res) => {
  res.status(202).json({ theParam: req.params.param1, theBody: body });
}); */

app.get("/other-route", (req, res) => {
  res.send("hello 444");
});

const PORT = 4002;
app.listen(PORT, () => {
  console.log(`server is now operational on port  ${PORT}`);
});
