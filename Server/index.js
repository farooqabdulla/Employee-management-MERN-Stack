const express = require('express');
const app = express();
const cors = require('cors');
const userModel = require('./db');

app.use(express.json());
app.use(cors({
    origin: ["https://deploy-mern-1whq.vercel.app"],
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true
}));

app.post('/create', async (req, res) => {
    const { first_name, last_name, email, gender, avatar, domain, available } = req.body;
    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.send({ error: 'Email already exists' });
        } else {
            const userDocument = await userModel.findOne();

            userDocument.users.unshift({ first_name, last_name, email, gender, avatar, domain, available });

            await userDocument.save();

            res.send({ status: 'ok' });
        }
    } catch (error) {
        console.error('Error creating user:', error);
        res.send({ status: 'error' });
    }
});


const ItemsPerPage = 16;

app.get('/', async (req, res) => {
    const { page, pageSize } = req.query;
    const pageNumber = parseInt(page) || 1;
    const size = parseInt(pageSize) || ItemsPerPage;
    const skip = (pageNumber - 1) * size;

    try {
        const count = await userModel.countDocuments();
        const pageCount = Math.ceil(count / size);

        const users = await userModel.find().skip(skip).limit(size);

        const pagination = {
            count,
            pageCount
        };

        res.json({ pagination, users });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/edit/:id', async (req, res) => {
    let { id } = req.params
    await userModel.findById({ _id: id })
        .then((users) => {
            res.json(users)
        })

})

// app.put('/edit/:id',(req,res)=>{
//     const {id} = req.params

//     userModel.findByIdAndUpdate({_id:id},{first_name, last_name, email, gender, avatar, domain, available})
//     .then((users)=>{
//         res.json(users)
//     })
// })

// app.delete('/delete/:id',(req,res)=>{
//     const {id} = req.params
//     userModel.findByIdAndDelete({_id:id})
//     .then((users)=>{
//         res.json(users)
//     })
// })

app.listen(3000, () => {
    console.log("Server is running successfully on PORT 3000!!!");
});
