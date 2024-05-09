/**********************
 When user is logged in this component will be displayed in place of login/signup
 *********************/
 import React, { useEffect, useRef, useState } from "react";
 import Button from "@mui/material/Button";
 import ClickAwayListener from "@mui/material/ClickAwayListener";
 import Paper from "@mui/material/Paper";
 import Popper from "@mui/material/Popper";
 import MenuItem from "@mui/material/MenuItem";
 import MenuList from "@mui/material/MenuList";
 import Avatar from "@mui/material/Avatar";
 import SvgIcon from "@mui/material/SvgIcon";
import { AVATAR_BACKGROUND_COLORS } from "../../utils/constant";
import { useSelector } from "react-redux";
 
 export default function Dashboard_Menu({logOut}) {
    const userDetails=JSON.parse(useSelector((store)=>store.auth.userDetails));
     const [open, setOpen] = useState(false);
     const anchorRef = useRef(null);
 
     const handleToggle = () => {
         setOpen((prevOpen) => !prevOpen);
     };
     const handleClose = (event) => {
         if (anchorRef.current && anchorRef.current.contains(event.target)) {
             return;
         }
         setOpen(false);
     };
     const prevOpen = useRef(open);
     useEffect(() => {
         if (prevOpen.current === true && open === false) {
             anchorRef.current.focus();
         }
 
         prevOpen.current = open;
     }, [open]);

     return (
         <div className="z-20">
             <Button
                 disableRipple
                 sx={{
                     textTransform: "None",
                     color: "secondary.light",
                     fontWeight: 400,
                     fontSize: "16px",
                     transition: "none",
                     "&:hover": {
                         background: "none",
                         color: "secondary.hover",
                     },
                 }}
                 ref={anchorRef}
                 onClick={handleToggle}
             >
                 <Avatar
                     sx={{
                         width: { md: "30px", xs: "20px" },
                         height: { md: "30px", xs: "20px" },
                         fontSize: { md: "22px", xs: "14px" },
                         mr: { md: 2, xs: 1 },
                         bgcolor: `${
                             AVATAR_BACKGROUND_COLORS[
                                 (userDetails.name ? userDetails.name.at(0) : "U".charCodeAt(0) -
                                     "A".charCodeAt(0)) %
                                     20
                             ]
                         }`,
                     }}
                 >
                     {userDetails.name ? userDetails.name.at(0) : "U"}
                 </Avatar>
                 Hey {userDetails.name?.split(" ")[0]}
                 {open ? (
                     <SvgIcon sx={{ ml: 1, height: "14px", width: "14px" }}>
                         <svg
                             xmlns="http://www.w3.org/2000/svg"
                             height="16"
                             width="16"
                             viewBox="0 0 512 512"
                         >
                             <path
                                 fill="#ec5b24"
                                 d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"
                             />
                         </svg>
                     </SvgIcon>
                 ) : (
                     <SvgIcon sx={{ ml: 1, height: "14px", width: "14px" }}>
                         <svg
                             xmlns="http://www.w3.org/2000/svg"
                             height="16"
                             width="16"
                             viewBox="0 0 512 512"
                         >
                             <path
                                 fill="#ec5b24"
                                 d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
                             />
                         </svg>
                     </SvgIcon>
                 )}
             </Button>
             <Popper
                 open={open}
                 anchorEl={anchorRef.current}
                 placement="bottom"
                 sx={{ zIndex: 5000 }}
             >
                 <Paper>
                     <ClickAwayListener onClickAway={handleClose}>
                         <MenuList autoFocusItem={open}>
                             <MenuItem onClick={logOut}>Logout</MenuItem>
                         </MenuList>
                     </ClickAwayListener>
                 </Paper>
             </Popper>
         </div>
     );
 }
 