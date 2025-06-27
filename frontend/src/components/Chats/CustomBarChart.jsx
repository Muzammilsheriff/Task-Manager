import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    Cell
} from 'recharts'
const CustomBarChart = ({data}) => {

    console.log("From Bar chart",data);

    const getBarColor = (entry) => {
        switch (entry?.priority) {
            case 'Low':
                return '#78CE00';
            case 'Medium':
                return '#008808';
            case 'High':
                return '#FF1F57';
            default:
                return '#00BC7D';
        }
    }

    const CustomToolTip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
                    <p className="text-xs font-semibold text-purple-800 mb-2">
                        {`${payload[0].payload.priority}`}
                    </p>
                    <p className="text-sm text-gray-600">
                        Count: 
                        <span className='text-sm font-medium text-gray-900'>
                            {payload[0].value}
                        </span>
                    </p>
                </div>
            );


        }
        return null;
    }

    // Handle empty or invalid data
    if (!data || data.length === 0) {
        return (
            <div className='bg-white mt-6 flex items-center justify-center h-[300px]'>
                <p className="text-gray-500 text-sm">No data available</p>
            </div>
        );
    }

    return (
        <div className='bg-white mt-6'>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid stroke='none'/>
                    <XAxis 
                        dataKey="priority"
                        tick={{ fontSize: 12, fill: '#555' }}
                        stroke='none'
                    />
                    <YAxis 
                        tick={{ fontSize: 12, fill: '#555' }}
                        stroke='none'
                    />
                    <Tooltip content={CustomToolTip} cursor={{fill:"transparent"}} />
                    <Bar 
                        dataKey="count"
                        nameKey="priority"
                        fill="#FF8042"
                        radius={[10, 10, 0, 0]}
                        activeDot={{ r: 8 , fill:'yellow'}}
                        activeStyle={{ fill: "green"}}
                    >
                        {data.map((entry, index) => (
                            <Cell key={index} fill={getBarColor(entry)} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
export default CustomBarChart
