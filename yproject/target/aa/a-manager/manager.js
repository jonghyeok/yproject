//공용변수(?)
//var ano;
var tno=null;
var ano=null;
var ck;

function manager_onload(){

	if(tno == null || tno ==undefined){
		tno=loginInfo.tno;
	}
	firstload();
	
	//코치 , 자원봉사자일때
	if(loginInfo.level ==2 || loginInfo.level ==3 ){
		if(tno==0){
			$("#mgr_list").css('display','none');
			location.reload(true);
			alert("현재 팀 배정이 안되어 있습니다. 관리자에게 팀 배정을 \n 요청하신 후 다시 시도해 주시기 바랍니다."); 

			
			//history.go(-2);
		}else{
			calendar(tno);
			$("#mgr_list").css('display','none');
			$("#kamdok_Calendar").css('display','');
		}
		


				
	}else if (loginInfo.level ==9 ){
		$("#mgr_list").css("display","");
		adminintroMake();
	
	}
	
	
	
	//admin 팀리스트에서 이벤트 추가
	$("#mgr_list").on("click", ".mgrList", function(){
		if(event.preventDefault){ event.preventDefault();}
		 else{event.returnValue = false;}
		if(event.stopPropagation){
			event.stopPropagation();
		}else if( event.removeEventListener )
		{	
			event.removeEventListener('mouseup', onMouseUp);
			event.removeEventListener('mousemove', onMouseMove);
			event.removeEventListener('touchstart', onTouchStart);
			event.removeEventListener('touchmove', onTouchMove);
			event.removeEventListener('touchend', onTouchEnd);
		}else if( event.detachEvent ) {
			event.detachEvent('onmouseup',    onMouseUp);
			event.detachEvent('onmousemove',    onMouseMove);
			event.detachEvent('touchstart',   onTouchStart);
			event.detachEvent('touchmove',    onTouchMove);
			event.detachEvent('touchend', onTouchEnd);				
		} 
		tno = $(this).attr("data-tno");
		//달력그리기
		$("#kamdok_Calendar").css('display','');
		$("#mgr_list").css("display","none");
		calendar(tno);
	});
	//사이더바 일정보기 클릭시
	$("#side_Calendar").on("click", function(){
		if(event.preventDefault){ event.preventDefault();}
		 else{event.returnValue = false;}
		$(this).trigger("managerManagement");	
		
	});
	//사이더바 출석 클릭시
	$("#side_Roll").on("click", function(){
		if(event.preventDefault){ event.preventDefault();}
		 else{event.returnValue = false;}
		
		$("#sidebarUl").children("*").removeClass("manager_current");
		$("#side_Roll").addClass("manager_current");
		firstload2();
		header_manager();
		$("#roll_Page").css("display","");
		var ano=$(this).attr("ano");
		side_Roll_Update(ano);
	});
	//사이더바 출석 add 클릭시
	$("#side_RollAdd").on("click", function(){
		$("#sidebarUl").children("*").removeClass("manager_current");
		$("#side_RollAdd").addClass("manager_current");
		var ano=$(this).attr("ano");
		if(confirm("출석 기록을 생성하시겠습니까?\n 한번생성된 기록은 삭제되지않습니다")){
			side_Roll_Add(ano);
			firstload2();
			header_manager();
			$("#roll_Page").css("display","");
		}
	
			
	});	
	//사이더바 훈련  클릭시
	$("#side_Train").on("click", function(){
		if(event.preventDefault){ event.preventDefault();}
		 else{event.returnValue = false;}
		var ano=$(this).attr("ano");

		$.ajax('teamp/getrollcount.do', {
			type:'Post',
			data: {ano: ano},
			success: function(result){
				if(result.status == 'success'){
					
					var count = result.data;
					
					if(count !=0){

						$("#sidebarUl").children("*").removeClass("manager_current");
						$("#side_Train").addClass("manager_current");
						firstload2();
						header_manager();
						$("#train_Page").css("display","");
						side_Train_Update(ano);
						
					}
					
				}else{
					alert("출석된 인원이 없습니다. 출석 후 이용해 주세요!");
				}
			}
		});
		
		
		
		
		
		
		
	});
	//사이더바 훈련 add 클릭시
	$("#side_TrainAdd").on("click", function(){
		if(event.preventDefault){ event.preventDefault();}
		 else{event.returnValue = false;}
		var ano=$(this).attr("ano");
		
		$.ajax('teamp/getrollcount.do', {
			type:'Post',
			data: {	ano: ano},
			success: function(result){
				if(result.status == 'success'){
					var count = result.data;
					
					if(count >0){

						$("#sidebarUl").children("*").removeClass("manager_current");
						$("#side_TrainAdd").addClass("manager_current");
						//var ano=$(this).attr("ano");
						if(confirm("훈련 기록을 생성하시겠습니까?\n 한번생성된 기록은 삭제되지않습니다")){
							firstload2();
							$("#train_Page").css("display","");
							header_manager();
							side_Train_Add(ano);
						}
						
						
					}else{
						alert("출석된 인원이 없습니다. 출석 후 이용해 주세요!");
					}
					
				}
			}
		});
		
		
		
	});	
	//사이더바 경기 클릭시
	$("#side_Game").on("click", function(){
		if(event.preventDefault){ event.preventDefault();}
		 else{event.returnValue = false;}
		$("#sidebarUl").children("*").removeClass("manager_current");
		$("#side_Game").addClass("manager_current");
		firstload2();
		$("#game_page").css("display","");
		var ano=$(this).attr("ano");
		side_Game_Update(ano);
	});	
	//사이더바 경기 add 클릭시
	$("#side_GameAdd").on("click", function(){
		if(event.preventDefault){ event.preventDefault();}
		 else{event.returnValue = false;}
		$("#sidebarUl").children("*").removeClass("manager_current");
		$("#side_GameAdd").addClass("manager_current");
		var ano=$(this).attr("ano");

		if(confirm("훈련 기록을 생성하시겠습니까?\n 한번생성된 기록은 삭제되지않습니다")){
			firstload2();
			$("#game_page").css("display","");
			side_Game_Add(ano);
		}
	
	});	
	//출석 page 이벤트처리
	$(".checklist input:checked").parent().addClass("selected");

	$(".checklist").on("click", ".checkbox-select" ,function(){
		
		if(event.preventDefault){ event.preventDefault();}
		 else{event.returnValue = false;}
		
			$(this).parent().addClass("selected");
			$(this).parent().find(":checkbox").attr("checked","checked");
		}
	);
	$(".checklist").on("click", ".checkbox-deselect" ,function(){
		
		$(this).parent().removeClass("selected");
		$(this).parent().find(":checkbox").removeAttr("checked");
		}
	);									        

   //출석 ADD 버튼 되었을때
	$("#btnRollBookSend").on("click",function(){
		var attend =$(".attend");
		var etc =$(".etc");
		var ano = $(this).attr("ano");
		var gson = [];
		var rstatus = null;
		for(var i=0 ;i<attend.length;i++ ){
			if(attend[i].checked ==true){
				rstatus = 1;
				
			}else{
				rstatus = 0;
			}
			var gsonchild= {
				 ano : ano,
				 tsno :  attend[i].value,
				 rstatus : rstatus,
				 retc : etc[i].value,
			};
			gson.push(gsonchild);
		}
		if(gson){
			$.ajax("teamp/rollbookUpdate.do", {
				type: "POST",
				data: JSON.stringify( gson ),
				dataType: "json",
				contentType: "application/json",
				success: function(result) {
					if(result.status == "success") {
						alert("성공");
					} else if(result.status == "nodata") {
						alert("정보가 없습니다.");
					} else{
						alert("처리중 문제가 발생하였습니다. 잠시 후 다시 시도해 주시기 바랍니다.");
					};
				}

			});
		};
		
	});
	
	
	   //훈련 Update 전송 버튼 되었을때
	$("#btnEvalUpdate").on("click",function(){
		var radioList = $("input[type=radio]:checked");
		var gson = [];
		
		for(var i =0 ; i<radioList.length; i++){
			var gsonchild= {
					eno :$(radioList[i]).attr("eno"),
					 elno:  $(radioList[i]).attr("elno"),
					 escore : $(radioList[i]).attr("value")					
		
				};
				gson.push(gsonchild);
		}

		
		if(gson){
			$.ajax("teamp/trainUpdate.do", {
				type: "POST",
				data: JSON.stringify( gson ),
				dataType: "json",
				contentType: "application/json",
				success: function(result) {
					if(result.status == "success") {
						alert("성공");
					} else if(result.status == "nodata") {
						alert("정보가 없습니다.");
					} else{
						alert("처리중 문제가 발생하였습니다. 잠시 후 다시 시도해 주시기 바랍니다.");
					};
				}

			});
		};
		
	});
	

	$("#btnUpdateGame").on("click", function(){

		var gplist = [];

	
		
		
		
		for(var i=0 ; i < 9; i++){
	
			if($(".startScore")[i].value == ''){
				$(".startScore")[i].value=999;
			}
			
			if($(".endScore")[i].value == ''){
				$(".endScore")[i].value=999;
			}
				var glistchild= {
						gno : $("#btnUpdateGame").attr("gno"),
						gpinning :  $(".inning")[i].innerHTML,
						gpspoint :  $(".startScore")[i].value,
						gpepoint :  $(".endScore")[i].value
				};
				gplist.push(glistchild);
		
			
		}
		var game={
				 gno : $("#btnUpdateGame").attr("gno"),
				 ano : $("#btnUpdateGame").attr("ano"),
				 gplace : $("#gplace").val(),
				 gtitle :$("#gtitle").val(),
				 gstart :$("#gstart").val(),
				 gend : $("#gend").val(),
				 gsh : $("#gsh").val(),
				 gse : $("#gse").val(),
				 gsb : $("#gsb").val(),
				 geh : $("#geh").val(),
				 gee : $("#gee").val(),
				 geb : $("#geb").val(),
				 gdet : $("#gdet").val(),
				 getc : $("#getc").val(),
				 gplist : gplist
		};
		if(game != null){
			$.ajax("teamgame/updateGame.do", {
				type: "POST",
				data: JSON.stringify( game ),
				dataType: "json",
				contentType: "application/json",
				success: function(result) {
					if(result.status == "success") {
						alert("성공");
						side_Game_Update($("#btnUpdateGame").attr("ano"));
					} else if(result.status == "nodata") {
						alert("정보가 없습니다.");
					} else{
						alert("처리중 문제가 발생하였습니다. 잠시 후 다시 시도해 주시기 바랍니다.");
					};
				}

			});
		};
		
	});

	$("#gameTable").on("change", ".endScore", function(){
    	
    	
		var score = $(".endScore");
		var total =0 ;
		for(var i=0 ; i< score.length ; i++ ){
			if(isNaN(parseInt(score[i].value))  ){
				
			}else{
				total = parseInt(score[i].value) + parseInt(total);
				
			}
		}
		$("#totalEndScore").val(total);
	});
	$("#gameTable").on("change", ".startScore", function(){
		var score = $(".startScore");
		var total =0 ;
		for(var i=0 ; i< score.length ; i++ ){
			if(isNaN(parseInt(score[i].value))  ){
				
			}else{
				total = parseInt(score[i].value) + parseInt(total);
				
			}
		}
		$("#totalStartScore").val(total);
	});
}
	function total_score(){
		var score = $(".startScore");
		var total =0 ;
		for(var i=0 ; i< score.length ; i++ ){
			if(isNaN(parseInt(score[i].value))  ){
				
			}else{
				total = parseInt(score[i].value) + parseInt(total);
				
			}
		}
		$("#totalStartScore").val(total);
	}
  	function total_score(){
		var score = $(".endScore");
		var total =0 ;
		for(var i=0 ; i< score.length ; i++ ){
			if(isNaN(parseInt(score[i].value))  ){
				
			}else{
				total = parseInt(score[i].value) + parseInt(total);
				
			}
		}
		$("#totalEndScore").val(total);
	}
	

