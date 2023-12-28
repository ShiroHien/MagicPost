import { useEffect, useState } from 'react'
import { Grid, Stack, TextField, Typography } from '@mui/material'
import MainCard from '../../../components/MainCard'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'

// material-ui
import { useTheme } from '@mui/material/styles'

// third-party
import ReactApexChart from 'react-apexcharts'

// API import
import axiosInstance from '../../../utils/AxiosInstance'


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
  const [options, setOptions] = useState(columnChartOptions)
  // sửa số liệu here
  const [series, setSeries] = useState([
    {
      name: 'Thành công',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      name: 'Thất bại',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  ])

  {/* tổng đơn - sửa số liệu here */}
  const [totalTQ, setTotalTQ] = useState()

  useEffect(() => {
    getDataForFilterTQ()
  }, [])
  // Gọi API thống kê tổng đơn toàn quốc trong năm
  const getDataForFilterTQ = async () => {
    let response = await axiosInstance({
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      url: `http://localhost:3377/v1/postal-goods/statisticsTQ/`,
      data: {
        statisticType: 'total',
        filterType: 'monthOfYear',
        filterValue: 2023
      }
    })
    setTotalTQ(response.data[0].count)
  }

  useEffect(() => {
    getDataForFilter()
  }, [series])

  // Gọi API thống kê tổng đơn toàn quốc trong năm
  const getDataForFilter = async () => {
    let response = await axiosInstance({
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      url: `http://localhost:3377/v1/postal-goods/statisticsTQ`,
      data: {
        statisticType: null,
        filterType: 'monthOfYear',
        filterValue: 2023
      }
    })
    let seriesCopy = [...series]
    for (let i = 0; i < response.data.length; i++ )
    {
      let month = response.data[i].month - 1
      if (response.data[i].status == 'Delivered') {
        seriesCopy[0].data[month] = response.data[i].count
      } else {
        seriesCopy[1].data[month] = response.data[i].count
      }
    }
    setSeries(seriesCopy)
  }

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

    <Grid item xs={12} md={7} lg={8}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h4">Thống kê toàn quốc</Typography>
        </Grid>
      </Grid>
      <MainCard sx={{ mt: 1.75 }}>
        <Stack spacing={1.5} sx={{ mb: -12 }}>
          <Typography variant="h6" color="secondary">
        Tổng đơn
          </Typography>
          {/* tổng đơn - sửa số liệu here */}
          <Typography variant="h4">{totalTQ}</Typography>
        </Stack>
        <div id="chart">
          <ReactApexChart options={options} series={series} type="bar" height={430} />
        </div>
      </MainCard>
    </Grid>
  )
}

export default TKToanQuoc