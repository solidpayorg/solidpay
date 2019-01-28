var ln = require("./ln.json")


var node1 = {}
var node2 = {}
    
ln.edges.forEach((k) => { 

    console.log(k)


    if (k.node1_pub) {
        node1[k.node1_pub] = node1[k.node1_pub] || []
        if (k.channel_id) {
            node1[k.node1_pub].push(k.channel_id)
        }
    }

    if (k.node2_pub) {
        node2[k.node2_pub] = node2[k.node2_pub] || []
        if (k.channel_id) {
            node2[k.node2_pub].push(k.channel_id)
        }
    } 


    var turtle = `@prefix : <https://w3id.org/ln#> .

    
<#this> a :Edge ;
  :channel_id "${k.channel_id}" ;
  :chan_point """${k.chan_point}""" ;
  :capacity "${k.capacity}" ;

  :source <../node/${k.node1_pub}.ttl#this> ;
  :destination <../node/${k.node2_pub}.ttl#this> ;

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
        addr_turtle += ':address "' + address.addr + '" ;\n'
    })


    var turtle = `@prefix : <https://w3id.org/ln#> .
    
<#this> a :Node ;
  :node_id "${k.pub_key}" ;
  ${addr_turtle}:alias """${k.alias}""" ;
  <http://www.w3.org/2000/01/rdf-schema#label> """${k.alias}""" ;
  :rgb_color "${k.color}" ;
  :timestamp "${k.last_update}" .
  `

  if (node1 && node1[k.pub_key]) {
    console.log(node1[k.pub_key])
    node1[k.pub_key].forEach((k) => {
      if (k) {
          turtle += `<../edge/${k}.ttl#this>  :source <#this> .\n`
      }
    })      
}

if (node2 && node2[k.pub_key]) {
    console.log(node2[k.pub_key])
    node2[k.pub_key].forEach((k) => {
      if (k) {
          turtle += `<../edge/${k}.ttl#this>  :destination <#this> .\n`
      }
    })      
}

    console.log(turtle); const file = "./node/" + k.pub_key + ".ttl"; 
    fs.writeFileSync(file, turtle) 

})
