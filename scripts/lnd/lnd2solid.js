var ln = require("./ln.json")


var nodes = {}
    
ln.edges.forEach((k) => { 

    console.log(k)


    if (k.node1_pub) {
        nodes[k.node1_pub] = [k.channel_id].concat(k.node1_pub) 
    } 

    if (k.node2_pub) {
        nodes[k.node2_pub] = [k.channel_id].concat(k.node2_pub) 
    } 


    var turtle = `@prefix : <https://w3id.org/ln#> .

    
<#this> a :Edge ;
  :channel_id "${k.channel_id}" ;
  :chan_point """${k.chan_point}""" ;
  :capacity "${k.capacity}" ;

  :node1_pub <../node/${k.node1_pub}.ttl#this> ;
  :node2_pub <../node/${k.node2_pub}.ttl#this> ;

  :node1_policy <#node1_policy> ;
  :node2_policy <#node2_policy> ;

  :last_update "${k.last_update}" .
  `

  if (k.node1_policy) {
    turtle += `<#node1_policy> a :Policy ;
    :time_lock_delta ${k.node1_policy.time_lock_delta} ;
    :min_htlc ${k.node1_policy.min_htlc} ;
    :fee_base_msat ${k.node1_policy.fee_base_msat} ;
    :fee_rate_milli_msat ${k.node1_policy.fee_rate_milli_msat} ;
    :disabled ${k.node1_policy.disabled} .
    `
}

if (k.node2_policy) {
    turtle += `<#node2_policy> a :Policy ;
    :time_lock_delta ${k.node2_policy.time_lock_delta} ;
    :min_htlc ${k.node2_policy.min_htlc} ;
    :fee_base_msat ${k.node2_policy.fee_base_msat} ;
    :fee_rate_milli_msat ${k.node2_policy.fee_rate_milli_msat} ;
    :disabled ${k.node2_policy.disabled} .
    `
}

console.log(turtle); 
    const file = "./edge/" + k.channel_id + ".ttl"; 
    fs.writeFileSync(file, turtle) 

})


ln.nodes.forEach((k) => { 
    var addr_turtle = ''
    k.addresses.forEach(address => {
        addr_turtle += ':addr "' + address.addr + '" ;\n'
    })


    var turtle = `@prefix : <https://w3id.org/ln#> .
    
<#this> a :Node ;
  :pub_key "${k.pub_key}" ;
  ${addr_turtle}:alias """${k.alias}""" ;
  :color "${k.color}" ;
  :last_update "${k.last_update}" .
  `

  if (nodes && nodes[k.pub_key]) {
      console.log(nodes[k.pub_key])
      nodes[k.pub_key].forEach( (k) => {
        turtle += `<../edge/${k}.ttl#this>  :node1_pub <#this> .\n`
      } )      
  }

    console.log(turtle); const file = "./node/" + k.pub_key + ".ttl"; 
    fs.writeFileSync(file, turtle) 

})
