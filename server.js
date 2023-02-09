const express = require("express");
const app = express();
const port = 8000;
const path = require("path");
const fs = require("fs");
var cors = require("cors");
app.use(cors());
app.use(express.json());
app.get("/markdowns", (req, res) => {
  const markdownFolder = path.join(__dirname, "public/markdowns");
  fs.readdir(markdownFolder, (err, files) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      const markdownFiles = files.filter((file) => file.endsWith(".md"));
      const markdownFilePaths = markdownFiles.map((file) => `markdown/${file}`);
      res.json({ markdownFilePaths });
    }
  });
});

app.post("/update-file", function (req, res) {
  console.log({ req: req.body.pathname });
  var pathname = `public/${req.body.pathname}`;
  var content = req.body.content;

  fs.writeFile(pathname, content, { flag: "w+" }, function (err) {
    if (err) {
      console.log(err);
      res.status(500).send("Error updating file");
    } else {
      res.send("File updated successfully");
    }
  });
});

app.delete("/delete-file", (req, res) => {
  const filePath = req.body.filePath;
  console.log({ filePath });
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send(`Error deleting file: ${err}`);
    } else {
      res.send(`File at ${filePath} deleted successfully`);
    }
  });
});

app.put("/update-json", (req, res) => {
  const jsonFile = req.body.jsonFile;
  const newJson = req.body.newJson;
  fs.writeFile(jsonFile, JSON.stringify(newJson), (err) => {
    if (err) {
      console.error(err);
      res.status(500).send(`Error updating JSON file: ${err}`);
    } else {
      res.send(`JSON file ${jsonFile} updated successfully`);
    }
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
