import "./Dashboard.css";
import GaugeChart from "react-gauge-chart";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaBell } from "react-icons/fa";


import {
    BarChart,
    Bar,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

import {
    FaBolt,
    FaLeaf,
    FaExclamationTriangle,
    FaSolarPanel
} from "react-icons/fa";


import "./Dashboard.css";

function Dashboard() {

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

    const totalRegions = energyData.length;

    const totalDemand = energyData.reduce(
        (sum, item) => sum + item.demand,
        0
    );

    const totalSupply = energyData.reduce(
        (sum, item) => sum + item.supply,
        0
    );

    const criticalCrises = energyData.filter(
        item => item.crisisSeverity === "Critical"
    ).length;

    const COLORS = [
        "#ff4d4d",
        "#ffa64d",
        "#ffd24d",
        "#66cc66"
    ];

    const getPrediction = (demand, supply) => {

        if (demand > supply + 100) {
            return "⚠ Energy Crisis Likely";
        }

        else if (demand > supply) {
            return "🟠 Medium Risk";
        }

        else {
            return "✅ Stable";
        }
    };

    const getSuggestion = (
        demand,
        supply,
        crisisSeverity
    ) => {

        if (demand > supply + 100) {

            return "⚡ Increase energy supply and use renewable energy sources";
        }

        else if (crisisSeverity === "High") {

            return "⚠ Reduce fuel dependency and optimize consumption";
        }

        else if (supply > demand) {

            return "✅ Energy supply is stable and optimized";
        }

        else {

            return "🔋 Monitor energy usage regularly";
        }
    };
    
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

        <div className="dashboard">

            {/* SIDEBAR */}

            <div className="sidebar">

                <h2>⚡ EnergyAI</h2>

                <ul>
                    <li>Dashboard</li>
                    <li>Energy Analytics</li>
                    <li>AI Forecast</li>
                    <li>Weather</li>
                    <li>Power Plants</li>
                    <li>Alerts</li>
                    <li>Settings</li>
                </ul>
                 <li
        style={{ cursor: "pointer" }}
        onClick={() =>
            window.location.href = "/admin-issues"
        }
    >
        📋 Reported Issues
    </li>

    <li>Settings</li>

            </div>

            {/* MAIN */}

            <div className="main-content">

                {/* TOP */}

                <div className="hero-banner">
    <div className="hero-overlay">

        <h1>
            Welcome Back, Admin 👋
        </h1>

        <p>
            Energy Crisis Intelligence Platform
        </p>

        <p>
            Real-Time Energy Monitoring &
            Renewable Energy Forecasting
        </p>

    </div>

</div>

                    <div className="hero-right">
                        <div className="notification">
                            <FaBell size={22} />
                            <span className="notification-badge">3</span>
                        </div>
                        <div className="weather-box">

                        {
                            weather && (
                                <>
                                    <h2>
                                        {weather.main.temp.toFixed(1)}°C
                                    </h2>
                                    <p>📍 {weather.name}</p>
                                    <p>💧 Humidity: {weather.main.humidity}%</p>
                                    <p>
                                        {weather.weather[0].description}
                                    </p>
                                </>
                            )
                        }
                        </div>

                    </div>

                </div>
                {/* DASHBOARD HEADER*/}
                <div className="dashboard-header">
                    <div>
                        <h1>⚡ Energy Crisis Intelligence Platform</h1>
                        <p>Real-Time Energy Monitoring & AI Forecasting</p>
                    </div>
                    <div className="time-box">
                        {currentTime.toLocaleString()}
                    </div>
                </div>
                <div className="dashboard-grid">

    {/* Row 1 */}

    <div className="risk-card">
       AI Risk Meter
    </div>

    <div className="weather-section">
       Weather Today
       Temperature
    </div>

    <div className="energy-sources">
       Natural Gas
       Carbon
       Solar
       Wind
       Petrol
    </div>

    {/* Row 2 */}

    <div className="ai-insights">
       AI Insights
    </div>

    <div className="crisis-alert">
       Crisis Alert
    </div>

    <div className="stats-panel">
       Demand
       Supply
       Regions
       Alerts
    </div>

    {/* Row 3 */}

    <div className="chart-card">
        Energy Analytics
    </div>

    <div className="chart-card">
        AI Forecast
    </div>

    <div className="chart-card">
        Crisis Severity
    </div>

</div>



                {/* RECORDS */}

                <div className="records-container">

                    <h2>AI Energy Records</h2>

                    {
                        energyData.length === 0

                        ? <p>No Energy Data Available</p>

                        :

                        energyData.map((data, index) => (

                            <div
                                key={index}
                                className="record-card glass"
                            >

                                <p>
                                    <strong>Region:</strong>
                                    {" "}
                                    {data.region}
                                </p>

                                <p>
                                    <strong>Energy Consumption:</strong>
                                    {" "}
                                    {data.energyConsumption}
                                </p>

                                <p>
                                    <strong>Fuel Price:</strong>
                                    {" "}
                                    {data.fuelPrice}
                                </p>

                                <p>
                                    <strong>Demand:</strong>
                                    {" "}
                                    {data.demand}
                                </p>

                                <p>
                                    <strong>Supply:</strong>
                                    {" "}
                                    {data.supply}
                                </p>

                                <p>
                                    <strong>Crisis Severity:</strong>
                                    {" "}
                                    {data.crisisSeverity}
                                </p>

                                <p>

                                    <strong>
                                        AI Prediction:
                                    </strong>

                                    {" "}

                                    {
                                        getPrediction(
                                            data.demand,
                                            data.supply
                                        )
                                    }

                                </p>

                                <p>

                                    <strong>
                                        Optimization Suggestion:
                                    </strong>

                                    {" "}

                                    {
                                        getSuggestion(
                                            data.demand,
                                            data.supply,
                                            data.crisisSeverity
                                        )
                                    }

                                </p>

                            </div>

                        ))
                    }

                </div>

            </div>

        
    );
}

export default Dashboard;