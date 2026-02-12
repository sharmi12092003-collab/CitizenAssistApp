import React from "react";

function Complaint() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Complaint Page</h2>

      <textarea placeholder="Write your complaint" rows="5" cols="40"></textarea>
      <br /><br />

      <button>Submit Complaint</button>
    </div>
  );
}

export default Complaint;
