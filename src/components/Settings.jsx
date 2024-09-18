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
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import Check from "@mui/icons-material/Check";
import stepFinishAnimationData from "../lotties/stepFinish.json";
import LottieAnimation from "../components/LottieAnimation";
import axios from "axios"; // Import axios or your preferred HTTP client
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
  const [submittedData, setSubmittedData] = React.useState([]); // State to store submitted data
  const [showUpdateButton, setShowUpdateButton] = React.useState(false);
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
    const toolKey = tool.thirdPartyTool; // Convert to lowercase
    const toolValue = tool.thirdPartyToolUrl;

    // process preevision data to backend @Zhijie Wang
    const topValue = preevision.top;
    const userValue = preevision.user;
    const passwordValue = preevision.password;
    const roleValue = preevision.role;

    //construct user wopi inputs into url
    const wopiUrl = `${wopi.wopiProtocol}://${wopi.wopiHost}:${wopi.port}/browser/${wopi.wopiModel}/cool.html?WOPISrc=`;
    const apiUrl = process.env.REACT_APP_API_URL;
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
      const response = await axios.post(
        `${apiUrl}/config/updateConfig`,
        configBeanList,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Config update successful:", response.data);
      setSubmittedData(response.data); // Store the submitted data
      setIsConfigured(true); // Update state after successful submission
      setAnimationFinished(true);
      setActiveStep(steps.length); // Navigate to the final step
      setTimeout(() => {
        setShowUpdateButton(true); // Show the Update button after the delay
      }, 2000); // Delay in milliseconds (e.g., 2000ms = 2 seconds)
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

  const handleUpdate = () => {
    setActiveStep(3);
    setShowUpdateButton(false); // Reset the Update button visibility
    console.log("Update clicked");
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
    <Box sx={{ width: "100%", p: 2 }}>
      <Typography variant="h4" align="center" gutterBottom marginBottom={3}>
        Setting Configuration
      </Typography>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        connector={<QontoConnector />}
      >
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel StepIconComponent={QontoStepIcon}>
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ maxWidth: 800, width: "100%" }}>
          {activeStep === steps.length ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {!animationFinished && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <CircularProgress sx={{ mb: 1 }} size={50} color="primary" />
                  <Typography variant="h6">保存中...</Typography>
                </Box>
              )}
              {animationFinished && (
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  sx={{ justifyContent: "center" }}
                >
                  <Typography variant="h6">您的设置已成功保存</Typography>
                  <Box
                    sx={{
                      width: 50, // Width of the container
                      height: 50, // Height of the container
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <LottieAnimation
                      animationData={stepFinishAnimationData}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </Box>
                  {showUpdateButton && (
                    <Button
                      variant="contained"
                      onClick={handleUpdate}
                      sx={{ ml: 2, backgroundColor: "green" }} // Optional margin to the left of the button
                    >
                      Update
                    </Button>
                  )}
                </Stack>
              )}
            </Box>
          ) : (
            <form>
              {activeStep === 0 && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6">
                    配置服务器API设置，包括协议、主机、端口和模型
                  </Typography>
                  <StyledTextField
                    required
                    label="Protocol"
                    name="protocol"
                    value={serverApi.protocol}
                    onChange={handleChange}
                    select
                    fullWidth
                    sx={{ mb: 2 }}
                  >
                    <MenuItem value="http">HTTP</MenuItem>
                    <MenuItem value="https">HTTPS</MenuItem>
                  </StyledTextField>
                  <StyledTextField
                    required
                    label="Host"
                    name="host"
                    value={serverApi.host}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <StyledTextField
                    required
                    label="Port"
                    name="port"
                    type="number"
                    value={serverApi.port}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                    helperText={!serverApi.port && "Port is required"}
                  />
                  <StyledTextField
                    required
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
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6">选择第三方工具</Typography>
                  <StyledTextField
                    required
                    label="Third-Party Tool"
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

                  {tool.thirdPartyTool && (
                    <StyledTextField
                      required
                      label={`URL for ${tool.thirdPartyTool}`}
                      name="thirdPartyToolUrl"
                      value={tool.thirdPartyToolUrl}
                      onChange={handleChange}
                      fullWidth
                      sx={{ mb: 2 }}
                    />
                  )}
                </Box>
              )}

              {activeStep === 2 && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6">
                    设置PREEvision API指标，包括Top值和用户凭证
                  </Typography>
                  <StyledTextField
                    required
                    label="Top Xmiid"
                    name="top"
                    value={preevision.top}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <StyledTextField
                    required
                    label="User"
                    name="user"
                    value={preevision.user}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <StyledTextField
                    required
                    label="Password"
                    name="password"
                    type="password"
                    value={preevision.password}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <StyledTextField
                    required
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
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6">
                    请配置WOPI URL查看富文本服务器
                  </Typography>
                  <StyledTextField
                    required
                    label="Wopi Protocol"
                    name="wopiProtocol"
                    value={wopi.wopiProtocol}
                    onChange={handleChange}
                    select
                    fullWidth
                    sx={{ mb: 2 }}
                  >
                    <MenuItem value="http">HTTP</MenuItem>
                    <MenuItem value="https">HTTPS</MenuItem>
                  </StyledTextField>
                  <StyledTextField
                    required
                    label="Wopi Host"
                    name="wopiHost"
                    value={wopi.wopiHost}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <StyledTextField
                    required
                    label="Wopi Port"
                    name="wopiPort"
                    type="number"
                    value={wopi.wopiPort}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <StyledTextField
                    required
                    label="Wopi Model"
                    name="wopiModel"
                    value={wopi.wopiModel}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                </Box>
              )}
            </form>
          )}
        </Box>
      </Box>

      {/* Show buttons only if settings are not configured */}
      {activeStep < steps.length && (
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 2 }}>
          <Button
            color="inherit"
            onClick={handleBack}
            disabled={activeStep === 0}
            sx={{ mr: 1 }} // Optional margin to the right
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={isNextDisabled()}
            sx={{ ml: 1 }} // Optional margin to the left
          >
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Box>
      )}
    </Box>
  );
}
