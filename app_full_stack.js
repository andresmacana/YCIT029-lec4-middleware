import express from "express";

const app = express();

app.use(express.json());
app.use(express.static("public"));

//add a route

/* app.get("/", (req, res) => { //no funciona porque static:public hace que funcion post
  res.send("test");
}); */

app.post("/customer-info", (req, res) => {
  console.log(req.body);
  //console.log(req.headers);
  res.end();
});

const PORT = 4005;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
