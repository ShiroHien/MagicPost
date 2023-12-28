import { useEffect, useState } from 'react'

// material-ui
import { useTheme } from '@mui/material/styles'

// third-party
import ReactApexChart from 'react-apexcharts'

import axiosInstance from '../../../utils/AxiosInstance'

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
  const [series, setSeries] = useState([
    {
      data: [0, 0, 0, 0, 0, 0, 0]
    }
  ])
  const [province, setProvince] = useState('Hà Nội')
  const [district, setDistrict] = useState('Cầu Giấy')

  useEffect(() => {
    getDataForFilter()
  }, [province, district, series])


  // Gọi API thống kê tổng đơn tập kết trong nătm
  const getDataForFilter = async () => {
    let response = await axiosInstance({
      method: 'post',
      url: `http://localhost:3377/v1/postal-goods/statisticsGD`,
      data: {
        province: province,
        city: district,
        statisticType: null,
        filterType: 'dayOfWeek',
        filterValue: 2023 // Sửa Week sau nếu có filter
      },
      headers: {
        'Content-Type': 'application/json'
      }
    })
    let seriesCopy = [...series]
    let t = 0
    for (let i = 0; i < response.data[t].length; i++ ) {
      let value = response.data[t][i].day - 1
      seriesCopy[0].data[value] = response.data[t][i].count
    }
    setSeries(seriesCopy)
  }


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
