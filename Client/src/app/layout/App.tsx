import { Box, Container, Typography } from "@mui/material";
import { useState } from "react";
import NavBar from "./NavBar";
import CssBaseline from "@mui/material/CssBaseline";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { useActivities } from "../../lib/hooks/useActivities";

function App() {
  const [selectedActivity, setSelectedActiviy] = useState<Activity | undefined>(
    undefined
  );
  const [editMode, setEditMode] = useState(false);
  const {activities ,isPending} = useActivities();
  

  const handleSelectActivity = (id: string) => {
    setSelectedActiviy(activities!.find((x) => x.id === id));
  };

  const handleCancelSelectActivity = () => {
    setSelectedActiviy(undefined);
  };

  const handleOpenForm = (id?: string) => {
    if (id) handleSelectActivity(id);
    else handleCancelSelectActivity();
    setEditMode(true);
  };
  const handleFormClose = () => {
    setEditMode(false);
  };
  
 
  return (
    <Box sx={{ bgcolor: "#eeeeee", minHeight:'100vh' }}>
      <CssBaseline />
      <NavBar openForm={handleOpenForm} />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        {!activities || isPending ? (
          <Typography>Loading.....</Typography>
        ) : (
          <ActivityDashboard
            activities={activities}
            selectActivity={handleSelectActivity}
            cancelSelectedActivity={handleCancelSelectActivity}
            selectedActivity={selectedActivity}
            editMode={editMode}
            openForm={handleOpenForm}
            closeForm={handleFormClose}
          />
        )}
      </Container>
    </Box>
  );
}

export default App;
