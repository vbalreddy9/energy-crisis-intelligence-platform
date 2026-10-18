import React, { useEffect, useState } from "react";
import axios from "axios";

function MyIssues() {

    const [issues, setIssues] = useState([]);

    useEffect(() => {
        fetchIssues();
    }, []);

    const fetchIssues = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/api/issues/all"
            );

            setIssues(response.data);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>📋 My Reported Issues</h2>

            {issues.map((issue) => (
                <div
                    key={issue.id}
                    style={{
                        border: "1px solid #ccc",
                        padding: "15px",
                        margin: "10px",
                        borderRadius: "10px"
                    }}
                >
                    <p><b>Region:</b> {issue.region}</p>
                    <p><b>Issue:</b> {issue.issueType}</p>
                    <p><b>Description:</b> {issue.description}</p>
                    <p><b>Status:</b> {issue.status}</p>
                </div>
            ))}
        </div>
    );
}

export default MyIssues;