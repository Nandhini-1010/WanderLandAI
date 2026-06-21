import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

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

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <div className="card p-4 shadow-sm mb-4">
          <h2 className="mb-4">
            {editingId
              ? "Update Journal"
              : "Create Journal"}
          </h2>

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <textarea
            className="form-control mb-3"
            rows="4"
            placeholder="Content"
            value={content}
            onChange={(e) =>
              setContent(e.target.value)
            }
          />

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Location"
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
          />

          <button
            className="btn btn-primary"
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
        </div>

        <h2 className="mb-3">My Journals</h2>

        {journals.length === 0 ? (
          <p>No journals found</p>
        ) : (
          journals.map((journal) => (
            <div
              key={journal._id}
              className="card mb-3 shadow-sm"
            >
              <div className="card-body">
                <h4>{journal.title}</h4>

                <p>{journal.content}</p>

                <p className="text-muted">
                  📍 {journal.location}
                </p>

                <button
                  className="btn btn-warning me-2"
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
                  className="btn btn-danger"
                  onClick={() =>
                    deleteJournal(journal._id)
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Dashboard;