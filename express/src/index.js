import express from "express";
import cors from "cors";

const app = express()
app.use(cors())

app.get("/ap1/v1/users", (req, res,next) => {
    const users =[
        {
            id: 1,
            name: "John Doe"
        },
        {
            id: 2,
            name: "Jane Doe"
        }
    ];
    return res.status(200).json(users);
});

app.listen(5000,(req, res) => {
    console.log("Server is running on port 5000");
});

