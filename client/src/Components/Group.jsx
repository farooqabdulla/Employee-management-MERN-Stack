import { Box, Button, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email';
import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { remove } from '../store/groupSlice';
const Group = () => {
    const content = useSelector(state => state.group)
    const dispatch = useDispatch()
    // const removeToCart = (_id) =>{
    //     dispatch(remove(_id))
    // }
    return (
        <>
        <Stack sx={{flexDirection:'row',flexWrap:'wrap'}}>
            <Typography sx={{width:'100%',textAlign:'center'}} variant='h3'>Your Group Members</Typography>
            {
                content.map((x) => {
                    return (
                        <Card key={x._id} sx={{ display: 'flex',m:'7vh',width: 400 }}>
                            <CardMedia
                                component="img"
                                sx={{ width: 151,bgcolor:'#EBEBEB' }}
                                image={x.avatar}
                                alt="Live from space album cover"
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
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
                                </CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                    {/* <Button variant='outlined' onClick={()=>{removeToCart(x._id)}} color='error'>Remove from the group</Button> */}
                                </Box>
                            </Box>
                            
                        </Card>
                    )
                })
            }
            </Stack>
        </>
    )
}

export default Group