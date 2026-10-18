import { useState } from "react";
import axios from "axios";

function AddEnergy() {

    const [region, setRegion] = useState("");
    const [energyConsumption, setEnergyConsumption] = useState("");
    const [fuelPrice, setFuelPrice] = useState("");
    const [demand, setDemand] = useState("");
    const [supply, setSupply] = useState("");
    const [crisisSeverity, setCrisisSeverity] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        const token = localStorage.getItem("token");

        try {

            await axios.post(
                "http://localhost:8080/api/energy/add",
                {
                    region,
                    energyConsumption,
                    fuelPrice,
                    demand,
                    supply,
                    crisisSeverity
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Energy Data Added Successfully");

            window.location.reload();

        } catch (error) {

            console.error(error);
            alert("Error adding data");
        }
    };

    return (

        <div className="form-container">

            <h2>Add Energy Data</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Region"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                />

                <br />

                <input
                    type="number"
                    placeholder="Energy Consumption"
                    value={energyConsumption}
                    onChange={(e) => setEnergyConsumption(e.target.value)}
                />

                <br />

                <input
                    type="number"
                    placeholder="Fuel Price"
                    value={fuelPrice}
                    onChange={(e) => setFuelPrice(e.target.value)}
                />

                <br />

                <input
                    type="number"
                    placeholder="Demand"
                    value={demand}
                    onChange={(e) => setDemand(e.target.value)}
                />

                <br />

                <input
                    type="number"
                    placeholder="Supply"
                    value={supply}
                    onChange={(e) => setSupply(e.target.value)}
                />

                <br />

                <input
                    type="text"
                    placeholder="Crisis Severity"
                    value={crisisSeverity}
                    onChange={(e) => setCrisisSeverity(e.target.value)}
                />

                <br />

                <button type="submit">
                    Add Data
                </button>

            </form>

        </div>
    );
}

export default AddEnergy;