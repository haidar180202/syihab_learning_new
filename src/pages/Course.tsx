import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, getDocs, doc, getDoc, addDoc } from "firebase/firestore";
import { db, auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

const Course: React.FC = () => {
    const [courses, setCourses] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [newCourse, setNewCourse] = useState({
        title: "",
        description: "",
        image: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        const validateUserRole = async () => {
            const storedRole = localStorage.getItem("userRole");
            const uid = localStorage.getItem("userUID");

            if (!storedRole || !uid) {
                handleLogout();
                return;
            }

            try {
                const userDoc = await getDoc(doc(db, "users", uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    const dbRole = userData?.role;

                    if (storedRole !== dbRole) {
                        handleLogout();
                    } else if (dbRole === "admin") {
                        setIsAdmin(true);
                    }
                } else {
                    handleLogout();
                }
            } catch (error) {
                console.error("Error validating user role:", error);
                handleLogout();
            }
        };

        const fetchCourses = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "courses"));
                const courseList: any[] = [];
                querySnapshot.forEach((doc) => {
                    courseList.push({ id: doc.id, ...doc.data() });
                });
                setCourses(courseList);
            } catch (err) {
                console.error("Error fetching courses: ", err);
            } finally {
                setLoading(false);
            }
        };

        validateUserRole();
        fetchCourses();
    }, []);

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

    const handleAddCourse = async () => {
        if (!newCourse.title.trim() || !newCourse.description.trim()) {
            alert("Course title and description are required!");
            return;
        }

        setIsAdding(true);

        try {
            const docRef = await addDoc(collection(db, "courses"), {
                ...newCourse,
                image: newCourse.image.trim() || "",
                createdAt: new Date(),
            });

            alert("Course added successfully!");
            setCourses((prevCourses) => [
                ...prevCourses,
                { id: docRef.id, ...newCourse },
            ]);
            setNewCourse({ title: "", description: "", image: "" });
            setShowModal(false);
        } catch (err) {
            console.error("Error adding course:", err);
            alert("Failed to add course. Please try again.");
        } finally {
            setIsAdding(false);
        }
    };

    const filteredCourses = courses.filter((course) =>
        course.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
                <Header />
                <main className="container my-5">
                    <div className="container py-5">
                        <div className="row mb-4">
                            <div className="col-12 col-md-6">
                                <h2 className="text-primary">Courses</h2>
                                <p className="text-muted">Find the best courses to boost your skills</p>
                            </div>
                            <div className="col-12 col-md-6 d-flex justify-content-end">
                                <input
                                    type="text"
                                    className="form-control me-2"
                                    placeholder="Search courses..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                {isAdmin && (
                                    <button
                                        className="btn btn-success"
                                        onClick={() => setShowModal(true)}
                                    >
                                        Add Course
                                    </button>
                                )}
                            </div>
                        </div>

                        {loading ? (
                            <div className="text-center">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            <div className="row">
                                {filteredCourses.map((course) => (
                                    <div className="col-12 col-md-4 mb-4" key={course.id}>
                                        <div className="card shadow-sm h-100">
                                            <img
                                                src={course.image || "https://via.placeholder.com/300"}
                                                className="card-img-top"
                                                alt={course.title}
                                            />
                                            <div className="card-body">
                                                <h5 className="card-title">{course.title}</h5>
                                                <p className="card-text">{course.description}</p>
                                                <Link
                                                    to={`/course/${course.id}`}
                                                    className="btn btn-primary w-100"
                                                >
                                                    View Details
                                                </Link>
                                                {isAdmin && (
                                                    <Link
                                                        to={`/course/edit/${course.id}`}
                                                        className="btn btn-secondary w-100 mt-2"
                                                    >
                                                        Edit Course
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </main>

                {/* Modal for Adding Course */}
                {showModal && (
                    <div className="modal show d-block" tabIndex={-1} role="dialog">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Add New Course</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => setShowModal(false)}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="title"
                                            value={newCourse.title}
                                            onChange={(e) =>
                                                setNewCourse((prev) => ({
                                                    ...prev,
                                                    title: e.target.value,
                                                }))
                                            }
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">
                                            Description
                                        </label>
                                        <textarea
                                            className="form-control"
                                            id="description"
                                            rows={3}
                                            value={newCourse.description}
                                            onChange={(e) =>
                                                setNewCourse((prev) => ({
                                                    ...prev,
                                                    description: e.target.value,
                                                }))
                                            }
                                        ></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="image" className="form-label">
                                            Image URL
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="image"
                                            value={newCourse.image}
                                            onChange={(e) =>
                                                setNewCourse((prev) => ({
                                                    ...prev,
                                                    image: e.target.value,
                                                }))
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className={`btn btn-primary ${isAdding ? "disabled" : ""}`}
                                        onClick={!isAdding ? handleAddCourse : undefined}
                                    >
                                        {isAdding ? (
                                            <span
                                                className="spinner-border spinner-border-sm"
                                                role="status"
                                                aria-hidden="true"
                                            ></span>
                                        ) : (
                                            "Save"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Course;