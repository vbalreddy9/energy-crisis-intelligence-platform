import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminIssues() {

    const [issues, setIssues] = useState([]);

    useEffect(() => {
        fetchIssues();
    }, []);

    const fetchIssues = async () => {

        try {

            const response =
                await axios.get(
                    "http://localhost:8080/api/issues/all"
                );

            setIssues(response.data);

        } catch (error) {

            console.error(error);
        }
    };

    const resolveIssue = async (id) => {

        try {

            await axios.put(
                `http://localhost:8080/api/issues/resolve/${id}`
            );

            fetchIssues();

        } catch (error) {

            console.error(error);
        }
    };

    return (

        <div style={{ padding: "20px" }}>

            <h2>Reported Energy Issues</h2>

            <table
                border="1"
                cellPadding="10"
                width="100%"
            >

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Region</th>
                        <th>Issue Type</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {issues.map((issue) => (

                        <tr key={issue.id}>

                            <td>{issue.id}</td>
                            <td>{issue.region}</td>
                            <td>{issue.issueType}</td>
                            <td>{issue.description}</td>
                            <td>{issue.status}</td>

                            <td>

                                {issue.status === "PENDING" && (

                                    <button
                                        onClick={() =>
                                            resolveIssue(issue.id)
                                        }
                                    >
                                        Resolve
                                    </button>

                                )}

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default AdminIssues;