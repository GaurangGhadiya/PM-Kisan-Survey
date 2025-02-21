import { useEffect, useState } from "react";
import { onDistrict } from "../../network/actions/district";
import { useDispatch, useSelector } from "react-redux";
import { getBlock, getDistrict, getPanchayat, getToken, getVillage } from "../../utils/cookie";
import { Grid, InputLabel } from "@mui/material";
import Select from "react-select";
// districe, block, panchayat, village
import { onMunicipalityList } from "../../network/actions/municipality";
import { onWardList } from "../../network/actions/wards";
import { onWardListSurveyor } from "../../network/actions/wards";
import { onVillageList } from "../../network/actions/villages";

export default function Filters({ onChange }) {
  const selectStyles = { menu: (styles) => ({ ...styles, zIndex: 999 }) };

  const [districtList, setDistrictList] = useState([]);
  const [district, setDistrict] = useState("");
  const [districtId, setDistrictId] = useState("");

  const [municipalityList, setMunicipalityList] = useState([]);
  const [municipal, setMunicipal] = useState("");
  const [municipalId, setMunicipalId] = useState("");

  const [wardList, setWardList] = useState([]);
  const [villageList, setVillageList] = useState([]);
  const [ward, setward] = useState("");
  const [wardId, setwardId] = useState("");
  const [village, setvillage] = useState("");
  const [villageId, setvillageId] = useState("");

  const [districtCalled, setdistrictCalled] = useState(false);

  const [wardCalled, setWardCalled] = useState(false);
  const [municipalCalled, setMunicipalCalled] = useState(false);

  const [ulbData, setUlbData] = useState({});

  const [errorList, setErrorList] = useState([]);

  //Disable enable Dropdown
  const [selectDisabledDistrict, setSelectDisabledDistrict] = useState(false);
  const [selectDisabledMunicipality, setSelectDisabledMunicipality] =
    useState(false);
  const [selectDisabledWard, setSelectDisabledWard] = useState(false);
  const [selectDisabledVillage, setSelectDisableVillage] = useState(false);

  const dispatch = useDispatch();

  const district_reducer = useSelector((state) => state.district_reducer?.data);
  const municipality_reducer = useSelector(
    (state) => state.municipality_reducer?.data
  );
  const ward_reducer = useSelector((state) => state.ward_reducer?.data);
  const village_reducer = useSelector((state) => state.village_reducer?.data);

  useEffect(() => {
    try {
      // const globalUser = JSON.parse(getToken());
      const districtData = JSON.parse(getDistrict());
      const municipalityDetail = JSON.parse(getPanchayat());
      const ulb = JSON.parse(getBlock());
      const villageData = JSON.parse(getVillage());
      // const { districtDetail, municipalityDetail, ulb, roles, userName } =
      //   globalUser || {};
      let district_object = {
        label:
          districtData.districtName +
          " (" +
          districtData.lgdCode +
          ")",
        value: districtData.lgdCode,
        code: districtData.lgdCode,
      };


      if (district_object.code) {
        setDistrict(district_object);
        setDistrictId(districtData.code);
        setMunicipalCalled(true);
        dispatch(onMunicipalityList(district_object.code));
        setSelectDisabledDistrict(true);
      }

      let municipality_object = {
        label: municipalityDetail.panchayatName + " (" + municipalityDetail.lgdCode + ")",
        value: municipalityDetail.lgdCode,
      };



      if (municipality_object?.id) {
        setMunicipal(municipality_object);
        setMunicipalId(municipalityDetail.id);
        setSelectDisabledMunicipality(true);
      }


      // if (ulb) {
        let ward_object = {
          label: ulb.blockName + " (" + ulb.lgdCode + ")",
          value: ulb.lgdCode,
          id: ulb.lgdCode,
        };

      if (ward_object?.id) {
        setward(ward_object);
        setSelectDisabledWard(true);
      }
      // }
      // if (villageData) {
        let village_object = {
          label: villageData.villageName,
          value: villageData.id,
          id: villageData.id,
        };

      if (village_object?.id) {
        setvillage(village_object);

        setSelectDisableVillage(true);
      }
      // }

      // if (roles[0] == "Surveyor") {
      //   setWardCalled(true);
      //   dispatch(onWardListSurveyor(municipality_object.value, userName));
      //   setSelectDisabledWard(false);
      // } else {
      //   setWardCalled(true);
      //   dispatch(onWardList(municipality_object.value));
      // }

      onChange({
        district: district_object.code,
        municipal: municipality_object.value,
        ward: ward_object.value,
        village  : village_object.value,
      });
    } catch (e) {
      console.warn("called district", e);
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

    if (district_reducer && districtCalled) {
      // const { data, status, message } = district_reducer.data || {};
      setdistrictCalled(false);

      if (district_reducer) {
        district_list.push({
          label: "-- Please Select -- ",
          value: null,
          code: null,
        });

        for (let i = 0; i < district_reducer.length; i++) {
          let object = {
            label: district_reducer[i].districtName + " (" + district_reducer[i].lgdCode + ")",
            value: district_reducer[i].lgdCode,
            code: district_reducer[i].lgdCode,
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

    if (municipality_reducer) {
      // const { data, status, message } = municipality_reducer.data || {};

      if (municipality_reducer) {
        municipal_list.push({
          label: "-- Please Select -- ",
          value: null,
        });
        for (let i = 0; i < municipality_reducer.length; i++) {
          let object = {
            label: municipality_reducer[i].blockName + " (" + municipality_reducer[i].lgdCode + ")",
            value: municipality_reducer[i].lgdCode,
          };
          municipal_list.push(object);


        }
        setMunicipalityList(municipal_list);
        setMunicipalCalled(false);
      }
    }
  }, [municipality_reducer]);

  useEffect(() => {
    let ward_list = [];

    if (ward_reducer) {
      // const { data, status, message } = ward_reducer.data || {};
      if (ward_reducer) {
        ward_list.push({
          label: "-- Please Select -- ",
          value: null,
          id: null,
        });

        for (let i = 0; i < ward_reducer.length; i++) {
          let object = {
            label: ward_reducer[i].panchayatName + " (" + ward_reducer[i].lgdCode + ")",
            value: ward_reducer[i].lgdCode,
            id: ward_reducer[i].lgdCode,
          };
          ward_list.push(object);
          // if (ulbData.wardNo === data[i].wardNo) {
          //   setward(object);
          //   setwardId(object);
          // }
        }
        setWardList(ward_list);
        setWardCalled(false);
      }
    }
  }, [ward_reducer]);
  useEffect(() => {
    let ward_list = [];
    if (village_reducer) {
      // const { data, status, message } = village_reducer.data || {};
      if (village_reducer) {
        ward_list.push({
          label: "-- Please Select -- ",
          value: null,
          id: null,
        });

        for (let i = 0; i < village_reducer.length; i++) {
          let object = {
            label: village_reducer[i].villageName + " (" + village_reducer[i].id + ")",
            value: village_reducer[i].id,
            id: village_reducer[i].id,
          };
          ward_list.push(object);
          // if (ulbData.wardNo === data[i].wardNo) {
          //   setward(object);
          //   setwardId(object);
          // }
        }
        setVillageList(ward_list);
        setWardCalled(false);
      }
    }
  }, [village_reducer]);

  const handleDistrictChange = (event) => {
    setDistrictId(event);
    setDistrict(event);
    setMunicipal("");
    setMunicipalId("");
    setwardId("");
    setward("");
    dispatch(onMunicipalityList(event.code));
    setMunicipalCalled(true);
    onChange({ district: event, municipal: null, ward: null, village : null });
  };

  const handleMunicipalityChange = (event) => {
    setMunicipalId(event);
    setMunicipal(event);
    dispatch(onWardList(event.value));
    setwardId("");
    setward("");
    onChange({ district: districtId, municipal: event, ward: null , village : null});
  };

  const handleWardChange = (event) => {
    setwardId(event);
    setward(event);
    dispatch(onVillageList(event.value));
    setvillageId("");
    setvillage("");
    onChange({ district: districtId, municipal: municipalId, ward: event, village : null });
  };
  const handleVillageChange = (event) => {
    setvillageId(event);
    setvillage(event);
    // dispatch(onVillageList(event.value));
    // setvillageId("");
    // setvillage("");
    onChange({ district: districtId, municipal: municipalId, ward: wardId, village : event });

    // const globalUser = JSON.parse(getToken());
    // const { districtDetail, municipalityDetail, ulb, roles, userName } =
    //   globalUser || {};

    // if (districtId === undefined || municipalId === undefined) {
    //   onChange({
    //     district:
    //       districtId !== undefined ? districtId : districtDetail.districtCode,
    //     municipal:
    //       municipalId !== undefined
    //         ? municipalId
    //         : municipalityDetail.municipalId,
    //     ward: event,
    //   });
    // } else {
    //   onChange({ district: districtId, municipal: municipalId, ward: event });
    // }
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
            value={district || null}
            options={districtList}
            onChange={handleDistrictChange}
            // isDisabled={selectDisabledDistrict}
          />
        </Grid>

        <Grid item xs={3}>
          <InputLabel
            style={{ marginBottom: 5 }}
            id="demo-simple-select-helper-label"
          >
            Block{" "}
          </InputLabel>

          <Select
            styles={selectStyles}
            closeMenuOnSelect={true}
            value={municipal || null}
            options={municipalityList}
            onChange={handleMunicipalityChange}
            // isDisabled={selectDisabledMunicipality}
          />
        </Grid>

        <Grid item xs={3}>
          <InputLabel
            style={{ marginBottom: 5 }}
            id="demo-simple-select-helper-label"
          >
            Panchayat{" "}
          </InputLabel>
          <Select
            styles={selectStyles}
            closeMenuOnSelect={true}
            value={ward || null}
            options={wardList}
            onChange={handleWardChange}
            // isDisabled={selectDisabledWard}
          />


        </Grid>
        <Grid item xs={3}>
          <InputLabel
            style={{ marginBottom: 5 }}
            id="demo-simple-select-helper-label"
          >
            Village
          </InputLabel>

          <Select
            styles={selectStyles}
            closeMenuOnSelect={true}
            value={village ||null}
            options={villageList}
            onChange={handleVillageChange}
            // isDisabled={selectDisabledVillage}
          />
        </Grid>
      </Grid>
    </>
  );
}
