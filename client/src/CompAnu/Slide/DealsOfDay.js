import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  makeStyles,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 5,
  },
  mobile: {
    breakpoint: { max: 768, min: 600 },
    items: 4,
  },
  a: {
    breakpoint: { max: 600, min: 400 },
    items: 3,
  },
  b: {
    breakpoint: { max: 400, min: 0 },
    items: 2,
  }
};
const useStyles = makeStyles((theme) => ({
  carousel: {
    position: "relative",
  },
  img: {
    width: "100px",
    marginTop: ".5rem",
    height: "115px",
  },
  cardActionArea: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  card: {
    height: "220px",
    [theme.breakpoints.down('sm')]: {
      height: "225px",
    }
    
  },
  discount: {
    textAlign: "center",
    color: "green",
  },
  title: {
    // color: "#FB4248",
    textAlign: "center",
  },
}));
const style = {
  container: {
    background: "#f6f6f6",
  },
  heading: {
    fontWeight: "bold",
  },
};

const DealsOfDay = ({products})=> {
    const classes = useStyles();
    return(
        <>
        <div className="container-fluid pt-3" style={style.container}>
        <Typography className="mx-1" style={style.heading}>
          Deals Of the Day
        </Typography>
        {
            products!==undefined?
            <Carousel
          responsive={responsive}
          className={classes.carousel}
          itemClass="mx-1"
          swipeable={true}
          draggable={true}
          // autoPlay={true}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          infinite={true}
          // containerClass="mt-3"
        >
            {
                products.map((e,key)=> {
                    return <MyCard  e={e} key={key} />
                })
            }
        </Carousel>:""
        }
      </div>
        </>
    )
}


export const MyCard = ({e})=> {
  const classes = useStyles();
  const style = {
    link: {
      textDecoration: "none",
    },
  };
  return(
    <Link style={style.link} to={`product-info/${e.id}`} >
    <Card className={classes.card}>
      <CardActionArea className={classes.cardActionArea}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          className={classes.img}
          image={e.url}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography className={classes.title} style={style.link}>
            {e.title.shortTitle}
          </Typography>
          <Typography className={classes.discount} style={style.link}>
            {e.discount}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  </Link>
  )
}

export default DealsOfDay