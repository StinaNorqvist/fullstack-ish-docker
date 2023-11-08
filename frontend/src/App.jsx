import { useEffect, useState } from "react";
import "./App.css";
import TrashIcon from "./Icons/TrashIcon";
import DogIcon from "./Icons/DogIcon";
import CatIcon from "./Icons/CatIcon";

function App() {
  const [allPets, setALlPets] = useState([]);
  const [newName, setName] = useState("");
  const [newAge, setAge] = useState(null);
  const [newSpecies, setSpecies] = useState("");

  // FETCH ALL PETS
  useEffect(() => {
    fetchAllPets();
  }, []);

  const fetchAllPets = () => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setALlPets(data);
      });
  };

  // POST NEW PET TO BACKEND
  const postNewPet = (newName, newAge, newSpecies) => {
    const data = {
      name: newName,
      age: newAge,
      species: newSpecies,
    };
    fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        setALlPets(data);
        fetchAllPets();
      })
      .catch((error) => {
        console.log(error, "Failed posting a new pet");
      });
  };

  // DELETE A PET
  const deletePet = (id) => {
    fetch("/api", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((response) => response.json())
      .then((data) => {
        setALlPets(data);
        fetchAllPets();
      })
      .catch((error) => {
        console.log(error, `Failed to delete pet with id ${id}`);
      });
  };

  return (
    <>
      <div className="inputContainer">
        <div className="headerContainer">
          <DogIcon />
          <h1 className="firstHeader">Add a new pet</h1>
          <CatIcon />
        </div>

        <input
          placeholder="Name"
          type="text"
          onChange={(event) => setName(event.target.value)}
        />
        <input
          placeholder="Age"
          type="text"
          onChange={(event) => setAge(event.target.value)}
        />
        <input
          placeholder="Species"
          type="text"
          onChange={(event) => setSpecies(event.target.value)}
        />

        <button
          type="submit"
          className="addButton"
          onClick={() => postNewPet(newName, newAge, newSpecies)}
        >
          Add a new pet
        </button>
      </div>

      <h1 className="secondHeader">Your pets</h1>
      <div className="petContainer">
        {allPets.map((pet) => (
          <div key={pet.id} className="petDiv">
            <p className="petName">{pet.name}</p>
            <p className="petSpecies">{pet.species}</p>
            <p className="petAge">{pet.age} years old</p>
            <button
              className="trashButton"
              key={pet.id}
              onClick={() => deletePet(pet.id)}
            >
              <TrashIcon />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
export default App;
