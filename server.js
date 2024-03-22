const express = require('express')
let data = require('./postman/data')
const app = express()
const port = 6969

//middle ware
app.use(express.json())
/* app.use(express.urlencoded({extended: true}))    */


//request methods
app.get('/', (req, res)=>{
    res.status(200)
    res.send({message: "This is the Home Page"})
})

app.get('/todo', (req, res)=>{
    res.setHeader('Content-Type', 'text/plain')
    res.status(200)
    res.end(JSON.stringify(data, null, 3)) 
    /* res.send({message: `The data is display ${data}`}) */
   /*  res.send({message : " Data is display"}).json(data) */
})


app.post('/todo', (req,res)=>{
    /* let newData = 
    {
        "id": "6",
        "task": "Learn JJ", 
        "tasktodo": "Friday"
    }
     */
    let newData = req.body;
    data.push(newData)
    res.status(201)
    res.json({message: "Data added successfully", newData})
})

app.put('/todo/:id',(req,res)=>{
    const id = req.params.id;
    /* const updates = data.index; */
    const updates = req.body;
    const index = data.findIndex(data => data.id  == id)

    if (index != -1) {
        data[index] = updates 
        /* data[index] = { ...data[index], ...updates }; */
        res.status(200).json({output: `the data is updated and it index is at ${index} (+-+)`})
    } else {    
        res.status(404).json({error: "there is an error with the data ;-;"})
    }
})


/* app.delete('/todo/:id', (req,res)=>{
    const id = req.params.id;
    const storageData = data.length 
    data.filter(data=> data.id !==id)
    if (data.length  < storageData ){
        res.status(200).json({message: `data with ${id} deleted successfully`})
    }else {
        res.status(404).json({message: `Data with ${id} not found`})
    }
})
 */

app.delete('/todo/:id', (req, res) => {
    const id = req.params.id;
    const removedItem = req.body;
    const index = data.findIndex(data => data.id == id);
    if (index != -1) {
        data[index] = removedItem
      res.status(200).json({ message: `Data with ${id} deleted successfully` });
    } else {
      res.status(404).json({ message: `Data with ${id} not found` });
    }
  });


app.listen(port, () => {
    console.log('Server is available at port 6969');
})