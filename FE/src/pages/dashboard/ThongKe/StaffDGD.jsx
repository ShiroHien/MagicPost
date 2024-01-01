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
    categories: ['Hai', 'Ba', 'Tư', 'Năm', 'Sáu', 'Bảy', 'Chủ Nhật']
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

const StaffDGD = () => {
  const theme = useTheme()

  const { primary, secondary } = theme.palette.text
  const line = theme.palette.divider

  const warning = theme.palette.warning.main
  const primaryMain = theme.palette.primary.main
  const successDark = theme.palette.success.dark

  // sửa số liệu here
  const [series] = useState([
    {
      name: 'Đơn khách gửi',
      data: [180, 90, 135, 114, 120, 145, 150]
    },
    {
      name: 'Đơn giao thành công',
      data: [200, 50, 70, 150, 160, 90, 110]
    },
    {
      name: 'Đơn hoàn trả',
      data: [12, 13, 11, 11, 10, 9, 10]
    }
  ])

  const [options, setOptions] = useState(columnChartOptions)

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: ['#00b4d8', '#26B170', '#e03d3d'],
      xaxis: {
        labels: {
          style: {
            colors: ['#292F36', '#292F36', '#292F36', '#292F36', '#292F36', '#292F36', '#292F36']
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: ['#292F36',]
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
      <h2>Thống kê tại ...</h2>
      <h5>Từ ngày ... đến ngày ...</h5>
      <ReactApexChart options={options} series={series} type="bar" height={430} />
    </div>
  )
}

export default StaffDGD
