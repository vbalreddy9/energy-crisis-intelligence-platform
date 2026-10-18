import "./NewDashboard.css";
import GaugeChart from "react-gauge-chart";
import { useEffect, useState } from "react";
import axios from "axios";

function NewDashboard() {
    const [energyData, setEnergyData] = useState([]);
const [weather, setWeather] = useState(null);
const [forecast, setForecast] = useState([]);
const [naturalGas, setNaturalGas] = useState(null);
const [currentTime, setCurrentTime] = useState(new Date());
const [carbonData, setCarbonData] = useState(null);
const [solarData, setSolarData] = useState(null);
const [selectedCity, setSelectedCity] = useState("hyderabad");
const [windData, setWindData] = useState(null);
const [fuelData, setFuelData] = useState(null);

const fetchFuelData = async () => {

    try {

        const petrolResponse =
            await axios.get(
                `http://localhost:8080/api/fuel/petrol/${selectedCity}`
            );

        setFuelData(petrolResponse.data);

    } catch (error) {

        console.log(error);

    }
};

    useEffect(() => {

        fetchEnergyData();
        fetchFuelData();

        axios
            .get("http://localhost:8080/api/weather/Hyderabad")
            .then((response) => {
                setWeather(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        axios
            .get("http://localhost:8080/api/weather/forecast/Hyderabad")
            .then((response) => {
                setForecast([
                    response.data.list[0],
                    response.data.list[1],
                    response.data.list[2],
                    response.data.list[3]
                ]);
            })
            .catch((error) => {
                console.log(error);
            });
        axios
            .get("http://localhost:8080/api/eia/natural-gas-price")
            .then((response) => {
                console.log("EIA DATA:", response.data);
                setNaturalGas(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        axios
            .get("http://localhost:8080/api/carbon")
            .then((response) => {
                setCarbonData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        axios
            .get(`http://localhost:8080/api/solar/${selectedCity}`)
            .then((response) => {
                setSolarData(response.data);
           })
           .catch((error) => {
               console.log(error);
        });
        axios
    .get(`http://localhost:8080/api/wind/${selectedCity}`)
    .then((response) => {
        setWindData(response.data);
    })
    .catch((error) => {
        console.log(error);
    });
    }, [selectedCity]);
    useEffect(() => {
    const timer = setInterval(() => {
        setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
}, []);

    

    const fetchEnergyData = async () => {

        const token = localStorage.getItem("token");

        try {

            const response = await axios.get(
                "http://localhost:8080/api/energy/all",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setEnergyData(response.data);

        } catch (error) {

            console.error(error);
            alert("Failed to Fetch Energy Data");
        }
    };


  return (
    <div className="new-dashboard">

      {/* Sidebar */}
      <div className="new-sidebar">
        <h2>⚡ EnergyAI</h2>

        <ul>
          <li>Dashboard</li>
          <li>Energy Analytics</li>
          <li>AI Forecast</li>
          <li>Weather</li>
          <li>Power Plants</li>
          <li>Alerts</li>
          <li>Reported Issues</li>
          <li>Settings</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="new-main">

        {/* Header */}
        <div className="header-card">
          <h1>⚡ Energy Crisis Intelligence Platform</h1>
          <p>Real-Time Energy Monitoring & AI Forecasting</p>
        </div>

        {/* Row 1 */}
        <div className="row row1">

          <div className="card risk-card">

    <h2>⚡ AI Risk Meter</h2>

    <GaugeChart
        id="energy-gauge"
        nrOfLevels={20}
        percent={
            energyData.length > 10
                ? 0.9
                : energyData.length > 5
                ? 0.65
                : 0.35
        }
    />

    <div className="risk-info">

        <div className="risk-box">
            <h3>Risk Level</h3>

            <p>
                {
                    energyData.length > 10
                        ? "CRITICAL"
                        : energyData.length > 5
                        ? "HIGH"
                        : "LOW"
                }
            </p>
        </div>

        <div className="risk-box">
            <h3>Data Records</h3>

            <p>
                {energyData.length}
            </p>
        </div>

        <div className="risk-box">
            <h3>Status</h3>

            <p>
                {
                    energyData.length > 10
                        ? "Emergency"
                        : energyData.length > 5
                        ? "Warning"
                        : "Stable"
                }
            </p>
        </div>

    </div>

</div>

          <div className="weather-column">

            <div className="card weather-card">
              <h3>Weather Today</h3>
            </div>

            <div className="card weather-card">
              <h3>Temperature</h3>
            </div>

          </div>

          <div className="card energy-card">
            <h2>Energy Sources</h2>

            <p>Natural Gas</p>
            <p>Carbon Emissions</p>
            <p>Solar Potential</p>
            <p>Wind Energy</p>
            <p>Petrol Price</p>
          </div>

        </div>

        {/* Row 2 */}

        <div className="row row2">

          <div className="card">
            <h2>AI Insights</h2>
          </div>

          <div className="card">
            <h2>Crisis Alert System</h2>
          </div>

          <div className="card">
            <h2>Statistics</h2>
          </div>

        </div>

        {/* Row 3 */}

        <div className="row row3">

          <div className="card">
            <h2>Energy Analytics</h2>
          </div>

          <div className="card">
            <h2>AI Forecast Trends</h2>
          </div>

          <div className="card">
            <h2>Crisis Severity</h2>
          </div>

        </div>

        {/* Row 4 */}

        <div className="card records-card">
          <h2>AI Energy Records</h2>
        </div>

      </div>
    </div>
  );
}

export default NewDashboard;