//매니저 부분 처음 들어올 떄 모든 화면 감추기(팀화면 빼고)
function firstload(){
		$("#frepare").css("display","none");
  		$("#mgr_sidebar").css("display","none");
  		$("#sidebar_rc").css("display","none");
  		$("#train_Page").css("display","none");
  		$("#roll_Page").css("display","none");
  		$("#kamdok_Calendar").css('display','none');
  		$("#kamdok_updateHeader").css('display','none');
  		$('.gldp-default').css('display', 'none'); // 달력 없애기
  		$("#game_page").css('display','none');
  		
  	}
function firstload2(){
	//$("#mgr_sidebar").css("display","none");
	$("#frepare").css("display","none");
	$("#sidebar_rc").css("display","none");
	$("#train_Page").css("display","none");
	$("#roll_Page").css("display","none");
	$("#kamdok_Calendar").css('display','none');
	$("#kamdok_updateHeader").css('display','none');
	$('.gldp-default').css('display', 'none'); // 달력 없애기
	$("#game_page").css('display','none');
	
}

function adminintroMake(){

	$.ajax('team/list.do?', {
		type:'GET',
		success: function(result){
			if(result.status == 'success'){					
				var list = result.data;
				$("#mgr_list").find("*").remove();
				for(var i=0 ; i<list.length ; i++){
					
					if(list[i].tuse == 0){
					}else {
						$("<div>").addClass("team-text span3")
								  .append($("<h4>").text(list[i].tname))
								  .append($("<img class='tmlistIMG'>").attr("src","file/"+list[i].tphoto))
								  .append($("<div>").addClass("social-links")
										  .append($("<a>").addClass("manager_setting mgrList")
												  		  .attr("href","#")
												  		  .attr("data-tno",list[i].tno )))
								.appendTo($("#mgr_list"));				  		  
					}
				};
				
			}else{
				alert("서버와의 연결이 원할하지 않습니다. 잠시 후 다시 시도해 주시기 바랍니다.");
			}
		}
	});
}

