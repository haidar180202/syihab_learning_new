import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, collection, addDoc, query, where, getDocs, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { isAuthorized } from "./auth/AuthValidation";

const SubChapterDetail: React.FC = () => {
    const { subChapterId } = useParams(); // Ambil subChapterId dari URL
    const navigate = useNavigate(); // Untuk navigasi antar halaman
    const [subChapter, setSubChapter] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState("");
    const [contentType, setContentType] = useState("text"); // "text", "image", atau "video"
    const [error, setError] = useState("");
    const [details, setDetails] = useState<any[]>([]);

    const requiredRoles = ["admin", "editor"]; // Hak akses yang diperlukan

    useEffect(() => {
        // Fungsi untuk memvalidasi pola subChapterId
        const isValidSubChapterId = (id: string | undefined) => {
            // Contoh validasi: hanya alfanumerik sepanjang 20 karakter
            return id && /^[A-Za-z0-9]{20}$/.test(id);
        };

        // Jika subChapterId tidak valid, arahkan ke halaman 404
        if (!isValidSubChapterId(subChapterId)) {
            navigate("/404");
            return;
        }

        // Fetch data sub-chapter dari Firestore
        const fetchSubChapter = async () => {
            try {
                const docRef = doc(db, "master sub bab", subChapterId || "");
                const subChapterDoc = await getDoc(docRef);

                if (subChapterDoc.exists()) {
                    setSubChapter(subChapterDoc.data());
                } else {
                    console.error("Sub-chapter not found");
                    navigate("/404");
                }
            } catch (error) {
                console.error("Error fetching sub-chapter:", error);
            }
        };

        // Fetch detail konten terkait sub-chapter dari Firestore
        const fetchDetails = async () => {
            try {
                const collectionRef = collection(db, "master sub detail");
                const q = query(collectionRef, where("subChapterId", "==", subChapterId));
                const querySnapshot = await getDocs(q);

                const detailsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setDetails(detailsData);
            } catch (error) {
                console.error("Error fetching details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSubChapter();
        fetchDetails();
    }, [subChapterId, navigate]);

    // Fungsi untuk menambahkan konten baru
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!content) {
            setError("Content cannot be empty.");
            return;
        }

        try {
            const collectionRef = collection(db, "master sub detail");
            await addDoc(collectionRef, {
                subChapterId,
                content,
                contentType,
                createdAt: new Date(),
            });
            setContent("");
            setContentType("text");
            setError("");
            alert("Content added successfully!");
            window.location.reload(); // Reload halaman untuk data terbaru
        } catch (error) {
            console.error("Error adding content:", error);
            setError("Failed to add content. Please try again later.");
        }
    };

    // Fungsi untuk menghapus konten
    const handleDelete = async (id: string) => {
        if (!isAuthorized(requiredRoles)) {
            alert("Access denied. You do not have permission to perform this action.");
            return;
        }

        try {
            const docRef = doc(db, "master sub detail", id);
            await deleteDoc(docRef);
            alert("Content deleted successfully!");
            setDetails(details.filter((detail) => detail.id !== id));
        } catch (error) {
            console.error("Error deleting content:", error);
            alert("Failed to delete content. Please try again later.");
        }
    };

    // Fungsi untuk mengedit konten
    const handleEdit = async (id: string, updatedContent: string) => {
        if (!isAuthorized(requiredRoles)) {
            alert("Access denied. You do not have permission to perform this action.");
            return;
        }

        try {
            const docRef = doc(db, "master sub detail", id);
            await updateDoc(docRef, { content: updatedContent });
            alert("Content updated successfully!");
            setDetails(
                details.map((detail) =>
                    detail.id === id ? { ...detail, content: updatedContent } : detail
                )
            );
        } catch (error) {
            console.error("Error updating content:", error);
            alert("Failed to update content. Please try again later.");
        }
    };

    // Tampilkan spinner jika data masih dalam proses loading
    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    // Jika user tidak memiliki hak akses
    if (!isAuthorized(requiredRoles)) {
        return (
            <div className="m-4 card">
                <div className="m-2">
                    <h4 className="text-primary">{subChapter?.subChapterName}</h4>
                    <p className="text-muted">{subChapter?.details}</p>

                    <hr />
                    {details.map((detail) => (
                        <div key={detail.id} className="list-group-item">
                            <div>
                                {/* <strong>{detail.contentType}:</strong>  */}

                                {detail.contentType == 'text' ? (
                                <div className="text-dark m-2">{detail.content}</div>
                                ) : ""}
                                
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Tampilan utama halaman
    return (
        <div className="container mt-4">
            <h1 className="text-primary">{subChapter?.subChapterName}</h1>
            <p className="text-muted">{subChapter?.details}</p>

            <hr />

            <h3>Add New Content</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="contentType" className="form-label">
                        Content Type
                    </label>
                    <select
                        id="contentType"
                        className="form-select"
                        value={contentType}
                        onChange={(e) => setContentType(e.target.value)}
                    >
                        <option value="text">Text</option>
                        <option value="image">Image URL</option>
                        <option value="video">Video URL</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="content" className="form-label">
                        Content
                    </label>
                    <textarea
                        id="content"
                        className="form-control"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={5}
                    ></textarea>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <button type="submit" className="btn btn-primary">
                    Add Content
                </button>
            </form>

            <hr />

            <h3>Existing Contents</h3>
            <ul className="list-group">
                {details.map((detail) => (
                    <li key={detail.id} className="list-group-item">
                        <div>
                            <strong>{detail.contentType}:</strong> {detail.content}
                        </div>
                        <button
                            className="btn btn-danger btn-sm me-2"
                            onClick={() => handleDelete(detail.id)}
                        >
                            Delete
                        </button>
                        <button
                            className="btn btn-warning btn-sm"
                            onClick={() => {
                                const updatedContent = prompt("Edit Content", detail.content);
                                if (updatedContent) handleEdit(detail.id, updatedContent);
                            }}
                        >
                            Edit
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SubChapterDetail;
