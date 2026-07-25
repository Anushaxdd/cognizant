import React from "react";

function App() {
  const officeList = [
    {
      name: "Tech Park",
      rent: 55000,
      address: "Bangalore",
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600"
    },
    {
      name: "Cyber Towers",
      rent: 75000,
      address: "Hyderabad",
      image:
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600"
    },
    {
      name: "Business Hub",
      rent: 45000,
      address: "Chennai",
      image:
        "https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=600"
    }
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Office Space Rental App</h1>

      {officeList.map((office, index) => (
        <div
          key={index}
          style={{
            border: "1px solid black",
            marginBottom: "20px",
            padding: "15px",
            width: "350px"
          }}
        >
          <img
            src={office.image}
            alt={office.name}
            width="300"
            height="200"
          />

          <h2>{office.name}</h2>

          <h3
            style={{
              color: office.rent < 60000 ? "red" : "green"
            }}
          >
            Rent: ₹{office.rent}
          </h3>

          <p>
            <strong>Address:</strong> {office.address}
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;