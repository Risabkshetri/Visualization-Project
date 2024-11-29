import teachers from '../data.json'
import { useState } from 'react'

function Teacher(){
    const [selectedTeacher, setSelectedTeacher] = useState(null)

    const handleTeacherSelect = (event) => {
        const selectedTeacher = teachers.find(teacher => teacher["Sr. No."] === parseInt(event.target.value))
        setSelectedTeacher(selectedTeacher ?? null)
    }

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <select className="mb-4 p-2 border border-gray-300 rounded-md" onChange={handleTeacherSelect}>
                <option value="">Select a Teacher</option>
                {teachers.map((teacher, index) => (
                    <option key={index} value={teacher["Sr. No."] ? teacher["Sr. No."].toString() : ''}>
                        {teacher["Name of the Teacher"] ? teacher["Name of the Teacher"] : ''}
                    </option>
                ))}
            </select>
            {selectedTeacher && (
                <div className="p-4 bg-white shadow rounded-md">
                    <table className="w-full border-collapse border border-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-2 text-left font-semibold">Detail</th>
                                <th className="p-2 text-left font-semibold">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-2 border-b border-gray-200">Name</td>
                                <td className="p-2 border-b border-gray-200">{selectedTeacher["Name of the Teacher"]}</td>
                            </tr>
                            <tr>
                                <td className="p-2 border-b border-gray-200">Designation</td>
                                <td className="p-2 border-b border-gray-200">{selectedTeacher["Current Designation"]}</td>
                            </tr>
                            <tr>
                                <td className="p-2 border-b border-gray-200">Email</td>
                                <td className="p-2 border-b border-gray-200">{selectedTeacher["Official E-mail"]}</td>
                            </tr>
                            <tr>
                                <td className="p-2 border-b border-gray-200">Mobile</td>
                                <td className="p-2 border-b border-gray-200">{selectedTeacher.Mobile}</td>
                            </tr>
                            <tr>
                                <td className="p-2 border-b border-gray-200">Conference Paper</td>
                                <td className="p-2 border-b border-gray-200">{selectedTeacher["Conference Paper"]}</td>
                            </tr>
                            <tr>
                                <td className="p-2 border-b border-gray-200">Journal Paper</td>
                                <td className="p-2 border-b border-gray-200">{selectedTeacher["Journal Paper"]}</td>
                            </tr>
                            <tr>
                                <td className="p-2 border-b border-gray-200">Book</td>
                                <td className="p-2 border-b border-gray-200">{selectedTeacher["Book"]}</td>
                            </tr>
                            <tr>
                                <td className="p-2 border-b border-gray-200">Book Chapter</td>
                                <td className="p-2 border-b border-gray-200">{selectedTeacher["Book Chapter"]}</td>
                            </tr>
                            <tr>
                                <td className="p-2 border-b border-gray-200">Accepted Publications</td>
                                <td className="p-2 border-b border-gray-200">{selectedTeacher["Accepted Publications"]}</td>
                            </tr>
                            <tr>
                                <td className="p-2 border-b border-gray-200">Total Scopus Publications</td>
                                <td className="p-2 border-b border-gray-200">{selectedTeacher["Total Scopus Publications"] ?? ''}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )

}

export default Teacher;