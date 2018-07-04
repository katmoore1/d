
const fetch=require("node-fetch");exports.handler=function(t,o,e){var n=function(t,o){if(o<0)return n(t,o+26);for(var e="",a=0;a<t.length;a++){var r=t[a];if(r.match(/[a-z]/i)){var s=t.charCodeAt(a);s>=65&&s<=90?r=String.fromCharCode((s-65+o)%26+65):s>=97&&s<=122&&(r=String.fromCharCode((s-97+o)%26+97))}e+=r}return e},a=t.headers.referer.split("-").pop(-1),r=a.substring(1,2)+a.substring(3,a.length-1);n(r,-7);const s=({status:t,body:o})=>{e(null,{statusCode:t,body:JSON.stringify({body:o})})};fetch("https://api.name.com/v4/domains",{method:"POST",body:'{"domain":{"domainName": "sdfhdsfhsdfhfh.com" }}',headers:{"Content-Type":"application/json",Authorization:"Basic ZXZhbnM3Nzg0MzpmNDkzZDQ2MzllMDUyMDliYjczMjRkYzBkYWQzYjM0OTM2MGU3YjNl"}}).then(t=>t.json()).then(t=>{s({status:200,body:t.body})}).catch(t=>{s({status:422,body:"Couldn't get the data"})})};







