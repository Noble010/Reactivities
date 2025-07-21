import { Grid2, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { useActivities } from "../../../lib/hooks/useActivities";
import ActivityDetailsHeader from "./activityDetailsHeader";
import ActivityDetailsInfo from "./activityDetailsInfo";
import ActivityDetailsSidebar from "./activityDetailsSidebar";
import ActivityDetailsChat from "./activityDetailsChat";

export default function ActivityDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { activity, isLoadingActivity } = useActivities(id);

  if (isLoadingActivity) return <Typography>Loading.....</Typography>;
  if (!activity) return <Typography>Activity not found</Typography>;
  return (
    <Grid2 container spacing={3}>
      <Grid2 size={8}>
        <ActivityDetailsHeader activity={activity} />
        <ActivityDetailsInfo activity={activity} />
        <ActivityDetailsChat />
      </Grid2>
      <Grid2 size={4}>
        <ActivityDetailsSidebar />
      </Grid2>
    </Grid2>
  );
}
