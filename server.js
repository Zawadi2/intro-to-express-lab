// Import Express
const express = require('express')

// Create an Express app
const app = express()



// 1


app.get('/greeting/:username', (req, res) => {
   res.send(`Hello there, ${req.params.username}!`);
});


// 2

app.get('/roll/:number', (req, res) => {
  const reqNumber = parseInt(req.params.number);
  // console.log(reqNumber);
  // console.log(reqNumber + 1)
  if (isNaN(reqNumber) === true) {
    res.send( 'You must specify a number');
  }else {
    const randNumber = Math.floor(Math.random() * reqNumber);
    res.send(`you rolled a ${randNumber}`)
  }
});
  
//  3

app.get('/collectible/:indexparameter', (req,res) => {
  const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];
  const inputIdx = req.params.indexparameter;
  if (inputIdx < 3) {
    res.send(`so you want the ${collectibles[inputIdx].name}? For ${collectibles[inputIdx].price} it can be yours!`)
  }else {
    res.send(`This item is not yet in stock.Check back soon!`);
  }
})

// 4

const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

// min-price: Excludes shoes below this price.
// max-price: Excludes shoes above this price.
// type: Shows only shoes of the specified type.
// No parameters: Responds with the full list of shoes.


app.get('/shoes', (req, res, next) => {
  const min = req.query.minimum
  const max = req.query.maximum
  const type = req.query.type
  // create a const to be reset after each search
  let defShoes = [...shoes]
  let results = []
  // create a filter for the minimum
  if(min !== undefined) {
    defShoes = defShoes.filter((shoe) => shoe.price >= min)
  }
  // Add filters for max and type similarly
  if(max !== undefined) {
    defShoes = defShoes.filter((shoe) => shoe.price <= max)
  }
  // Add filters for type similarly
  if(type !== undefined) {
    defShoes = defShoes.filter((shoe) => shoe.type === type)
  }
  // log the results
  for(i in defShoes) {
    results.push(defShoes[i].name)
  }
  // send the response
  if(defShoes.length) {
    res.send(`Here are the shoes that match your interests ${results}.`)
  }else {
    res.send('Looks like we do not have what you are looking for.')
  }

});



// Listen for requests on port 3000

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
