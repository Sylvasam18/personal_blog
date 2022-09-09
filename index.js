const express = require("express");
const mongoose = require("mongoose");
const blogRoutes = require("./Routes/blogRoutes");

const app = express();

const dbURI =
  "mongodb+srv://SammyBlog:Sylvasam18@cluster0.kotie.mongodb.net/Blog?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(process.env.PORT || 3000))
  .catch((err) => console.error(err));

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "newest blog",
    snippet: "a new blog",
    body: "more about my new blog",
  });
  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/single-blog", (req, res) => {
  Blog.findById("62025f4e82432c194bf44b7f")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.use("/blogs", blogRoutes);

app.use((req, res) => {
  res.status(404).render("404");
});
