import SideBar from "./SideBar";
import PageHeader from "./PageHeader";
import {
  makeStyles,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  Tooltip
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Home.css";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import { TextField, IconButton } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  root: {
    border: "none",
    outline: "none",
    padding: "2px",
  },
  tableBody: {
    // border: "2px solid lightblue",
  },
  tableCell:{
    textAlign:"center",
  }
}));

const Home = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [userPropertyData, setUserPropertyData] = useState([]);
  const [searchProperty, setSearchProperty] = useState("");

  function handleAddProperty(e) {
    navigate("/addprop");
  }

  useEffect(() => {
    fetch("http://localhost:8080/home", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setUserPropertyData(data);
      });
  }, []);

  function handleStatus(e) {
    if (e.target.value === "unsold") {
      e.target.value = "sold";
    }
  }

  return (
    <div className="home-Container">
      <SideBar />
      <PageHeader />
      <div className="search-Add-Container">
        <div className="search-bar-container">
          <form className={classes.root}>
            <TextField
              sx={{ padding: 3 }}
              id="bare"
              variant="standard"
              placeholder="Search PPD ID"
              InputProps={{
                style: {
                  paddingLeft: 15,
                },
                disableUnderline: true,
                endAdornment: (
                  <IconButton>
                    <SearchOutlined />
                  </IconButton>
                ),
              }}
              onChange={e => {
                setSearchProperty(e.target.value);
              }}
              classes={{
                root: classes.root,
              }}
            />
          </form>
        </div>

        <button
          type="submit"
          className="addPropBtn"
          variant="contained"
          color="success"
          value="+ Add Property"
          onClick={handleAddProperty}>
          + Add Property
        </button>
      </div>
      <div className="property-table-container">
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ color: "#284E91" }}>PPD ID</TableCell>
                <TableCell style={{ color: "#284E91" }}>Image </TableCell>
                <TableCell style={{ color: "#284E91" }}>Property </TableCell>
                <TableCell style={{ color: "#284E91" }}>Contact </TableCell>
                <TableCell style={{ color: "#284E91" }}>Area </TableCell>
                <TableCell style={{ color: "#284E91" }}>Views </TableCell>
                <TableCell style={{ color: "#284E91" }}>Status </TableCell>
                <TableCell style={{ color: "#284E91" }}>Days Left </TableCell>
                <TableCell style={{ color: "#284E91" }}>Action </TableCell>
              </TableRow>
            </TableHead>

            {userPropertyData
              .filter(userData => {
                const PPDID = "PPD" + userData._id;
                if (searchProperty === "") {
                  return userData;
                } else if (
                  PPDID.toLowerCase().includes(searchProperty.toLowerCase())
                ) {
                  return userData;
                }
              })
              .map((user, i) => {
                const PPDID = "PPD" + user._id.slice(0,6);
                const views = Math.ceil(Math.random() * 10);
                const daysLeft = Math.ceil(Math.random() * 10);
                return (
                  <TableBody className={classes.tableBody}>
                    <TableRow className={classes.tableCell}>
                      <TableCell>{PPDID}</TableCell>
                      <TableCell>
                        <img src="./Images/table_img.png" alt="prop_img"></img>
                      </TableCell>
                      <TableCell >{user.propertyType}</TableCell>
                      <TableCell >{user.mobile}</TableCell>
                      <TableCell >{user.totalArea}</TableCell>
                      <TableCell style={{paddingLeft: "2rem"}}>{views}</TableCell>
                      <TableCell>
                        <input
                          type="submit"
                          value="unsold"
                          className="soldBtn"
                          onClick={handleStatus}
                        />
                      </TableCell>
                      <TableCell style={{paddingLeft: "2rem"}}>{daysLeft}</TableCell>
                      <TableCell>

                      <Tooltip title="Read">
                        <img
                          src="./Images/table_action1_img.png"
                          alt="action1"></img>
                    
                          </Tooltip>
                          <Tooltip title="Write">
                        <img
                          src="./Images/table_action2_img.png"
                          alt="action2"></img>
                          </Tooltip>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                );
              })}
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Home;
