import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", async (req, res) => {
    try{
        const result = await axios.get("https://randomuser.me/api/");
        const length = result.data.results.length;
        const randomNumber = Math.floor(Math.random() * length);
        res.render("index.ejs",{
            picture: result.data.results[randomNumber].picture.large,
            first: result.data.results[randomNumber].name.first,
            last: result.data.results[randomNumber].name.last,
            gender: result.data.results[randomNumber].gender,
            age: result.data.results[randomNumber].dob.age,
            country: result.data.results[randomNumber].location.country,
        });
    } catch (error) {
        console.log(error.response.data);
        res.status(500);
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});