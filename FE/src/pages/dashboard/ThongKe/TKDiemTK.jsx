import { useEffect, useState } from 'react'

// material-ui
import { useTheme } from '@mui/material/styles'

// third-party
import ReactApexChart from 'react-apexcharts'

// chart options
const columnChartOptions = {
  chart: {
    type: 'bar',
    height: 430,
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      columnWidth: '30%',
      borderRadius: 4
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 8,
    colors: ['transparent']
  },
  xaxis: {
    categories: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
  },
  yaxis: {
    title: {
      text: 'Số đơn hàng'
    }
  },
  fill: {
    opacity: 1
  },
  tooltip: {
    y: {
      formatter(val) {
        return `${val} đơn`
      }
    }
  },
  legend: {
    show: true,
    fontFamily: '\'Public Sans\', sans-serif',
    offsetX: 10,
    offsetY: 10,
    labels: {
      useSeriesColors: false
    },
    markers: {
      width: 16,
      height: 16,
      radius: '50%',
      offsexX: 2,
      offsexY: 2
    },
    itemMargin: {
      horizontal: 15,
      vertical: 50
    }
  },
  responsive: [
    {
      breakpoint: 600,
      options: {
        yaxis: {
          show: false
        }
      }
    }
  ]
}

// ==============================|| DoubleBarChart-Toan quoc ||============================== //

const TKDiemTK = () => {
  const theme = useTheme()

  const { primary, secondary } = theme.palette.text
  const line = theme.palette.divider

  const warning = theme.palette.warning.main
  const primaryMain = theme.palette.primary.main
  const successDark = theme.palette.success.dark

  // sửa số liệu here
  const [series] = useState([
    {
      name: 'Hàng đến',
      data: [180, 90, 135, 114, 120, 145, 150]
    },
    {
      name: 'Hàng đi',
      data: [200, 50, 70, 150, 160, 90, 110]
    }
  ])

  const [options, setOptions] = useState(columnChartOptions)

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [primaryMain, warning],
      xaxis: {
        labels: {
          style: {
            colors: [secondary, secondary, secondary, secondary, secondary, secondary]
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary]
          }
        }
      },
      grid: {
        borderColor: line
      },
      tooltip: {
        theme: 'light'
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        labels: {
          colors: 'grey.500'
        }
      }
    }))
  }, [primary, secondary, line, warning, primaryMain, successDark])

  return (
    <div id="chart">
      <h2>Thống kê ...</h2>
      <ReactApexChart options={options} series={series} type="bar" height={430} />
    </div>
  )
}

export default TKDiemTK
