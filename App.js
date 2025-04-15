import React, { useState } from "react";
import "./styles.css";

const stands = ["Stand A", "Stand B", "Stand C"];
const timeSlots = ["08:00", "09:00", "10:00", "11:00", "12:00"];

const contracts = [
  { id: 1, name: "Flight LH123" },
  { id: 2, name: "Flight BA456" },
  { id: 3, name: "Flight AF789" }
];

export default function App() {
  const [schedule, setSchedule] = useState({});

  const handleAssign = (contractId, stand, time) => {
    setSchedule((prev) => ({
      ...prev,
      [`${stand}_${time}`]: contractId
    }));
  };

  return (
    <div className="App">
      <h1>Scheduler</h1>
      <table className="scheduler-table">
        <thead>
          <tr>
            <th>Time</th>
            {stands.map((stand) => (
              <th key={stand}>{stand}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((time) => (
            <tr key={time}>
              <td>{time}</td>
              {stands.map((stand) => {
                const assigned = schedule[`${stand}_${time}`];
                const contract = contracts.find((c) => c.id === assigned);
                return (
                  <td key={stand}>
                    {contract ? contract.name : <span>Available</span>}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Unassigned Flights</h2>
      {contracts.map((contract) => (
        <div key={contract.id} className="contract-box">
          <strong>{contract.name}</strong>
          <div className="assign-buttons">
            {timeSlots.map((time) =>
              stands.map((stand) => (
                <button
                  key={`${stand}_${time}`}
                  onClick={() => handleAssign(contract.id, stand, time)}
                >
                  {stand} @ {time}
                </button>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
