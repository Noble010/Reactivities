import Grid2 from "@mui/material/Grid2";
import ActivityList from "./ActivityList";
import ActivityDetail from "../details/ActivityDetail";
import ActivityForm from "../form/ActivityForm";

type Props = {
  activities: Activity[];
  selectActivity: (id: string) => void;
  cancelSelectedActivity: () => void;
  selectedActivity?: Activity;
  openForm: (id: string) => void;
  closeForm: () => void;
  editMode: boolean;
};

export default function ActivityDashboard({
  activities,
  selectActivity,
  cancelSelectedActivity,
  selectedActivity,
  openForm,
  closeForm,
  editMode,
}: Props) {
  return (
    <>
      <Grid2 container spacing={3}>
        <Grid2 size={7}>
          <ActivityList
            activities={activities}
            selectActivity={selectActivity}
          />
        </Grid2>
        <Grid2 size={5}>
          {selectedActivity && !editMode &&(
            <ActivityDetail
              selectedActivity={selectedActivity}
              cancelSelectActivity={cancelSelectedActivity}
              openForm={openForm}
            />
          )}
          {editMode && 
          <ActivityForm  closeForm={closeForm} activity={selectedActivity}/>}
        </Grid2>
      </Grid2>
    </>
  );
}
