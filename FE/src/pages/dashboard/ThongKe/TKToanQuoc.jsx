import { useEffect, useState } from 'react'
import AnalyticEcommerce from './AnalyticEcommerce'

// material-ui
import { useTheme } from '@mui/material/styles'
import { Grid, Typography } from '@mui/material'
import WarehouseIcon from '@mui/icons-material/Warehouse'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import PeopleOutlineRoundedIcon from '@mui/icons-material/PeopleOutlineRounded'

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
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
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

const TKToanQuoc = () => {
  const theme = useTheme()

  const { primary, secondary } = theme.palette.text
  const line = theme.palette.divider

  const warning = theme.palette.warning.main
  const primaryMain = theme.palette.primary.main
  const successDark = theme.palette.success.dark

  // sửa số liệu here
  const [series] = useState([
    {
      name: 'Thành công',
      data: [180, 90, 135, 114, 120, 145, 150, 135, 114, 120, 145, 150]
    },
    {
      name: 'Thất bại',
      data: [20, 5, 7, 15, 16, 9, 11, 7, 15, 16, 9, 11]
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
      <h3>THỐNG KÊ TRÊN TOÀN QUỐC</h3>
      <Grid container rowSpacing={4.0} columnSpacing={2.75}>
        <Grid item xs={12} sx={{ mb: -2 }}>
          <Typography variant="h5">Dashboard</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={2} lg={3}>
          <AnalyticEcommerce
            title="Điểm tập kết"
            count="5"
            icon={() => <WarehouseIcon style={{ color: '#DC143C' }} />}/>
        </Grid>
        <Grid item xs={12} sm={6} md={2} lg={3}>
          <AnalyticEcommerce
            title="Điểm giao dịch"
            count="28"
            icon={() => <WarehouseIcon style={{ color: '#EEE732' }} />}/>
        </Grid>
        <Grid item xs={12} sm={6} md={2} lg={3}>
          <AnalyticEcommerce
            title="Đơn hàng"
            count="7"
            icon={() => <AddShoppingCartIcon style={{ color: '#00CC00' }} />}/>
        </Grid>
        <Grid item xs={12} sm={6} md={2} lg={3}>
          <AnalyticEcommerce
            title="Nhân viên"
            count="56"
            icon={() => <PeopleOutlineRoundedIcon style={{ color: '#FF9933' }} />}/>
        </Grid>
      </Grid>
      <ReactApexChart options={options} series={series} type="bar" height={430} />
    </div>
  )
}

export default TKToanQuoc
