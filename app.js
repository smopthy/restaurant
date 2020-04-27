const express = require('express')
const app = express()
const port = 3000

// 
const expbhs = require('express-handlebars')

app.use(express.static ('public')) 
const restaurant = require('./restaurant.json')


app.engine('handlebars', expbhs({defaultLayout: 'main'}))
app.set('view engine' , 'handlebars') 


app.get('/' , (req , res)=>{
    
    res.render('index' , {restaurnats : restaurant.results })
})


app.get('/restaurnats/:page_id' , (req , res)=>{
    const page_id = restaurant.results.find( page_id => page_id.id.toString() ===
    req.params.page_id)
    res.render('show' , { page_id : page_id}) 
})


// app.get('/search' , (req , res)=>{
//     const keyword = req.query.keyword
//     const page_id = restaurant.results.filter( 
//        page_name => { return page_name.name.toLowerCase().includes(keyword.toLowerCase())
//     })
    
//    res.render('index' , { page_id : page_id,  keyword :keyword }) 
// })


app.get('/search', (req, res) => {
    const keyword = req.query.keyword
    const page_id = restaurant.results.filter(page_id => {
      return page_id.name.toLowerCase().includes(keyword.toLowerCase())
    })
    res.render('index', { restaurnats: page_id , keyword : keyword })
  })



app.listen(port , ()=>{
    console.log(`${port}`)
})