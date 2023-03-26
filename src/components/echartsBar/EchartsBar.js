import React, { useRef, useEffect } from 'react'

// 第一步：导入echarts
import * as echarts from 'echarts'

function EchartsBar ({ title, xData, yData, style }) {

  const barRef = useRef()
  useEffect(() => {
    // 第三步：初始化echarts实例
    // 基于准备好的dom，初始化echarts实例(此时页面元素已渲染完毕)
    // var myChart = echarts.init(document.getElementById('main'))
    var myChart = echarts.init(barRef.current)

    // 第四步：准备数据和配置项，指定图表的配置项和数据
    var option = {
      title: {
        text: title,
      },
      tooltip: {},
      legend: {
        data: ['销量'],
      },
      xAxis: {
        data: xData,
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: yData,
        },
      ],
    }

    // 第五步：使用刚指定的配置项和数据显示图表。
    myChart.setOption(option)
  }, [])


  return (
    <div>
      {/* 第二步：准备一个echarts容器 */}
      <div
        ref={barRef}
        style={style}></div>
    </div>
  )
}

export default EchartsBar
