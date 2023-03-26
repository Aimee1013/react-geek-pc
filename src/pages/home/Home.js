import React from 'react'
import EchartsBar from "@/components/echartsBar/EchartsBar"



export default function Home () {

  return (
    <div>
      <EchartsBar
        title='popular frame1'
        xData={['react', 'vue', 'angular']}
        yData={[30, 50, 80]}
        style={{ width: '500px', height: '340px', marginTop: '20px' }}
      />
      <EchartsBar
        title='popular frame2'
        xData={['react1', 'vue1', 'angular1']}
        yData={[30, 50, 80]}
        style={{ width: '400px', height: '250px', marginTop: '20px' }}
      />
    </div>
  )
}
