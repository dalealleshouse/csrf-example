import React, { useState, useEffect } from "react";

const DataForm: React.FC = () => {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [retrievedData, setRetrievedData] = useState<any>(null);

  useEffect(() => {
    async function fetchToken() {
      const response = await fetch("http://localhost:3001/csrf-token", {
        credentials: "include",
      });
      const data = await response.json();
      setCsrfToken(data.csrfToken);
    }

    fetchToken();
  }, []);

  const handleSubmit = async () => {
    if (!csrfToken) return;

    const response = await fetch("http://localhost:3001/data", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "x-csrf-token": csrfToken,
      },
      body: JSON.stringify({ some: "data" }),
    });

    const data = await response.json();
    setRetrievedData(data);
  };

  return (
    <div>
      <h3>CSRF Token:</h3>
      <p>{csrfToken}</p>
      <button onClick={handleSubmit}>Submit Data</button>
      {retrievedData && (
        <div>
          <h3>Retrieved Data:</h3>
          <pre>{JSON.stringify(retrievedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default DataForm;
