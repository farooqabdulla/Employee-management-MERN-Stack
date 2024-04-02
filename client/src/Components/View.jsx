import { AppBar, Avatar, Button, ButtonGroup, Card, CardActionArea, CardContent, CardMedia, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, InputLabel, MenuItem, Select, Stack, TextField, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import EmailIcon from '@mui/icons-material/Email';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {add} from '../store/groupSlice'
import debounce from 'lodash.debounce';
const View = () => {
    const [search,setSearch] = useState('')
    console.log(search);
    const dispatch = useDispatch()
    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState(0)
    let [content, setContent] = useState([])


    useEffect(() => {
        fetchData();
    }, [page]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/?page=${page}`);
            setContent(response.data.users);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    function handlePrev() {
        setPage((p) => {
            if (p === 1) return p;
            return p - 1
        })
    }
    function handleNext() {
        setPage((p) => {
            if (p === pageCount) return p
            return p + 1
        })
    }
    let Navigate = useNavigate()
    // let handleDelete = (id) =>{
    //     axios.delete(`http://localhost:3000/delete/${id}`)
    //     window.location.reload()
    // }
    const handleSearchChange = debounce((value) => {
        setSearch(value);
      }, 100);
    const addToGroup = (x) =>{
        dispatch(add(x))
    }
    let pass = (x) =>{
        console.log(x);
    }
    return (
        <>
            <Toolbar sx={{ bgcolor: '#F0F3FA', width: '100%' }}>
                <FormControl fullWidth required sx={{ flexDirection: 'row' }}>
                    <FormControl fullWidth required>
                        <InputLabel id="demo-simple-select-label">Domain</InputLabel>
                        <Select
                        // value={domain}
                        // onChange={(e) => { setDomain(e.target.value) }}
                        >
                            <MenuItem value='All'>All</MenuItem>
                            <MenuItem value='Sales'>Sales</MenuItem>
                            <MenuItem value='Finance'>Finance</MenuItem>
                            <MenuItem value='Marketing'>Marketing</MenuItem>
                            <MenuItem value='IT'>IT</MenuItem>
                            <MenuItem value='Management'>Management</MenuItem>
                            <MenuItem value='UI'>UI</MenuItem>
                            <MenuItem value='Bussiness Development'>Bussiness Development</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth required>
                        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                        <Select
                        // value={domain}
                        // onChange={(e) => { setDomain(e.target.value) }}
                        >
                            <MenuItem value='All'>All</MenuItem>
                            <MenuItem value='Male'>Male</MenuItem>
                            <MenuItem value='Marketing'>Female</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth required>
                        <InputLabel id="demo-simple-select-label">Availability</InputLabel>
                        <Select
                            // value={domain}
                            // onChange={(e) => { setDomain(e.target.value) }}
                        >
                            <MenuItem value='All'>All</MenuItem>
                            <MenuItem value='true'>Available</MenuItem>
                            <MenuItem value='false'>Not Available</MenuItem>
                        </Select>
                    </FormControl>
                </FormControl>
                <ButtonGroup sx={{ position: 'relative' }} component='form' variant="contained" aria-label="Basic button group">
                    <TextField required onChange={(e)=>{handleSearchChange(e.target.value)}} placeholder='Enter to search here' sx={{ outline: 'none', width: '30vw' }} />
                    <Button type='submit' sx={{ bgcolor: '#14213D', ":hover": { bgcolor: '#23396C' } }}><SearchIcon /></Button>
                </ButtonGroup>
            </Toolbar>
            <Stack sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', bgcolor: '#F0F3FA' }}>
                {
                    content.map((x) => (
                        <Card key={x._id} sx={{ width: 300, m: '4vh' }}>
                            <CardContent sx={{ width: '100%' }}>
                                <CardMedia>
                                    <Avatar sx={{ height: '150px', width: '150px', margin: 'auto', border: '2px solid #14213D', bgcolor: '#F5F5F5' }} src={x.avatar} />
                                </CardMedia>
                                <Stack>
                                    <Typography sx={{ mt: '2vh', textAlign: 'center' }} variant="h4" component="div">
                                        {x.first_name} {x.last_name}
                                    </Typography>
                                    <Typography sx={{ textAlign: 'center', fontWeight: '500' }} gutterBottom variant="h6" component="div">
                                        {x.domain}
                                    </Typography>
                                    <Typography gutterBottom variant="body1" color="text.secondary">
                                        <EmailIcon sx={{ height: '15px' }} /> {x.email}
                                    </Typography>
                                    <Typography gutterBottom variant="body2" color="text.secondary">
                                        Gender : {x.gender}
                                    </Typography>

                                    <Typography gutterBottom variant="body2" color="text.secondary">
                                        Available : {x.available}
                                    </Typography>
                                </Stack>
                                <Button onClick={()=>{pass(x._id)}}>hello</Button>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Button sx={{ color: '#14213D', ":hover": { color: '#23396C' } }} component={Link} to={`/edit/${x._id}`} variant='outlined' fullWidth >Edit</Button>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Button sx={{ color: '#14213D', ":hover": { color: '#23396C' } }} variant='outlined' onClick={()=>{handleDelete(x._id)}} fullWidth>Delete</Button>
                                    </Grid>
                                </Grid>
                                <Button variant='contained' onClick={()=>{addToGroup(x)}} sx={{ bgcolor: '#14213D', width: '100%', mt: '2vh', ":hover": { bgcolor: '#23396C' } }}>Add to Group</Button>
                            </CardContent>
                        </Card>
                    )
                    )
                }
                <AppBar position='static' color='inherit'>
                    <Toolbar sx={{ alignItems: 'center', justifyContent: 'center' }}>
                        <ButtonGroup>
                            <Button variant='contained' sx={{ bgcolor: '#14213D' }} disabled={page === 1} onClick={handlePrev}>Prev</Button>
                            <Button variant='contained' sx={{ bgcolor: '#14213D' }} disabled={page === pageCount} onClick={handleNext}>Next</Button>
                        </ButtonGroup>
                    </Toolbar>
                </AppBar>
            </Stack>
        </>
    )
}

export default View