function calendar(tno){
	var spDate= null;
	
	datepage_tname(tno);

	$.ajax("teamp/getAdate.do?tno="+ tno, {
		type: "POST",
		dataType: "json",
		success: function(result) {
			
			if(result.status == "success") {
				var yyy=result.data;
				spDate = [];
				var ck = null;
				for(var i=0 ;i<yyy.length ; i++) {
					
				  	if(yyy[i].rollbookck == 1 && yyy[i].trainck ==1 && yyy[i].gameck  == 1){
		    			        	ck= "ck6";
		    						}else if(yyy[i].rollbookck == 1 && yyy[i].trainck ==0 && yyy[i].gameck  == 0){
		    							ck= "ck2";
		    						}else if(yyy[i].rollbookck == 1 && yyy[i].trainck ==1 && yyy[i].gameck  == 0){
		    							ck= "ck3";
		    						}else if(yyy[i].rollbookck == 1 && yyy[i].trainck ==0 && yyy[i].gameck  == 1){
		    							ck= "ck4";
		    						}else if(yyy[i].rollbookck == 0 && yyy[i].trainck ==0 && yyy[i].gameck  == 1){
		    							ck= "ck5";
		    						}else if(yyy[i].rollbookck == 0 && yyy[i].trainck ==0 && yyy[i].gameck  == 0){
		    							ck= "ck1";
		    							
		    						}
				  
					(function() {// 새로운 스코프 선언
						 var ano=	yyy[i].ano;
						 var off_ts = yyy[i].calendardata.offstudents;
						 var aaa={
						    		date:new Date(yyy[i].adate),
						    		data:function(date){
						    			sidebarOpen(tno, ano);
						    			firstload();
						    			$("#frepare").css("display","");
						    		//data : off_ts;
						    		},
						    		
						    		cssClass: ck
								  };
							spDate.push(aaa);
							
					 })();
				};
//				$('.ukk').glDatePicker(
				$('#datePicker').glDatePicker(
		    			{
		    			    showAlways: true,
//		    			    cssName:'flatwhite',
		    			    //allowMonthSelect: false,
		    			    //allowYearSelect: false,
		    			    todayDate: new Date(),
		    			    //selectedDate: new Date(),
		    			    specialDates: spDate,
		    			    borderSize: 1,
		    			    prevArrow: '\u25c4',
		    			    nextArrow: '\u25ba',
		    			    dowNames: ["일","월","화","수","목","금","토"],
		    			    monthNames: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
		    			    onHover: function(el, cell, date, data) {
		    			    	var day = Date.parse(date);
		    			    	var dataint   = parseInt(day) +  32400000;
		    			    	var ct = null;
		    			    	if(data != null){
		    			    		for(var i =0 ; i < yyy.length; i++){
		    			    		var day2 =	Date.parse( yyy[i].adate);
		    			    		var dayint = parseInt(day2);
		    			    			if(dataint ==dayint){
			    			    				if(yyy[i].calendardata.offstudents != ""){
				    			    				//$(".date_check").hide();
				    			    				//$(".date_check").slideDown("slow");
				    			    				$(".date_check").html(yyy[i].calendardata.offstudents);
				    			    				
			    			    				}else{
			    			    					$(".date_check").html("해당날자의 기록이 없습니다");
			    			    					//$(".date_check").hide();
			    			    				}	
			    			    				if(yyy[i].calendardata.evaloffstduents != ""){
					    			    				//$(".date_evalution").hide();
					    			    				//$(".date_evalution").slideDown("500");
					    			    				$(".date_evalution").text(yyy[i].calendardata.evaloffstduents);
					    			    			
				    			    			}else{
				    			    				$(".date_evalution").text("해당날자의 기록이 없습니다");
			    			    				
				    			    			}
			    			    				if(yyy[i].calendardata.teamGameResult != ""){
			    			    					//$(".date_result").hide();
				    			    				//$(".date_result").slideDown("slow");
				    			    				$(".date_result").html(yyy[i].calendardata.teamGameResult);
				    			    			
			    			    				}else{
			    			    					$(".date_result").html("해당날자의 기록이 없습니다");
			    			    				}
			    			    				
			    			    				
		    			    		}
		    			    	
		    			    		
		    			    		}
		    			    		
		    			    	}else{
		    			    		$(".date_result").text("날짜에 마우스를 갖다 대시면 해당 날자의 간략한 경기기록을 보실수 있습니다");
		    			    		$(".date_evalution").text("날짜에 마우스를 갖다 대시면 출석은 하였으나 평가가 되지않은 선수가 나타납니다");
		    			    		$(".date_check").text("날짜에 마우스를 갖다 대시면 불참석자가 나타납니다");
		    			    		
		    			    	}
		    			    	
		    			    	
		    			    },
		    			    onClick: function(target, cell, date, data) {
		    			    	target.val(date.getFullYear() + '-' +
		    			    			(date.getMonth()+1) + '-' +
		    			    			date.getDate());
		    			    	adate=target.val();
		    			        if(data != null) {
		    			        	data(date);
		    			        }else{
		    			        	if(confirm("해당날짜의 팀활동이 없습니다 \n"+ adate +"\n추가하시겠습니까?")){
		    			        		firstload();
		    			        		sidebarOpen(tno, ano , adate);
		    			        	}
		    			        }
		    			    }
		    			
		    			});
			} 
		}
	});
}

