import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const months = Object.freeze(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
  'Oct', 'Nov', 'Dec']);

const TXHistoryGraph = ({ tetherTXHistory }) => {
  const recent = [...tetherTXHistory].reverse().slice(14)
  const cleanData = recent.map((data, idx) => {
    const { month, day } = data._id;

    const date = `${months[month - 1]} ${day}`;
    const quant = (data.cnt / 1000)
      .toString()
      .slice(0, 3)

    return { date, yVal: `${quant} k`, txs_k: (data.cnt / 1000) }
  })

  return (

    <LineChart width={335} height={105} data={cleanData} >
      <Tooltip />
      <Line type="monotone" dataKey="txs_k" stroke="#1E2002" />
      <XAxis
        dataKey="date"
        axisLine={false}
        interval="preserveStart"
        tickCount={3}
        height={10}
        tickSize
        dy='25'
        padding={{ left: 30, right: 30, top: 5 }}
      />
      <YAxis
        axisLine={false}
        interval="preserveEnd"
        tickCount={3}

        type="number" domain={['dataMin', 'dataMax + 5']}

        tickSize
        padding={{ left: 0, right: 15 }}
      />

    </LineChart>
  )
}

export default TXHistoryGraph;