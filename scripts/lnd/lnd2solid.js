var ln = require("./ln.json")
/*
  { channel_id: '566875209985687552',
    chan_point:
     '0d0d7f7c8455b9592813de8a9571838f92a97236e0fa1fc6d87e3817050475a3:0',
    last_update: 1548498404,
    node1_pub:
     '03c80be3937717b502e66dc6cf8ba2881c9e68a8398bfa08c2866babfc88a729f3',
    node2_pub:
     '03fc5b91ce2d857f146fd9b986363374ffe04dc143d8bcd6d7664c8873c463cdfc',
    capacity: '349724',
    node1_policy:
     { time_lock_delta: 144,
       min_htlc: '1000',
       fee_base_msat: '1000',
       fee_rate_milli_msat: '1',
       disabled: true },
    node2_policy:
     { time_lock_delta: 144,
       min_htlc: '1000',
       fee_base_msat: '1000',
       fee_rate_milli_msat: '1',
       disabled: false } },

*/

    
ln.edges.forEach((k) => { 
console.log(k)

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
  :last_update "${k.last_update}" .`

    console.log(turtle); const file = "./node/" + k.pub_key + ".ttl"; 
    fs.writeFileSync(file, turtle) 

})