function calendar_data_total(tno){
	
}

//사이더바 체크
function sidebarOpen(tno, ano , adate){
	
	if(ano == undefined){
		 ano = 0;
	}
	if(adate == undefined){
		adate = "2013-1-1";
	}
	
	$.ajax('teamp/ckFindano.do?tno='+tno+"&ano="+ano+"&adate="+adate, {
		type:'GET',
		success: function(result){
			if(result.status == 'success'){					
				$("#mgr_sidebar").css("display","");
				$("#sidebarUl").find("*").css("display","");
				var siderCk = result.data;
				
					savedata(siderCk);
				
				
				//0 이 테이블이 없는것 1 테이블이 존재할때 ano 로 검색!!
				if(siderCk.rollbookck==0){
					$("#side_Roll").css("display","none");
					$("#side_RollAdd").attr("ano", siderCk.ano);
				}else{
					$("#side_RollAdd").css("display","none");
					$("#side_Roll").attr("ano", siderCk.ano);
				}
				if(siderCk.trainck==0){
					$("#side_Train").css("display","none");
					$("#side_TrainAdd").attr("ano", siderCk.ano);
				}else{
					$("#side_TrainAdd").css("display","none");
					$("#side_Train").attr("ano", siderCk.ano);
				}
				if(siderCk.gameck==0){
					$("#side_Game").css("display","none");
					$("#side_GameAdd").attr("ano", siderCk.ano);
				}else{
					$("#side_GameAdd").css("display","none");
					$("#side_Game").attr("ano", siderCk.ano);
				}
				
				
				$("#mgr_list").find("*").remove();
			
				
			}else{
				alert("서버와의 접속이 원활하지 않습니다. 잠시 후 다시 시도해 주시기 바랍니다.");
			}
		}
	});
	
}
//========출석 add 요청

