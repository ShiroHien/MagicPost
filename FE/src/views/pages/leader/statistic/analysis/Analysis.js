import Chart from "components/chart/Chart";
// import BarChart from "components/chart/BarChart"
import "./Analysis.css";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
// import Filter from "components/filter/Filter";
// import filter from "functions/timeFiler";
import { useNavigate } from "react-router-dom";
// import axiosInstance from "functions/AxiosInstance";
// import FilterForUser from "components/filter/FilterForUser";
import { ResponsiveContainer } from "recharts";
// import { BarChart } from "recharts";
import { BarChart } from '@mui/x-charts/BarChart';


export default function Analysis(props) {
  
  const [monthData, setMonthData] = useState([]);

  const [area, setArea] = useState(false)
  const [province, setProvince] = useState(false)
  const [year, setYear] = useState(2023)
  const [center, setCenter] = useState(false)

  const [centerInfo, setCenterInfo] = useState([])

  const provinceData = originalDataset.find(entry => entry["Quận/Huyện"] === "Lục Nam");

  // Assuming the months start from 1
  const months = Array.from({ length: 12 }, (_, index) => index + 1);

  const paddedData = months.map(month => {
    const monthIndex = month - 1;
    return {
      month,
      "Hàng TC": provinceData ? provinceData["Hàng TC"][monthIndex] || 0 : 0,
      "Hàng hoàn": provinceData ? provinceData["Hàng hoàn"][monthIndex] || 0 : 0,
    };
  });

  return (
    <>
      <div className="home">
        {/* {
          (Cookies.get('info')) && JSON.parse(Cookies.get('info')).type_of_account === 'admin' ?
            <Filter
              setArea={setArea}
              setProvince={setProvince}
              setYear={setYear}
              setCenter={setCenter}
              centerInfo={centerInfo}
            />
            :
            <FilterForUser
              setYear={setYear}
            />
        } */}

        <div>
          <h3 className="chartTitle">{"Thống kê toàn quốc năm " + year}</h3>
          <BarChart
            dataset={paddedData}
            xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
            series={[
              { dataKey: 'Hàng TC', label: 'Hàng TC' },
              { dataKey: 'Hàng hoàn', label: 'Hàng hoàn' },
            ]}
            colors={['green', 'red']}
            sx={{
              '.chart-label': {
                fontSize: '14px',
              },
            }}
            width={ 1200}
            height={500}
           
          />
        </div>
        <div>
        <h3 className="chartTitle">{"Thống kê tại điểm giao dịch năm " + year}</h3>
          <BarChart
            dataset={paddedData}
            xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
            series={[
              { dataKey: 'Hàng TC', label: 'Hàng TC' },
              { dataKey: 'Hàng hoàn', label: 'Hàng hoàn' },
            ]}
            colors={['green', 'red']}
            sx={{
              '.chart-label': {
                fontSize: '14px',
              },
            }}
            width={600}
            height={400}
          />
          <BarChart
            dataset={paddedData}
            xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
            series={[
              { dataKey: 'Hàng TC', label: 'Hàng TC' },
              { dataKey: 'Hàng hoàn', label: 'Hàng hoàn' },
            ]}
            colors={['green', 'red']}
            sx={{
              '.chart-label': {
                fontSize: '14px',
              },
            }}
            width={600}
            height={400}
          />
        </div>
      </div>
    </>

  );
}

const originalDataset = [
  {
    "Thành phố/Tỉnh": "Bắc Giang",
    "Quận/Huyện": "Lục Ngạn",
    "Năm": "2020",
    "Hàng TC": [15, 17, 13, 18, 11, 12, 20, 18, 23, 14, 11],
    "Hàng hoàn": [1, 2, 1, 3, 5, 2, 1, 2, 5, 7, 1, 3],
  },
  {
    "Thành phố/Tỉnh": "Bắc Giang",
    "Quận/Huyện": "Lục Nam",
    "Năm": "2020",
    "Hàng TC": [13, 14, 18, 20, 11, 18, 23, 15, 17, 18 ],
    "Hàng hoàn": [1, 3, 5, 7, 2, 1, 1, 2, 5, 3],
  },
  {
    "Thành phố/Tỉnh": "Bắc Giang",
    "Quận/Huyện": "Tân Yên",
    "Năm": "2020",
    "Hàng TC": [18, 18, 15, 20, 11, 13, 12, 23, 14, 17, 11],
    "Hàng hoàn": [3, 1, 1, 2, 5, 7, 2, 1, 1, 3, 5, 2],
  },
];
