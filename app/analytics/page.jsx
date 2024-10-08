'use client'

import React, { useState, useEffect } from 'react';
import { useSession } from "@/app/context/authContext"
import ProtectedRoute from '@/components/auth/protectedRoute'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const severityLabels = {
    0: 'LOW',
    1: 'NORMAL',
    2: 'HIGH',
    3: 'IMMEDIATE',
}

export default function ChartPage() {
    const [severityData, setSeverityData] = useState({ LOW: 0, NORMAL: 0, HIGH: 0, IMMEDIATE: 0 });
    const { user, Logout } = useSession()

    
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

    useEffect(() => {
        const fetchLogs = async () => {
            if (user)
            {
                try
                {
                    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
                    const response = await axios.get(`${baseUrl}/api/logs/${user.id}`)
                    const logs = response.data

                    const severityCount = logs.reduce((acc, log) => {
                        const severityLabel = severityLabels[log.severity]; // Map the number to its label
                        acc[severityLabel] = (acc[severityLabel] || 0) + 1;
                        return acc;
                      }, { LOW: 0, NORMAL: 0, HIGH: 0, IMMEDIATE: 0 })

                    setSeverityData(severityCount)
                }
                catch (err)
                {
                    console.error("Error fetching logs:", err);
                }
            }
            else
                Logout()
        }

        fetchLogs()
    }, [user, baseUrl, Logout])

    const data = {
        labels: ['LOW', 'NORMAL', 'HIGH', 'IMMEDIATE'],
        datasets: [
            {
                label: 'Severity Count',
                backgroundColor: ['#4BC0C0', '#FFCE56', '#FF6384', '#FF4500'],
                borderColor: ['#4BC0C0', '#FFCE56', '#FF6384', '#FF4500'],
                borderWidth: 1,
                data: [severityData.LOW, severityData.NORMAL, severityData.HIGH, severityData.IMMEDIATE], 
            },
        ],
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {position: 'top'},
            title: {
                display: true,
                text: 'Log Severity Levels',
            },
        },
    }

    return (
        <ProtectedRoute>
        <div className="container mx-auto py-10 mb-20">
            <h1 className="text-3xl font-bold mb-6">Severity Chart</h1>
            <div className="bg-white p-4 shadow-md rounded-lg">
            <Bar data={data} options={options} />
            </div>
        </div>
        </ProtectedRoute>
    )
}
