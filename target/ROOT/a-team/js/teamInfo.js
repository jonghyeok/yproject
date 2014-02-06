function teaminfo_onload(){
	tmlist();
	team_member_list();
	
	$('#sidebarUl').on("click", "li" , function(){
		$("#sidebarUl").children("*").removeClass("manager_current");
		$(this).addClass("manager_current");
		var tno =$(this).attr("tno");
		team_member_list(tno);
	});
}

function team_member_list(tno){ 
	var check = 0;
	if(tno == undefined){
		tno=1;
		check=1;

	}

	$.getJSON("team/teaminfoView.do?tno=" + tno, function(result) {
		if(result.status == "success"){
			
			var teaminfo = result.data[0];
			var teaminfo_memberlist = result.data[1];
			var path = "file/" + teaminfo.tphoto;
			
			$(".teaminfoTname").text(teaminfo.tname);
			
			var tinfo = teaminfo.tinfo;
			
			tinfo = tinfo.replace("\n"," <br/> ");

			$("#teamintroduce").html(tinfo);
			
			if(teaminfo.tphoto==null){
				path="img/defaultphoto.gif";
			}

			$("#teaminfoPhoto")[0].src=path;
			
			
			var coordX = teaminfo.tcoordx; //team.coordx
			var coordY = teaminfo.tcoordy;
			$("#teamInfoMap")[0].src = "http://dna.daum.net/include/tools/routemap/map_view.php?width=500&height=400&latitude=" + coordY + "&longitude=" + coordX + "&contents=&zoom=4";
			$("#teaminfoAddress").text("주소 : "+teaminfo.taddress);
			
			
			var div	= $("#memberphotolist");
			
			$(".teamInfoSt").remove();
			
			
    		for(var i=0; i<teaminfo_memberlist.length ; i++){
    			var path = "file/" + teaminfo_memberlist[i].tsphoto;
    			if(teaminfo_memberlist[i].tsphoto==null){path="img/defaultphoto.gif";}
    			$("<div class='teamInfoSt'><p>No."+teaminfo_memberlist[i].tsbackno+"  "+teaminfo_memberlist[i].tsname+"</p><img src='"+path+"'>").attr("onerror",'this.src="img/defaultphoto.gif"').appendTo(div);
    		}
    		if(check==1){
    			$("#sidebarUl").children("*").removeClass("manager_current");
    			$("#1").addClass("manager_current");
    		}
		}
		else{
			alert("오류가 발생하였습니다. \n 잠시 후 다시 접속해 주시기 바랍니다.");
		}
	});
};

function tmlist(){
	 $.getJSON("team/list.do", function(result) {
			if(result.status == "success") {
				var tslist = result.data;
				var sideul = $("#sidebarUl");
				for(var i=0; i<=tslist.length ; i++){
					if(tslist[i].tuse != 0){
						$("<li id='"+tslist[i].tno+"' >").attr("tno" , tslist[i].tno).append($("<span>").text(tslist[i].tname))
						.appendTo(sideul);
					
					}
				}
			}
	 });
};


