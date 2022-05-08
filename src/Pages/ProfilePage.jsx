import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./LoginPage/style.scss";
import OverlayLoader from "../Components/OverlayLoader";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function BasicCard({ data = {}, onClick }) {
  return (
    <Card sx={{ minWidth: 275, minHeight: 475 }} variant="outlined">
      <CardContent>
        <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
          Your Profile
        </Typography>
        <Typography variant="h6" component="div">
          {data.name}
        </Typography>
        <Typography variant="h6" component="div">
          {data.email_id}
        </Typography>
        <Typography variant="h6" component="div">
          {data.phone_number}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={onClick} size="small">
          Sign Out
        </Button>
      </CardActions>
    </Card>
  );
}

BasicCard.propTypes = {
  data: PropTypes.object,
  onClick: PropTypes.func,
};

const ProfilePage = () => {
  const { user, signOut } = useContext(AuthContext);

  if (!user) return <OverlayLoader />;
  return <BasicCard data={user} onClick={signOut} />;
};

export default ProfilePage;
