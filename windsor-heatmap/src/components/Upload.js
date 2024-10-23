import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Upload = () => {
    //sets our variables
    const [formData, setFormData] = useState({
        serviceRequest: "",
        department: "",
        address: "",
        street: "",
        description: ""
    });

    //sets a service request to a department
    const serviceRequests = {
        "3 Day Parking Infraction": "Parking Enforcement",
        "Abandoned Vehicle": "Parking Enforcement",
        "Accessibility Concerns - Buildings": "Building Services",
        "Alley Repair / Flooding": "Contracts, Field Services and Maintenance",
        "Building / Land - Improper Use": "Building Services",
        "Building Condition Complaint": "Building Services",
        "Construction Site Conditions": "Building Services",
        "Curb Complaint": "Contracts, Field Services and Maintenance",
        "Dead Animal Removal": "Environmental Services",
        "Dead Cat or Dog": "Humane Society",
        "Dirty Yard / Alley": "Policy, Gaming, Licencing and Bylaw Enforcement",
        "Dog Complaint": "Policy, Gaming, Licencing and Bylaw Enforcement",
        "Dog Complaint - Humane Society": "Humane Society",
        "Downspout Disconnect Service": "Contracts, Field Services and Maintenance",
        "Drainage": "Contracts, Field Services and Maintenance",
        "Fence / Hedge Concerns": "Building Services",
        "Garbage Not Collected": "Environmental Services",
        "Garbage Preparation Issues": "Policy, Gaming, Licencing and Bylaw Enforcement",
        "Graffiti Complaint": "Parks Operations",
        "Illegal Dumping Public Property": "Environmental Services",
        "Keeping of Animals": "Policy, Gaming, Licencing and Bylaw Enforcement",
        "Lighting Issues - City Facilities": "Facilities",
        "Litter Bin - Request for New Bin": "Environmental Services",
        "Litter Bin Request for Service": "Environmental Services",
        "Noise Complaint": "Policy, Gaming, Licencing and Bylaw Enforcement",
        "Parking Meter Issues": "Traffic",
        "Parks - Playground Issues": "Parks Operations",
        "Parks Maintenance": "Parks Operations",
        "Pothole on Road": "Contracts, Field Services and Maintenance",
        "Property Flooding/Grading Complaint": "Building Services",
        "Protection of Parks": "Policy, Gaming, Licencing and Bylaw Enforcement",
        "Recycling Not Collected": "Environmental Services",
        "Road Cave-In": "Contracts, Field Services and Maintenance",
        "Road Maintenance": "Contracts, Field Services and Maintenance",
        "Rodent Extermination Program": "Environmental Services",
        "Sewer Issues / Road Flooding": "Contracts, Field Services and Maintenance",
        "Sewer Project Restoration Issues": "Contracts, Field Services and Maintenance",
        "Shoulder Repairs & Service": "Contracts, Field Services and Maintenance",
        "Sidewalk Repair": "Contracts, Field Services and Maintenance",
        "Sign Complaint - Portable": "Policy, Gaming, Licencing and Bylaw Enforcement",
        "Skunk Inspection": "Environmental Services",
        "Snow & Ice - Dumping on Road/Alley": "Policy, Gaming, Licencing and Bylaw Enforcement",
        "Snow Plowing & Salting Request": "Contracts, Field Services and Maintenance",
        "Snow Removal - Emergency": "Contracts, Field Services and Maintenance",
        "Tree Maintenance": "Forestry and Natural Areas",
        "Yard Waste Not Collected": "Environmental Services"
    };
    
    

    //handles the department change for the service request
    const handleChange = (e) => {
        const { name, value } = e.target;

       
        if (name === "serviceRequest") {
            setFormData(prevData => ({
                ...prevData,
                serviceRequest: value,
                department: serviceRequests[value] || "" 
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };
    
    //handles the submit and will fetch from our python to receive updated json but does nothing for now
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("/api/uploadData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });
        
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-grow flex items-center justify-center bg-gray-100">
                <div className="container max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg flex flex-col md:flex-row md:space-x-6">
                    {/* Form Section */}
                    <div className="w-full md:w-2/3 p-6">
                        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Submit Service Request</h1>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex flex-col">
                                <label className="text-gray-700 font-medium">Service Request</label>
                                <select
                                    name="serviceRequest"
                                    value={formData.serviceRequest}
                                    onChange={handleChange}
                                    className="border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    <option value="">Select a request</option>
                                    {Object.keys(serviceRequests).map((request) => (
                                        <option key={request} value={request}>{request}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-col">
                                <label className="text-gray-700 font-medium">Department</label>
                                <input
                                    type="text"
                                    name="department"
                                    value={formData.department}
                                    readOnly
                                    className="border border-gray-300 p-2 rounded-md bg-gray-100 shadow-sm"
                                />
                            </div>

                            {/* Split Address and Street for easier json */}
                            <div className="flex flex-col md:flex-row md:space-x-4">
                                <div className="flex flex-col w-full">
                                    <label className="text-gray-700 font-medium">Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        onChange={handleChange}
                                        className="border border-gray-300 p-2 rounded-md shadow-sm"
                                    />
                                </div>
                                <div className="flex flex-col w-full">
                                    <label className="text-gray-700 font-medium">Street</label>
                                    <input
                                        type="text"
                                        name="street"
                                        onChange={handleChange}
                                        className="border border-gray-300 p-2 rounded-md shadow-sm"
                                    />
                                </div>
                            </div>
                            {/*Keep description for *peace of mind* make them think the desc matters but dont take it*/}
                            <div className="flex flex-col">
                                <label className="text-gray-700 font-medium">Description</label>
                                <textarea
                                    name="description"
                                    onChange={handleChange}
                                    className="border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    rows="3"
                                ></textarea>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-bold hover:bg-blue-700 transition duration-300"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Right Side Text Section */}
                    <div className="w-full md:w-1/3 bg-gray-50 p-6 rounded-lg shadow-md flex flex-col justify-center">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Important Information</h2>
                        <p className="text-gray-600 mb-2">
                            Please provide accurate details to ensure that your request is processed quickly and effectively.
                        </p>
                        <p className="text-gray-600">
                            After submission, your request will be updated on the map within 1-2 minutes.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Upload;
