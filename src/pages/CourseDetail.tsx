import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

const CourseDetail: React.FC = () => {
    const { id } = useParams(); // Mendapatkan ID dari URL
    const [course, setCourse] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [subChapter, setSubChapter] = useState({
        subChapterName: "",
        details: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        // Pengecekan role user
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

        // Fetch kursus berdasarkan ID
        const fetchCourse = async () => {
            try {
                const courseDoc = await getDoc(doc(db, "courses", id || ""));
                if (courseDoc.exists()) {
                    setCourse(courseDoc.data());
                } else {
                    console.log("Course not found");
                }
            } catch (error) {
                console.error("Error fetching course:", error);
            } finally {
                setLoading(false);
            }
        };

        validateUserRole();
        fetchCourse();
    }, [id]);

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

    const handleSubChapterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setSubChapter({ ...subChapter, [name]: value });
    };

    const handleAddSubChapter = async () => {
        if (!subChapter.subChapterName || !subChapter.details) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            await addDoc(collection(db, "master sub bab"), {
                courseId: id,
                subChapterName: subChapter.subChapterName,
                details: subChapter.details,
            });
            alert("Sub-chapter added successfully.");
            setSubChapter({ subChapterName: "", details: "" }); // Reset form
        } catch (error) {
            console.error("Error adding sub-chapter:", error);
            alert("Failed to add sub-chapter. Please try again.");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container my-5">
            {course ? (
                <>
                    <h2 className="text-primary">{course.title}</h2>
                    <img
                        src={course.image || "https://via.placeholder.com/300"}
                        alt={course.title}
                        className="img-fluid"
                    />
                    <p>{course.description}</p>
                    {isAdmin && (
                        <div>
                            <button
                                className="btn btn-warning"
                                onClick={() => navigate(`/course/edit/${id}`)}
                            >
                                Add Course
                            </button>
                            <button
                                className="btn btn-danger ms-2"
                                onClick={() => {
                                    // Tambahkan logika untuk menghapus course
                                }}
                            >
                                Delete Course
                            </button>
                        </div>
                    )}

                    {isAdmin && (
                        <div className="mt-4">
                            <h3>Add New Sub-Chapter</h3>
                            <div className="mb-3">
                                <label className="form-label">Sub-Chapter Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="subChapterName"
                                    value={subChapter.subChapterName}
                                    onChange={handleSubChapterChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Details</label>
                                <textarea
                                    className="form-control"
                                    name="details"
                                    rows={3}
                                    value={subChapter.details}
                                    onChange={handleSubChapterChange}
                                ></textarea>
                            </div>
                            <button className="btn btn-primary" onClick={handleAddSubChapter}>
                                Add Sub-Chapter
                            </button>
                        </div>
                    )}

                    {course.sections && course.sections.length > 0 ? (
                        <div className="mt-4">
                            <h3>Course Sections</h3>
                            {course.sections.map((section: any, index: number) => (
                                <div key={index} className="section">
                                    <h4>{section.sectionTitle}</h4>
                                    <p>{section.content}</p>
                                    {isAdmin && (
                                        <button
                                            className="btn btn-warning"
                                            onClick={() => navigate(`/course/edit-section/${id}/${index}`)}
                                        >
                                            Edit Section
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No sections available yet.</p>
                    )}
                </>
            ) : (
                <p>Course not found</p>
            )}
        </div>
    );
};

export default CourseDetail;
