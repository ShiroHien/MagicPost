import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography } from '@mui/material';
import MainCard from 'components/MainCard';

// third-party
import ReactApexChart from 'react-apexcharts';

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
        return `${val} đơn`;
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
};

// ==============================|| DoubleBarChart-Diem TK ||============================== //

const TKDiemTK = () => {
  const theme = useTheme();

  const { blue, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const warning = theme.palette.warning.main;
  const primaryMain = theme.palette.blue.main;
  const successDark = theme.palette.success.dark;

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
  ]);

  const [options, setOptions] = useState(columnChartOptions);

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
    }));
  }, [blue, secondary, line, warning, primaryMain, successDark]);

  return (
    <Grid item xs={12} md={7} lg={8} mt={3}>
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
  );
};

export default TKDiemTK;
