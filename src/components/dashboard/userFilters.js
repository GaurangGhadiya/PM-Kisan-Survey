import { useEffect, useState } from "react";
import { onDistrict } from "../../network/actions/district";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../utils/cookie";
import { Button, Grid, InputLabel } from "@mui/material";
import Select from "react-select";

import { onMunicipalityList } from "../../network/actions/municipality";
import { onWardList } from "../../network/actions/wards";
import { onWardListSurveyor } from "../../network/actions/wards";
import { onCSCUserListSurveyor } from "../../network/actions/CSCuser";

export default function Filters({ onChange,downloadReport }) {
  const selectStyles = { menu: (styles) => ({ ...styles, zIndex: 999 }) };
  const dateStyles = { menu: (styles) => ({ ...styles, width: "100%", border : "none" }) }

  const [districtList, setDistrictList] = useState([]);
  const [district, setDistrict] = useState("");
  const [districtId, setDistrictId] = useState("");

  const [municipalityList, setMunicipalityList] = useState([]);
  const [municipal, setMunicipal] = useState("");
  const [municipalId, setMunicipalId] = useState("");

  const [wardList, setWardList] = useState([]);
  const [ward, setward] = useState("");
  const [wardId, setwardId] = useState("");

  const [cscUserList, setCscUserList] = useState([]);
  const [cscUser, setCscUser] = useState("");
  const [cscUserID, setCscUserID] = useState("");
  


  const [districtCalled, setdistrictCalled] = useState(false);

  const [wardCalled, setWardCalled] = useState(false);
  const [municipalCalled, setMunicipalCalled] = useState(false);

  const [cscUserCalled, setCscUserCalled] = useState(false);
  
  const [ulbData, setUlbData] = useState({});
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  

  const [errorList, setErrorList] = useState([]);

  //Disable enable Dropdown
  const [selectDisabledDistrict, setSelectDisabledDistrict] = useState(false);
  const [selectDisabledMunicipality, setSelectDisabledMunicipality] =
    useState(false);
  const [selectDisabledWard, setSelectDisabledWard] = useState(false);

  const dispatch = useDispatch();

  const district_reducer = useSelector((state) => state.district_reducer);
  const municipality_reducer = useSelector(
    (state) => state.municipality_reducer
  );
  const ward_reducer = useSelector((state) => state.ward_reducer);

  const CSCUSER_reducer = useSelector((state) => state.cscUserList);
  
  






  useEffect(() => {
    try {
      const globalUser = JSON.parse(getToken());
      const { districtDetail, municipalityDetail, ulb, roles, userName } =
        globalUser || {};

      let district_object = {
        label:
          districtDetail.districtName +
          " (" +
          districtDetail.districtCode +
          ")",
        value: districtDetail.id,
        code: districtDetail.districtCode,
      };


      setDistrict(district_object);
      setDistrictId(districtDetail.code);
      if (district_object.code) {
        setMunicipalCalled(true);
        dispatch(onMunicipalityList(district_object.code));
        setSelectDisabledDistrict(true);
      }

      let municipality_object = {
        label: municipalityDetail.municipalName,
        value: municipalityDetail.municipalId,
      };


      setMunicipal(municipality_object);
      setMunicipalId(municipalityDetail.id);

      if (municipality_object) {
        setSelectDisabledMunicipality(true);
      }


      if (ulb) {
        let ward_object = {
          label: ulb.wardName + " (" + ulb.wardNo + ")",
          value: ulb.id,
          id: ulb.id,
        };

        setward(ward_object);
        setSelectDisabledWard(true);
      }

      if (roles[0] == "Surveyor") {
        setWardCalled(true);
        dispatch(onWardListSurveyor(municipality_object.value, userName));
        setSelectDisabledWard(false);
      } else {
        setWardCalled(true);
        dispatch(onWardList(municipality_object.value));
      }

      onChange({
        district: district_object.code,
        municipal: municipality_object.value,
        ward: ward_object.value,
      });

    } catch (e) {
      console.warn(e);
    }


    dispatch(onDistrict());
    setdistrictCalled(true);
  }, []);

  /**
   * Getting the District List
   *
   */
  useEffect(() => {
    let district_list = [];

    if (district_reducer?.data && districtCalled) {
      const { data, status, message } = district_reducer.data || {};
      setdistrictCalled(false);

      if (status === "OK" && message === "SUCCESS") {
        district_list.push({
          label: "-- Please Select -- ",
          value: null,
          code: null,
        });

        for (let i = 0; i < data.length; i++) {
          let object = {
            label: data[i].districtName + " (" + data[i].districtCode + ")",
            value: data[i].id,
            code: data[i].districtCode,
          };
          district_list.push(object);

          setDistrictList(district_list);
        }
      }
    }
  }, [district_reducer]);

  /**
   * Getting the Municipality List and Ward List Use Effect
   */
  useEffect(() => {
    let municipal_list = [];

    if (municipality_reducer?.data) {
      const { data, status, message } = municipality_reducer.data || {};

      if (status === "OK" && message === "SUCCESS") {
        municipal_list.push({
          label: "-- Please Select -- ",
          value: null,
        });
        for (let i = 0; i < data.length; i++) {
          let object = {
            label: data[i].municipalName,
            value: data[i].municipalId,
          };
          municipal_list.push(object);

          // if (ulbData.municipalId == data[i].municipalId) {
          //   setMunicipalId(object);
          //   setMunicipal(object);
          //   dispatch(onWardList(data[i].municipalId));
          // }
        }
        setMunicipalityList(municipal_list);
        setMunicipalCalled(false);


      }
    }
  }, [municipality_reducer]);

  useEffect(() => {
    let ward_list = [];

    if (ward_reducer?.data) {
      const { data, status, message } = ward_reducer.data || {};
      if (status === "OK" && message === "SUCCESS") {
        ward_list.push({
          label: "-- Please Select -- ",
          value: null,
          id: null,
        });

        for (let i = 0; i < data.length; i++) {
          let object = {
            label: data[i].wardName + " (" + data[i].wardNo + ")",
            value: data[i].id,
            id: data[i].id,
          };
          ward_list.push(object);
          if (ulbData.wardNo === data[i].wardNo) {
            setward(object);
            setwardId(object);
          }
        }
        setWardList(ward_list);
        setWardCalled(false);

      }
    }
  }, [ward_reducer]);



  //


  /**
   * Getting the CSC USER List
   *
   */
  
  /*
  useEffect(() => {
    try {
      const globalUser = JSON.parse(getToken());
      const { cscDetail } =
        globalUser || {};

      let csc_object = {
        label:
        cscDetail.userName +
          " (" +
          cscDetail.mobileNumber +
          ")",
        value: cscDetail.userName,
        code: cscDetail.userName,
      };


      setCscUserList(csc_object);
      setCscUserID(csc_object.userName);
    
    } catch (e) {}


    dispatch(setCscUserList());
    
      dispatch(onCSCUserListSurveyor(districtId,wardId,municipalId));
    
    

  }, []);







*/
  //


  useEffect(() => {
    let cscuser_list = [];

    if (CSCUSER_reducer?.data && cscUserCalled) {
      


      const { data, status, message } = CSCUSER_reducer.data || {};
      setCscUserCalled(false);

      if (status === "OK" && message === "SUCCESS") {
        cscuser_list.push({
          label: "-- Please Select -- ",
          value: null,
          code: null,
        });

        for (let i = 0; i < data.length; i++) {
          let object = {
            label: data[i].name + " (" + data[i].mobileNumber + ")",
            value: data[i].userName,
            code: data[i].userName,
          };
          cscuser_list.push(object);
          
          setCscUserList(cscuser_list);
        }
      }
    }
  }, [CSCUSER_reducer]);
  

  const handleDistrictChange = (event) => {
    setDistrictId(event);
    setDistrict(event);
    setMunicipal("");
    setMunicipalId("");
    setwardId("");
    setward("");
    dispatch(onMunicipalityList(event.code));
    setMunicipalCalled(true);
    onChange({ district: event, municipal: null, ward: null });
  };

  const handleMunicipalityChange = (event) => {
    setMunicipalId(event);
    setMunicipal(event);
    dispatch(onWardList(event.value));
    setwardId("");
    setward("");
    onChange({ district: districtId, municipal: event, ward: event.value });
  };


  

  const handleCscChange = (event) => {

   onChange({
    district:districtId,
    municipal:municipalId,
    ward: wardId,
    userName: event
  });
   

  };

  const handleToDate = (e) => {
    setToDate(e.target.value)
    onChange({
      district:districtId,
      municipal:municipalId,
      ward: wardId,
      userName: event,
      fromDate, toDate : e.target.value
    });
  }
  const handleFromDate = (e) => {
    setFromDate(e.target.value)
    onChange({
      district:districtId,
      municipal:municipalId,
      ward: wardId,
      userName: event,
      fromDate : e.target.value, toDate
    });
  }


  const handleWardChange = (event) => {
    setwardId(event);
    setward(event);

    const globalUser = JSON.parse(getToken());
    const { districtDetail, municipalityDetail, ulb, roles, userName } =
      globalUser || {};
    setCscUserCalled(true);
      dispatch(onCSCUserListSurveyor(districtId,event.id,municipalId))


    if (districtId === undefined || municipalId === undefined) {
      onChange({
        district:
          districtId !== undefined ? districtId : districtDetail.districtCode,
        municipal:
          municipalId !== undefined
            ? municipalId
            : municipalityDetail.municipalId,
        ward: event,
      });
    } else {
      onChange({ district: districtId, municipal: municipalId, ward: event });
    }
  };

  return (
    <>
      <Grid container spacing={4} style={{ flex: 1, padding: 20 }}>
        <Grid item xs={3}>
          <InputLabel
            style={{ marginBottom: 5 }}
            id="demo-simple-select-helper-label"
          >
            District{" "}
          </InputLabel>

          <Select
            styles={selectStyles}
            closeMenuOnSelect={true}
            value={district}
            options={districtList}
            onChange={handleDistrictChange}
            isDisabled={selectDisabledDistrict}
          />
        </Grid>

        <Grid item xs={3}>
          <InputLabel
            style={{ marginBottom: 5 }}
            id="demo-simple-select-helper-label"
          >
            Municipality{" "}
          </InputLabel>

          <Select
            styles={selectStyles}
            closeMenuOnSelect={true}
            value={municipal}
            options={municipalityList}
            onChange={handleMunicipalityChange}
            isDisabled={selectDisabledMunicipality}
          />
        </Grid>

        <Grid item xs={3}>
          <InputLabel
            style={{ marginBottom: 5 }}
            id="demo-simple-select-helper-label"
          >
            Ward{" "}
          </InputLabel>

          <Select
            styles={selectStyles}
            closeMenuOnSelect={true}
            value={ward}
            options={wardList}
            onChange={handleWardChange}
            isDisabled={selectDisabledWard}
          />
        </Grid>

        <Grid item xs={3}>
          <InputLabel
            style={{ marginBottom: 5 }}
            id="demo-simple-select-helper-label"
          >
            User{" "}
          </InputLabel>

          <Select
            styles={selectStyles}
            closeMenuOnSelect={true}
            options={cscUserList}
            onChange={handleCscChange}
          />
        </Grid>
        <Grid item xs={3}>
          <InputLabel
            style={{ marginBottom: 5 }}
            id="demo-simple-select-helper-label"
          >
            From Date{" "}
          </InputLabel>

         
          <input type="date"  style={{width : "100%", backgroundColor: "hsl(0, 0%, 100%)",
    borderColor: "hsl(0, 0%, 80%)",
    borderRadius: "4px",
    borderStyle: "solid",
    borderWidth: "1px",
    minHeight : "38px",
    padding : "0px 5px"
    }}  onChange={handleFromDate} />
        </Grid>
        <Grid item xs={3}>
          <InputLabel
            style={{ marginBottom: 5 }}
            id="demo-simple-select-helper-label"
          >
            To Date{" "}
          </InputLabel>
          <input type="date" style={{width : "100%", backgroundColor: "hsl(0, 0%, 100%)",
    borderColor: "hsl(0, 0%, 80%)",
    borderRadius: "4px",
    borderStyle: "solid",
    borderWidth: "1px",
    minHeight : "38px",
    padding : "0px 5px"
    }} onChange={handleToDate} />

          
        </Grid>

        <Grid item xs={3}  mt={3}>
              <Button 
              onClick={()=>downloadReport()}
                variant="contained">Download</Button>
          </Grid>

      </Grid>
    </>
  );
}
