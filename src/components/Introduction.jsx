import React from 'react';
import LottieAnimation from '../components/LottieAnimation';
import introductionAnimationData from '../lotties/introduction.json'; // Path to introduction animation
import settingAnimationData from '../lotties/setting.json'; // Path to settings animation
import { Card, CardContent, Typography, Grid, Box, useMediaQuery, useTheme } from '@mui/material';

const drawerWidth = 240; // Typical drawer width

const Introduction = ({ onNavigateToSettings, isDrawerOpen }) => {
  const theme = useTheme();
  const isMdOrLarger = useMediaQuery(theme.breakpoints.up('md'));

  const calculateWidth = () => {
    // If on medium screens or larger and the drawer is open, subtract drawer width
    if (isMdOrLarger && isDrawerOpen) {
      return `calc(100% - ${drawerWidth}px)`;
    }
    return '100%'; // Full width on smaller screens or when the drawer is closed
  };

  const advantages = [
    {
      title: 'Improved Efficiency',
      description: 'Streamline your processes for faster results and improved productivity.',
    },
    {
      title: 'Consistent Data Management',
      description: 'Maintain data integrity and consistency across all platforms.',
    },
    {
      title: 'Flexibility and Scalability',
      description: 'Adapt to changing needs with flexible and scalable solutions.',
    },
    {
      title: 'Easier Access to PREEvision Data',
      description: 'Simplify access to critical data for better decision-making.',
    },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '20px 0', // Reduced padding on the sides
        width: calculateWidth(), // Adjust width based on drawer state and screen size
        transition: 'width 0.3s ease', // Smooth transition for width change
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '1200px', // Limits width on large screens
          paddingX: { xs: 2, sm: 3 }, // Padding on small screens
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Center horizontally
          marginX: 'auto', // Centers content horizontally
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between', // Use all available space
            gap: 3,
            width: '100%',
          }}
        >
          <Box
            sx={{
              textAlign: { xs: 'center', sm: 'left' }, // Center text on small screens
              flex: 1, // Make sure content uses available space
              maxWidth: { xs: '100%', sm: '400px' }, // Adjust width on smaller screens
              mb: { xs: 2, sm: 0 },
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              sx={{
                margin: 0,
                fontSize: { xs: '1.75rem', sm: '2rem' }, // Slightly smaller h1
                whiteSpace: 'nowrap', // Keep the title in one line
              }}
            >
              Welcome to the API Gateway
            </Typography>
            <Typography
              variant="body1"
              sx={{ margin: '0.5rem 0', fontSize: { xs: '1rem', sm: '1.125rem' } }}
            >
              通过中台配置平台管理第三方工具和中台的连接
            </Typography>
            <Box
              onClick={onNavigateToSettings}
              sx={{
                mt: 2,
                cursor: 'pointer',
                width: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: { xs: '0 auto', sm: '0' }, // Center on smaller screens
              }}
            >
              <LottieAnimation animationData={settingAnimationData} />
            </Box>
          </Box>
          <Box
            sx={{
              flex: 1, // Take available space
              width: { xs: '150px', sm: '200px' },
              height: { xs: '150px', sm: '200px' },
              margin: { xs: '0 auto', sm: '0' }, // Center on smaller screens
            }}
          >
            <LottieAnimation animationData={introductionAnimationData} />
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: '100%', paddingY: 3 }}>
        <Grid container spacing={3} justifyContent="center">
          {advantages.map((adv, index) => (
            <Grid item xs={12} sm={6} md={3} lg={2} key={index} sx={{ maxWidth: '300px' }}>
              <Card
                variant="outlined"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '250px', // Fixed height for uniformity
                  width: '100%', // Full width within the max width constraint
                  boxShadow: 3, // Add shadow for better visibility
                  borderRadius: '12px', // Rounded corners
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.02)', // Slightly scale up on hover
                    boxShadow: 6, // Enhance shadow on hover
                  },
                }}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between', // Space between title and description
                    padding: '16px',
                    height: '100%', // Ensure full height
                  }}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    gutterBottom
                    sx={{
                      fontSize: '1.25rem',
                      fontWeight: 'bold',
                      mb: 2, // Margin bottom for space above description
                      textAlign: 'center', // Center text horizontally
                    }}
                  >
                    {adv.title}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center', // Center description horizontally
                      flex: 1, // Use available space to center description
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        textAlign: 'left', // Align text to the start
                        lineHeight: 1.5, // Improve line height for readability
                      }}
                    >
                      {adv.description}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Introduction;
