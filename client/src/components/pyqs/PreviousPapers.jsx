import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Collapsible from '@edonec/collapsible'; // Importing Collapsible component
import '@edonec/collapsible/build/index.css'; // Importing Collapsible styles
import '@edonec/collapsible/build/icons.css'; // Importing Collapsible icons
import "./styles.css"

const PreviousPapers = () => {
    const [pyqData, setPyqData] = useState([]);

    // Fetch PYQs on component mount
    useEffect(() => {
        const fetchPYQs = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/v1/pyq/getPYQs', {
                    params: { branchName: "CSE" } // Fetching only for CSE
                });
                setPyqData(response.data);
            } catch (error) {
                console.error('Error fetching PYQs:', error);
            }
        };
        fetchPYQs();
    }, []);

    // Helper function to group PYQs by course
    const groupByCourse = (data) => {
        return data.reduce((acc, current) => {
            const { courseName, type } = current;
            if (!acc[courseName]) {
                acc[courseName] = {};
            }
            if (!acc[courseName][type]) {
                acc[courseName][type] = [];
            }
            acc[courseName][type].push(current);
            return acc;
        }, {});
    };

    const groupedPYQs = groupByCourse(pyqData);

    return (
        <div id="pyqs">
            {Object.keys(groupedPYQs).map((courseName, courseIndex) => (
                <Collapsible header={courseName} key={courseIndex}>
                    {Object.keys(groupedPYQs[courseName]).map((examType, typeIndex) => (
                        <Collapsible header={examType} key={typeIndex}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Batch</th>
                                        <th>Professor</th>
                                        <th>Link</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {groupedPYQs[courseName][examType].map((pyq, index) => (
                                        <tr key={index}>
                                            <td>{pyq.batch}</td>
                                            <td>{pyq.profName}</td>
                                            <td>
                                                <a href={pyq.link} target="_blank" rel="noopener noreferrer">Download</a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Collapsible>
                    ))}
                </Collapsible>
            ))}
        </div>
    );
};

export default PreviousPapers;
