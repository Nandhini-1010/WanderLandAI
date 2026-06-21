import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [journals, setJournals] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    fetchJournals();
  }, []);

  const fetchJournals = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/journals",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setJournals(response.data.data);
    } catch (error) {
      console.log(
        "ERROR:",
        error.response?.data || error.message
      );
    }
  };

  const createJournal = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/journals",
        {
          title,
          content,
          location,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setContent("");
      setLocation("");

      fetchJournals();
    } catch (error) {
      console.log(
        "ERROR:",
        error.response?.data || error.message
      );
    }
  };

  const updateJournal = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/journals/${editingId}`,
        {
          title,
          content,
          location,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setContent("");
      setLocation("");
      setEditingId(null);

      fetchJournals();
    } catch (error) {
      console.log(
        "ERROR:",
        error.response?.data || error.message
      );
    }
  };

  const deleteJournal = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/journals/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchJournals();
    } catch (error) {
      console.log(
        "ERROR:",
        error.response?.data || error.message
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <h1>🌍 WanderLand AI</h1>

      <button onClick={handleLogout}>
        Logout
      </button>

      <h2>
        {editingId
          ? "Update Journal"
          : "Create Journal"}
      </h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />
      <br />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) =>
          setContent(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) =>
          setLocation(e.target.value)
        }
      />

      <br />
      <br />

      <button
        onClick={
          editingId
            ? updateJournal
            : createJournal
        }
      >
        {editingId
          ? "Update Journal"
          : "Create Journal"}
      </button>

      <hr />

      <h2>My Journals</h2>

      {journals.length === 0 ? (
        <p>No journals found</p>
      ) : (
        journals.map((journal) => (
          <div
            key={journal._id}
            style={{
              border: "1px solid black",
              margin: "10px",
              padding: "10px",
            }}
          >
            <h3>{journal.title}</h3>
            <p>{journal.content}</p>
            <p>📍 {journal.location}</p>

            <button
              onClick={() => {
                setTitle(journal.title);
                setContent(journal.content);
                setLocation(journal.location);
                setEditingId(journal._id);
              }}
            >
              Edit
            </button>

            <button
              onClick={() =>
                deleteJournal(journal._id)
              }
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;