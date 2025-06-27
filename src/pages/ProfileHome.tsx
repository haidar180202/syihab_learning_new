// src/pages/ProfileHome.tsx
import React from "react";
import { Link } from "react-router-dom";

const ProfileHome: React.FC = () => {
    return (
        <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
            {/* Navbar */}
            <nav
                className="navbar navbar-expand-lg"
                style={{ background: "linear-gradient(90deg, #5A8DEE, #3A6FD8)" }}
            >
                <div className="container">
                    <Link className="navbar-brand text-white fw-bold fs-3" to="/">
                        <img src={`../assets/logo.png`} alt="" /> SyihabLearning
                    </Link>
                    <button
                        className="navbar-toggler border-0"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" style={{ filter: "invert(1)" }}></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav gap-3">
                            <li className="nav-item">
                                <Link
                                    className="btn btn-outline-light rounded-pill px-4 fw-semibold"
                                    to="/register"
                                    style={{ transition: "all 0.3s ease" }}
                                >
                                    Register
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className="btn btn-light rounded-pill px-4 fw-semibold"
                                    to="/login"
                                    style={{
                                        color: "#3A6FD8",
                                        boxShadow: "0 4px 15px rgba(58, 111, 216, 0.3)",
                                        transition: "all 0.3s ease",
                                    }}
                                >
                                    Login
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header
                className="text-center py-5"
                style={{
                    background:
                        "radial-gradient(circle at center, #dbeaef 0%, #a7c5eb 80%)",
                    boxShadow: "inset 0 0 50px #ffffffaa",
                }}
            >
                <div className="container">
                    <h1 className="display-4 fw-bold mb-3" style={{ color: "#34495e" }}>
                        Master New Skills with SyihabLearning
                    </h1>
                    <p className="lead mb-4 text-secondary" style={{ maxWidth: "600px", margin: "auto" }}>
                        Platform pembelajaran teknologi terkini dan pemrograman yang didesain untuk para profesional masa depan.
                    </p>
                    <Link
                        to="/courses"
                        className="btn btn-primary btn-lg shadow-lg"
                        style={{
                            backgroundColor: "#3A6FD8",
                            border: "none",
                            borderRadius: "40px",
                            boxShadow: "0 8px 20px rgba(58, 111, 216, 0.4)",
                            transition: "background-color 0.3s ease",
                        }}
                        onMouseOver={e =>
                            ((e.target as HTMLAnchorElement).style.backgroundColor = "#5779f1")
                        }
                        onMouseOut={e =>
                            ((e.target as HTMLAnchorElement).style.backgroundColor = "#3A6FD8")
                        }
                    >
                        Explore Courses
                    </Link>
                </div>
            </header>

            {/* About & Vision Mission Section */}
            <section className="container my-5">
                <div className="row align-items-center gx-5">
                    <div className="col-md-6 mb-4 mb-md-0">
                        <div
                            style={{
                                borderRadius: "15px",
                                overflow: "hidden",
                                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                                transformStyle: "preserve-3d",
                                transition: "transform 0.3s ease",
                            }}
                            className="hover-3d"
                        >
                            <img
                                src="https://picsum.photos/700/500"
                                alt="Learning Scene"
                                className="img-fluid text-center"
                                // style={{ display: "block", width: "100%" }}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h2 className="fw-bold" style={{ color: "#2c3e50" }}>
                            About SyihabLearning
                        </h2>
                        <p className="text-muted fs-5" style={{ lineHeight: "1.7" }}>
                            SyihabLearning adalah platform edukatif yang menyediakan materi pembelajaran teknologi terbaru dengan pendekatan praktis dan interaktif. Kami berfokus membantu Anda untuk menguasai skill yang dibutuhkan di dunia kerja melalui materi yang selalu update dan mudah diakses.
                        </p>
                        <h3 className="mt-4 mb-3 fw-semibold" style={{ color: "#34495e" }}>
                            Vision & Mission
                        </h3>
                        <ul>
                            <li style={{ marginBottom: "8px", fontWeight: "600" }}>
                                <span style={{ color: "#3A6FD8" }}>Vision:</span> Menjadi platform e-learning unggulan yang memberi dampak positif bagi pengembangan sumber daya manusia di bidang teknologi.
                            </li>
                            <li style={{ marginBottom: "8px", fontWeight: "600" }}>
                                <span style={{ color: "#3A6FD8" }}>Mission:</span> Menghadirkan materi pembelajaran interaktif, mentor profesional, dan komunitas yang solid untuk mendukung proses pembelajaran.
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section
                className="py-5"
                style={{
                    background: "linear-gradient(135deg, #e8f0fe 0%, #f4f7ff 100%)",
                    boxShadow: "inset 0 0 100px #ffffffbb",
                }}
            >
                <div className="container text-center">
                    <h2 className="mb-5 fw-bold" style={{ color: "#34495e" }}>
                        Why Choose SyihabLearning?
                    </h2>
                    <div className="row g-4">
                        {[
                            {
                                title: "Expert Instructors",
                                desc: "Materi disusun oleh para ahli berpengalaman.",
                                icon: "👩‍🏫",
                            },
                            {
                                title: "Responsive Platform",
                                desc: "Akses mudah di berbagai perangkat kapan saja.",
                                icon: "📱",
                            },
                            {
                                title: "Community Support",
                                desc: "Dukungan mentoring dan komunitas aktif.",
                                icon: "🤝",
                            },
                            {
                                title: "Updated Content",
                                desc: "Kursus selalu diperbaharui mengikuti tren teknologi.",
                                icon: "⚡",
                            },
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="col-md-3"
                            >
                                <div style={{
                                    background: "#fff",
                                    borderRadius: "15px",
                                    boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
                                    padding: "25px",
                                    transition: "transform 0.3s ease",
                                    cursor: "default",
                                }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLElement).style.transform = "translateY(-10px)";
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                                    }}>
                                    <div style={{ fontSize: "3rem" }} aria-label={item.title}>
                                        {item.icon}
                                    </div>
                                    <h5 className="mt-3 fw-bold" style={{ color: "#3A6FD8" }}>
                                        {item.title}
                                    </h5>
                                    <p className="text-secondary">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="container my-5">
                <h2 className="mb-4 text-center fw-bold" style={{ color: "#2c3e50" }}>
                    Contact Us
                </h2>
                <div className="row justify-content-center">
                    <div
                        className="col-md-6 shadow rounded p-4"
                        style={{ backgroundColor: "#f8faff" }}
                    >
                        <ul className="list-unstyled fs-5 mb-0" style={{ color: "#34495e" }}>
                            <li className="mb-3 d-flex align-items-center gap-3">
                                <span
                                    style={{
                                        fontSize: "1.7em",
                                        color: "#3A6FD8",
                                        userSelect: "none",
                                    }}
                                    aria-label="Email icon"
                                >
                                    📧
                                </span>
                                <span>info@syihablearning.com</span>
                            </li>
                            <li className="mb-3 d-flex align-items-center gap-3">
                                <span
                                    style={{
                                        fontSize: "1.7em",
                                        color: "#3A6FD8",
                                        userSelect: "none",
                                    }}
                                    aria-label="Phone icon"
                                >
                                    📞
                                </span>
                                <span>+62 895 3060 9729</span>
                            </li>
                            <li className="mb-3 d-flex align-items-center gap-3">
                                <span
                                    style={{
                                        fontSize: "1.7em",
                                        color: "#3A6FD8",
                                        userSelect: "none",
                                    }}
                                    aria-label="Location icon"
                                >
                                    📍
                                </span>
                                <span>Jl. Pendidikan No. 123, Palembang, Indonesia</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer
                className="text-center py-3"
                style={{
                    background: "#3A6FD8",
                    color: "white",
                    fontWeight: "600",
                    boxShadow: "0 -5px 15px rgba(58, 111, 216, 0.6)",
                }}
            >
                <div className="container">
                    &copy; 2025 SyihabLearning | All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default ProfileHome;
