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

function UserDashboard() {

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
    <li>Weather</li>
    <li>Alerts</li>
    <li>Settings</li>
</ul>
                <li
    style={{ cursor: "pointer" }}
    onClick={() =>
        window.location.href = "/report-issue"
    }
>
    ⚠️ Report Issue
</li>
<li
    style={{ cursor: "pointer" }}
    onClick={() =>
        window.location.href = "/my-issues"
    }
>
    📋 My Issues
</li>

    

            </div>

            {/* MAIN */}

            <div className="main-content">

                {/* TOP */}

                <div className="hero-banner">

                    <div>
                        <h1>Welcome Back👋</h1>
                        <p>
                            Here's what's happening with your energy today.
                        </p>
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


                <div className="forecast-row">

                    {
                 forecast.map((item, index) => (

                     <div
                        key={index}
                        className="forecast-card"
                     >

                        <h4>
                            {
                                new Date(item.dt_txt)
                                    .toLocaleTimeString(
                                        [],
                                        {
                                            hour: "numeric"
                                        }
                                )
                    }
                </h4>

                <p>
                    🌡 {item.main.temp.toFixed(1)}°C
                </p>

                <p>
                    ☁ {item.weather[0].main}
                </p>

            </div>

        ))
    }

</div>

                {/* STATS */}

                <div className="cards">

                    <div className="card glass">
                        <FaBolt className="card-icon" />
                        <h2>{totalDemand}</h2>
                        <p>Total Demand</p>
                    </div>

                    <div className="card glass">
                        <FaSolarPanel className="card-icon" />
                        <h2>{totalSupply}</h2>
                        <p>Total Supply</p>
                    </div>

                    <div className="card glass">
                        <FaLeaf className="card-icon" />
                        <h2>{totalRegions}</h2>
                        <p>Total Regions</p>
                    </div>

                    <div className="card glass">
                        <FaExclamationTriangle className="card-icon" />
                        <h2>{criticalCrises}</h2>
                        <p>Critical Alerts</p>
                    </div>

                    <div className="card glass">
                        <h2>🔥</h2>
                        <p>Natural Gas</p>
                        {naturalGas?.response?.data?.[0] ? (
                            <>
                                <h3>
                                    ${naturalGas.response.data[0].value}/MMBtu
                                    </h3>
                                    <small>
                                        ₹{Math.round(
                                            naturalGas.response.data[0].value * 85
                                        )}/MMBtu
                                    </small>
                                    <br />
                                    <small>Live EIA Data</small>
                            </>
                        ) : (
                            <small>Loading...</small>
                        )}
                    </div>
                    <div className="card glass">
                        <h2>🌍</h2>
                        <p>Carbon Emissions</p>

                        {carbonData?.data?.[0] ? (
                            <>
                               <h3>
                                   {carbonData.data[0].intensity.actual}
                                   {" "}gCO₂/kWh
                                </h3>

                                <small>
                                    {carbonData.data[0].intensity.index.toUpperCase()}
                                </small>
                        </>
                    ) : (
                        <small>Loading...</small>
                    
                    )}
                    </div>

                    <div className="card glass">

    <h2>☀️</h2>

    <p>Solar Potential</p>

    <select
    value={selectedCity}
    onChange={(e) =>
        setSelectedCity(e.target.value)
    }
>
    <option value="hyderabad">Hyderabad</option>
    <option value="warangal">Warangal</option>
    <option value="delhi">Delhi</option>
    <option value="mumbai">Mumbai</option>
    <option value="bangalore">Bangalore</option>
    <option value="chennai">Chennai</option>
    <option value="kolkata">Kolkata</option>
    <option value="pune">Pune</option>
    <option value="ahmedabad">Ahmedabad</option>
    <option value="jaipur">Jaipur</option>
    <option value="lucknow">Lucknow</option>
    <option value="bhopal">Bhopal</option>
    <option value="patna">Patna</option>
    <option value="indore">Idore</option>
    <option value="chandigarh">Chandigarh</option>
</select>

    {solarData?.hourly?.shortwave_radiation ? (
        <>
            <h3>
                {
                    Math.max(
                        ...solarData.hourly.shortwave_radiation
                    ).toFixed(0)
                }
                {" "}W/m²
            </h3>

            <small>
                Renewable Energy Potential
            </small>
        </>
    ) : (
        <small>Loading...</small>
    )}

</div>
               <div className="card glass">
                 <h2>🌬️</h2>

    <p>Wind Energy</p>

    {windData?.hourly?.wind_speed_10m ? (
        <>
            <h3>
                {
                    Math.max(
                        ...windData.hourly.wind_speed_10m
                    ).toFixed(1)
                }
                {" "}km/h
            </h3>

            <small>
                Wind Energy Potential
            </small>
        </>
    ) : (
        <small>Loading...</small>
    )}
               </div>
               <div className="card glass">

    <h2>⛽</h2>

    <p>Petrol Price</p>

    {fuelData ? (

        <>
            <h3>
                ₹ {fuelData.price}
            </h3>

            <small>
                {fuelData.city}
            </small>
        </>

    ) : (

        <small>Loading...</small>

    )}

</div>
                </div>
                
                <div className="chart-container glass">
    <h2>⚡ AI Risk Meter</h2>

    <GaugeChart
        id="energy-gauge"
        nrOfLevels={20}
        percent={energyData.length > 10 ? 0.9 : energyData.length > 5 ? 0.65 : 0.35}
        textColor="#071739"
    />

    <div className="gauge-info">

        <div className="gauge-card">
            <h3>Risk Level</h3>
            <p>
                {energyData.length > 10
                    ? "CRITICAL"
                    : energyData.length > 5
                        ? "HIGH"
                        : "LOW"}
            </p>
        </div>

        <div className="gauge-card">
            <h3>Data Records</h3>
            <p>{energyData.length}</p>
        </div>

        <div className="gauge-card">
            <h3>Status</h3>
            <p>
                {energyData.length > 10
                    ? "Emergency"
                    : energyData.length > 5
                        ? "Warning"
                        : "Stable"}
            </p>
        </div>

    </div>
</div>

                {/* BAR CHART */}

                <div className="chart-container glass">

                    <h2>Energy Analytics</h2>

                    <ResponsiveContainer width="100%" height={350}>

                        <BarChart data={energyData}>

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="region" />

                            <YAxis />

                            <Tooltip />

                            <Legend />

                            <Bar
                                dataKey="energyConsumption"
                                fill="#4facfe"
                            />

                            <Bar
                                dataKey="demand"
                                fill="#00f2fe"
                            />

                            <Bar
                                dataKey="supply"
                                fill="#43e97b"
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>

               {/* AI INSIGHTS */}
<div className="bottom-section">
    <div className="chart-container glass">
        <h2>🤖 AI Insights</h2>

        <div className="record-card glass">
            <h3>⚠ Crisis Severity</h3>
            <p>
                {energyData.length > 5
                    ? "High energy demand detected in multiple regions."
                    : "Energy demand is currently stable."}
            </p>
        </div>

        <div className="record-card glass">
            <h3>🌦 Weather Impact</h3>
            <p>
                {weather
                    ? `${weather.weather[0].main} conditions may influence electricity consumption.`
                    : "Analyzing weather patterns..."}
            </p>
        </div>

        <div className="record-card glass">
            <h3>🔥 Fuel Analysis</h3>
            <p>
                Natural Gas Price:
                {naturalGas?.response?.data?.[0]
                    ? ` $${naturalGas.response.data[0].value}/MMBtu`
                    : " Loading..."}
            </p>
        </div>

        <div className="record-card glass">
            <h3>🌱 Optimization Suggestion</h3>
            <p>
                Shift peak-hour loads and increase renewable energy utilization.
            </p>
        </div>
    </div>

    <div className="right-panel">
        <div className="admin-card">
            <img
                src="https://i.pravatar.cc/100"
                alt="admin"
            />
            <h3>Admin</h3>
            <p>Energy Monitoring Officer</p>
        </div>
    </div>
</div>
<div className="chart-container glass">
    <h2>🚨 Crisis Alert System</h2>

    <div className="record-card glass">
        <h3>Current Alert Status</h3>

        <p>
            Risk Level:
            {" "}
            {energyData.length > 10
                ? "🔴 CRITICAL"
                : energyData.length > 5
                    ? "🟠 HIGH"
                    : "🟢 LOW"}
        </p>

        <p>
            Weather:
            {" "}
            {weather
                ? weather.weather[0].main
                : "Loading..."}
        </p>

        <p>
            Natural Gas:
            {" "}
            {naturalGas?.response?.data?.[0]
                ? `$${naturalGas.response.data[0].value}/MMBtu`
                : "Loading..."}
        </p>

        <p>
            Recommendation:
            {" "}
            {energyData.length > 10
                ? "Immediate intervention required."
                : energyData.length > 5
                    ? "Monitor energy demand closely."
                    : "System operating normally."}
        </p>
    </div>
</div>

            </div>

        </div>
    );
}

export default UserDashboard;