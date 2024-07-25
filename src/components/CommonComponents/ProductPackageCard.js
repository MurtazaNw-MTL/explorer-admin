import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { MyTheme } from "src/layouts/customTheme";
import { Button, Chip, Grid } from "@mui/material";
import { MyIcons } from "src/views/icons/Icons";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest
  })
}));

export default function ProductPackageCard({ onePackage }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        background: MyTheme.tableHover,
        borderRadius: 5,
        p: 2
      }}
    >
      <Typography
        fontSize={22}
        fontWeight="bold"
        px={2}
        // py={1}
        mb={2}
        // color={MyTheme.bgColor1}
        // bgColor={MyTheme.bgColor1}

        textAlign="center"
      >
        {onePackage?.name}
      </Typography>
      <CardMedia
        component="img"
        height="194"
        image={onePackage?.image}
        alt={onePackage?.name + " Image"}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {onePackage?.shortDescription}
        </Typography>
      </CardContent>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <Typography
            fontWeight="bold"
            fontSize={20}
            bgcolor="white"
            textAlign="center"
            p={2}
            borderRadius={5}
          >
            $ {onePackage?.amount}
          </Typography>
        </Grid>
      </Grid>
      <CardActions disableSpacing>
        {/* <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        <Grid container mt={1}>
          <Grid item xs={8}>
            <Typography fontWeight="bold">Features</Typography>
          </Grid>
          <Grid item xs={4} textAlign="right">
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </Grid>
        </Grid>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Grid container>
            {onePackage?.features?.map((item, key) => {
              return (
                <>
                  <Grid item xs={2}>
                    <MyIcons.CIRCLECHECK style={{ color: "green" }} />
                  </Grid>
                  <Grid item xs={10}>
                    <Typography paragraph>{item?.feature}</Typography>
                  </Grid>
                </>
              );
            })}
          </Grid>
          {/* <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and
            set aside for 10 minutes.
          </Typography> */}
          {/* <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
            over medium-high heat. Add chicken, shrimp and chorizo, and cook,
            stirring occasionally until lightly browned, 6 to 8 minutes.
            Transfer shrimp to a large plate and set aside, leaving chicken and
            chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes,
            onion, salt and pepper, and cook, stirring often until thickened and
            fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2
            cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is
            absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
            shrimp and mussels, tucking them down into the rice, and cook again
            without stirring, until mussels have opened and rice is just tender,
            5 to 7 minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then
            serve.
          </Typography> */}
        </CardContent>
      </Collapse>
    </Card>
  );
}

export const ModularFeature = ({ feature, index }) => {
  return (
    <Grid
      container
      bgcolor={MyTheme.tableHover}
      p={2}
      borderRadius={5}
      marginY={1}
    >
      <Grid item xs={9}>
        <span style={{ marginRight: "15px" }}>{index + 1}</span>{" "}
        {feature?.feature}
      </Grid>
      <Grid item xs={2}>
        $ {feature?.amount}
      </Grid>
      <Grid item xs={1}>
        <Chip
          label={feature?.isActive ? "Active" : "In-Active"}
          color={feature?.isActive ? "success" : "error"}
        />
      </Grid>
    </Grid>
  );
};
