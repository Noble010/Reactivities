import { Box, Button, Paper, Typography } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import {
  activitySchema,
  type ActivitySchema,
} from "../../../lib/schemas/activitySchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectInput from "../../../app/shared/components/selectInput";
import { categoryOptions } from "./categoryOptions";
import TextInput from "../../../app/shared/components/TextInput";
import DateTimeInput from "../../../app/shared/components/DateTimeInput";
import LocationInput from "../../../app/shared/components/locationInput";

export default function ActivityForm() {
  const {
    // register,
    reset,
    control,
    handleSubmit,
    // formState: { errors },
  } = useForm<ActivitySchema>({
    mode: "onTouched",
    resolver: zodResolver(activitySchema),
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const { updateActivity, createActivity, activity } = useActivities(id);

  useEffect(() => {
    if (activity)
      reset({
        ...activity,
        location: {
          city: activity.city,
          venue: activity.venue,
          latitude: activity.latitude,
          longitude: activity.longitude,
        },
      });
  }, [activity, reset]);

  const onSubmit = async (data: ActivitySchema) => {
    const { location, ...rest } = data;
    const flattenedData = { ...rest, ...location };
    try {
      if (activity) {
        updateActivity.mutate(
          { ...activity, ...flattenedData },
          { onSuccess: () => navigate(`/activities/${activity.id}`) }
        );
      } else {
        createActivity.mutate(flattenedData, {
          onSuccess: (id) => navigate(`/activities/${id}`),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  // if (isLoadingActivity) return <Typography>Loading.....</Typography>
  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        {activity ? "Edit activity" : "Create Activity"}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        display={"flex"}
        flexDirection={"column"}
        gap={3}
      >
        <TextInput label="Title" control={control} name="title" />{" "}
        <TextInput label="Description" control={control} name="description" />
        <Box display={"flex"} gap={3}>
          <SelectInput
            items={categoryOptions}
            label="Category"
            control={control}
            name="category"
          />
          <DateTimeInput label="Date" control={control} name="date" />{" "}
        </Box>
        <LocationInput
          control={control}
          label="Enter the location"
          name="location"
        />
        <Box display={"flex"} justifyContent={"end"} gap={3}>
          <Button color="inherit">Cancel</Button>
          <Button
            color="success"
            variant="contained"
            type="submit"
            disabled={updateActivity.isPending || createActivity.isPending}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

// import { Box, Button, Paper, Typography } from "@mui/material";
// import { useActivities } from "../../../lib/hooks/useActivities";
// import { useParams } from "react-router";
// import { useForm } from "react-hook-form";
// import { useEffect } from "react";
// import {
//   activitySchema,
//   type ActivitySchema,
// } from "../../../lib/schemas/activitySchemas";
// import { zodResolver } from "@hookform/resolvers/zod";
// import SelectInput from "../../../app/shared/components/selectInput";
// import { categoryOptions } from "./categoryOptions";
// import TextInput from "../../../app/shared/components/TextInput";
// import DateTimeInput from "../../../app/shared/components/DateTimeInput";

// export default function ActivityForm() {
//   const {
//     control,
//     handleSubmit,
//     reset,
//   } = useForm<ActivitySchema>({
//     mode: "onTouched",
//     resolver: zodResolver(activitySchema),
//   });

//   const { id } = useParams();
//   const { updateActivity, createActivity, activity } = useActivities(id);

//   useEffect(() => {
//     if (activity) {
//       reset(activity); // populate form for editing
//     }
//   }, [activity, reset]);

//   const onSubmit = (data: ActivitySchema) => {
//     console.log(data);
//     if (id) {
//       updateActivity.mutate(data);
//     } else {
//       createActivity.mutate(data);
//     }
//   };

//   return (
//     <Paper sx={{ borderRadius: 3, padding: 3 }}>
//       <Typography variant="h5" gutterBottom color="primary">
//         {activity ? "Edit Activity" : "Create Activity"}
//       </Typography>

//       <Box
//         component="form"
//         onSubmit={handleSubmit(onSubmit)}
//         display="flex"
//         flexDirection="column"
//         gap={3}
//       >
//         <TextInput control={control} name="title" label="Title" />
//         <TextInput control={control} name="description" label="Description" multiline rows={3} />
//         <SelectInput control={control} name="category" label="Category" items={categoryOptions} />
//         <DateTimeInput control={control} name="date" label="Date" />
//         <TextInput control={control} name="city" label="City" />
//         <TextInput control={control} name="venue" label="Venue" />

//         <Box display="flex" justifyContent="flex-end" gap={2}>
//           <Button color="inherit" type="button">
//             Cancel
//           </Button>
//           <Button
//             type="submit"
//             variant="contained"
//             color="success"
//             disabled={updateActivity.isPending || createActivity.isPending}
//           >
//             Submit
//           </Button>
//         </Box>
//       </Box>
//     </Paper>
//   );
// }
