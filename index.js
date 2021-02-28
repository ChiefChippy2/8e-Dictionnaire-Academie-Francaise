window.inp=document.querySelector("input")
function req(uest){
 setTimeout(()=> uest.parentElement.innerHTML="",10)
 document.querySelector("input").value=uest.innerText
 window.word=uest.innerText
fetch("https://dictiona1234.firebaseio.com/dictionaries/v8/"+word.replace(/\./g,"%2E")+".json")
.then(r=>r.text())
.then(r=>document.querySelector("#answer").innerHTML=(decode(r.replace(/"/g,""))))
.catch(e=> document.querySelector("#answer").innerHTML="Erreur : "+e)


}
function decode(r){
var utf=new TextDecoder("utf-8")
  var binary_string = window.atob(r.replace(/€/g,"/"));
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
 document.querySelector("#answer").scrollIntoView()
   return proc(utf.decode(bytes.buffer));
}
fetch("mots.json").then(r=>r.json()).then(re=>{
window.words=re
window.dispatchEvent(new Event("loadend"))

}).catch(e=>{console.error(e);setTimeout(()=>window.reload(),2000)})

window.addEventListener("loadend",function(){
  var inp=document.querySelector("input")
inp.addEventListener("keyup",function(e){
 document.querySelector("#answer").innerHTML=""
var sera=inp.value.toUpperCase().trim()
var candid= Array.from(new Set([...window.words.filter(x=>x.startsWith(sera)),...(window.words.filter(x=>x.endsWith(sera)),...window.words.filter(x=>x.includes(sera))])).slice(0,9)
var sug=document.querySelector(".sug")
if(candid.length){
sug.innerHTML=candid.map(x=>'<span class="sugitem" onclick=req(this) >'+x.replace(/\./g,"")+'</span><hr>').join("")
}else{
sug.innerHTML="&times; Pas de mots correspondants."

}




})
})
function proc(ess){
 ess=ess.replace(/\n/g,"<br>")
 ess=ess.replace(new RegExp(word,"gi"),x=>"<i>"+x+"</i>")
 return ess


}
