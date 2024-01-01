import { useEffect, useState } from 'react'
import AnalyticEcommerce from './AnalyticEcommerce'

// material-ui
import { useTheme } from '@mui/material/styles'
import { capitalize, Grid, Typography } from '@mui/material'
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
} from "reactstrap"
import { InfoCircleFilled } from '@ant-design/icons'

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
  const [year, setYear] = useState(2023)
  const [type, setType] = useState('')
  const [pointName, setPointName] = useState('')
  const [listPoints, setListPoints] = useState([])


  {/* tổng đơn - sửa số liệu here */}
  const [totalTQ, setTotalTQ] = useState(0)

  // Gọi API thống kê tổng đơn toàn quốc trong năm
  const getTotalByYear = async () => {
    console.log('getTotalByYear...', year)
    let response = await axiosInstance({
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      url: `http://localhost:3377/v1/postal-goods/statisticsTQ/`,
      data: {
        statisticType: 'total',
        filterType: 'monthOfYear',
        filterValue: Number(year)
      }
    }).then((response) => {
      console.log('data totalTQ', response.data[0])
      console.log('Tổng đơn', response.data[0].count)
      setTotalTQ(response.data[0].count)
    })
  }

  // Gọi API thống kê tổng đơn toàn quốc trong năm
  const getDataForChartByYear = async () => {
    console.log('getDataForChartByYear...', year)
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
      let seriesCopy = [{
        name: 'Thành công',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      },
      {
        name: 'Thất bại',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }]
      for (let i = 0; i < response.data.length; i++ )
      {
        let month = response.data[i].month - 1
        if (response.data[i].status == 'Delivered') {
          seriesCopy[0].data[month] = response.data[i].count
        } else {
          seriesCopy[1].data[month] = response.data[i].count
        }
      }
      console.log('response data ', response.data)
      console.log('Dữ liệu biểu đồ sau khi được cập nhật: ', seriesCopy)
      setSeries(seriesCopy)
    })
  }

  const getDataTKbyId = async (id) => {
    console.log('getDataTKbyId...', id, pointName)
    await axiosInstance({
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      url: `http://localhost:3377/v1/postal-goods/statisticsTK`,
      // params: {
      //   warehouseId: warehouseId
      // },
      data: {
        _id: id,
        statisticType: null,
        filterType: 'monthOfYear',
        filterValue: Number(year)
      }
    }).then((response) => {
      let seriesCopy = [{
        name: 'Hàng gửi',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      },
      {
        name: 'Hàng nhận',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }]
      let total = 0
      for (let t = 0; t < 2; t++) {
        for (let i = 0; i < response.data[t].length; i++ ) {
          let value = response.data[t][i].month - 1
          seriesCopy[t].data[value] += response.data[t][i].count
          total = total + response.data[t][i].count
        }
        console.log('response data ', response.data)
        console.log('Dữ liệu biểu đồ sau khi được cập nhật: ', seriesCopy)
        setSeries(seriesCopy)
        total = Math.floor(total / 1.5)
        setTotalTQ(total)
      }

    })
  }

  const getDataGDbyId = async (id) => {
    console.log('getDataGDbyId...', id, pointName, year)
    await axiosInstance({
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      url: `http://localhost:3377/v1/postal-goods/statisticsGD`,
      // params: {
      //   warehouseId: warehouseId
      // },
      data: {
        _id: id,
        statisticType: null,
        filterType: 'monthOfYear',
        filterValue: Number(year)
      }
      
    }).then((response) => {
      let seriesCopy = [{
        name: 'Hàng khách gửi',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      },
      {
        name: 'Hàng vận chuyển đi',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }]
      let total = 0
      for (let t = 0; t < 2; t++) {
        for (let i = 0; i < response.data[t].length; i++ ) {
          let value = response.data[t][i].month - 1
          seriesCopy[t].data[value] += response.data[t][i].count
          total = total + response.data[t][i].count
        }
        console.log('response data ', response.data)
        console.log('Dữ liệu biểu đồ sau khi được cập nhật: ', seriesCopy)
        setSeries(seriesCopy)
        total = Math.floor(total / 1.5)
        setTotalTQ(total)
      }
    })
  }

  useEffect(() => {
    // Gọi API để lấy dữ liệu cho lần đầu tiên
    console.log('lấy dữ liệu tổng đơn toàn quốc cho lần đầu tiên...')
    getTotalByYear(year)
    console.log('lấy dữ liệu biểu đồ toàn quốc cho lần đầu tiên...')
    getDataForChartByYear(year)
  }, [])


  useEffect(() => {
    // Gọi API để lấy dữ liệu cho lần tiếp theo
    getTotalByYear()
    getDataForChartByYear()
  }, [year])

  useEffect(() => {
    // Gọi API để lấy dữ liệu cho lần đầu tiên
    setSeries([{
      name: 'Hàng gửi',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      name: 'Hàng nhận',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }])
  }, [type])


  useEffect(() => {
    // Gọi API để lấy dữ liệu cho lần tiếp theo
    // getTotalByYear()
    if (pointName.includes('Điểm giao dịch')) {
      const foundPoint = listPoints.find((point) => point.label === pointName)
      let id = ''
      if (foundPoint) {
        id = foundPoint._id
        getDataGDbyId(id)
      }
      
    }
    if (pointName.includes('Điểm tập kết')) {
      const foundPoint = listPoints.find((point) => point.label === pointName)
      let id = ''
      if (foundPoint) {
        id = foundPoint._id
        getDataTKbyId(id)
      }
      
    }
  }, [pointName])

  const changeYear = (event) => {
    setYear(event.target.value)
  }

  // SET pointName
  const changeType = async(event) => {
    setType(event.target.value)
    if (event.target.value === 'Điểm Tập Kết') {
      await axiosInstance.get(`http://localhost:3377/v1/warehouse-points`).then((res) => {
        console.log(res.data)
        setListPoints(res.data.map((point) => ({label: point.name, _id: point._id})))
        console.log(res.data.map((point) => ({label: point.name, _id: point._id})))
      })} else if (event.target.value == 'Điểm Giao Dịch') {
      await axiosInstance.get(`http://localhost:3377/v1/transaction-points`).then((res) => {
        console.log(res.data)
        setListPoints(res.data.map((point) => ({label: point.name, _id: point._id})))
        console.log(res.data.map((point) => ({label: point.name, _id: point._id})))
      })}
  }
  const changePointName = async(event) => {
    setPointName(event.target.value)
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
            count="10"
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
            title="Tổng toàn bộ đơn hàng"
            count="5513"
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
            <Input id="inputState" type="select" onChange={changeYear}>
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
            <Input id="inputState" type="select" onChange={changeType}>
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
            <Input id="inputState" type="select" onChange={changePointName}>
              <option selected="">Tất cả</option>
              {listPoints.map((item, index) => (
                <option key={`years-${index}`}>
                  {item.label}
                </option>
              ))}
            </Input>
          </FormGroup>
        </div>
      </h5>
      <Typography variant="h6" color="secondary">
        Tổng đơn năm {year}
      </Typography>
      <Typography variant="h4">{totalTQ}</Typography>
      <ReactApexChart options={options} series={series} type="bar" height={430} />
    </div>
  )
}

export default TKToanQuoc

const years = [
  { label: 2022 },
  { label: 2021 },
  { label: 2020 }
]

const types = [
  { label: 'Điểm Giao Dịch' },
  { label: 'Điểm Tập Kết' }

]

// const points = [
//   {label: 'Điểm giao dịch tại: 123 Chùa Láng, Ba Đình, Hà Nội'},
//   {label: 'Điểm giao dịch tại: 123 Chùa Láng, Ba Đình, Hà Nội'},
//   {label: 'Điểm giao dịch tại: 123 Chùa Láng, Ba Đình, Hà Nội'},
//   {label: 'Điểm giao dịch tại: 123 Chùa Láng, Ba Đình, Hà Nội'},
//   {label: 'Điểm giao dịch tại: 123 Chùa Láng, Ba Đình, Hà Nội'},
//   {label: 'Điểm giao dịch tại: 123 Chùa Láng, Ba Đình, Hà Nội'},
//   {label: 'Điểm giao dịch tại: 123 Chùa Láng, Ba Đình, Hà Nội'},
// ]



