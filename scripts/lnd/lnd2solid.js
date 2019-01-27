var ln = require("./ln.json")

ln.nodes.forEach((k) => { 
    var turtle = `@prefix : <https://ln.w3id.org/> .
    
<#this> a :Node ;
  :pub_key "${k.pub_key}" ;
  :addr """${k.addresses.map(a => a.length)}""";
  :alias """${k.alias}""" ;
  :color "${k.color}" ;
  :last_update "${k.last_update}" .`

    console.log(turtle); const file = "./node/" + k.pub_key + ".ttl"; 
    fs.writeFileSync(file, turtle) 

})
