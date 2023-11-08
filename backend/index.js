const express = require("express");
const dotenv = require("dotenv"),
  { Client } = require("pg");
dotenv.config();
const path = require("path");
const cors = require("cors");

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

const client = new Client({
  connectionString: process.env.PGURI,
});

client.connect();

// GET ALL PETS
app.get("/api", async (_request, response) => {
  try {
    const { rows } = await client.query("SELECT * FROM pets");
    response.send(rows);
  } catch (error) {
    response.status(500).send("Internal server error");
    console.log(error, "Failed to fetch pets");
  }
});

// POST NEW PET
app.post("/api", async (request, response) => {
  try {
    const { name, age, species } = request.body;
    const { rows } = await client.query(
      "INSERT INTO pets (name, age, species) VALUES ($1, $2, $3)",
      [name, age, species]
    );
    response.send(rows);
  } catch (error) {
    response.status(500).send("Internal server error");
    console.error(error, "Failed to post a pet");
  }
});

// DELETE PET
app.delete("/api", async (request, response) => {
  try {
    const { id } = request.body;
    const { rows } = await client.query("DELETE FROM pets WHERE id = $1", [id]);
    response.send(rows);
  } catch (error) {
    response.status(500).send("Internal server error");
    console.log(error, "Failed to delete a pet");
  }
});

app.use(cors());
app.use(express.static(path.join(path.resolve(), "public")));

app.listen(port, () => {
  console.log(`Redo på http://localhost:${port}/`);
});

// ORIGINAL THAT WORKS
// app.get("/api", async (_request, response) => {
//   try {
//     const result = await client.query("SELECT * FROM pets");
//     const allPets = result.rows;
//     response.json(allPets);
//     response.status(200).json(allPets);
//   } catch (error) {
//     res.status(500).json({ message: err.message });
//     console.log(error, "Fetch all pets failed");
//   }
// });

// app.get('/api', async (_request, response) => {
//   const { rows } = await client.query(
//     'SELECT * FROM cities WHERE name = $1',
//     ['Stockholm']
//   )

//   response.send(rows)
// })

// ORIGINAL POST
// app.post("/api", async (request, response) => {
//   try {
//     const { name, age, species } = request.body;
//     const result = await client.query(
//       "INSERT INTO pets (name, age, species) VALUES ($1, $2, $3)",
//       [name, age, species]
//     );
//     const newPet = result.rows[0];
//     response.json(newPet);
//   } catch (error) {
//     console.log(error, "Could not post a new pet");
//   }
// });

// ORIGINAL DELETE
// app.delete("/api", async (request, response) => {
//   try {
//     const { id } = request.body;
//     const result = await client.query("DELETE FROM pets WHERE id = $1", [id]);

//     if (response.status(204)) {
//       response.status(204).end();
//       console.log("Pet was successfully removed");
//     } else {
//       response.status(404).json({ error: "Record not found" });
//       console.log("Failed to remove pet");
//     }
//   } catch (error) {
//     response.status(500).json({ error: "Internal Server Error" });
//   }
// });
