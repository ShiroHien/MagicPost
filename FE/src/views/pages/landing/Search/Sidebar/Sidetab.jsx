import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TimKiemDgd from '../TimKiemDgd';
import TraCuuMVD from '../TraCuuMVD';
import UocTinhCuocPhi from '../UocTinhCuocPhi';


export default function Sidetab() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" 
            centered TabIndicatorProps={{style: {backgroundColor: "#D97D54"}}}
            >
            <Tab label={<span style={{ color: '#D97D54' }}>Tra cứu mã vận đơn</span>} value="1" />
            <Tab label={<span style={{ color: '#D97D54' }}>Ước tính cước phí</span>} value="2" />
            <Tab label={<span style={{ color: '#D97D54' }}>Tra cứu Điểm Giao Dịch</span>} value="3" />
          </TabList>
        </Box>
        <TabPanel value="1"> <TraCuuMVD /> </TabPanel>
        <TabPanel value="2"> <UocTinhCuocPhi/>  </TabPanel>
        <TabPanel value="3"> <TimKiemDgd/> </TabPanel>
      </TabContext>
    </Box>
  );
}
