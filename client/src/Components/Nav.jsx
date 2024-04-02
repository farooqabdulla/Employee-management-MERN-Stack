import { AppBar, Button, Grid, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import {  useSelector } from 'react-redux'
import PeopleIcon from '@mui/icons-material/People';
const Nav = () => {
    const groupMembers = useSelector(state => state.group)
    return (
        <>
            <AppBar position='sticky' sx={{bgcolor:'#14213D'}}>
                <Toolbar>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <Typography variant='h3'>Logo</Typography>
                        </Grid>
                        <Grid item xs={6}>
                        </Grid>
                        <Grid item xs sx={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                            <Button color='inherit' component={Link} to='/'>View</Button>
                            <Button color='inherit' component={Link} to='/create'>Create User</Button>
                            <Button color='inherit' component={Link} to='/group'>My Group (<PeopleIcon sx={{height:'2.5vh'}}/>{groupMembers.length})</Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Nav