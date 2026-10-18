import React, { useState } from "react";
import axios from "axios";

function ReportIssue() {

  const [region, setRegion] = useState("");
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:8080/api/issues/report",
        {
          region,
          issueType,
          description
        }
      );

      alert("Issue Reported Successfully!");

      setRegion("");
      setIssueType("");
      setDescription("");

    } catch (error) {
      console.error(error);
      alert("Failed to Report Issue");
    }
  };

  return (
    <div className="container">

      <h2>Report Energy Issue</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Region"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="text"
          placeholder="Issue Type"
          value={issueType}
          onChange={(e) => setIssueType(e.target.value)}
          required
        />

        <br /><br />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <br /><br />

        <button type="submit">
          Submit Issue
        </button>

      </form>

    </div>
  );
}

export default ReportIssue;