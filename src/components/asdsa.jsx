import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import StepConnector, { stepConnectorClasses } from "@mui/material/StepConnector";
import Check from "@mui/icons-material/Check";
import stepFinishAnimationData from "../lotties/stepFinish.json";
import LottieAnimation from "./LottieAnimation";
import axios from "axios"; // Import axios or your preferred HTTP client
import SettingsSummary from "./SettingsSummary"; // Import the new component
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress

const steps = [
  {
    label: "Server API Settings",
    description: "配置服务器API的主机、端口和协议。",
  },
  {
    label: "Tool Settings",
    description: "配置API的服务器URL、WOPI URL和第三方工具选择。",
  },
  {
    label: "PREEvision API Metric Settings",
    description: "配置PREEvision API的指标设置，例如Top值和用户信息。",
  },
  {
    label: "WOPI URL",
    description: "如果需要富文本，可以配置WOPI URL。",
  },
];

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiFormLabel-root": { color: "grey" },
  "& .MuiFormLabel-asterisk": { color: "#B70032" },
  maxWidth: 600, // Increase the maxWidth as needed
}));

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: { borderColor: "#6aa84f" },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: { borderColor: "#6aa84f" },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: ownerState.active ? "#6aa84f" : "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  "& .QontoStepIcon-completedIcon": {
    color: "#6aa84f",
    zIndex: 1,
    fontSize: 18,
  },
  "& .QontoStepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;
  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

