import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

const Course: React.FC = () => {
    const [courses, setCourses] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "courses"));
                const courseList: any[] = [];
                querySnapshot.forEach((doc) => {
                    courseList.push(doc.data());
                });
                setCourses(courseList);
            } catch (err) {
                console.error("Error fetching courses: ", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

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
                            <div className="col-12 col-md-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search courses..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
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
                                {filteredCourses.map((course, index) => (
                                    <div className="col-12 col-md-4 mb-4" key={index}>
                                        <div className="card shadow-sm h-100">
                                            <img
                                                src={course.image || "https://via.placeholder.com/300"}
                                                className="card-img-top"
                                                alt={course.title}
                                            />
                                            <div className="card-body">
                                                <h5 className="card-title">{course.title}</h5>
                                                <p className="card-text">{course.description}</p>
                                                <Link to={`/course/${course.id}`} className="btn btn-primary w-100">
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>

    );
};

export default Course;
