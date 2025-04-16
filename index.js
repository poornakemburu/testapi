import express from 'express'
import mongoose from 'mongoose';
import Product from './models/product.model.js';
const app = express()

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World !')
})


app.get('/api/products', async (req,res) => {
    try{
        const products = await Product.find({});
        res.status(200).json(products);
    }catch(error){
        res.status(500).json({message:error.message})
    }
})

app.get('/api/product/:id', async (req,res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

app.post('/api/product', async (req,res) => {
    // console.log(req.body);
    // res.send(req.body);
    try{
        const product = await Product.create(req.body);
        res.status(200).json(product)
    }catch(error){
        res.status(500).json({message:error.message})
    }
})

//update product api
app.put('/api/product/:id', async (req,res) => {
    try {
        const { id } =req.params;

        const product = await Product.findByIdAndUpdate(id, req.body);

        if(!product){
            return res.status(404).json({message:"Product Not Found"});
        }

        //res.status(200).json(product)
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

//delete product api
app.delete('/api/product/:id', async (req,res) => {
    try {
        const { id } =req.params;

        const product = await Product.findByIdAndDelete(id);

        if(!product){
            return res.status(404).json({message:"Product Not Found"});
        }

        res.status(200).json({message:"Product deleted successfully"});
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

mongoose.connect("mongodb+srv://admin:admin@backenddbfcc.5mk6zlk.mongodb.net/BEFCC?retryWrites=true&w=majority&appName=BackendDBFCC")
.then(() => {
    console.log('connected to DB !');
    app.listen(1419,() => {
        console.log('server is running on port 1419');
    })
})
.catch(() => {
    console.log('connection failed !')
})