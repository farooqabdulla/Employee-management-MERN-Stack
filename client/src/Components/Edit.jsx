import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const Edit = () => {
    let [first_name,setFirst_name] = useState('')
    let [last_name,setLast_name] = useState('')
    let [email,setEmail] = useState('')
    let [gender,setGender] = useState('')
    let [avatar,setAvatar] = useState('')
    let [domain,setDomain] = useState('')
    let [available,setAvailable] = useState('')
    let obj = useParams()
    useEffect(()=>{
        axios.get(`https://employee-management-mern-stack.vercel.app/edit/${obj.id}`)
        .then((response)=>{
            setFirst_name(response.data.first_name)
            setLast_name(response.data.last_name)
            setEmail(response.data.email)
            setAvailable(response.data.available)
            setDomain(response.data.domain)
            setAvatar(response.data.avatar)
            setGender(response.data.gender)
        })
    },[])

    let but1 = (e) =>{
        e.preventDefault()
        axios.put(`https://employee-management-mern-stack.vercel.app/edit/${obj.id}`,{first_name,last_name,email,gender,avatar,domain,available})
        .then(()=>{
            console.log("put is successfull");
        })
        .catch((error)=>{
            console.log("error in put!!!!",error);
        })
    }

    return (
        <>
            <Stack sx={{ width: '100%', height: '91vh',bgcolor:'#F0F3FA'  }}>
                <Card sx={{ maxWidth: '80%', margin: 'auto' }}>
                    <CardContent component='form'>
                        <Box component="form" noValidate sx={{ mt: 3 }}>
                            <Typography variant='h4' sx={{ mb: '2vh' }}>Edit Employee</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="First Name"
                                        value={first_name}
                                        onChange={(response) => { setFirst_name(response.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Last Name"
                                        value={last_name}
                                        onChange={(response) => { setLast_name(response.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        type='email'
                                        label="Email"
                                        value={email}
                                        onChange={(response) => { setEmail(response.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth required>
                                        <InputLabel id="demo-simple-select-label">Domain</InputLabel>
                                        <Select
                                            value={domain}
                                            onChange={(e) => { setDomain(e.target.value) }}
                                        >
                                            <MenuItem value='Sales'>Sales</MenuItem>
                                            <MenuItem value='Finance'>Finance</MenuItem>
                                            <MenuItem value='Marketing'>Marketing</MenuItem>
                                            <MenuItem value='IT'>IT</MenuItem>
                                            <MenuItem value='Management'>Management</MenuItem>
                                            <MenuItem value='UI'>UI</MenuItem>
                                            <MenuItem value='Bussiness Development'>Bussiness Development</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Avatar"
                                        value={avatar}
                                        onChange={(response) => { setAvatar(response.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl required>
                                        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue="female"
                                            name="radio-buttons-group" sx={{ flexDirection: 'row' }} value={gender} onChange={(e) => { setGender(e.target.value) }}
                                        >
                                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl required>
                                        <FormLabel id="demo-radio-buttons-group-label">Available</FormLabel>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue="female"
                                            name="radio-buttons-group" sx={{ flexDirection: 'row' }} value={available} onChange={(e) => { setAvailable(e.target.value) }}
                                        >
                                            <FormControlLabel value="male" control={<Radio />} label="True" />
                                            <FormControlLabel value="female" control={<Radio />} label="False" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2,bgcolor:'#14213D',":hover":{bgcolor:'#23396C'} }}
                                onClick={but1}
                            >
                                Submit
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Stack>
        </>
    )
}

export default Edit
