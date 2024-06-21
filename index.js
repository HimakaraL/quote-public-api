import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.static("public")); //use static files

app.get("/", async (req, res) => {
  try {
    const result = await axios.get(
      "https://api.breakingbadquotes.xyz/v1/quotes" //fetching random quote
    );
    const quoteData = result.data[0]; // Access the first object in the array

    let picname; //select the image for the fetched author

    if (quoteData.author.includes("Jesse")) {
      picname = "jesse";
    } else if (quoteData.author.includes("Mike")) {
      picname = "mike";
    } else if (quoteData.author.includes("Walter")) {
      picname = "walter";
    } else if (quoteData.author.includes("Skyler")) {
      picname = "white";
    } else if (quoteData.author.includes("Gustavo")) {
      picname = "gusta";
    } else if (quoteData.author.includes("Saul")) {
      picname = "saul";
    } else {
      picname = "default";
    }
    res.render("index", {
      quote: quoteData.quote,
      author: quoteData.author,
      picname,
    });
  } catch (error) {
    console.log(error);
    res.render("index", {
      quote: "An error occurred while fetching the quote.",
      author: "",
    });
  }
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
