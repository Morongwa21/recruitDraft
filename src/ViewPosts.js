import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './components/ProRecr.css';

const ViewPosts = () => {
    const navigate = useNavigate();
    const [vacancies] = useState(['Vacancy 1', 'Vacancy 2', 'Vacancy 3']); // Example vacancies data, replace with actual data or state

    const handleVacancyClick = (vacancyId) => {
        // Handle click on a vacancy item (optional)
        // Example: navigate(`/vacancy/${vacancyId}`);
    };

    return (
        <div>
            <div className="brand-text">IKUSASATECH</div>
            <div className="title-text">Vacancies Available</div>

            <div className="cv-container">
                {vacancies.length > 0 ? (
                    <div className="vacancies-list">
                        {vacancies.map((vacancy, index) => (
                            <div
                                key={index}
                                className="vacancy-item"
                                onClick={() => handleVacancyClick(index + 1)}
                            >
                                {vacancy}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-vacancies-text">No vacancies posted yet!</div>
                )}
            </div>
        </div>
    );
};

export default ViewPosts;
