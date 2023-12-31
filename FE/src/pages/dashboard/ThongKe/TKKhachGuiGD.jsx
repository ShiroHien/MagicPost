import { useEffect, useState } from 'react'

// material-ui
import { useTheme } from '@mui/material/styles'

// third-party
import ReactApexChart from 'react-apexcharts'

// chart options
const barChartOptions = {
  chart: {
    type: 'bar',
    height: 365,
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      columnWidth: '45%',
      borderRadius: 4
    }
  },
  dataLabels: {
    enabled: false
  },
  xaxis: {
    categories: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    show: false
  },
  grid: {
    show: false
  }
}

// =======||  BAR CHART - Thong ke hang khach gui ||===== //

const TKKhachGuiGD = () => {
  const theme = useTheme()

  const { primary, secondary } = theme.palette.text
  const info = theme.palette.info.light

  // sửa sô liệu here
  const [series] = useState([
    {
      data: [80, 95, 70, 42, 65, 55, 78]
    }
  ])

  const [options, setOptions] = useState(barChartOptions)

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: ['#4fe34f'],
      xaxis: {
        labels: {
          style: {
            colors: [secondary, secondary, secondary, secondary, secondary, secondary, secondary]
          }
        }
      },
      tooltip: {
        theme: 'light'
      }
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [primary, info, secondary])

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="bar" height={365} />
    </div>
  )
}

export default TKKhachGuiGD
