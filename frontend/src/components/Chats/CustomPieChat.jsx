import React from 'react'
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts'
const CustomPieChat = ({ data, colors }) => {
    return (
        <ResponsiveContainer width="100%" height={325}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey='count'
                    nameKey="status"
                    cx={'50%'}
                    cy={'50%'}
                    innerRadius={100}
                    outerRadius={130}>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                </Pie>
                <Legend />
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    )
}

export default CustomPieChat