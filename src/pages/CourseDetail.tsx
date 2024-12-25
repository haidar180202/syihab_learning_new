import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
    doc,
    getDoc,
    collection,
    query,
    where,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

const CourseDetail: React.FC = () => {
    const { id } = useParams();
    const [course, setCourse] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [subChapters, setSubChapters] = useState<any[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentSubChapter, setCurrentSubChapter] = useState<any>({
        subChapterName: "",
        details: "",
    });
    const [reloadFlag, setReloadFlag] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const validateUserRole = async () => {
            const storedRole = localStorage.getItem("userRole");
            const uid = localStorage.getItem("userUID");

            if (!storedRole || !uid) {
                handleLogout();
                return;
            }

            if (storedRole === "admin") {
                setIsAdmin(true);
            }
        };

        const fetchCourse = async () => {
            try {
                const courseDoc = await getDoc(doc(db, "courses", id || ""));
                if (courseDoc.exists()) {
                    setCourse(courseDoc.data());
                } else {
                    console.log("Course not found");
                }

                const subChapterQuery = query(
                    collection(db, "master sub bab"),
                    where("courseId", "==", id)
                );
                const subChapterSnapshot = await getDocs(subChapterQuery);
                const fetchedSubChapters = subChapterSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setSubChapters(fetchedSubChapters);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        validateUserRole();
        fetchCourse();
    }, [id, reloadFlag]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            alert("Session expired. You have been logged out.");
            localStorage.removeItem("userRole");
            localStorage.removeItem("userUID");
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);
            alert("Logout failed. Please try again.");
        }
    };

    const handleModalOpen = (subChapter: any = null) => {
        setIsEditMode(!!subChapter);
        setCurrentSubChapter(subChapter || { subChapterName: "", details: "" });
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleSubChapterChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setCurrentSubChapter({ ...currentSubChapter, [name]: value });
    };

    const handleSaveSubChapter = async () => {
        if (!currentSubChapter.subChapterName || !currentSubChapter.details) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            if (isEditMode) {
                const subChapterRef = doc(db, "master sub bab", currentSubChapter.id);
                await updateDoc(subChapterRef, {
                    subChapterName: currentSubChapter.subChapterName,
                    details: currentSubChapter.details,
                });
                alert("Sub-chapter updated successfully.");
                setReloadFlag((prev) => !prev);
            } else {
                await addDoc(collection(db, "master sub bab"), {
                    courseId: id,
                    subChapterName: currentSubChapter.subChapterName,
                    details: currentSubChapter.details,
                });
                alert("Sub-chapter added successfully.");
                setReloadFlag((prev) => !prev);
            }
            setShowModal(false);
        } catch (error) {
            console.error("Error saving sub-chapter:", error);
            alert("Failed to save sub-chapter. Please try again.");
        }
    };

    const handleDeleteSubChapter = async (subChapterId: string) => {
        if (!window.confirm("Are you sure you want to delete this sub-chapter?")) return;

        try {
            await deleteDoc(doc(db, "master sub bab", subChapterId));
            alert("Sub-chapter deleted successfully.");
        } catch (error) {
            console.error("Error deleting sub-chapter:", error);
            alert("Failed to delete sub-chapter. Please try again.");
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="m-2">
            {course ? (
                <div className="card shadow-sm border-0">
                    <div className="card-header bg-primary text-white">
                        <h2 className="mb-0">{course.title}</h2>
                    </div>
                    <div className="card-body">
                        <div className="d-flex flex-column flex-lg-row">
                            <img
                                src={course.image || "https://via.placeholder.com/300"}
                                alt={course.title}
                                className="img-fluid rounded mb-3 mb-lg-0 me-lg-3"
                                style={{ maxWidth: "300px" }}
                            />
                            <p className="text-muted">{course.description}</p>
                        </div>
                        <button
                            className="btn btn-outline-secondary mt-3"
                            onClick={() => navigate("/courses")}
                        >
                            Back to Courses
                        </button>

                        {isAdmin && (
                            <button
                                className="btn btn-success mt-3 ms-2"
                                onClick={() => handleModalOpen()}
                            >
                                Add New Sub-Chapter
                            </button>
                        )}

                        <div className="mt-4">
                            <h4 className="text-secondary">Sub Chapters</h4>
                            <div className="list-group">
                                {subChapters.length > 0 ? (
                                    subChapters.map((sub) => (
                                        <div
                                            key={sub.id}
                                            className="list-group-item d-flex justify-content-between align-items-center"
                                        >
                                            <div>
                                                <h5 className="mb-1">
                                                    <Link
                                                        to={`/course/${sub.courseId}/${sub.id}`}
                                                        className="text-decoration-none text-primary"
                                                    >
                                                        {sub.subChapterName}
                                                    </Link>
                                                </h5>
                                                <p className="mb-1 text-muted">{sub.details}</p>
                                            </div>
                                            {isAdmin && (
                                                <div>
                                                    <button
                                                        className="btn btn-warning btn-sm me-2"
                                                        onClick={() => handleModalOpen(sub)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => handleDeleteSubChapter(sub.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-muted">No sub-chapters available yet.</p>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            ) : (
                <div className="alert alert-danger">Course not found</div>
            )}

            {showModal && (
                <div className="modal show d-block" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {isEditMode ? "Edit Sub-Chapter" : "Add New Sub-Chapter"}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={handleModalClose}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Sub-Chapter Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="subChapterName"
                                        value={currentSubChapter.subChapterName}
                                        onChange={handleSubChapterChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Details</label>
                                    <textarea
                                        className="form-control"
                                        name="details"
                                        rows={3}
                                        value={currentSubChapter.details}
                                        onChange={handleSubChapterChange}
                                    ></textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleModalClose}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleSaveSubChapter}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CourseDetail;
