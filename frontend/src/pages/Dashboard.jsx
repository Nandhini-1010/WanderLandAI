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
  const [image, setImage] = useState(null);
  const [aiEnhancement, setAiEnhancement] =useState("");

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

      let imageUrl = "";

      // Upload image to Cloudinary first
      if (image) {
        const formData = new FormData();
        formData.append("image", image);

        const uploadResponse = await axios.post(
          "http://localhost:5000/api/upload",
          formData
        );

        imageUrl = uploadResponse.data.imageUrl;
      }

      console.log("AI Content Enhancer:", aiEnhancement);
      await axios.post(
        "http://localhost:5000/api/journals",
        {
          title,
          content,
          location,
          images: imageUrl ? [imageUrl] : [],
          aiEnhancement,
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
      setImage(null);
      setAiEnhancement("");

      fetchJournals();
    } catch (error) {
      console.log(
        "ERROR:",
        error.response?.data || error.message
      );
    }
  };

  const generateSummary = async () => {
  try {
    const response =
      await axios.post(
        "http://localhost:5000/api/ai/summary",
        {
          content,
        }
      );

    setAiEnhancement(
      response.data.summary
    );
  } catch (error) {
    console.log(
      "ERROR:",
      error.response?.data ||
        error.message
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
        <h1 className="text-center mb-4">WanderLand AI</h1>
        <div className="card p-4 shadow-sm mb-4 mx-auto" style={{ maxWidth: "800px" }}>
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

          <input
            type="file"
            className="form-control mb-3"
            onChange={(e) =>
              setImage(e.target.files[0])
            }
          />
          
            <button
              className="btn btn-success mb-3"
              onClick={generateSummary}
            >
              ✨ Content Enhancer
            </button>

            {aiEnhancement && (
            <div className="alert alert-info">
              <strong>
                AI Content Enhancer:
              </strong>
              <br />
              {aiEnhancement}
            </div>
          )}

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

        <h2 className="mb-3 mt-5">My Journals</h2>

        {journals.length === 0 ? (
          <p>No journals found</p>
        ) : (
          journals.map((journal) => (
            <div
              key={journal._id}
              className="card mb-3 shadow-sm"
            >
              <div className="card-body">
                <div className="row">
                  {journal.images && journal.images.length > 0 && (
                    <div className="col-md-4">
                      <img
                        src={journal.images[0]}
                        alt="journal"
                        className="img-fluid rounded"
                        style={{
                          maxHeight: "250px",
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  )}
                  <div className={journal.images && journal.images.length > 0 ? "col-md-8" : "col-12"}>
                    <h4>{journal.title}</h4>
                    <p>{journal.content}</p>
                    {journal.aiEnhancement && (<div className="alert alert-secondary">🤖 {journal.aiEnhancement}</div>)}
                    <p className="text-muted mb-3">
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
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Dashboard;