import { useEffect, useState } from 'react'
import { Grid, Stack, TextField, Typography } from '@mui/material'
import MainCard from '../../../components/MainCard'

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

const TKToanQuoc = () => {
  const theme = useTheme()

  const { primary, secondary } = theme.palette.text
  const line = theme.palette.divider

  const warning = theme.palette.warning.main
  const primaryMain = theme.palette.primary.main
  const successDark = theme.palette.success.dark

  // sửa số liệu here
  const [series, setSeries] = useState([
    {
      name: 'Hàng đến',
      data: [0, 0, 0, 0, 0, 0, 0]
    },
    {
      name: 'Hàng đi',
      data: [0, 0, 0, 0, 0, 0, 0]
    }
  ])
  const [options, setOptions] = useState(columnChartOptions)

  const [province, setProvince] = useState('Hà Nội')
  const [district, setDistrict] = useState('Đống Đa')
  

  useEffect(() => {
    getDataForFilter()
  }, [province, district, series])

  // Gọi API thống kê tổng đơn tập kết trong nătm
  const getDataForFilter = async () => {
    let response = await axiosInstance({
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      url: `http://localhost:3377/v1/postal-goods/statisticsTK`,
      // params: {
      //   warehouseId: warehouseId
      // },
      data: {
        province: province,
        city: district,
        statisticType: null,
        filterType: 'dayOfWeek',
        filterValue: 2023 // Sửa Week sau nếu có filter
      }
    })
    let seriesCopy = [...series]
    for (let t = 0; t < 2; t++) {
      for (let i = 0; i < response.data[t].length; i++ ) {
        let value = response.data[t][i].day - 1
        seriesCopy[t].data[value] += response.data[t][i].count
      }
      setSeries(seriesCopy)
    }
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
          <Typography variant="h4">Thống kê điểm tập kết</Typography>
        </Grid>
      </Grid>
      <MainCard sx={{ mt: 1.75 }}>
        <Stack spacing={1.5} sx={{ mb: -12 }}>
          <Typography variant="h6" color="secondary">
        Tổng đơn
          </Typography>
          <Typography variant="h4">500</Typography>
        </Stack>
        <div id="chart">
          <ReactApexChart options={options} series={series} type="bar" height={430} />
        </div>
      </MainCard>
    </Grid>
  )
}

export default TKToanQuoc
