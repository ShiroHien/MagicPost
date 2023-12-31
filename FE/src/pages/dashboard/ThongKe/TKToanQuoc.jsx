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

import axiosInstance from '../../../utils/AxiosInstance'

import {
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Button,
} from "reactstrap";

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
  const [series, setSeries] = useState([
    // {
    //   name: 'Thành công',
    //   data: [180, 90, 135, 114, 120, 145, 150, 135, 114, 120, 145, 150]
    // },
    // {
    //   name: 'Thất bại',
    //   data: [20, 5, 7, 15, 16, 9, 11, 7, 15, 16, 9, 11]
    // }

    // Khi chưa thống kê dữ liệu mặc định là 0 hết
    {
      name: 'Thành công',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      name: 'Thất bại',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  ])
  const [options, setOptions] = useState(columnChartOptions)
  const [year, setYear] = useState('2023')
  const [type, setType] = useState([])
  const [pointName, setPointName] = useState([])


  {/* tổng đơn - sửa số liệu here */}
  const [totalTQ, setTotalTQ] = useState(0)

  const getTotalTQ = () => {
    if (totalTQ === 0) {
      getDefaltChart()
      console.log('Tính tổng đơn...')
      getDataForFilterTQ()
      console.log(totalTQ)
    }
    return totalTQ+''
  }
  const getDefaltChart = () => {
    console.log('Thống kê toàn quốc...')
    getDataForFilter()
  }
  // Gọi API thống kê tổng đơn toàn quốc trong năm
  const getDataForFilterTQ = async () => {
    let response = await axiosInstance({
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      url: `http://localhost:3377/v1/postal-goods/statisticsTQ/`,
      data: {
        statisticType: 'total'
      }
    }).then((response) => {
      setTotalTQ(response.data[0].count)
    })
  }

  const handleChange = async(event) => {
    setYear(event.target.value)
    console.log('Thống kê toàn quốc...')
    await getDataForFilter()
  }
  const handleChange2 = async(event) => {
    console.log('Thống kê toàn quốc...')
    setYear(event.target.value)
    await getDataForFilter()
  }
  const handleChange3 = async(event) => {
    setPointName(event.target.value)
    console.log('Thống kê toàn quốc...')
    await getDataForFilter()
  }

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
        filterValue: Number(year)
      }
    }).then((response) => {
      // Set seri từ dữ liệu trả về
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
    })
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
            title="Tổng đơn hàng TQ"
            count={getTotalTQ()}
            icon={() => <AddShoppingCartIcon style={{ color: '#00CC00' }} />}/>
        </Grid>
        <Grid item xs={12} sm={6} md={2} lg={3}>
          <AnalyticEcommerce
            title="Nhân viên"
            count="56"
            icon={() => <PeopleOutlineRoundedIcon style={{ color: '#FF9933' }} />}/>
        </Grid>
      </Grid>
      <h5>
        <div className='form-row' style={{marginTop: '40px', marginLeft: '100px'}}>
          <FormGroup className='col-md-3'>
            <div className="label">Năm</div>
            <Input id="inputState" type="select" onChange={handleChange}>
              <option selected="">2023</option>
              {years.map((item, index) => (
                <option key={`years-${index}`}>
                  {item.label}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup className='col-md-3'>
            <div className="label">Điểm</div>
            <Input id="inputState" type="select" onChange={handleChange2}>
              <option selected="">Tất cả</option>
              {types.map((item, index) => (
                <option key={`years-${index}`}>
                  {item.label}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup className='col-md-3'>
            <div className="label">Tên điểm</div>
            <Input id="inputState" type="select" onChange={handleChange3}>
              <option selected="">Tất cả</option>
              {points.map((item, index) => (
                <option key={`years-${index}`}>
                  {item.label}
                </option>
              ))}
            </Input>
          </FormGroup>
        </div>
      </h5>
      <ReactApexChart options={options} series={series} type="bar" height={430} />
    </div>
  )
}

export default TKToanQuoc

const years = [
  { label: '2023' },
  { label: '2022' },
  { label: '2021' },
  { label: '2020' }
]

const types = [
  { label: 'Điểm Tập Kết' },
  { label: 'Điểm Giao Dịch' },
]

const points = [
  {label: 'Điểm giao dịch tại: 123 Chùa Láng, Ba Đình, Hà Nội'},
  {label: 'Điểm giao dịch tại: 123 Chùa Láng, Ba Đình, Hà Nội'},
  {label: 'Điểm giao dịch tại: 123 Chùa Láng, Ba Đình, Hà Nội'},
  {label: 'Điểm giao dịch tại: 123 Chùa Láng, Ba Đình, Hà Nội'},
  {label: 'Điểm giao dịch tại: 123 Chùa Láng, Ba Đình, Hà Nội'},
  {label: 'Điểm giao dịch tại: 123 Chùa Láng, Ba Đình, Hà Nội'},
  {label: 'Điểm giao dịch tại: 123 Chùa Láng, Ba Đình, Hà Nội'},
]



