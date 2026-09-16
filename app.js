
import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/user", async (req, res) => {
  try {
    const resp = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
      },
    });
    res.json(resp);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating user");
  }
});

app.get("/user", async (req, res) => {
  try {
    const resp = await prisma.user.findMany();
    res.json(resp);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching users");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
