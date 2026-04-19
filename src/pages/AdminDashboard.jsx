import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

export default function AdminDashboard() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMessages() {
      try {
        const res = await fetch(`${API}/api/contact/messages`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (res.status === 401) {
          localStorage.removeItem("token");
          navigate("/admin-login");
          return;
        }

        if (!res.ok) throw new Error("Failed to fetch messages");

        const data = await res.json();
        setMessages(data);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchMessages();
  }, [navigate]);

  return (
    <div className="container mt-5">
      <button
        className="btn btn-danger mb-3"
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/admin-login");
        }}
      >
        Logout
      </button>

      <h2>Messages</h2>

      {error && <p className="text-danger">{error}</p>}

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg) => (
            <tr key={msg._id}>
              <td>{msg.name}</td>
              <td>{msg.email}</td>
              <td>{msg.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}