function side_Roll_Add(ano){
	$.ajax("teamp/rollbookAdd.do?", {
		type:"POST",
		data: {	ano: ano},
		dataType: "json",
		success: function(result) {
				if(result.status == "success") {
					var list=result.data;
					roll_page(list);	
				} else {
					alert("출첵 오류발생!");
				};
			}
	});
}


function datepage_tname(tno){
	
	$.ajax("team/view.do?", {
		type:"POST",
		data: {	tno: tno},
		dataType: "json",
		success: function(result) {
				if(result.status == "success") {
					var data=result.data;
					$("#coach_teamname").text(data.tname);
				} else {
					$("#coach_teamname").text(" ");
				};
			}
	});
}

//========출석 체크 view & update form
function side_Roll_Update(ano){
	$.ajax("teamp/load_roolbook.do?", {
		type:"POST",
		data: {	ano: ano},
		dataType: "json",
		success: function(result) {
				if(result.status == "success") {
					var list=result.data;
					
					roll_page(list);	
				} else {
					alert("출첵 오류발생!");
				};
			}
	});
};
//출석페이지 만들기
function roll_page(list){
	$('.checklist li').remove();
	var checklist = $('.checklist');
	for (var i =0 ; i<list.length ; i++){
		if(list[i].rstatus ==1){
			
				$("<li>").addClass("selected")
				.append($('<input>').attr('type', 'checkbox')
						.attr('id', list[i].id).attr("value",list[i].tsno).addClass('attend')
						.attr("checked", "checked"))
				.append($('<label>')
						.append($('<img>').css('width', '90px').css('height', '90px').attr("src",'file/' + list[i].tsphoto))
						.append($('<a>').text(list[i].tsname)))
				.append($('<a>').addClass('checkbox-select').attr('href', '#').text('Select'))
				.append($('<a>').addClass('checkbox-deselect').attr('href', '#').text('Cancel'))
				.append($('<input>').attr('type', 'text').attr('placeholder', '비고..').val(list[i].retc)
							.css('width', '80px').css('margin-top', '26px').addClass('etc'))		
				.appendTo(checklist);
		}else{
			
				$("<li>")
				.append($('<input>').attr('type', 'checkbox').attr('id', list[i].id).attr("value",list[i].tsno).addClass('attend'))
				.append($('<label>')
						.append($('<img>').css('width', '90px').css('height', '90px').attr("src",'file/' + list[i].tsphoto))
						.append($('<a>').text(list[i].tsname)))
				.append($('<a>').addClass('checkbox-select').attr('href', '#').text('Select'))
				.append($('<a>').addClass('checkbox-deselect').attr('href', '#').text('Cancel'))
				.append($('<input>').attr('type', 'text').attr('placeholder', '비고..').val(list[i].retc)
							.css('width', '80px').css('margin-top', '26px').addClass('etc'))		
				.appendTo(checklist);

		}
	};
	$("#btnRollBookSend").attr("ano", list[0].ano);
	sidebarOpen(tno, list[0].ano , adate);
}