export default function Settings() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isConfigured, setIsConfigured] = React.useState(false);
  const [animationFinished, setAnimationFinished] = React.useState(false);
  const [submittedData, setSubmittedData] = React.useState([]);
  const [serverApi, setServerApi] = React.useState({
    protocol: "http",
    host: "",
    port: "",
    model: "",
  });
  const [tool, setTool] = React.useState({
    thirdPartyTool: "",
    thirdPartyToolUrl: "",
  });
  const [preevision, setPreevision] = React.useState({
    top: "",
    user: "",
    password: "",
    role: "",
  });
  const [wopi, setWopi] = React.useState({
    wopiProtocol: "http",
    wopiHost: "",
    wopiPort: "",
    wopiModel: "",
  });

  const isNextDisabled = () => {
    if (activeStep === 0)
      return !serverApi.host || !serverApi.port || !serverApi.model;
    if (activeStep === 1)
      return !tool.thirdPartyTool || !tool.thirdPartyToolUrl;
    if (activeStep === 2)
      return (
        !preevision.top ||
        !preevision.user ||
        !preevision.password ||
        !preevision.role
      );
    if (activeStep === 3)
      return (
        !wopi.wopiProtocol ||
        !wopi.wopiHost ||
        !wopi.wopiPort ||
        !wopi.wopiModel
      );
    return false;
  };

  const handleFinish = async () => {
    // Construct the URL from user inputs
    const serverApiUrl = `${serverApi.protocol}://${serverApi.host}:${serverApi.port}/vCollabAPI/${serverApi.model}`;

    // Process tool data to match the desired format
    const toolKey = tool.thirdPartyTool.toLowerCase(); // Convert to lowercase
    const toolValue = tool.thirdPartyToolUrl;

    // Process preevision data
    const topValue = preevision.top;
    const userValue = preevision.user;
    const passwordValue = preevision.password;
    const roleValue = preevision.role;

    // Construct user wopi inputs into URL
    const wopiUrl = `${wopi.wopiProtocol}://${wopi.wopiHost}:${wopi.wopiPort}/browser/${wopi.wopiModel}/cool.html?WOPISrc=`;

    const configBeanList = {
      configBeanList: [
        { key: "serverApi", value: serverApiUrl },
        { key: toolKey, value: toolValue },
        { key: "top", value: topValue },
        { key: "user", value: userValue },
        { key: "password", value: passwordValue },
        { key: "role", value: roleValue },
        { key: "wopi", value: wopiUrl },
      ],
    };
    console.log(configBeanList);
    try {
      const response = await axios.post("http://10.86.10.165:8085/config/updateConfig", configBeanList, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Config update successful:", response.data);
      setSubmittedData(response.data); // Store the submitted data
      setIsConfigured(true); // Update state after successful submission
      setAnimationFinished(true); // Set animation finished to true
    } catch (error) {
      console.error("Error updating config:", error);
    }
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      setAnimationFinished(false); // Reset animation finished state
      handleFinish(); // Call handleFinish on the last step
      setActiveStep(steps.length); // Move to final step
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleReset = () => {
    setActiveStep(0);
    setServerApi({ protocol: "http", host: "", port: "", model: "" });
    setTool({ thirdPartyTool: "", thirdPartyToolUrl: "" });
    setPreevision({ top: "", user: "", password: "", role: "" });
    setWopi({
      wopiProtocol: "http",
      wopiHost: "",
      wopiPort: "",
      wopiModel: "",
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (activeStep) {
      case 0:
        setServerApi((prev) => ({ ...prev, [name]: value }));
        break;
      case 1:
        setTool((prev) => ({ ...prev, [name]: value }));
        if (name === "thirdPartyTool")
          setTool((prev) => ({ ...prev, thirdPartyToolUrl: "" }));
        break;
      case 2:
        setPreevision((prev) => ({ ...prev, [name]: value }));
        break;
      case 3:
        setWopi((prev) => ({ ...prev, [name]: value }));
        break;
      default:
        break;
    }
  };

  return (
    <Box sx={{ width: "100%", height: "100vh" }}>
      {isConfigured ? (
        <SettingsSummary submittedData={submittedData} />
      ) : (
        <>
          <Stepper
            alternativeLabel
            activeStep={activeStep}
            connector={<QontoConnector />}
          >
            {steps.map((step) => (
              <Step key={step.label}>
                <StepLabel>{step.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep < steps.length ? (
            <Box sx={{ p: 3 }}>
              <Typography variant="h6">{steps[activeStep].label}</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {steps[activeStep].description}
              </Typography>
              {/* Conditionally render form fields based on the active step */}
              {activeStep === 0 && (
                <Box>
                  <StyledTextField
                    label="Host"
                    name="host"
                    value={serverApi.host}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <StyledTextField
                    label="Port"
                    name="port"
                    value={serverApi.port}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <StyledTextField
                    label="Model"
                    name="model"
                    value={serverApi.model}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                </Box>
              )}
              {activeStep === 1 && (
                <Box>
                  <StyledTextField
                    label="Third Party Tool"
                    name="thirdPartyTool"
                    value={tool.thirdPartyTool}
                    onChange={handleChange}
                    select
                    fullWidth
                    sx={{ mb: 2 }}
                  >
                    <MenuItem value="Feishu">Feishu</MenuItem>
                    <MenuItem value="Jama">Jama</MenuItem>
                    <MenuItem value="Jira">Jira</MenuItem>
                    <MenuItem value="CodeBeamer">CodeBeamer</MenuItem>
                    <MenuItem value="Polarion">Polarion</MenuItem>
                  </StyledTextField>
                  <StyledTextField
                    label="Third Party Tool URL"
                    name="thirdPartyToolUrl"
                    value={tool.thirdPartyToolUrl}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                </Box>
              )}
              {activeStep === 2 && (
                <Box>
                  <StyledTextField
                    label="Top"
                    name="top"
                    value={preevision.top}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <StyledTextField
                    label="User"
                    name="user"
                    value={preevision.user}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <StyledTextField
                    label="Password"
                    name="password"
                    value={preevision.password}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <StyledTextField
                    label="Role"
                    name="role"
                    value={preevision.role}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                </Box>
              )}
              {activeStep === 3 && (
                <Box>
                  <StyledTextField
                    label="WOPI Protocol"
                    name="wopiProtocol"
                    value={wopi.wopiProtocol}
                    onChange={handleChange}
                    select
                    fullWidth
                    sx={{ mb: 2 }}
                  >
                    <MenuItem value="http">http</MenuItem>
                    <MenuItem value="https">https</MenuItem>
                  </StyledTextField>
                  <StyledTextField
                    label="WOPI Host"
                    name="wopiHost"
                    value={wopi.wopiHost}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <StyledTextField
                    label="WOPI Port"
                    name="wopiPort"
                    value={wopi.wopiPort}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <StyledTextField
                    label="WOPI Model"
                    name="wopiModel"
                    value={wopi.wopiModel}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                </Box>
              )}
              <Stack spacing={2} direction="row" justifyContent="flex-end">
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                >
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={isNextDisabled()}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </Stack>
            </Box>
          ) : animationFinished ? (
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <LottieAnimation
                animationData={stepFinishAnimationData}
                width={300}
                height={300}
                options={{ loop: false, autoplay: true }}
              />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Configuration Complete
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
              <CircularProgress />
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
