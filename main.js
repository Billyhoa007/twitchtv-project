// The ready() method can only be used on the current document, so no selector is required
$(function(){
	// CHANNELS to display
	var streamers = ["Monstercat", "SaintD3", "LIRIK", "freecodecamp", "MusicToWork", "nl_Kripp", "GuardianCon", "Hoagie7"];
	var url = "https://wind-bow.glitch.me/twitch-api/streams/freecodecamp";
	// STREAM INFO-STATUS for FCC
	$.getJSON(url, function(data1){
	// console.log(data1); //Testing
	if(data1.stream == null){
	    $("#fccStatus").html('<span class="red">FCC is currenty OFF-line!</span>');
	  } else{
	    $("#fccStatus").html('<span class="green">FCC is currenty ON-line!</span>');
	  }
	});
	// INFO FOR EVERY STREAMER 
	for(var i=0; i<streamers.length; i++){
	 var channelUrl = "https://wind-bow.glitch.me/twitch-api/channels/" + streamers[i];
	 $.getJSON(channelUrl, function(data2){
	    // If there is an error that means the streamer has closed their Twitch account (or the account never existed).
	    var logo;
	    var name;
	    var status;
	   if(!data2.error){
	     // console.log(data2); //Testing
			// The streamer could have no logo and throws an error.
			if(data2.logo){
				logo = data2.logo;
			} else {
				// Default Logo for NO Logo
				logo = "http://manuel-valles.com/project/twitchTV/img/noLogo.png";
			}
			name = data2.name;
			status = data2.status;
			// We need to check streams section to know if it's ON-Line
			var streamsUrl = "https://wind-bow.glitch.me/twitch-api/streams/" + name;
			$.getJSON(streamsUrl, function(data3){
			// console.log(data3); //Testing
				if(data3.stream != null){
					$("#channelOn").prepend(
						'<div class="row online"><div class="col-4"><img src="'+ logo + '"></div><div class="col-4"><a href="https://www.twitch.tv/'
				        + name +'" target="_blank">' + name + '</a></div><div class="col-4 green id="boo">Online<br/><br/><span class="small text-muted">' 
				        + status+'</span></div></div>');
				} else{
					 $("#channelOff").append(
					 	'<div class="row offline"><div class="col-4"><img src="'+ logo + '"></div><div class="col-4"><a href="https://www.twitch.tv/'
					    + name +'" target="_blank">' + name + '</a></div><div class="col-4 red">Offline</div></div>');
				}
			});
	   } else{
	   		// Logo for not existed/closed streamers 
	   		logo = "https://vpnpick.com/wp-content/uploads/2016/08/404NotFound.jpg";
			// console.log(data2); //Testing
			name = data2.message;
			status = data2.error;
			$("#noChannel").append(
				'<div class="row"><div class="col-4"><img src="'+ logo + '"></div><div class="col-4">' 
				+ name + '</div><div class="col-4">'+ status +'</div></div>');
	   }
	 });
	}
  
});