//훈련기록 add
function side_Train_Add(ano){
	$.ajax('teamp/trainAdd.do', {
		type:'Post',
		data: {	ano: ano},
		success: function(result){
			if(result.status == 'success'){	
				var list = result.data;
				trainForm(list);
			}
		}
	});
}
//훈련기록 add
function side_Train_Update(ano){
	$.ajax('teamp/load_train.do', {
		type:'Post',
		data: {	ano: ano},
		success: function(result){
			if(result.status == 'success'){
				var list = result.data;
				trainForm(list);
				
			}
		}
	});
}

//== train view & update From
function trainForm(list){
	 $('#tables tr').remove();
	var table = $('#tables');
	table.append($("<tr>")
			.append($("<td>").text("학생이름"))
			.append($("<td>").text("평가종류"))
			.append($("<td>").text("평가항목"))
			.append($("<td>").text("매우낮음"))
			.append($("<td>").text("낮음"))
			.append($("<td>").text("보통"))
			.append($("<td>").text("높음"))
			.append($("<td>").text("매우높음"))
	);
	var rowsCountName=0;
	for(var i in list){
		if(list[i].tsno == list[0].tsno){
			rowsCountName++;
		}
	}
	var rowsCountElType1=0;
	for(var i=0 ; i<rowsCountName ; i++){
		if(list[i].eltype == list[0].eltype){
			rowsCountElType1++;
		}
	}
	var rowsCountElType2= rowsCountName - rowsCountElType1;
	
	for(var i =0 ; i < list.length ; i++){
	var tr=$("<tr>");
	//학생이름
	if(i == 0 ){
		tr
		.append($("<td>").css("border-bottom", "3px solid #709c20").attr("rowspan", rowsCountName)
				.append($("<span>").addClass("train_font").text(list[i].tsbackno+"번")).append('&nbsp;')
				.append($("<span>").addClass("train_font_name").text(list[i].tsname))
				.append($("<br>"))
				.append($("<img class='trainimg'>").attr("src","file/"+list[i].tsphoto)));
	}else if (list[i].tsno != list[i-1].tsno ){
		tr
		.append($("<td>").css("border-bottom", "3px solid #709c20").attr("rowspan", rowsCountName)
				.append($("<span>").addClass("train_font").text("No."+list[i].tsbackno)).append('&nbsp;')
				.append($("<span>").addClass("train_font_name").text(list[i].tsname))
				.append($("<br>"))
				.append($("<img class='trainimg'>").attr("src","file/"+list[i].tsphoto)));
	}
	//정량? 정성
	if((i % rowsCountName) <rowsCountElType1 && list[i].eltype == 0){
		if (i==0 ){
			tr
			.append($("<td>").attr("rowspan", rowsCountElType1).text("정량평가"));
		
		}else if (  list[i].tsno != list[i-1].tsno ){
			tr
			.append($("<td>").attr("rowspan", rowsCountElType1).text("정량평가"));
		};
	}else{
		 if (list[i].eltype != list[i-1].eltype ){
			tr
			.append($("<td>").css("border-bottom", "3px solid #709c20").attr("rowspan", rowsCountElType2).text("정성평가"));
		}
	}
		tr
		.append($('<td>').text(list[i].elname));
		
			if(list[i].rstatus==1){	
				
				
				if(list[i].escore ==0){
					tr
						.append($('<td>').append($('<input>').attr('type', 'radio').attr("name","radio"+i ).val("1").attr("elno",list[i].elno).attr("eno",list[i].eno).addClass("radioEval")))
						.append($('<td>').append($('<input>').attr('type', 'radio').attr("name","radio"+i ).val("2").attr("elno",list[i].elno).attr("eno",list[i].eno).addClass("radioEval")))
						.append($('<td>').append($('<input>').attr('type', 'radio').attr("name","radio"+i ).val("3").attr("elno",list[i].elno).attr("eno",list[i].eno).addClass("radioEval")))
						.append($('<td>').append($('<input>').attr('type', 'radio').attr("name","radio"+i ).val("4").attr("elno",list[i].elno).attr("eno",list[i].eno).addClass("radioEval")))
						.append($('<td>').append($('<input>').attr('type', 'radio').attr("name","radio"+i ).val("5").attr("elno",list[i].elno).attr("eno",list[i].eno).addClass("radioEval")))
					.appendTo(table);	
				} else if(list[i].escore ==1){
					tr
						.append($('<td>').append($('<input>').attr('type', 'radio').attr("name","radio"+i ).val("1").attr("checked", true).attr("elno",list[i].elno).attr("eno",list[i].eno)))
						.append($('<td>').append($('<input>').attr('type', 'radio').attr("name","radio"+i ).val("2").attr("elno",list[i].elno).attr("eno",list[i].eno)))
						.append($('<td>').append($('<input>').attr('type', 'radio').attr("name","radio"+i ).val("3").attr("elno",list[i].elno).attr("eno",list[i].eno)))
						.append($('<td>').append($('<input>').attr('type', 'radio').attr("name","radio"+i ).val("4").attr("elno",list[i].elno).attr("eno",list[i].eno)))
						.append($('<td>').append($('<input>').attr('type', 'radio').attr("name","radio"+i ).val("5").attr("elno",list[i].elno).attr("eno",list[i].eno)))
					.appendTo(table);	
				} else if(list[i].escore ==2){
					tr
						.append($('<td>').append($('<input>').attr('type', 'radio').attr("name","radio"+i ).val("1").attr("elno",list[i].elno).attr("eno",list[i].eno)))
						.append($('<td>').append($('<input>').attr('type', 'radio').attr("name","radio"+i ).val("2").attr("checked", true).attr("elno",list[i].elno).attr("eno",list[i].eno)))
						.append($('<td>').append($('<input>').attr('type', 'radio').attr("name","radio"+i ).val("3").attr("elno",list[i].elno).attr("eno",list[i].eno)))
						.append($('<td>').append($('<input>').attr('type', 'radio').attr("name","radio"+i ).val("4").attr("elno",list[i].elno).attr("eno",list[i].eno)))
						.append($('<td>').append($('<input>').attr('type', 'radio').attr("name","radio"+i ).val("5").attr("elno",list[i].elno).attr("eno",list[i].eno)))
					.appendTo(table);	
				}  else if(list[i].escore ==3){
					tr
						.append($('<td>').append($('<input>').attr('type', 'radio').attr("name","radio"+i ).val("1").attr("elno",list[i].elno).attr("eno",list[i].eno)))
						.append($('<td>').append($('<input>').attr('type', 'radio').attr("name","radio"+i ).val("2").attr("elno",list[i].elno).attr("eno",list[i].eno)))
						.append($('<td>').append($('<input>').attr('type', 'radio').attr("name","radio"+i ).val("3").attr("checked", true).attr("elno",list[i].elno).attr("eno",list[i].eno)))
						.append($('<td>').append($('<input>').attr('type', 'radio').attr("name","radio"+i ).val("4").attr("elno",list[i].elno).attr("eno",list[i].eno)))
						.append($('<td>').append($('<input>').attr('type', 'radio').attr("name","radio"+i ).val("5").attr("elno",list[i].elno).attr("eno",list[i].eno)))
					.appendTo(table);		
				}  else if(list[i].escore ==4){
					tr
						.append($('<td>').append($('<input>').attr('type', 'radio').attr("name","radio"+i ).val("1").attr("elno",list[i].elno).attr("eno",list[i].eno)))
						.append($('<td>').append($('<input>').attr('type', 'radio').attr("name","radio"+i ).val("2").attr("elno",list[i].elno).attr("eno",list[i].eno)))
						.append($('<td>').append($('<input>').attr('type', 'radio').attr("name","radio"+i ).val("3").attr("elno",list[i].elno).attr("eno",list[i].eno)))
						.append($('<td>').append($('<input>').attr('type', 'radio').attr("name","radio"+i ).val("4").attr("checked", true).attr("elno",list[i].elno).attr("eno",list[i].eno)))
						.append($('<td>').append($('<input>').attr('type', 'radio').attr("name","radio"+i ).val("5").attr("elno",list[i].elno).attr("eno",list[i].eno)))
					.appendTo(table);		
				} else if(list[i].escore ==5){
					tr
						.append($('<td>').append($('<input>').attr('type', 'radio').attr("name","radio"+i ).val("1").attr("elno",list[i].elno).attr("eno",list[i].eno)))
						.append($('<td>').append($('<input>').attr('type', 'radio').attr("name","radio"+i ).val("2").attr("elno",list[i].elno).attr("eno",list[i].eno)))
						.append($('<td>').append($('<input>').attr('type', 'radio').attr("name","radio"+i ).val("3").attr("elno",list[i].elno).attr("eno",list[i].eno)))
						.append($('<td>').append($('<input>').attr('type', 'radio').attr("name","radio"+i ).val("4").attr("elno",list[i].elno).attr("eno",list[i].eno)))
						.append($('<td>').append($('<input>').attr('type', 'radio').attr("name","radio"+i ).val("5").attr("checked", true).attr("elno",list[i].elno).attr("eno",list[i].eno)))
					.appendTo(table);		
				}
				
			
			}	

		
		
	}
	var ct=1;
	var tabletr = $("#tables tr");
	for(var i =1 ;i < tabletr.length; i++ ){
		if( ct == rowsCountName ){
			tabletr[i].style.borderBottom =  "3px solid #709c20";
			ct=1;
		}else{
			ct++;
		} 
	}
	sidebarOpen(tno, list[0].ano , adate);
	$("#btnEvalUpdate").attr("ano",list[0].ano);
	}

