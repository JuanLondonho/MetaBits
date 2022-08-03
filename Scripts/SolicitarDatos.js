
var url = new URL(window.location);
var totalBits = 0;
var token;
var meses = ["08","09"];

if(url.hash){
    token= url.hash.split('access_token=')[1].split('&')[0];
    localStorage.setItem("token", token);
    for(var i = 0; i<meses.length; i++){
        var mes = meses[i];
        oReq = new XMLHttpRequest();
        oReq.addEventListener("load", cantBits);
        oReq.open("GET", "https://api.twitch.tv/helix/bits/leaderboard?started_at=2022-"+mes+"-01T00:01:00Z&period=month&count=100", true);
        oReq.setRequestHeader('Client-Id', '6lpqt1fmrwl3e8ov0fdvegwdzak9km');
        oReq.setRequestHeader('Authorization', 'Bearer '+token);
        oReq.send();
    }
    

}else if(localStorage.getItem("token")){
    token=localStorage.getItem("token");
    for(var i = 0; i<meses.length; i++){
        var mes = meses[i];
        var url = "https://api.twitch.tv/helix/bits/leaderboard?started_at=2022-"+mes+"-01T00:01:00Z&period=month&count=100"
        oReq = new XMLHttpRequest();
        oReq.addEventListener("load", cantBits);
        oReq.open("GET", url, true);
        oReq.setRequestHeader('Client-Id', '6lpqt1fmrwl3e8ov0fdvegwdzak9km');
        oReq.setRequestHeader('Authorization', 'Bearer '+token);
        oReq.send();
    }
}else{
    console.log("No se encontro el TOKEN");
}

function cantBits () {
    if(this.readyState==4 && this.status==200){
        var datos=JSON.parse(this.responseText).data;
        var bits = datos.reduce((sum, value) => (typeof value.score == "number" ? sum + value.score : sum), 0);
        totalBits += bits;
        document.getElementById("totalbits").innerHTML=""+totalBits+"/80000";
    }else{
        
    }
    
}