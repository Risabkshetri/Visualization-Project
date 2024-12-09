import teachers from '../data.json'
import { useState } from 'react'

function Teacher(){
    const [selectedTeacher, setSelectedTeacher] = useState(null)

    const handleTeacherSelect = (event) => {
        const selectedTeacher = teachers.find(teacher => teacher["Sr. No."] === parseInt(event.target.value))
        setSelectedTeacher(selectedTeacher ?? null)
    }

    return (
        <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800">
            <select className="mb-4 p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white" onChange={handleTeacherSelect}>
                <option value="">Select a Teacher</option>
                {teachers.map((teacher, index) => (
                    <option key={index} value={teacher["Sr. No."] ? teacher["Sr. No."].toString() : ''}>
                        {teacher["Name of the Teacher"] ? teacher["Name of the Teacher"] : ''}
                    </option>
                ))}
            </select>
            {selectedTeacher && (
                <div className="p-4 bg-white dark:bg-gray-700 shadow rounded-md">
                    <table className="w-full border-collapse border border-gray-200 bg-white dark:bg-gray-600">
                        <thead className="bg-gray-100 dark:bg-gray-500">
                            <tr>
                                <th className="p-2 text-left font-semibold text-black dark:text-white">Detail</th>
                                <th className="p-2 text-left font-semibold text-black dark:text-white">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-2 border-b border-gray-200 text-black dark:text-white">Name</td>
                                <td className="p-2 border-b border-gray-200 text-black dark:text-white">{selectedTeacher["Name of the Teacher"]}</td>
                            </tr>
                            <tr>
                                <td className="p-2 border-b border-gray-200 text-black dark:text-white">Designation</td>
                                <td className="p-2 border-b border-gray-200 text-black dark:text-white">{selectedTeacher["Current Designation"]}</td>
                            </tr>
                            <tr>
                                <td className="p-2 border-b border-gray-200 text-black dark:text-white">Email</td>
                                <td className="p-2 border-b border-gray-200 text-black dark:text-white">{selectedTeacher["Official E-mail"]}</td>
                            </tr>
                            <tr>
                                <td className="p-2 border-b border-gray-200 text-black dark:text-white">Mobile</td>
                                <td className="p-2 border-b border-gray-200 text-black dark:text-white">{selectedTeacher.Mobile}</td>
                            </tr>
                            <tr>
                                <td className="p-2 border-b border-gray-200 text-black dark:text-white">Conference Paper</td>
                                <td className="p-2 border-b border-gray-200 text-black dark:text-white">{selectedTeacher["Conference Paper"]}</td>
                            </tr>
                            <tr>
                                <td className="p-2 border-b border-gray-200 text-black dark:text-white">Journal Paper</td>
                                <td className="p-2 border-b border-gray-200 text-black dark:text-white">{selectedTeacher["Journal Paper"]}</td>
                            </tr>
                            <tr>
                                <td className="p-2 border-b border-gray-200 text-black dark:text-white">Book</td>
                                <td className="p-2 border-b border-gray-200 text-black dark:text-white">{selectedTeacher["Book"]}</td>
                            </tr>
                            <tr>
                                <td className="p-2 border-b border-gray-200 text-black dark:text-white">Book Chapter</td>
                                <td className="p-2 border-b border-gray-200 text-black dark:text-white">{selectedTeacher["Book Chapter"]}</td>
                            </tr>
                            <tr>
                                <td className="p-2 border-b border-gray-200 text-black dark:text-white">Accepted Publications</td>
                                <td className="p-2 border-b border-gray-200 text-black dark:text-white">{selectedTeacher["Accepted Publications"]}</td>
                            </tr>
                            <tr>
                                <td className="p-2 border-b border-gray-200 text-black dark:text-white">Total Scopus Publications</td>
                                <td className="p-2 border-b border-gray-200 text-black dark:text-white">{selectedTeacher["Total Scopus Publications"] ?? ''}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )

}

export default Teacher;