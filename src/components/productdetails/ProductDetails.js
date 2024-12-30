import React, { useEffect, useState } from "react";
import "./ProductDetails.css";

function ProductDetails() {
  const [captainName, setCaptainName] = useState("Loading...");
  const [createdDate, setCreatedDate] = useState("");
  const adminId = "08dd1429-1a89-46a1-8ac2-63423eea437e"; // Admin ID

  useEffect(() => {
    // Fetch data from the API
    fetch("https://localhost:7044/api/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.isSuccess) {
          const adminUser = data.result.find((user) => user.userId === adminId);
          if (adminUser) {
            setCaptainName(adminUser.username);
            setCreatedDate(
              new Date(adminUser.createdDate).toLocaleDateString("en-GB")
            ); // Format date as DD-MM-YYYY
          } else {
            setCaptainName("Not Found");
            setCreatedDate("N/A");
          }
        } else {
          console.error("Failed to fetch users:", data.message);
          setCaptainName("Error fetching captain name");
          setCreatedDate("Error");
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setCaptainName("Error fetching captain name");
        setCreatedDate("Error");
      });
  }, []);

  return (
    <div className="product-details-section">
      <h1>Intranet Portal - FrontEnd</h1>
      <div className="project-info">
        <p>
          <strong>Captain:</strong> {captainName}
        </p>
        <p>
          <strong>Created On:</strong> {createdDate}
        </p>
      </div>
      <p className="project-description">
        Here we will only discuss about the front-end design and front-end
        development.
      </p>
    </div>
  );
}

export default ProductDetails;
