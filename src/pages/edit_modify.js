import { useRouter } from "next/router";
import Layout from "../components/dashboard/layout";
import { useDispatch, useSelector } from "react-redux";
import { onFamiliesDetailApi } from "../network/actions/familyDetailApi";
import { Fragment, useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

import EditMembers from "../components/verify/members/EditMembers";
import FamilyDetails from "../components/verify/family/FamilyDetails";
import EditFamily from "../components/verify/family/EditFamily";
import MemberDetailsHeader from "../components/verify/members/MemberDetailsHeader";
import FamilyDetailsHeader from "../components/verify/family/FamilyDetailsHeader";
import PropertyDetailsHeader from "../components/verify/property/PropertyDetailsHeader";
import EditProperties from "../components/verify/property/EditProperties";
import ConsentHeader from "../components/verify/consent/ConsentHeader";
import ConsentDetailsHeader from "../components/verify/consent/ConsentDetailsHeader";
import VerificationButtons from "../components/verify/buttons/VerificationButtons";
import VerificationHeader from "../components/verify/buttons/VerificationHeader";
// import { getUserID } from "../utils/cookie";
import { onVerification } from "../network/actions/verification";
import { onFamilyUpdate } from "../network/actions/familyUpdate";
import Backdrop from "@mui/material/Backdrop";
import { ErrorOutline, Close } from "@mui/icons-material";
import ShowMessage from "../components/generic/ShowMessage";
import { onMemberUpdate } from "../network/actions/memberUpdate";
import { onPropertyUpdate } from "../network/actions/propertyUpdate";

const EditModify = ({ himMemberID }) => {
  const verificationObject = {
    remarks_id: null,
    verification_status_id: null,
    him_parivar_id: null,
    user_id: null,
  };

  const [loading, setLoading] = useState(false); // Loading state
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [modalMessage, setModalMessage] = useState({
    title: "",
    content: "",
  });

  const router = useRouter();
  const dispatch = useDispatch();
  const [selectedFamily, setselectedFamily] = useState({});
  const familiesDetailApi = useSelector((state) => state.familiesDetailApi);
  const verification_post = useSelector((state) => state.verification);

  const familySave = useSelector((state) => state.saveFamily);
  const memberSave = useSelector((state) => state.saveMember);
  const propertySave = useSelector((state) => state.saveProperty);
  const [verificationObj, setVerificationObj] = useState(verificationObject);
  useEffect(() => {
    const { himParivarId, RationCard } = router.query;
    if (himParivarId && RationCard) {
      dispatch(onFamiliesDetailApi(himParivarId, RationCard));
    }
  }, [router.query]);

  /**
   * ===================================================================================================================
   * Update Family
   * UseEffect
   * ===================================================================================================================
   */
  useEffect(() => {
    const { data, status, message } = familySave?.data || {};
    if (familySave?.data) {
      if (status === "OK" && message === "Success") {
        if (data) {
          handleOpenModal("Successfully Updated", data);
          setLoading(false);
        } else {
          handleOpenModal("Error", "Unable to Read the Data from Server");
          setLoading(false);
        }
      } else {
        handleOpenModal("Error", message);
        setLoading(false);
      }
    } else {
      handleOpenModal("Error", message);
      setLoading(false);
    }
  }, [familySave]);

  /**
   * ===================================================================================================================
   * Update memberSave
   * UseEffect
   * ===================================================================================================================
   */
  useEffect(() => {
    const { data, status, message } = memberSave?.data || {};
    if (memberSave?.data) {
      if (status === "OK" && message === "Success") {
        if (data) {
          handleOpenModal("Successfully Updated", data);
          setLoading(false);
        } else {
          handleOpenModal("Error", "Unable to Read the Data from Server");
          setLoading(false);
        }
      } else {
        handleOpenModal("Error", "message");
        setLoading(false);
      }
    } else {
      handleOpenModal("Error", "Unable to Read the Data from Server");
      setLoading(false);
    }
  }, [memberSave]);

  /**
   * ===================================================================================================================
   * Update propertySave
   * UseEffect
   * ===================================================================================================================
   */
  useEffect(() => {
    const { data, status, message } = propertySave?.data || {};
    if (propertySave?.data) {
      if (status === "OK" && message === "Success") {
        if (data) {
          handleOpenModal("Successfully Updated", data);
          setLoading(false);
        } else {
          handleOpenModal("Error", "Unable to Read the Data from Server");
          setLoading(false);
        }
      } else {
        handleOpenModal("Error", "message");
        setLoading(false);
      }
    } else {
      handleOpenModal("Error", "Unable to Read the Data from Server");
      setLoading(false);
    }
  }, [propertySave]);

  /**
   * ===================================================================================================================
   * Verification of Family useEffect Post
   * Verification of Buttons Start
   * ===================================================================================================================
   */
  useEffect(() => {
    const { data, status, message } = verification_post?.data || {};
    if (verification_post?.data) {
      if (status === "OK" && message === "Success") {
        if (data) {
          handleOpenModal("Success", data);
          setLoading(false);
        } else {
          handleOpenModal("Error", "Unable to Read the Data from Server");
          setLoading(false);
        }
      } else {
        handleOpenModal("Error", message);
        setLoading(false);
      }
    } else {
      handleOpenModal("Error", message);
      setLoading(false);
    }
  }, [verification_post]);

  useEffect(() => {
    if (familiesDetailApi?.data) {
      const { data, status, propertyDetail, members } = familiesDetailApi.data;
      setselectedFamily(familiesDetailApi.data);
      setIsModalOpen(false);
    }
  }, [familiesDetailApi]);

  const handleOpenModal = (title, content) => {
    setModalMessage({ title, content });
    setIsModalOpen(true);
  };

  const handleVerify = () => {
    const isAnyMemberNotVerified = selectedFamily?.members.some(
      (member) => !member.isEkycVerfied
    );
    
    // const userId = getUserID();
    if (!isAnyMemberNotVerified) {
      // Display alert if any member's eKYC is not verified
      handleOpenModal(
        "Error",
        "Verification for the family cannot be completed as Aadhaar eKYC is not conducted for all family members."
      );
    } else {
      try {
        // dispatch(onVerification(null, 2, selectedFamily.himParivarId, userId));
        setLoading(true);
      } catch (error) {
        handleOpenModal(
          "Error",
          "Error While accessing the network. Please Check your internet Connection and try again."
        );
      }
    }
  };

  const handleFamilyNotVerified = (remarks) => {
    // const userId = getUserID();
    try {
      // dispatch(
      //   onVerification(remarks.id, 3, selectedFamily.himParivarId, userId)
      // );
      setLoading(true);
    } catch (error) {
      handleOpenModal(
        "Error",
        "Error While accessing the network. Please Check your internet Connection and try again."
      );
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    const isError = modalMessage.title === "Error";
    if (!isError) {
      if (modalMessage.title === "Successfully Updated") {
        // Reload the page if modal title is "Successfully Updated"
        window.location.reload();
      } else {
        router.back();
      }
    }

    //Successfully Updated
  };

  /**
   * ===================================================================================================================
   * Verification of Family useEffect Post
   * Verification of Buttons Ends
   * ===================================================================================================================
   */

  /**
   * ===================================================================================================================
   *  Family Save Update Starts
   * ===================================================================================================================
   */
  const handleFamilySave = (modalData) => {
    // const userId = getUserID();

    if (modalData && modalData.updatedData) {
      // modalData.updatedData.userId = userId;
      modalData.updatedData.himParivarId = selectedFamily.himParivarId;
      
      try {
        dispatch(onFamilyUpdate(modalData.updatedData));
        setLoading(true);
      } catch (error) {
        handleOpenModal(
          "Error",
          "Error While accessing the network. Please Check your internet Connection and try again."
        );
      }
    } else {
      handleOpenModal(
        "Error",
        "Unable to process the request. Please refresh the page or try agmain later."
      );
    }
  };

  /**
   * ===================================================================================================================
   *  Family Save Update Ends
   * ===================================================================================================================
   */

  /**
   * ===================================================================================================================
   *  Member Save Update Starts
   * ===================================================================================================================
   */
  const handleMemberSave = (modalData) => {
    // const userId = getUserID();

    if (modalData && modalData.updatedData) {
      // modalData.updatedData.userId = userId;
      modalData.updatedData.himParivarId = selectedFamily.himParivarId;
      
      try {
        dispatch(onMemberUpdate(modalData.updatedData));
        setLoading(true);
      } catch (error) {
        handleOpenModal(
          "Error",
          "Error While accessing the network. Please Check your internet Connection and try again."
        );
      }
    } else {
      handleOpenModal(
        "Error",
        "Unable to process the request. Please refresh the page or try agmain later."
      );
    }
  };

  /**
   * ===================================================================================================================
   *  Member Save Update Ends
   * ===================================================================================================================
   */

  /**
   * ===================================================================================================================
   *  Property Save Update Starts
   * ===================================================================================================================
   */
  const handlePropertySave = (modalData) => {
    // const userId = getUserID();

    if (modalData && modalData.updatedData) {
      // modalData.updatedData.userId = userId;
      modalData.updatedData.himParivarId = selectedFamily.himParivarId;
      
      try {
        dispatch(onPropertyUpdate(modalData.updatedData));
        setLoading(true);
      } catch (error) {
        handleOpenModal(
          "Error",
          "Error While accessing the network. Please Check your internet Connection and try again."
        );
      }
    } else {
      handleOpenModal(
        "Error",
        "Unable to process the request. Please refresh the page or try agmain later."
      );
    }
  };
  /**
   * ===================================================================================================================
   *  Property Save Update Ends
   * ===================================================================================================================
   */

  return (
    <>
      <Layout>
        <main className="p-6 space-y-6">
          <Paper
            elevation={3}
            variant="elevation"
            style={{ marginBottom: 16, backgroundColor: "#FFF" }}
          >
            <div className="p-4 flex-grow">
              <Box>
                <div style={{}}>
                  <Grid container>
                    <Grid item xs={12}>
                      <FamilyDetailsHeader />
                    </Grid>
                  </Grid>

                  <Paper elevation={3} variant="elevation">
                    {selectedFamily && (
                      <EditFamily
                        onsave={handleFamilySave}
                        selectedFamily={selectedFamily}
                      />
                    )}
                  </Paper>
                  <Divider>&nbsp; &nbsp;</Divider>

                  <Grid container>
                    <Grid item xs={12}>
                      <MemberDetailsHeader />
                    </Grid>
                  </Grid>

                  {selectedFamily?.members &&
                    selectedFamily?.members.map((memberObject, index) => (
                      <Paper
                        elevation={3}
                        variant="elevation"
                        style={{ marginBottom: 8 }}
                        key={index}
                      >
                        <EditMembers
                          onsave={handleMemberSave}
                          memberObject={memberObject}
                        />
                      </Paper>
                    ))}
                  <Divider>&nbsp; &nbsp;</Divider>

                  <Grid container>
                    <Grid item xs={12}>
                      <PropertyDetailsHeader />
                    </Grid>
                  </Grid>

                  <Paper elevation={3} variant="elevation">
                    {selectedFamily && (
                      <EditProperties
                        onsave={handlePropertySave}
                        selectedFamily={selectedFamily}
                      />
                    )}
                  </Paper>
                  <Divider>&nbsp; &nbsp;</Divider>

                  <Grid container>
                    <Grid item xs={12}>
                      <ConsentDetailsHeader />
                    </Grid>
                  </Grid>

                  <Paper elevation={3} variant="elevation">
                    {selectedFamily && (
                      <ConsentHeader selectedFamily={selectedFamily} />
                    )}
                  </Paper>
                  <Divider>&nbsp; &nbsp;</Divider>

                  <Paper elevation={3} variant="elevation">
                    <VerificationHeader />
                    <VerificationButtons
                      onVerify={handleVerify}
                      onFamilyNotVerified={handleFamilyNotVerified}
                    />
                  </Paper>
                  <Divider>&nbsp; &nbsp;</Divider>

                  <Backdrop
                    sx={{
                      color: "#fff",
                      zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={loading}
                    invisible={false}
                    // onClick={()=>setLoading(false)}
                  >
                    <CircularProgress color="inherit" />
                  </Backdrop>

                  <Divider>&nbsp; &nbsp;</Divider>
                </div>
              </Box>
            </div>
          </Paper>
        </main>
      </Layout>
      <ShowMessage
        open={isModalOpen}
        onClose={handleCloseModal}
        message={modalMessage}
      />
    </>
  );
};

export default EditModify;
