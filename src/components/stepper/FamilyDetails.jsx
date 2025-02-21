import React, { useCallback, useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AppContext } from "./Context";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { InputLabel, MenuItem, Typography } from "@mui/material";
import { onEconomicCategories } from "../../network/actions/economicCategories";
import { onReligionList } from "../../network/actions/religion";

import { onSocialCatList } from "../../network/actions/socialCategories";

import { onResidentList } from "../../network/actions/residentials";

import { onDistrict } from "../../network/actions/district";
import { onMunicipalityList } from "../../network/actions/municipality";
import { onWardList } from "../../network/actions/wards";
import { getToken } from "../../utils/cookie";
import { onFamilyData } from "../../network/actions/familyDetail";

import Select from "react-select";

const selectStyles = { menu: (styles) => ({ ...styles, zIndex: 999 }) };

const bonafideHimachali = [
  { label: "Yes", value: 1 },
  { label: "No", value: 0 },
];

export default function FamilyDetails(props) {
  const { formValues, handleChange, handleNext, variant, margin } =
    useContext(AppContext);

  const [districtCalled, setdistrictCalled] = useState(false);

  const [religionCalled, setreligionCalled] = useState(false);

  const [memberList, setMemberList] = useState([]);

  const [familyHead, setFamilyHead] = useState("");
  const [bonafide, setbonafide] = useState("");

  const [economicLevel, seteconomicLevel] = useState("");
  const [economicId, seteconomicId] = useState("");

  const [economicList, setEconomicList] = useState([]);

  const [religionList, setReligionList] = useState([]);
  const [religion, setReligion] = useState("");
  const [religionId, setreligionId] = useState("");

  const [socialList, setSocialList] = useState([]);
  const [social_cat, setSocialcat] = useState("");
  const [social_catId, setSocialcatId] = useState("");

  const [residentList, setResidentList] = useState([]);
  const [resident, setResident] = useState("");
  const [residentId, setResidentId] = useState("");

  const [districtList, setDistrictList] = useState([]);
  const [district, setDistrict] = useState("");
  const [districtId, setDistrictId] = useState("");

  const [municipalityList, setMunicipalityList] = useState([]);
  const [municipal, setMunicipal] = useState("");
  const [municipalId, setMunicipalId] = useState("");

  const [wardList, setWardList] = useState([]);
  const [ward, setward] = useState("");
  const [wardId, setwardId] = useState("");

  const [aadharNumber, setAadharNumber] = useState("");

  const [rationCard, setRationCard] = useState("");

  const [address, setaddress] = useState("");

  const [userName, setUserName] = useState("");

  const [errorList, setErrorList] = useState([]);

  const [ulbData, setUlbData] = useState({});

  const [location, setLocation] = useState({ latitude: null, longitude: null });

  const family_data = useSelector((state) => state.familyDetail);

  const dispatch = useDispatch();

  const forms = useSelector((state) => state.formData);

  const economicCategories = useSelector((state) => state.economicCategories);

  const religion_lists = useSelector((state) => state.religion);

  const social_categories = useSelector((state) => state.social_categories);

  const resident_reducer = useSelector((state) => state.residentList);

  const district_reducer = useSelector((state) => state.district_reducer);

  const municipality_reducer = useSelector(
    (state) => state.municipality_reducer
  );

  const ward_reducer = useSelector((state) => state.ward_reducer);

  function saveOldData(typeArray, mainArray) {
    if (forms) {
      const { value } = forms || {};
      let members = [];


      if (value.length > 0) {
        for (let i = 0; i < value.length; i++) {
          const {} = value[i] || {};
          const {
            aadhaarNumber,
            address,
            block,
            blockId,
            cardType,
            casteCategory,
            dateOfBirth,
            district,
            districtId,
            ekycStatus,
            fpsId,
            fpsName,
            gender,
            maritalStatus,
            memberName,
            mobileNumber,
            occupation,
            panchayatId,
            panchayatName,
            rationCardNumber,
            relationName,
            religion,
            villageId,
            villageName,
          } = value[i] || {};

          if (value[i].memberName) {
            if (i == 1) {
              setFamilyHead({
                label: value[i].memberName,
                value: value[i].memberName,
              });

              setAadharNumber(value[i].aadhaarNumber);
              setRationCard(value[i].rationCardNumber);

              // setbonafide("Yes")
            }

            members.push({
              label: value[i].memberName,
              value: value[i].memberName,
            });
          }
        }

        setMemberList(members);
      }
    }
  }

  useEffect(() => {
    const globalUser = getToken();

    let tokenData = {};

    try {
      tokenData = JSON.parse(globalUser);
    } catch (err) {
      console.warn(err, "asasdwie");
    }

    if (tokenData) {
      const { userName, ulb, token, wardName, districtName } = tokenData || {};

      setUlbData(ulb);
    }

    if (forms) {
      const { value } = forms || {};
      let members = [];


      if (value.length > 0) {
        for (let i = 0; i < value.length; i++) {
          const {} = value[i] || {};
          const {
            aadhaarNumber,
            address,
            block,
            blockId,
            cardType,
            casteCategory,
            dateOfBirth,
            district,
            districtId,
            ekycStatus,
            fpsId,
            fpsName,
            gender,
            maritalStatus,
            memberName,
            mobileNumber,
            occupation,
            panchayatId,
            panchayatName,
            rationCardNumber,
            relationName,
            religion,
            villageId,
            villageName,
          } = value[i] || {};

          if (value[i].memberName) {
            if (i == 1) {
              setFamilyHead({
                label: value[i].memberName,
                value: value[i].memberName,
              });

              setAadharNumber(value[i].aadhaarNumber);
              setRationCard(value[i].rationCardNumber);

              // setbonafide("Yes")
            }

            members.push({
              label: value[i].memberName,
              value: value[i].memberName,
            });
          }
        }

        setMemberList(members);
      }
    }

    if (family_data) {
      const { value } = family_data || {};

      const {
        rationCardNumber,
        headOfFamilyId,
        headOfFamilyName,
        economicLevelId,
        economicLevelName,
        ReligionId,
        ReligionName,
        socialCategoryId,
        socialCategoryName,
        residentStatusId,
        residentStatusName,
        districtId,
        districtName,
        municipalityId,
        municipalityName,
        wardId,
        wardName,
        dataEntered_by,
        location,
        address,
        bonafideHimachali,
      } = value || {};


      if (rationCardNumber) {
        setRationCard(rationCardNumber);
      }
      if (headOfFamilyId) {
        setFamilyHead(headOfFamilyName);
      }
      if (wardId) {
        setwardId(wardId);
      }
      if (wardName) {
        setward(wardName);
      }
      if (municipalityId) {
        setMunicipalId(municipalityId);
      }
      if (municipalityName) {
        setMunicipal(municipalityName);
      }

      if (districtId) {
        setDistrictId(districtId);
      }
      if (districtName) {
        setDistrict(districtName);
      }

      if (economicLevelId) {
        seteconomicId(economicLevelId);
      }
      if (ReligionId) {
        setreligionId(ReligionId);
      }
      if (economicLevelName) {
        seteconomicLevel(economicLevelName);
      }
      if (ReligionName) {
        setReligion(ReligionName);
      }
      if (ReligionId) {
        setreligionId(ReligionId);
      }
      if (socialCategoryId) {
        setSocialcatId(socialCategoryId);
      }
      if (socialCategoryName) {
        setSocialcat(socialCategoryName);
      }

      if (residentStatusId) {
        setResidentId(residentStatusId);
      }
      if (residentStatusName) {
        setResident(residentStatusName);
      }
      if (dataEntered_by) {
        setUserName(dataEntered_by);
      }
      if (location) {
        setLocation(location);
      }
      if (address) {
        setaddress(address);
      }
      if (bonafideHimachali) {
        setbonafide(bonafideHimachali);
      }


      // let familyDetails = {
      //     rationCardNumber: rationCard,
      //     headOfFamilyId: aadharNumber,
      //     headOfFamilyName: familyHead,
      //     economicLevelId: economicId,
      //     economicLevelName: economicLevel,
      //     ReligionId: religionId,
      //     ReligionName: religion,
      //     socialCategoryId: social_catId,
      //     socialCategoryName: social_cat,
      //     residentStatusId: residentId,
      //     residentStatusName: resident,
      //     districtId: districtId,
      //     districtName: district,
      //     municipalityId: municipalId,
      //     municipalityName: municipal,
      //     wardId: wardId,
      //     wardName: ward,
      //     dataEntered_by: userName,
      //     location: JSON.stringify(location),
      //     address: address
      // }
    }

    const getAllMaster = async () => {
      const callAPi = await fetch("/urban/api/merge-api");


      const res = await callAPi.json();

      const {
        economicCategories,
        religions,
        social_categories,
        resident,
        gender,
      } = res || {};

      let economic_list = [];

      for (let i = 0; i < economicCategories.length; i++) {
        let object = {
          label: economicCategories[i].economicStatus,
          value: economicCategories[i].id,
        };

        let altered_label = "";

        try {
          altered_label = economicCategories[i].economicStatus.replace(
            /\.\.\./g,
            ""
          ); // Replace ellipsis with an empty string
        } catch (e) {
          console.warn("Error");
        }

        const { value } = family_data || {};

        const { cardType } = value || {};


        if (cardType === altered_label) {
        }

        economic_list.push(object);
      }

      saveOldData("economic", economic_list);

      let resident_list = [];

      for (let i = 0; i < resident.length; i++) {
        let object = { label: resident[i].locationName, value: resident[i].id };
        resident_list.push(object);
      }


      let social_cat_list = [];
      for (let i = 0; i < social_categories.length; i++) {
        let object = {
          label: social_categories[i].socialCategoryNameEnglish,
          value: social_categories[i].id,
        };
        social_cat_list.push(object);
      }

      let religion_list = [];

      for (let i = 0; i < religions.length; i++) {
        let object = {
          label: religions[i].religionName,
          value: religions[i].id,
        };
        religion_list.push(object);
      }
      setReligionList(religion_list);
      setEconomicList(economic_list);
      setSocialList(social_cat_list);
      setResidentList(resident_list);

      setdistrictCalled(true);
      dispatch(onDistrict());

    };

    getAllMaster();

    try {
      tokenData = JSON.parse(globalUser);
      setUserName(tokenData.userName);
    } catch (err) {
      console.warn(err, "asasdwie");
    }

    if ("geolocation" in navigator) {
      // Get the user's current position
      navigator.geolocation.getCurrentPosition(function (position) {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.warn("Geolocation is not available in this browser.");
    }

    // dispatch(onEconomicCategories())
  }, []);

  useEffect(() => {
    let economic_list = [];

    if (economicCategories.data) {
      const { data, status, message } = economicCategories.data || {};

      if (status === "OK" && message === "SUCCESS") {
        for (let i = 0; i < data.length; i++) {
          let object = { label: data[i].economicStatus, value: data[i].id };
          economic_list.push(object);
        }
        setEconomicList(economic_list);
        setreligionCalled(true);
        dispatch(onReligionList());
      }
    }
  }, [economicCategories]);

  useEffect(() => {
    let religion_list = [];

    if (religion_lists.data && religionCalled) {
      const { data, status, message } = religion_lists.data || {};
      setreligionCalled(false);
      if (status === "OK" && message === "SUCCESS") {
        for (let i = 0; i < data.length; i++) {
          let object = { label: data[i].religionName, value: data[i].id };
          religion_list.push(object);
        }
        setReligionList(religion_list);
        dispatch(onSocialCatList());
      }
    }
  }, [religion_lists]);

  useEffect(() => {
    let social_cat_list = [];

    if (social_categories.data) {
      const { data, status, message } = social_categories.data || {};

      if (status === "OK" && message === "SUCCESS") {
        for (let i = 0; i < data.length; i++) {
          let object = {
            label: data[i].socialCategoryNameEnglish,
            value: data[i].id,
          };
          social_cat_list.push(object);
        }
        setSocialList(social_cat_list);
        dispatch(onResidentList());
      }
    }
  }, [social_categories]);

  useEffect(() => {
    let resident_list = [];

    if (resident_reducer?.data) {
      const { data, status, message } = resident_reducer.data || {};

      if (status === "OK" && message === "SUCCESS") {
        for (let i = 0; i < data.length; i++) {
          let object = { label: data[i].residentStatus, value: data[i].id };
          resident_list.push(object);

          // if (forms) {
          //     const { value } = forms || {};
          //     if (value.length > 0) {
          //         for (let i = 0; i < value.length; i++) {

          //             if (value[i].memberName) {

          //             }
          //         }
          //     }

          // }
        }
        setResidentList(resident_list);

        setdistrictCalled(true);
        dispatch(onDistrict());
      }
    }
  }, [resident_reducer]);

  useEffect(() => {
    let district_list = [];

    if (district_reducer?.data && districtCalled) {
      setdistrictCalled(false);
      const { data, status, message } = district_reducer.data || {};

      if (status === "OK" && message === "SUCCESS") {
        for (let i = 0; i < data.length; i++) {
          let object = {
            label: data[i].districtName + " (" + data[i].districtCode + ")",
            value: data[i].id,
            code: data[i].districtCode,
          };
          district_list.push(object);

          if (ulbData.districtCode == data[i].districtCode) {
            setDistrictId(object);
            setDistrict(object);

            dispatch(onMunicipalityList(data[i].districtCode));

        
          }
        }
        setDistrictList(district_list);
      }
    }
  }, [district_reducer]);

  useEffect(() => {
    let municipal_list = [];

    if (municipality_reducer?.data) {
      const { data, status, message } = municipality_reducer.data || {};

      if (status === "OK" && message === "SUCCESS") {
        for (let i = 0; i < data.length; i++) {
          let object = {
            label: data[i].municipalName,
            value: data[i].municipalId,
          };
          municipal_list.push(object);

          if (ulbData.municipalId == data[i].municipalId) {
            setMunicipalId(object);
            setMunicipal(object);
            dispatch(onWardList(data[i].municipalId));
          }
        }
        setMunicipalityList(municipal_list);

        // dispatch(onMunicipalityList())
      }
    }
  }, [municipality_reducer]);

  useEffect(() => {
    let ward_list = [];

    if (ward_reducer?.data) {
      const { data, status, message } = ward_reducer.data || {};

      if (status === "OK" && message === "SUCCESS") {
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

        // dispatch(onMunicipalityList())
      }
    }
  }, [ward_reducer]);

  // function hasBlankValues(obj) {
  //     for (const key in obj) {
  //         if (obj.hasOwnProperty(key)) {
  //             if (obj[key] === '' || obj[key] === null || obj[key] === undefined) {
  //                 return true; // Found a blank value
  //             }
  //         }
  //     }
  //     return false; // No blank values found
  // }

  function findKeysWithBlankValues(obj) {
    const blankKeys = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] === "" || obj[key] === null || obj[key] === undefined) {
          blankKeys.push(key);
        }
      }
    }
    return blankKeys;
  }

  return (
    <>
      <Grid container spacing={3} style={{ flex: 1 }}>
        <Grid item xs={12} sm={4} mt={3}>
          <InputLabel
            style={{ marginBottom: 5 }}
            id="demo-simple-select-helper-label"
          >
            Head of Family
          </InputLabel>

          <Select
            styles={selectStyles}
            closeMenuOnSelect={true}
            value={familyHead}
            options={memberList}
            onChange={(event) => {
              setFamilyHead(event);

              if (forms) {
                const { value } = forms || {};
                let members = [];


                if (value.length > 0) {
                  for (let i = 0; i < value.length; i++) {
                    if (value[i].memberName === event.value) {
                      if (i == 1) {
                       
                        setAadharNumber(value[i].memberName.aadhaarNumber);
                        setRationCard(value[i].rationCardNumber);
                      }
                    }
                  }
                }
              }
              const newArray = errorList.filter(
                (item) => item !== "headOfFamilyName"
              );
              setErrorList(newArray);
            }}
          />
          {errorList &&
            errorList.map((item, index) => {
              if (item == "headOfFamilyName") {
                return (
                  <InputLabel
                    key={index}
                    style={{ marginBottom: 5 }}
                    id="demo-simple-select-helper-label"
                  >
                    Please Select Family Head{" "}
                  </InputLabel>
                );
              }
            })}
        </Grid>

        <Grid item xs={12} sm={4} mt={3}>
          <InputLabel
            style={{ marginBottom: 5 }}
            id="demo-simple-select-helper-label"
          >
            Is Head of Family Bonadfide Himachali?
          </InputLabel>
          <Select
            styles={selectStyles}
            closeMenuOnSelect={true}
            value={bonafide}
            options={bonafideHimachali}
            onChange={(event) => {
              setbonafide(event);
            }}
          />
        </Grid>

        <Grid item xs={12} sm={4} mt={3}>
          <InputLabel
            style={{ marginBottom: 5 }}
            id="demo-simple-select-helper-label"
          >
            Economic Level
          </InputLabel>

          <Select
            styles={selectStyles}
            closeMenuOnSelect={true}
            value={economicId}
            options={economicList}
            onChange={(event) => {
              seteconomicId(event);
              seteconomicLevel(event.value);
              const newArray = errorList.filter(
                (item) => item !== "economicLevelId"
              );
              setErrorList(newArray);
            }}
          />
          {errorList &&
            errorList.map((item, index) => {
              if (item == "economicLevelId") {
                return (
                  <InputLabel
                    key={index}
                    style={{ marginBottom: 5, color: "red", fontSize: 12 }}
                    id="demo-simple-select-helper-label"
                  >
                    Please Select Level
                  </InputLabel>
                );
              }
            })}
        </Grid>

        <Grid item xs={12} sm={4} mt={3}>
          <InputLabel
            style={{ marginBottom: 5 }}
            id="demo-simple-select-helper-label"
          >
            Religion{" "}
          </InputLabel>

          <Select
            styles={selectStyles}
            closeMenuOnSelect={true}
            value={religionId}
            options={religionList}
            onChange={(event) => {
              setreligionId(event);
              setReligion(event.value);
              const newArray = errorList.filter(
                (item) => item !== "ReligionId"
              );
              setErrorList(newArray);
            }}
          />

          {errorList &&
            errorList.map((item, index) => {
              if (item == "ReligionId") {
                return (
                  <InputLabel
                    key={index}
                    style={{ marginBottom: 5, color: "red", fontSize: 12 }}
                    id="demo-simple-select-helper-label"
                  >
                    Please Select Religion
                  </InputLabel>
                );
              }
            })}
        </Grid>

        <Grid item xs={12} sm={4} mt={3}>
          <InputLabel
            style={{ marginBottom: 5 }}
            id="demo-simple-select-helper-label"
          >
            Social Category{" "}
          </InputLabel>
          <Select
            styles={selectStyles}
            closeMenuOnSelect={true}
            value={social_catId}
            options={socialList}
            onChange={(event) => {
              setSocialcatId(event);
              setSocialcat(event.value);
              const newArray = errorList.filter(
                (item) => item !== "socialCategoryId"
              );
              setErrorList(newArray);
            }}
          />

          {errorList &&
            errorList.map((item, index) => {
              if (item == "socialCategoryId") {
                return (
                  <InputLabel
                    key={index}
                    style={{ marginBottom: 5, color: "red", fontSize: 12 }}
                    id="demo-simple-select-helper-label"
                  >
                    Please Select Category
                  </InputLabel>
                );
              }
            })}
        </Grid>

        <Grid item xs={12} sm={4} mt={3}>
          <InputLabel
            style={{ marginBottom: 5 }}
            id="demo-simple-select-helper-label"
          >
            Resident Status{" "}
          </InputLabel>

          <Select
            styles={selectStyles}
            closeMenuOnSelect={true}
            value={residentId}
            options={residentList}
            onChange={(event) => {
              setResidentId(event);
              setResident(event.value);
              const newArray = errorList.filter(
                (item) => item !== "residentStatusId"
              );
              setErrorList(newArray);
            }}
          />

          {errorList &&
            errorList.map((item, index) => {
              if (item == "residentStatusId") {
                return (
                  <InputLabel
                    key={index}
                    style={{ marginBottom: 5, color: "red", fontSize: 12 }}
                    id="demo-simple-select-helper-label"
                  >
                    Please Select Resident
                  </InputLabel>
                );
              }
            })}
        </Grid>

        <Grid item xs={12} sm={4} mt={3}>
          <InputLabel
            style={{ marginBottom: 5 }}
            id="demo-simple-select-helper-label"
          >
            District{" "}
          </InputLabel>

          <Select
            styles={selectStyles}
            closeMenuOnSelect={true}
            value={districtId}
            isDisabled
            options={districtList}
            onChange={(event) => {
              setDistrictId(event);
              setDistrict(event);
              dispatch(onMunicipalityList(event.code));
              const newArray = errorList.filter(
                (item) => item !== "districtId"
              );
              setErrorList(newArray);
            }}
          />

          {errorList &&
            errorList.map((item, index) => {
              if (item == "districtId") {
                return (
                  <InputLabel
                    key={index}
                    style={{ marginBottom: 5, color: "red", fontSize: 12 }}
                    id="demo-simple-select-helper-label"
                  >
                    Please Select District
                  </InputLabel>
                );
              }
            })}
        </Grid>

        <Grid item xs={12} sm={4} mt={3}>
          <InputLabel
            style={{ marginBottom: 5 }}
            id="demo-simple-select-helper-label"
          >
            Municipality{" "}
          </InputLabel>

          <Select
            styles={selectStyles}
            closeMenuOnSelect={true}
            value={municipalId}
            isDisabled
            options={municipalityList}
            onChange={(event) => {
              setMunicipalId(event);
              setMunicipal(event.value);
              dispatch(onWardList(event.value));

              const newArray = errorList.filter(
                (item) => item !== "municipalityId"
              );
              setErrorList(newArray);
            }}
          />

          {errorList &&
            errorList.map((item, index) => {
              if (item == "municipalityId") {
                return (
                  <InputLabel
                    key={index}
                    style={{ marginBottom: 5, color: "red", fontSize: 12 }}
                    id="demo-simple-select-helper-label"
                  >
                    Please Select Municipality
                  </InputLabel>
                );
              }
            })}
        </Grid>

        <Grid item xs={12} sm={4} mt={3}>
          <InputLabel
            style={{ marginBottom: 5 }}
            id="demo-simple-select-helper-label"
          >
            Ward{" "}
          </InputLabel>

          <Select
            styles={selectStyles}
            closeMenuOnSelect={true}
            value={wardId}
            isDisabled
            options={wardList}
            onChange={(event) => {
              setwardId(event);
              setward(event.value);
              const newArray = errorList.filter((item) => item !== "wardId");
              setErrorList(newArray);
            }}
          />
          {errorList &&
            errorList.map((item, index) => {
              if (item == "wardId") {
                return (
                  <InputLabel
                    key={index}
                    style={{ marginBottom: 5, color: "red", fontSize: 12 }}
                    id="demo-simple-select-helper-label"
                  >
                    Please Select Ward
                  </InputLabel>
                );
              }
            })}
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} mt={3}>
          <div>
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Multiline"
              multiline
              rows={4}
              defaultValue={address}
              onChange={(event) => {
                setaddress(event.target.value);
              }}
            />

            {/* <TextField
                            fullWidth
                            required
                            label="Enter Address (House Number / Building Name)"
                            defaultValue={address}
                            maxRows={3}
                            multiline
                            onChange={(event) => {
                                setaddress(event.target.value);
                            }}
                        /> */}
          </div>
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          sx={{ mt: 3, ml: 1 }}
          // disabled={isError()}
          // color="success"
          onClick={() => {
            let familyDetails = {
              rationCardNumber: rationCard,
              headOfFamilyId: aadharNumber,
              headOfFamilyName: familyHead,
              economicLevelId: economicId,
              economicLevelName: economicLevel,
              ReligionId: religionId,
              ReligionName: religion,
              socialCategoryId: social_catId,
              socialCategoryName: social_cat,
              residentStatusId: residentId,
              residentStatusName: resident,
              districtId: districtId,
              districtName: district,
              municipalityId: municipalId,
              municipalityName: municipal,
              wardId: wardId,
              wardName: ward,
              dataEntered_by: userName,
              location: JSON.stringify(location),
              address: address,
              bonafideHimachali: bonafide,
            };
            dispatch(onFamilyData(familyDetails));

            const blankKeys = findKeysWithBlankValues(familyDetails);

            setErrorList(blankKeys);

            if (blankKeys.length > 0) {
              console.warn(
                "Object contains blank values in the following keys:",
                blankKeys
              );
              // You can show an error message or take other actions here.
            } else {
              handleNext();
            }
          }}
          style={{ backgroundColor: "blue" }}
          // onClick={!isError() ? handleNext : () => null}
        >
          Save and Proceed
        </Button>
      </Box>
    </>
  );
}
