# Energy Crisis Intelligence Platform

A full-stack platform for monitoring energy demand, supply, crisis risk, and operational issues across admin and user workflows. The repository includes a Spring Boot backend, a React frontend, and a Python ML prediction service.

## Overview

This project brings together:
- a Java/Spring Boot API for data, authentication, and business logic
- a React-based dashboard for users and administrators
- a FastAPI ML service that predicts energy-related outcomes based on demand and supply inputs
- a PostgreSQL database for persistent storage

The application appears to support:
- user registration and login
- admin and user dashboards
- reporting and tracking issues
- adding energy data
- crisis/forecast insights driven by a machine learning model

## Architecture

The repository is organized into three main components:

- Backend: `src/`
  - Spring Boot application
  - JPA, PostgreSQL, JWT, and Spring Security
- Frontend: `frontend/`
  - React app with routing and dashboard views
- ML Service: `ml-service/`
  - FastAPI application serving predictions

## Tech Stack

### Backend
- Java 17
- Spring Boot 4.0.6
- Spring Web MVC
- Spring Data JPA
- PostgreSQL
- JWT
- Spring Security

### Frontend
- React 19
- React Router
- Recharts
- Lucide icons
- Axios

### ML Service
- Python
- FastAPI
- NumPy
- scikit-learn
- RandomForestRegressor

## Repository Structure

```text
energy-crisis-intelligence-platform/
├── .mvn/
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── App.js
│       ├── index.js
│       └── ...
├── ml-service/
│   └── main.py
├── src/
│   ├── main/
│   │   ├── java/
│   │   └── resources/
│   └── test/
├── .gitignore
├── .gitattributes
├── mvnw
├── mvnw.cmd
├── pom.xml
├── package.json
├── package-lock.json
└── README.md
```

## Features

- User authentication and role-based access
- Energy dashboard for operational monitoring
- Admin dashboard for managing system data and issues
- User issue reporting and tracking
- ML-powered prediction endpoint for energy crisis evaluation
- Data persistence using PostgreSQL

## Prerequisites

Before running the project, make sure you have:

- Java 17+
- Maven or Maven Wrapper
- Node.js and npm
- Python 3.10+
- PostgreSQL running locally

## Configuration

The application uses PostgreSQL with the following default configuration in `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/energydb
spring.datasource.username=postgres
spring.datasource.password=postgres

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

Create the database if it does not already exist:

```sql
CREATE DATABASE energydb;
```

## Backend Setup

From the project root:

```bash
./mvnw spring-boot:run
```

The backend will run with the Spring Boot application entry point at:

```text
src/main/java/com/energy/energyplatform/EnergyplatformApplication.java
```

## Frontend Setup

From the repository root:

```bash
cd frontend
npm install
npm start
```

The frontend will run via the React app using `react-scripts`.

## ML Service Setup

From the repository root:

```bash
cd ml-service
python -m venv .venv
source .venv/bin/activate   # Linux/macOS
# .venv\Scripts\activate   # Windows
pip install fastapi uvicorn numpy scikit-learn
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

The service includes a prediction endpoint:

- `GET /`
- `POST /predict`

Example payload:

```json
{
  "demand": 1200,
  "supply": 900
}
```

Example response:

```json
{
  "predicted_consumption": 500.0,
  "crisis_severity": "HIGH"
}
```

## Notes

- The ML model is a simple training example using a `RandomForestRegressor` and a small synthetic dataset.
- This project is structured as a multi-service application and is intended to be run together for the full end-to-end experience.
- The frontend and backend are configured as separate apps while sharing a common database and service ecosystem.

## License

This repository does not currently declare a license in the project metadata. If you are publishing or distributing the project, add an appropriate open-source license before release.

## Contributing

Contributions are welcome. If you plan to extend this project:
- keep the frontend, backend, and ML service logically separated
- document API contract changes
- validate database and environment configuration before merging
- add tests around new prediction and authentication logic

## Summary

This repository is a multi-service energy monitoring platform built to support crisis awareness, issue management, and predictive analytics. It combines an operational dashboard, a secure backend, and an AI-powered prediction service to help understand energy supply-demand risks in a practical decision-support workflow.
