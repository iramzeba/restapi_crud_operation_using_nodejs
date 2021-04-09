const express=require('express');
const joi=require('joi');
const app=express();

app.use(express.json());

const books=[
    {id:1, title:'harry potter'},
    {id:2, title:'jungle book'},
    {id:3, title:'game of thrones'},
]
app.get('/',(req,res)=>{
    res.send("welcome to restapi using nodejs")
});

app.get('/api/books',(req,res)=>{
    res.send(books);
});

app.get('/api/books/:id',(req,res)=>{
    const book=books.find(c=> c.id===parseInt(req.params.id));
    if(!book) res.status(404).send('not found');
    res.send(book);

});

app.post('/api/books',(req,res)=>{
const {errror}=validBook(req.body)
if(error) {
    res.status(404).send(error.details[0].message)
    return;
}
    const book={
        id:books.length+1,
        title:req.body.title
}
books.push(book);
res.send(book)
});

//update
app.put('/api/books/:id',(req,res)=>{
    const book=books.find(c=> c.id===parseInt(req.params.id));
    const {error}="validateBook"
    if(error) {
        res.status(404).send(error.details[0].message)
        return;
    }
    book.title=req.body.title;
    res.send(book)

});

//delete 
app.delete('/api/books/:id', (req, res)=>{
    const book=books.find(c=> c.id===parseInt(req.params.id));
    if(!book) res.status(404).send('not found');
    const index=books.indexOf(book);
    books.splice(index,1);
    res.send(book)
})


app.listen(3000,()=>{
    console.log("app is listning")
})