function savedata(a){
	ck=a;
}

function header_manager(){
		
		$(".eval_m").text(ck.adate.split("-")[1]+"월");
		$(".eval_d").text(ck.adate.split("-")[2]+"일");
		$(".eval_y").text(ck.adate.split("-")[0]+"년");
		$('.span_tname').find("*").remove();
		$('.span_tname').append($("<span>").addClass("check_tname").text(ck.tname))
						.append($("<span>").addClass("check_tnmae1").text("팀의 활동중입니다."));
}

function side_Game_Add(ano){
	$.ajax('teamgame/addGame.do', {
		type:'Post',
		data: {	ano: ano},
		success: function(result){
			if(result.status == 'success'){
				var game = result.data;
				$("#game_page").css('display','');
				game_page(ano ,game);
				$("#btnUpdateGame").attr("ano",ano).attr("gno",game.gno);
				sidebarOpen(tno, ano , game.adate);
			}else{
				alert("경기기록리스트를 생성하지못함");
			}
			
		}
	});
}
function side_Game_Update(ano){
	$.ajax('teamgame/getGame.do', {
		type:'Post',
		data: {	ano: ano},
		success: function(result){
			if(result.status == 'success'){
				var game = result.data;
				$("#game_page").css('display','');
				game_page(ano,game);
				$("#btnUpdateGame").attr("ano",ano).attr("gno",game.gno);
				sidebarOpen(tno, ano , game.adate);
			}else{
				alert("경기기록리스트를 생성하지못함");
			}
		}
	});
}

function game_page(ano, game){
	var gamePoint = game.gamePoint;
	 $("#gplace").val(game.gplace);
	 $("#gtitle").val(game.gtitle);
	 $("#gstart").val(game.gstart);
	 $("#gend").val(game.gend);
	 $("#gsh").val(game.gsh);
	 $("#gse").val(game.gse);
	 $("#gsb").val(game.gsb);
	 $("#geh").val(game.geh);
	 $("#gee").val(game.gee);
	 $("#geb").val(game.geb);
	 $("#gdet").val(game.gdet);
	 $("#getc").val(game.getc);
	 
	 if(gamePoint != null){
		 var gs_score = $(".startScore");
		 var ge_score = $(".endScore");

		 for(var i = 0; i<gamePoint.length;i++){
			 
			 if(gamePoint[i].gpspoint==999){
				 gs_score[i].value='';
			 }else{
				 gs_score[i].value=gamePoint[i].gpspoint;
			 }
			 if(gamePoint[i].gpepoint==999){
				 ge_score[i].value='';
			 }else{
				 ge_score[i].value=gamePoint[i].gpepoint;
			 }	 
			 
			 
			 
		 }
	 }else{
	 }
	
}






