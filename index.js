window.inp=document.querySelector("input")
function req(uest){
fetch("https://dictiona1234.firebaseio.com/dictionaries/v8/"+uest.innerText+".json")
.then(r=>r.text())
.then(r=>document.querySelector("#answer").innerHTML=(decode(r.replace(/"/g,""))))
.catch(e=> document.querySelector("#answer").innerHTML="Erreur : "+e)


}
function decode(r){
var utf=new TextDecoder("utf-8")
  var binary_string = window.atob(r);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
   return utf.decode(bytes.buffer);
}
fetch("mots.json").then(r=>r.json()).then(re=>{
window.words=re
window.dispatchEvent(new Event("loadend"))

}).catch(e=>{console.error(e);setTimeout(()=>window.reload(),2000)})

window.addEventListener("loadend",function(){
  var inp=document.querySelector("input")
inp.addEventListener("keydown",function(e){
var sera=inp.value.toUpperCase().trim()
var candid=window.words.filter(x=>x.includes(sera)||x.startsWith(sera)||x.endsWith(sera)).slice(0,9)
var sug=document.querySelector(".sug")
if(candid.length){
sug.innerHTML=candid.map(x=>'<span class="sugitem" onclick=req(this)>'+x+'</span><br><hr><br>').join("")

}else{
sug.innerHTML="&times; Pas de mots correspondants."

}




})
})
