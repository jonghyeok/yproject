var currPageNo;
var team_address;
var teamlist = null;
function admin_onload(){
	
	hideContent();
	$("#frepare").css("display","");
	var tno_update=0;
	var tsno_update=0;
	var current_fs, next_fs, previous_fs; //fieldsets
	var left, opacity, scale; //fieldset properties which we will animate
	var animating; //flag to prevent quick multi-click glitches
// team add animation
	
	
	
	
	
	$("#admin_search_btn").on("click",function(){
		var text = $("#txtFilter").val();
		if(text !=""){
			$(".demo").css("display","none");
			$.ajax("member/listSearch.do?text=" + text, {
				type:'GET',
				success: function(result){
					if(result.status == 'success'){					
						var list = result.data;
					
						$("#table tbody").find("tr:gt(0)").remove();
						for(var i=0 ; i < list.length; i++){
							$(".tmTr").clone().css("display","").attr("memberid",list[i].id).attr("email",list[i].email).attr("name",list[i].name).attr("class","tmTr"+i).appendTo("#table tbody");
							$(".tmTr"+i).find("td:eq(0)").text(list[i].name);
							$(".tmTr"+i).find("td:eq(1)").attr("class","levelid"+i).text(list[i].id);
							$(".tmTr"+i).find("td:eq(2)").text(list[i].email);
							if(list[i].level == 0){
							$(".tmTr"+i).find("#sel0").attr("selected",true);
							}else if(list[i].level == 1){
							$(".tmTr"+i).find("#sel1").attr("selected",true);
							}else if(list[i].level == 2){
							$(".tmTr"+i).find("#sel2").attr("selected",true);
							$(".tmTr"+i).find(".tmlist").css("display","");
							}else if(list[i].level == 3){
							$(".tmTr"+i).find("#sel3").attr("selected",true);
							$(".tmTr"+i).find(".tmlist").css("display","");
							}else if(list[i].level == 9){
							$(".tmTr"+i).find("#sel9").attr("selected",true);
							}
							for(var j = 0; j< teamlist.length; j++){
							
							if(teamlist[j].tuse == 1){
								var select = $(".tmTr"+i).find(".tmlist");	
								
								console.log(list[i].tno +"===="+ teamlist[j].tno );
								
								if(list[i].tno == teamlist[j].tno){
									$("<option>").attr("selected",true).attr("value",teamlist[j].tno).text(teamlist[j].tname).appendTo(select);
								}else{
									$("<option>").attr("value",teamlist[j].tno).text(teamlist[j].tname).appendTo(select);
								};
							};
							};
						}
					};
									
					}
				});
		}
	})
	
	
	
	
	/* 
	Orginal Page: http://thecodeplayer.com/walkthrough/jquery-multi-step-form-with-progress-bar 

	*/
	
	
	//jQuery time

	$(".admin_next").click(function(){
		if(animating) return false;
		animating = true;
		
		current_fs = $(this).parent();
		next_fs = $(this).parent().next();
	
		//activate next step on progressbar using the index of next_fs
		$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("admin_pb");
		
		//show the next fieldset
		next_fs.show(); 
		//hide the current fieldset with style
		current_fs.animate({opacity: 0}, {
			step: function(now, mx) {
				console.log(now);
				//as the opacity of current_fs reduces to 0 - stored in "now"
				//1. scale current_fs down to 80%
				scale = 1 - (1 - now) * 0.2;
				//2. bring next_fs from the right(50%)
				left = (now * 50)+"%";
				//3. increase opacity of next_fs to 1 as it moves in
				opacity = 1 - now;
				//current_fs.css({'transform': 'scale('+scale+')'});
				current_fs.css({'transform': 'scale('+1+')'});
				next_fs.css({'left': left, 'opacity': opacity});
			}, 
			duration: 800, 
			complete: function(){
				current_fs.hide();
				animating = false;
			}, 
			//this comes from the custom easing plugin
			easing: 'easeInOutBack'
		});
	});

	$(".admin_previous").click(function(){
		if(animating) return false;
		animating = true;
		
		current_fs = $(this).parent();
		previous_fs = $(this).parent().prev();
		
		//de-activate current step on progressbar
		$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("admin_pb");
		
		//show the previous fieldset
		previous_fs.show(); 
		//hide the current fieldset with style
		current_fs.animate({opacity: 0}, {
			step: function(now, mx) {
				//as the opacity of current_fs reduces to 0 - stored in "now"
				//1. scale previous_fs from 80% to 100%
				scale = 0.8 + (1 - now) * 0.2;
				//2. take current_fs to the right(50%) - from 0%
				left = ((1-now) * 50)+"%";
				//3. increase opacity of previous_fs to 1 as it moves in
				opacity = 1 - now;
				current_fs.css({'left': left});
				previous_fs.css({'transform': 'scale('+1+')', 'opacity': opacity});
				//previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
			}, 
			duration: 800, 
			complete: function(){
				current_fs.hide();
				animating = false;
			}, 
			//this comes from the custom easing plugin
			easing: 'easeInOutBack'
		});
	});
	/////////////////////////////////////////////////////////////////
	
	$(".admin_other_team").on("click",function(){
		$("#sidebarUl").children("*").removeClass("manager_current");
		$("#menu_teamManagement").addClass("manager_current");
		hideContent();
		$(".teamManagement").css("display", "");
		$("form").each(function() {  
			this.reset();  
		});  
		teamlists();	
	});
	
	
	
	
	$("#txtFilter").on("keypressed" , function(){
		$('#txtFilter').val("");
	});
	
	
	
	
	$("#SearchCancel").on("click" , function(){
		$('#txtFilter').val("");
		$(".demo").css("display","");
		checkCount();
	});
	
	
	
	$("#btn_Student_Delete").on("click",function(){
		
		var a = confirm("정말 삭제하시겠습니까??");
		
		console.log(a);
		
		if (a == true){    //확인
			$.post("manager2/deletestudent.do",{
				tsno : tsno_update,
				tno : $("#student_tno").val()
			},	
			function(result) {
				if(result.status == "success") {
					alert('삭제성공하였습니다');
					 tslist_admin(tno_update);
				} else {
					alert("실행중 오류발생!");
					console.log(result.data);
				}
			},
			"json");
		}
	});
	
	
	// 팀 멤버 업데이트 버튼 클릭 function!!!!
	$("#btn_Student_Update").on("click", function(){
		alert("정보변경 누름");
		alert($("#student_ts_grad").val());
		console.log($("#student_ts_grad").val());
		if($("#student_ts_grad").val() === "" || $("#student_ts_grad").val() === undefined ){
			$('#student_form').ajaxForm({
				url : "manager2/teamStudentUpdate.do",
				data :{
					tsno: tsno_update,
					tsname: $("#student_name").val(),
					tsphone: $("#student_phone").val(),
					tsemail: $("#student_email").val(),
					tsfam1: $("#family_select_one").val(),
					tsfam2: $("#family_select_two").val(),
					tsfam3: $("#family_select_three").val(),
					tsfam_f: $("#tsdad").val(),
					tsfam_m: $("#tsmom").val(),
					tsbirth: $("#student_ts_birth").val(),
					tshobby: $("#student_ts_hobby").val(),
					tsbackno: $("#student_ts_backno").val(),
					tsstatus :  1,
					tno		: $("#student_tno").val(),
					tsprophone: $("#student_ts_prophone").val(),
					tsother: $("#student_ts_other").val()
				},
				type : 'post',
				dataType : 'json',
				success : function() {
					alert('멤버 업데이트 & 학생정보추가 성공');
					 tslist_admin(tno_update);
					 if(event.preventDefault){ event.preventDefault();}
					 else{event.returnValue = false;}
				},
				error : function(xhr, status, error){
					if(event.preventDefault){ event.preventDefault();}
					 else{event.returnValue = false;}
					console.log(error);
					console.log(status);
					console.log(xhr);
				}
				
			});
		}
		else{$('#student_form').ajaxForm({
			url : "manager2/teamStudentUpdate.do",
			data :{
				tsno: tsno_update,
				tsname: $("#student_name").val(),
				tsphone: $("#student_phone").val(),
				tsemail: $("#student_email").val(),
				tsfam1: $("#family_select_one").val(),
				tsfam2: $("#family_select_two").val(),
				tsfam3: $("#family_select_three").val(),
				tsfam_f: $("#tsdad").val(),
				tsfam_m: $("#tsmom").val(),
				tsbirth: $("#student_ts_birth").val(),
				tshobby: $("#student_ts_hobby").val(),
				tsbackno: $("#student_ts_backno").val(),
				tsgrad: $("#student_ts_grad").val(),
				tsstatus :  1,
				tno		: $("#student_tno").val(),
				tsprophone: $("#student_ts_prophone").val(),
				tsother: $("#student_ts_other").val()
			},
			type : 'post',
			dataType : 'json',
			success : function() {
				alert('멤버 업데이트 & 학생정보추가 성공');
				 tslist_admin(tno_update);
				 if(event.preventDefault){ event.preventDefault();}
				 else{event.returnValue = false;}
			},
			error : function(xhr, status, error){
				if(event.preventDefault){ event.preventDefault();}
				 else{event.returnValue = false;}
				console.log(error);
				console.log(status);
				console.log(xhr);
			}
			
		});
		}

	});

	// 신규멤버 추가 btn  
	$("#btn_New_Student_Add").on("click",  function() {
		var bno = $("#student_ts_backno").val();
		
		if($("#student_name").val() === '' ){
			alert("*이름을 입력하세요!!!");
			$("#student_name").focus();
			return false;
		}else if($("#student_phone").val() === '' ){
			alert("*전화번호을 입력하세요!!!");
			$("#student_phone").focus();	
			return false;
		}else if($("#student_email").val() === '' ){
			alert("*이메일을 입력하세요!!!");
			$("#student_email").focus();	
			return false;
		}else if($("#student_ts_birth").val() === '' ){
			alert("*생일을 입력하세요!!!");
			$("#student_ts_birth").focus();	
			return false;
		
		}else if($("#student_ts_backno").val() === '' ){
			alert("*등넘버을 입력하세요!!!");
			$("#student_ts_backno").focus();	
			return false;
		}else if(isNaN(parseInt(bno))){
			alert("*등넘버에 숫자를 입력하세요!!!");
			$("#student_ts_backno").focus();	
			return false;
		}
		
		$('#student_form').ajaxForm({
			url : "manager2/newStudentadd.do",
			data :{
				tno : tno_update,
				tsname: $("#student_name").val(),
				tsphone:$("#student_phone").val(),
				tsemail:$("#student_email").val(),
				tsfam1: $("#family_select_one").val(),
				tsfam2: $("#family_select_two").val(),
				tsfam3: $("#family_select_three").val(),
				tsdad: $("tsfam_f").val(),
				tsmom: $("tsfam_m").val(),
				tsbirth: $("#student_ts_birth").val(),
				tshobby: $("#student_ts_hobby").val(),
				tsbackno: $("#student_ts_backno").val(),
				tsstatus: 1,
			},
			type : 'post',
			dataType : 'json',
			success : function() {
				alert('학생추가 성공');
				$("form").each(function() {  
					this.reset();  
				});  
				tslist_admin(tno_update);
			}
		});

		
	});
	

//	************등급 업데이트 부분
	$("#levelChange").on('click',function(){
		$("#sidebarUl").children("*").removeClass("manager_current");
		$("#levelChange").addClass("manager_current");
		hideContent();
		$(".tableForm").css("display", "");

		checkCount();
	});
	$("#c-sponsor").on('click',function(){
		$("#sidebarUl").children("*").removeClass("manager_current");
		$("#c-sponsor").addClass("manager_current");
		hideContent();
		$(".sponserPage").css("display", "");
		$("#sponser").css("display", "");
		$("#sponser_serch_file").css("display", "");
		$("#sponser_setup").css("display","");
		$("#sponser_sms").css("display", "");
		$("#sponser_update_user").css("display", "");

		checkCount();
	});
	

	$('#btnLevelChange').on('click', function() {
		admin_levelChange_btn_click();
	});
	//멤버 검색할경우 in  등급관리 //페이징처리된곳에서
	$("#btn_MemberSearch1").on('click', function(){

		$('.memberSearch').css('display', '');
		admin_levelChange_btn_Search();
	});


//	************팀 관리 부분
	//sidebar 팀관리 클릭.			
	$('#menu_teamManagement').on('click', function(){
		
		$("#sidebarUl").children("*").removeClass("manager_current");
		$("#menu_teamManagement").addClass("manager_current");
		hideContent();
		$(".teamManagement").css("display", "");
		$("form").each(function() {  
			this.reset();  
		});  
		teamlists();			
	});


	//팀 추가메뉴 클릭.
	$('#icon_teamAdd').on('click', function() {
		$(".admin_pb").removeClass("admin_pb");
		$("#progressbar li").eq($("fieldset").index(0)).prev(0).addClass("admin_pb");

		$('form').each(function() {  
			this.reset();  
		}); 
		
		$('.tkImg').attr("src","a-admin/nophoto.png");
		$('.teamImg').attr("src","a-admin/nophoto.png");
		
		
		$("#team_add_div").css("display","");
		$("#team_up_div").css("display","none");
		$("#btnTeamUpdate").css("display","none");
		$("#sidebarUl").children("*").removeClass("manager_current");
		$("#icon_teamAdd").addClass("manager_current");
		hideContent();
		// 팀, 감독 파일찾기 버튼 on
		$("#team_image").css("display","");
		$("#tk_image").css("display","");
		$(".teamAdd").css("display", "");
		$("#btnTeamAdd").css("display", "");
		$("#btnTeamPhoto").css("display","none");
		$("#btnTkPhoto").css("display","none");
		$("#team_head_update").css("display","none");
		
		$(".teamAdd fieldset").hide();
		
		$(".teamAdd fieldset:first").css({'left': "0%", 'opacity': 1});
		$(".teamAdd fieldset:first").css({'transform': 'scale('+1+')'});
		$(".teamAdd fieldset:first").show();
//		$(".teamAdd fieldset").each(function(index, item){
//			console.log(index);
//			console.log(item);
//		});
//		
	});

	$('#content').on('click', '.teamManagement .twitter', function() {
		tno_del = $(this).attr('data-del-no');
		if (confirm("정말 삭제하시겠습니까??") == true){    //확인
			$.post("team/deleteteam.do",{
				tno : tno_del
			},	
			function(result) {
				if(result.status == "success") {
					alert('삭제성공하였습니다');
					teamlists();
					//$("#view").trigger("projectChanged");
				} else {
					alert("실행중 오류발생!");
					console.log(result.data);
				}
			},
			"json");
		}else{   //취소
			return;
		}


		/*$( "#team_del" ).dialog( "open" );*/

	});

	//리시트에서 평가항목 변경 누를때
	$("#icon_Eval").on("click", function(){
		$("#sidebarUl").children("*").removeClass("manager_current");
		$("#icon_Eval").addClass("manager_current");
		hideContent();
		$("#evalList").css("display","");
		evalList();
		
	});

	//항목 추가
	$("#btnEvalAdd").on("click", function(){
		evalAdd();
	});
	$(".evaltable").on("click", ".btnEvalUpdate", function(){

		var elno = $(this).attr("data-eval");
		var elname = $(this).parents(".evalTr").find(".elname").text();
		var eltype =  $(this).parents(".evalTr").find(".eltype").val();
		var euse = $(this).parents(".evalTr").find(".euse").val();
		evalUpdate(elno,elname,eltype,euse);
	});
	$("#btnEvalBack").on("click", function(){
		$("#evalList").css("display","none");
		$(".teamManagement").css("display","");

	});

	/*
	$( ".ui-corner-all" ).mouseup(function() {
		$("#search").val($("#id_addr"));
		});
	 */

	$( "#id_addr_remain" ).on("focusout",(function() {
		$("#search").val($("#id_addr").val());
	}));


	$("#team_del").dialog({
		autoOpen:false,
		show:{
			effect:"bliend",
			duration:1000
		},
		hide:{
			effect:"explode",
			duration:1000
		}
	});


	//팀 멤버 아이콘 클릭 .
	$('#content').on('click', '.member_add', function() {
		$(".tsImg").attr("src","a-admin/nophoto.png");
		hideContent();
		$("#btn_New_Student_Add").css("display", "");
		$("#manager_memberAdd").css("display", "");
		$("#btn_Student_Update").css("display","none");
		$("#btn_Student_Delete").css("display","none");
		$(".tslist_btn_before").remove();
		tno_update = $(this).attr('data-no');
		tslist_admin(tno_update);
	});

	function tslist_admin(tno_update){
		$.getJSON("manager2/teamstudentlist.do?tno=" + tno_update,function(result){
			if(result.status == "success"){
				$(".adminsel").remove();
				var tslist = result.data;
				var div = $("#memberlist_div");
				for (var i = 0; i < tslist.length; i++) {
					console.log(tslist);
					if( tslist[i].tsgrad != null){
						div.append($("<div>").addClass("adminsel  admineven ts_grad").addClass("tslist_no_a"+i)
								.append($("<p>").addClass("adminStP zxcf")
								.append($("<span>").addClass("stNo adminStNo").text(tslist[i].tsbackno)))
								.append($("<img>").addClass("adminStImg adminStImg_nophoto"+i).attr("src",'file/' + tslist[i].tsphoto))
							   	.attr('student_photo' , 'file/' + tslist[i].tsphoto)
								.attr("student_tstno",tslist[i].tsno)
								.attr("studentname",tslist[i].tsname)
								.attr("studentphone",tslist[i].tsphone)
								.attr("studentdetaddr",tslist[i].tsaddr)
								.attr("studentemail",tslist[i].tsemail)
								.attr("studenttno",tslist[i].tno)
								.attr("student_fam1",tslist[i].tsfam1)
								.attr("student_fam2",tslist[i].tsfam2)
								.attr("student_fam3",tslist[i].tsfam3)
								.attr("student_t_name",tslist[i].tname)
								.attr("student_tsbackno",tslist[i].tsbackno)
								.attr("student_tsstatus",tslist[i].tsstatus)
								.attr("student_tsgrad",tslist[i].tsgrad)
								.attr("student_tsbirth",tslist[i].tsbirth)
								.attr("student_tshobby",tslist[i].tshobby)
								.attr("student_tsprophone",tslist[i].tsprophone)
								.attr("student_tsother",tslist[i].tsother)
								.append($("<p>").addClass("stName zxcf").text(tslist[i].tsname)));
					}
					else{
						div.append($("<div>").addClass("adminsel adminSt admineven").addClass("tslist_no_a"+i)
							.append($("<p>").addClass("adminStP zxcf")
							.append($("<span>").addClass("stNo adminStNo").text(tslist[i].tsbackno)))
							.append($("<img>").addClass("adminStImg adminStImg_nophoto"+i).attr("src",'file/' + tslist[i].tsphoto))
						   	.attr('student_photo' , 'file/' + tslist[i].tsphoto)
							.attr("student_tstno",tslist[i].tsno)
							.attr("studentname",tslist[i].tsname)
							.attr("studentphone",tslist[i].tsphone)
							.attr("studentdetaddr",tslist[i].tsaddr)
							.attr("studentemail",tslist[i].tsemail)
							.attr("studenttno",tslist[i].tno)
							.attr("student_fam1",tslist[i].tsfam1)
							.attr("student_fam2",tslist[i].tsfam2)
							.attr("student_fam3",tslist[i].tsfam3)
							.attr("student_t_name",tslist[i].tname)
							.attr("student_tsbackno",tslist[i].tsbackno)
							.attr("student_tsstatus",tslist[i].tsstatus)
							.attr("student_tsgrad",tslist[i].tsgrad)
							.attr("student_tsbirth",tslist[i].tsbirth)
							.attr("student_tshobby",tslist[i].tshobby)
							.attr("student_tsprophone",tslist[i].tsprophone)
							.attr("student_tsother",tslist[i].tsother)
							.append($("<p>").addClass("stName zxcf").text(tslist[i].tsname)));
					}
					if(tslist[i].tsstatus===0){
						$(".tslist_no_a"+i).hide();
					}
					if($(".adminStImg_nophoto"+i).attr("src") == "file/null"){
						$(".adminStImg_nophoto"+i).attr("src","a-admin/nophoto.png");
					}
				}

			}else{
				alert("멤버 리스트 로드 실패!");
			}
		});
}
	
	$(".adminSt").hover(
			  function() {
				  $( this ).css("opacity","0.6");
				
			  }, function() {
				  $( this ).css("opacity","1");
			  }
			);	

	
//학생정보 보기
	$("#memberlist_div").on("click", ".adminsel" ,function() {
		
		
		if ( !( $(this).hasClass('stselectAfter') ) ) { 
			
			
			if ( !( $(this).children(".stName").hasClass('stNameAfter') ) ) { 
				// Remove any 'clicked' classes if there are any			
				$('.stNameAfter').removeClass('stNameAfter');
			} 
					// Remove any 'clicked' classes if there are any			
					$('.stselectAfter').removeClass('stselectAfter');
	
					// Add 'clicked' class to the button that was clicked
					$(this).addClass("stselectAfter");
					$(this).children(".stName").addClass("stNameAfter");
		} 
		
		$("#btn_New_Student_Add").css("display","none");
		$("#btn_Student_Update").css("display","");
		$("#btn_Student_Delete").css("display","");
		
		 $( this ).effect( "slide", 500 );
	
		tsno_update =$(this).attr('student_tstno');
	
		$('.tsImg').attr('src',$(this).attr("student_photo"));
		$('#student_tsno').val($(this).attr("student_tstno"));
		$('#student_name').val($(this).attr("studentname"));
		$('#student_phone').val($(this).attr("studentphone"));
		$('#student_email').val($(this).attr("studentemail"));
		$('#family_select_one').val($(this).attr("student_fam1"));
		$('#family_select_two').val($(this).attr("student_fam2"));
		$('#family_select_three').val($(this).attr("student_fam3"));
		$('#student_tno').val($(this).attr("studenttno"));
		$('#student_t_name').val($(this).attr("student_t_name"));
		$('#student_ts_backno').val($(this).attr("student_tsbackno"));
		$('#student_ts_birth').val($(this).attr("student_tsbirth"));
		$('#student_ts_status').val($(this).attr("student_tsstatus"));
		$('#student_ts_grad').val($(this).attr("student_tsgrad"));
		$('#student_ts_hobby').val($(this).attr("student_tshobby"));
		$('#student_ts_prophone').val($(this).attr("student_tsprophone"));
		$('#student_ts_other').val($(this).attr("student_tsother"));
	});
	

	// 취소버튼 ~~ 
	$("#btn_Student_Reset").on("click",function(){
		$(".tsImg").attr("src","a-admin/nophoto.png");
		$("#btn_New_Student_Add").css("display","");
		$("#btn_Student_Update").css("display","none");
		$("#btn_Student_Delete").css("display","none");
		$('#student_tsno').val("");
		$('#student_name').val("");
		$('#student_phone').val("");
		/*$('#student_detaddr').val($(this).attr("studentdetaddr"));*/
		$('#student_email').val("");
		$('#student_tno').val("");
		$('#student_ts_name').val("");
		$('#student_ts_backno').val("");
		$('#student_ts_birth').val("");
		$('#student_ts_status').val("");
		$('#student_ts_grad').val("");
		$('#student_ts_hobby').val("");
		$('#student_ts_prophone').val("");
		$('#student_ts_other').val("");
		$("#btn_New_Student_Add").attr("disabled",false);
		$("#btn_New_Student_Add").removeClass("btnblock");
		$('.stNameAfter').removeClass('stNameAfter');
		$('.stselectAfter').removeClass('stselectAfter');
	})	;


	//팀변경 아이콘 클릭.(팀변경 버튼 admin.js에 있음)
	$('#content').on('click', '.facebook', function() {
		$(".admin_pb").removeClass("admin_pb");
		$("#progressbar li").eq($("fieldset").index(0)).prev(0).addClass("admin_pb");
		
	
		$("form").each(function() {  
			this.reset();  
		});  
		$('#team_up_div').css('display', '');
		$('#team_add_div').css('display', 'none');
		$('#btnTeamPhoto').css('display', '');	
		$('#team_image').css('display', 'none');	
		$('#tk_image').css('display', 'none');
		$('#btnTkPhoto').css('display', '');	
		hideContent();
		$('.tableForm').css('display', 'none');		
		$('.teamManagement').css('display', 'none');	
		$('.teamAdd').css('display', '');
		$('#team_head_add').css('display', 'none');
		$('#btnTeamAdd').css('display', 'none');
		$('#team_head_update').css('display', '');
		$('#btnTeamUpdate').css('display', '');
		tno_update=$(this).attr('data-no');
		teamView(tno_update);
		
		$(".teamAdd fieldset").hide();
		
		$(".teamAdd fieldset:first").css({ 'opacity': 1});
		$(".teamAdd fieldset:first").css({'transform': 'scale('+1+')'});
		$(".teamAdd fieldset:first").show();

	});

	$("#btnTeamUpdate").on("click",  function() {
		$.post("team/update.do", 
				{
			tno:tno_update,
			tname:  $("#tname").val(),
			tinfo: $("#tinfo").val(),
			tcoordx: $("#coordX").val(),
			tcoordy: $("#coordY").val(),
			tkname: $("#tkname").val(),
			tkinfo: $("#tkinfo").val(),
			taddress:$("#team_address_a").val(),
			/*	tdetaddress:$("#id_addr_remain").val(),*/
			tuse : $("#tuse").val()

				},

				function(result) {
					if(result.status == "success") {
						alert("팀 정보 변경성공");
						$('.tableForm').css('display', 'none');			
						$('.teamManagement').css('display', '');
						$('.teamAdd').css('display', 'none');
						teamlists();
						//this.teamView();
						//$("#view").trigger("projectChanged");
					} else {
						alert("실행중 오류발생!");
						console.log(result.data);
					}
				},
		"json");

	});
	
	
	//사진 변경
	$("#btnTeamPhotoAdd").on("click", function(){
		btnteamphoto();

	});
	function btnteamphoto(){
		//alert(tno_update)
		console.log($("#tphoto").val());
		$('#search').val("");
		$('#team_form_a').ajaxSubmit({
			url : "team/tphotoadd.do",
			data :{
				tno : tno_update,
				tphoto: $("#tphoto").val()
			},
			type : 'post',
			dataType : 'json',
			success : function() {
				alert('사진 올리기 추가 성공');
				$('#team_form_a').dialog('close');
			}
		});

	}
	$('#btnTeamPhoto').on('click',function(){
		$("#team_form_a").dialog('open');

	});

	$("#team_form_a").dialog({
		open: function () {

		},
		minWidth:500,
		maxWidth:500,
		minHeight:500,
		maxHeight:500,
		autoOpen: false,

		modal: true
	});		


	//감독사진 변경

	$("#btnTkPhotoAdd").on("click", function(){
		btntkphotos();
	});
	//감독사진 변경 function
	function btntkphotos(){
		console.log($("#tk_image_a").val());
		$('#search').val("");
		$('#tk_form_a').ajaxSubmit({
			url : "team/tkphotoadd.do",
			data :{
				tno : tno_update,
			},
			type : 'post',
			dataType : 'json',
			success : function() {
				alert('감독사진 변경 성공');
				
				$('#tk_form_a').dialog('close');
			}
		});

	}
	
	
	$('#btnTkPhoto').on('click',function(){
		$("#tk_form_a").dialog('open');

	});

	$("#tk_form_a").dialog({
		open: function () {

		},
		minWidth:500,
		maxWidth:500,
		minHeight:500,
		maxHeight:500,
		autoOpen: false,

		modal: true
	});		

	//팀추가버튼 클릭시.
	$("#btnTeamAdd").on("click",  function() {
		btnTeamAdd();
	});


	function btnTeamAdd(){
		$('#search').val("");
		if( $("#tkname").val()  === ''){
			alert("감독이름 입력하세요");
			return false;
		}else if($("#tname").val() === ''){
			alert("팀이름 입력하세요");
			return false;
		}
		$('#team_form').ajaxSubmit({
			url : "team/add.do",
			data :{
				tname: $("#tname").val(),
				tkname : $("#tkname").val() ,
				tkinfo : $("#tkinfo").val() ,	
				tinfo: $("#tinfo").val(),
				tcoordx: $("#coordX").val(),
				tcoordy: $("#coordY").val(),
				taddress: $("#team_address_a").val()
			},
			type : 'post',
			dataType : 'json',
			success : function() {
				alert('팀 추가 성공');
				$('.tableForm').css('display', 'none');		
				$('.teamManagement').css('display', '');	
				$('.teamAdd').css('display', 'none');
				teamlists();
			}
		});
	}
	
//버튼 바꾸기


//버튼

$( ".btnsearch" ).button({
	icons: {
		primary: "ui-icon-search"
	}
/*     text: false */
});


//$( ".btn-Change" ).button({
//	icons: {
//		primary: "ui-icon-gear"
//	}
///*     text: false */
//});


//$( ".btn-Add" ).button({
//	icons: {
//		primary: "ui-icon-plusthick"
//	}
///*     text: false */
//});



//$( ".btn-Back" ).button({
//	icons: {
//		primary: "ui-icon-arrowthick-1-w"
//	}
///*     text: false */
//});







$("#btn_team_kamdok_serch").on("click", function(){

	$("#kamdok_list li").remove();

	$("#kamdok_serch_call").css("display",'');

	var serchKey = $("#kamdok_serch_text").val();

	$.getJSON("member/serchKamdokId.do?name=" + serchKey, function(result) {
		if(result.status == "success") {
			var kamdokList = result.data;


			var kList = $("#kamdok_list");

			for (var i = 0; i < kamdokList.length; i++) {

				kList.append(
						$("<li>").append(
								$("<a>")
								.attr("href","#")
								.text(kamdokList[i].name+"("+kamdokList[i].id+")")
								.attr("kid",kamdokList[i].id)
								.addClass("klist_a")
						));
			}
		}});
});

$("#kamdok_list").on("click", '.klist_a', function() {

	$('#team_kamdok_serch').dialog('close');
	$('#tkid').val($(this).attr("kid"));

});







//*** tmap 부분
initialize();
$("#btnSearch").on("click",function(){
	if($("#search").val()==""){
		alert("검색어를 입력하세요");
		return false;
	}
	getRouteData();
	$("#map_div").hide();
	$("#locationList").show();
	//$("#admin_map_address").dialog("open");
});


//*******************  sponser 스크립트 부분
$("#btnsponserAdd").on("click",function(){
	upload_sponserfile();
});

///var kouniWeek = (&#32321;&#39636;&#20013;&#25991;)

$.datepicker.regional['ko'] = {
		closeText: '닫기',
		prevText: '이전달',
		nextText: '다음달',
		currentText: '今天',
		monthNames: ['1월','2월','3월','4월','5월','6월',
		'7월','8월','9월','10월','11월','12월'],
		monthNamesShort: ['1월','2월','3월','4월','5월','6월',
		'7월','8월','9월','10월','11월','12월'],
		dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
		dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
		dayNamesMin: ['일','월','화','수','목','금','토'],
		weekHeader: '周',
		dateFormat: 'yy-mm-dd',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: true,
		yearSuffix: '년'};
	$.datepicker.setDefaults($.datepicker.regional['ko']);



$( "#spcstart_serch" ).datepicker({
    defaultDate: "+1w",
    changeMonth: false,
    changeYear: false,
    numberOfMonths: 1,
    onClose: function( selectedDate ) {
      $( "#spcend_serch" ).datepicker( "option", "minDate", selectedDate );
      $( "#spcstart_serch" ).datepicker( $.datepicker.regional[ "cal-korea-x " ] );
      $( "#spcstart_serch" ).datepicker( "option", "dateFormat", "yy-mm-dd" );
      $( "#spcstart_serch" ).datepicker( "option", $.datepicker.regional["cal-korea-x "] );
    }
  });
  $( "#spcend_serch" ).datepicker({
    defaultDate: "+1w",
    changeMonth: false,
    changeYear: false,
    numberOfMonths: 1,
    onClose: function( selectedDate ) {
      $( "#spcstart_serch" ).datepicker( "option", "maxDate", selectedDate );
      $( "#spcstart_serch" ).datepicker( $.datepicker.regional[ "cal-korea-x " ] );
      $( "#spcend_serch" ).datepicker( "option", "dateFormat", "yy-mm-dd" );
      $( "#spcend_serch" ).datepicker( "option", $.datepicker.regional["cal-korea-x "] );
    }
  });
  
  $("#btnsponser_serch").on("click",function(){
	  sponser_find();
  });


  $("#btnsponser_get_xlsfile").on("click",function(){

		$.ajax("sponser/getsponserxlsfile.do", {
			type: "POST",
			dataType: "json",
			success: function(result) {
				if(result.status == "success") {
					
					console.log(result.data);
					
				window.location = result.data;
				} else {
					alert("생성중 오류발생!");
					console.log(result);
				}
			}
		});
	  
	  
  });
  
}


//*********sponser function*******************

function upload_sponserfile(){
	$('#sponser_addForm').ajaxSubmit({
		url : 'sponser/addsponser.do',
		data : {
			
			sponserfile : $("#sponser_xlsfile").val(),
			
		},
		type : 'post',
		dataType : 'json',
		success : function(result) {
			
			
			var status = result.status;
			
			console.log(status);
			
			if(status == "heightexcel"){
				alert("현재 excel은 97~2003 통합문서만  지원 가능합니다.");
			}
			if(status == "notype"){
				alert("excel 파일만 지원 가능합니다.");
			}

			if(status == "success"){
				alert("파일이 정상적으로 등록되었습니다!");
				$("#sponser_add_result").css("display","");
				
				
				var sponser_add_data = result.data;
				
				$("#sponser_add_result_no").text(sponser_add_data.length);
				
				$('#sponser_add_result_table tr').remove();
				
				var table = $('#sponser_add_result_table');
				table.append($("<tr>")
						.append($("<td>").text("번호"))
						.append($("<td>").text("입금날짜"))
						.append($("<td>").text("입금명"))
						.append($("<td>").text("입금금액"))
						.append($("<td>").text("입금장소"))
				);
				
				for(var i=0;i<sponser_add_data.length;i++){
						var table = $('#sponser_add_result_table');
						table.append($("<tr>")
								.append($("<td>").text(i+1))
								.append($("<td>").text(sponser_add_data[i].spddate))
								.append($("<td>").text(sponser_add_data[i].spdname))
								.append($("<td>").text(sponser_add_data[i].spdincome))
								.append($("<td>").text(sponser_add_data[i].spdwhere))
						);
					
							 
				}
			
			
			}
			
			if(status == "failsetdefaultdata"){
				alert("현재 문서는 지원되지 않는 양식의 문서입니다. \n 관리자에게 문의하세요.");
			}
			
			if(status == "nohaveapp"){
				alert("현재 서버에 해당 파일을 지원하는 파일이 없습니다. \n 관리자에게 문의하세요.");
			}
			
			if(status == "noupdate"){
				alert("해당 파일은 이미 처리가 되었습니다. \n 결과 : 추가된 데이터가 없습니다.");
			}
			
			
			
			
		}
	});

}

function sponser_find(){
	$.post("sponser/sponserfind.do", 				
			{
		spcstart_string : $("#spcstart_serch").val(),
		
		spcend_string : $("#spcend_serch").val(),
		
		spdname : $("#spdname_serch").val(),
		
		spcname : $("#spcname_serch").val()

			},
			function(result) {
				if(result.status == "success") {
					
					var sponser_serch_data = result.data;
					
					$("#sponser_serch_result").css("display","");
					
					$("#sponser_serch_result_no").text(sponser_serch_data.length);
					
					$('#sponser_serch_result_table tr').remove();
					
					var table = $('#sponser_serch_result_table');
					table.append($("<tr>")
							.append($("<td>").text("번호"))
							.append($("<td>").text("입금날짜"))
							.append($("<td>").text("입금명"))
							.append($("<td>").text("입금금액"))
							.append($("<td>").text("입금장소"))
					);
					
					for(var i=0;i<sponser_serch_data.length;i++){
							var table = $('#sponser_serch_result_table');
							table.append($("<tr>")
									.append($("<td>").text(i+1))
									.append($("<td>").text(sponser_serch_data[i].spddate))
									.append($("<td>").text(sponser_serch_data[i].spdname))
									.append($("<td>").text(sponser_serch_data[i].spdincome))
									.append($("<td>").text(sponser_serch_data[i].spdwhere))
							);
						
								 
					}
					
				} else if(result.status == "fail"){
					alert("검색 중 오류가 발생하였습니다.\n 잠시 후 다시 시도해 주시기 바랍니다.");	
				}
			},
	"json");
	
}


//***************sponser function end

//**** 페이지 처리 함수 통합사용
function admin_levelChange(){



	admin_levelChange_getList();
}




// ***** 페이지 로딩할 데이터 처리 부분
//검색
function admin_levelChange_btn_Search(){
	var text = $("#txtFilter").val();
	console.log(text);
	memberNameSearch(text);

};
function admin_levelChange_btn_Search2(){

	var text = $("#txtFilter2").val();
	memberNameSearch(text);

};
//통합 페이징 되있는부분
function admin_levelChange_getList(pageNo){

	if (pageNo == undefined) {
		pageNo = 1;
	}
	$.ajax("member/list.do?pageNo=" + pageNo, {
		type:'GET',
		success: function(result){
			if(result.status == 'success'){	
				var list = result.data[0];
				 teamlist =result.data[1];
			
				$("#table tbody").find("tr:gt(0)").remove();
				for(var i=0 ; i < list.length; i++){
					$(".tmTr").clone().css("display","").attr("memberid",list[i].id).attr("email",list[i].email).attr("name",list[i].name).attr("class","tmTr"+i).appendTo("#table tbody");
					$(".tmTr"+i).find("td:eq(0)").text(list[i].name);
					$(".tmTr"+i).find("td:eq(1)").attr("class","levelid"+i).text(list[i].id);
					$(".tmTr"+i).find("td:eq(2)").text(list[i].email);
					if(list[i].level == 0){
					$(".tmTr"+i).find("#sel0").attr("selected",true);
					
					}else if(list[i].level == 1){
						
						$(".tmTr"+i).find("#sel1").attr("selected",true);
						$(".tmTr"+i).find(".sel_sppc").css("display","");
						if(list[i].sppc == 0){
							$(".tmTr"+i).find("#sel_sppc0").attr("selected",true);
						}
						else if(list[i].sppc == 1){
							$(".tmTr"+i).find("#sel_sppc1").attr("selected",true);
						}
						
					$(".tmTr"+i).find(".input_sppcname").css("display","");
					//spacname : 예금주 이름 
					$(".tmTr"+i).find(".input_sppcname").val(list[i].spacname);
					
					
					
					}else if(list[i].level == 2){
					$(".tmTr"+i).find("#sel2").attr("selected",true);
					$(".tmTr"+i).find(".tmlist").css("display","");
					}else if(list[i].level == 3){
					$(".tmTr"+i).find("#sel3").attr("selected",true);
					$(".tmTr"+i).find(".tmlist").css("display","");
					}else if(list[i].level == 9){
					$(".tmTr"+i).find("#sel9").attr("selected",true);
					}
					for(var j = 0; j< teamlist.length; j++){
					
					if(teamlist[j].tuse == 1){
						var select = $(".tmTr"+i).find(".tmlist");	
						
						console.log(list[i].tno +"===="+ teamlist[j].tno );
						
						if(list[i].tno == teamlist[j].tno){
							$("<option>").attr("selected",true).attr("value",teamlist[j].tno).text(teamlist[j].tname).appendTo(select);
						}else{
							$("<option>").attr("value",teamlist[j].tno).text(teamlist[j].tname).appendTo(select);
						}
					}
					}	
				}
				//countMember(currPageNo , pageSize);
			}else{
				alert("실패");
			}
		}
	});
}

$('body').on("change","#tmsellv", function(){
	$(this).parent().parent().find(".tmcheck").attr("checked", true).addClass('cklevel');
	$(this).parent().parent().css("background-color","#C4BABA");
	$(this).parent().parent().find(".adminlevelcheck").css("display","");
	
	
	if($(this).val()== 2 ||$(this).val()== 3){
		console.log(this);
		$(this).parent().find(".tmlist").children().remove();
		for(var j=0 ; j<teamlist.length; j++){
			if(teamlist[j].tuse == 1){
				 $(this).parent().find(".sel_sppc").css("display","none");
				 $(this).parent().find(".input_sppcname").css("display","none");
				var select = $(this).parent().find(".tmlist").css("display","");
				$("<option>").attr("value",teamlist[j].tno).text(teamlist[j].tname).appendTo(select);
			}
		}
	}else if($(this).val() ==1){
		 $(this).parent().find(".tmlist").css("display","none");
		 $(this).parent().find(".sel_sppc").css("display","");
		 $(this).parent().find(".input_sppcname").css("display","");
	}else{
		 $(this).parent().find(".sel_sppc").css("display","none");
		 $(this).parent().find(".input_sppcname").css("display","none");
		$(this).parent().find(".tmlist").css("display","none");
	}
});



//***** 버튼 액션 처리 부분
function admin_levelChange_btn_click(){

	var tmcheck =$(".tmcheck");
	for(var i=0 ; i<tmcheck.length ; i++){
	
	
		if(tmcheck[i].checked){
			var id = $(tmcheck[i]).parent().parent().find("td:eq(1)").text();
			var level =$(tmcheck[i]).parent().parent().find("#tmsellv").val();
			var tno =$(tmcheck[i]).parent().parent().find(".tmlist").val();
			// 후원인 예금주 val()값
			var sppc = $(tmcheck[i]).parent().parent().find("#sel_sppc").val();
			// 개인 or 기업 select value값
			var sppcname = $(tmcheck[i]).parent().parent().find(".input_sppcname").val();
			console.log(id + "<==아이디" + level + "===================" + tno + "================" + sppc + "====================" + sppcname);
			
			if(level != 2 && level != 3){
				$.post("member/updateLevel.do", 				
						{
					level: level,
					id: id,
					tno: 0,
					spacname : sppcname,
					sppc : sppc
						},
						function(result) {
							if(result.status == "success") {
								admin_levelChange_getList();
							} else if(result.status == "fail"){
								alert("변경오류!");							
							}
						},
				"json");	
			}else{
				alert("자원봉사자 or 코치 임");
				$.post("member/updateLevel.do", 				
						{
					level: level,
					id: id,
					tno: tno 
						},
						function(result) {
							if(result.status == "success") {
								admin_levelChange_getList();
							} else if(result.status == "fail"){
								alert("변경오류!");							
							}
						},
				"json");
			}
		}
	}

}







//level 페이징
//이벤트 등록

function checkCount(){
	$.getJSON("member/count.do", function(result) {
		if(result.status == "success") {
			var count = parseInt(result.data);
			

			var totalPage = Math.ceil(count / 10); //올림 한 정수값
			//alert("curr:" + currPageNo +"total:" +totalPage );
		
			$("#paging").paginate({
				count 		: totalPage,
				start 		: 1,
				display     : 10,
				border					: false,
				text_color  			: '#666666',
				background_color    	: 'none',	
				text_hover_color  		: '#2573AF',
				background_hover_color	: 'none', 
				images		: false,
				mouse		: 'press',
				onChange     			: function(page){
						console.log("=============");
						var wd = $(".jPag-pages").css("width");
						wd = parseInt(wd) +5 ; 
						$(".jPag-pages").css("width", wd);
						admin_levelChange_getList(page);
						
					  }
				
			});
			var wd = $(".jPag-pages").css("width");
			wd = parseInt(wd) +5 ; 
			$(".jPag-pages").css("width", wd);
			admin_levelChange_getList();
		
		} else {
			alert("실행중 오류발생!");
			console.log(result.data);
		}
	});
	

};

//팀 VIEW
function teamView(tno) {
	$.getJSON("team/view.do?tno=" + tno, function(result) {
		if(result.status == "success") {	
			var team = result.data;

			var coordx = team.tcoordx;
			var coordy = team.tcoordy;
			//selectPoi(coordx ,coordy);
			/*taddress:$("#id_addr").val(),*/
			$('#btn_team_pwdel').val("");
			$("#tkname").val(team.tkname);
			$(".teamImg").attr('src' , 'file/' + team.tphoto);
			$("#tkinfo").val(team.tkinfo);
			$("#tno").val(team.tno);
			$("#tname").val(team.tname);
			$("#tinfo").val(team.tinfo);
			$(".tkImg").attr('src' , 'file/' + team.tkphoto);;
			$("#tuse").val(team.tuse);
			$("#team_address_a").val(team.taddress);
			$("#coordX").val(team.tcoordx);
			$("#coordY").val(team.tcoordy);	
			
		} else {
			alert("실행중 오류발생!");
			console.log(result.data);
		};
	});		
}

// 팀 리스트 function
function teamlists(){
	$.ajax('team/list.do', {
		type:'GET',
		success: function(result){
			$('.team-text.span3.data').remove();
			if(result.status == 'success'){	
				var list = result.data;
				var div = $('.team_list');
				for(var i=0; i< list.length; i++){
					$('<div>').addClass('team-text span3 data team-list'+i)									
					.append($('<h4>').text(list[i].tname))
					.append($("<img class='tmlistIMG'>").attr('src', 'file/' + list[i].tphoto))
					.append($('<div>').addClass('social-links')
							.append($('<a>').addClass('member_add').attr('href', '#')
									.attr('data-no', list[i].tno))
									.append($('<a>').addClass('facebook').attr('href', '#')
											.attr('data-no', list[i].tno))
											.append($('<a>').addClass('twitter').attr('href', '#')
													.attr('data-del-no', list[i].tno)
													.attr('data-del-name', list[i].tname)))
													.appendTo(div);

					if(list[i].tuse === 0 ){
						$(".team-list"+i).hide();
					}

					
				}

			}
		}
	});	
}





//*******  지도 함수
function initialize(){
	map = new Tmap.Map({div:'map_div', width:'500px', height:"370px"});
	map.addControls([ //배열로
//	                  new Tmap.Control.KeyboardDefaults(),
	                 // new Tmap.Control.MousePosition(),
	                  //new Tmap.Control.OverviewMap()
	                  ]);
}



function getRouteData(){

	tData = new Tmap.TData();

	var searchText = $('#search').val();
	var encodingSearchText = encodeURIComponent(searchText);

	if(searchText != ''){
		var options ={version:1};
		tData.getPOIDataFromSearch(encodingSearchText,options);
		jQuery('#searchResult').css("display","block");

	}else{
		alert('검색할 POI를 입력해주세요.');
	}
	tData.getPOIDataFromSearch( encodingSearchText);
	tData.events.register("onComplete", tData, onCompleteLoadGetPOIDataFromSearch);//성공
}




function onCompleteLoadGetPOIDataFromSearch(){
	jQuery("#admin_map_address").html("");

	var markers = new Tmap.Layer.Markers( "MarkerLayer" );
	map.addLayer(markers);

	size = new Tmap.Size(22,30);

	offset = new Tmap.Pixel(-(size.w/2), -size.h);


	if(jQuery(this.responseXML).find("searchPoiInfo pois poi").text() != ''){

		$("#locationList").find("*").remove();
		jQuery(this.responseXML).find("searchPoiInfo pois poi").each(function(){
			var name = jQuery(this).find("name").text();

			var upperAddrName= jQuery(this).find("upperAddrName").text();//경기
			var middleAddrName= jQuery(this).find("middleAddrName").text();//부천시 원미구
			var lowerAddrName= jQuery(this).find("lowerAddrName").text();//소사동
			var detailAddrName= jQuery(this).find("detailAddrName").text();
			var firstNo= jQuery(this).find("firstNo").text();
			var secondNo= jQuery(this).find("secondNo").text();

			var coordX= jQuery(this).find("frontLon").text();
			var coordY= jQuery(this).find("frontLat").text();

			var nameArray= [];
			nameArray= name.split("(");
			if(name.length>20){
				name= nameArray[0]+'<br/>('+nameArray[1];
			} 
		
			var addr =upperAddrName+" "+middleAddrName+" "+lowerAddrName+" "+detailAddrName+" "+firstNo+"-"+secondNo+" " + name ;
			if(jQuery(this).index() >= 5){
			}else{
				var i = jQuery(this).index();
				jQuery("#locationList").append('<div><span class="num">'+(jQuery(this).index()+1)+'</span>&nbsp;<span class="imgSpan"><img src="http://map.nate.com/img/contents/ico_spot.png"></span><span class="poiResultList"><a id="aaa'+ i +'" href="javascript:selectPoi('+coordX+','+coordY+')"style="text-decoration:none; margin-top:-10px;">'+addr+'</a></span></div><br/><br/>');
				//jQuery("#admin_map_address").append('<div><span class="num">'+(jQuery(this).index()+1)+'</span>&nbsp;<span class="imgSpan"><img src="http://map.nate.com/img/contents/ico_spot.png"></span><span class="poiResultList"><a id="aaa'+ i +'" href="javascript:selectPoi('+coordX+','+coordY+')"style="text-decoration:none; margin-top:-10px;">'+addr+'</a></span></div><br/><br/>');	
				//검색된 주소값 
				$("#aaa"+i).on("click",function(){

					team_address = $("#aaa"+i).text();
						
					$("#team_address_a").val(team_address);
				
					$("#locationList").hide(function(){
						$("#map_div").show();
					});
				
					
				});

			}

			map.setCenter(new Tmap.LonLat(coordX, coordY) ,16);	
		});
	}else if(jQuery(this.responseXML).find("error").text() != ''){
		//var errorMessage= jQuery(this.responseXML).find("error message").text();
		//alert(errorMessage);
		alert("검색 중 문제가 발생하였습니다. 몇 분뒤 다시 검색해 주세요.");
	}else{
		alert('검색결과가없습니다.');
	}
}



function onMouseMarker (evt){
	if(evt.type == "mouseover"){
		this.show();
	} else {
		this.hide();
	}
}
function selectPoi (coordX ,coordY ){
	var markerLayer = new Tmap.Layer.Markers();
	map.addLayer(markerLayer);
	
	var lonlat = new Tmap.LonLat(coordX, coordY);

	var size = new Tmap.Size(22,30);
	var offset = new Tmap.Pixel(-(size.w/2), -(size.h/2));
	var icon = new Tmap.Icon('http://map.nate.com/img/contents/ico_spot.png', size, offset); 
	
	var marker = new Tmap.Marker(lonlat, icon);
	markerLayer.addMarker(marker);
	map.setCenter(lonlat,15);
	var pr = new Tmap.Projection("EPSG:3857"); 
	var wgs84 = new Tmap.Projection("EPSG:4326"); 
	var daumlonlat =new Tmap.LonLat(coordX, coordY).transform(pr, wgs84);
	$("#coordX").val(daumlonlat.lon);
	$("#coordY").val(daumlonlat.lat);
}


function memberNameSearch (text){
	$.ajax("member/listSearch.do?text=" + text, {
		type:'GET',
		success: function(result){
			if(result.status == 'success'){					
				var list = result.data;
				$('tbody tr').remove();

				var table = $('#table2');
				for (var i in list){

					if (list[i].level == 9){							
						$("<tr>")
						.append($("<td>").text(list[i].name)).attr('name', list[i].name)
						.append($("<td>").attr('class', 'levelid'+i).text(list[i].id))
						.append($("<td>").text(list[i].email))						
						.append($("<td>")
								.append($("<select>").attr('class', 'lvSelect'+i).attr("level-data",i)
										.append($("<option>").attr("value","0").text("일반회원"))
										.append($("<option>").attr("value","1").text("감독"))
										.append($("<option>").attr("value","9").text("관리자").attr("selected",true))
								)
						)
						.append($("<td>").
								append($("<input type='checkbox' name='memberLevel' '>").attr("level-data",i).addClass('cklevel')))		
								.appendTo(table);	

					}else if (list[i].level == 1){	
						$("<tr>")
						.append($("<td>").text(list[i].name)).attr('name', list[i].name)
						.append($("<td>").attr('class', 'levelid'+i).text(list[i].id))
						.append($("<td>").text(list[i].email))						
						.append($("<td>")
								.append($("<select>").attr('class', 'lvSelect'+i).attr("level-data",i)
										.append($("<option>").attr("value","0").text("일반회원"))
										.append($("<option>").attr("value","1").text("감독").attr("selected",true))
										.append($("<option>").attr("value","9").text("관리자"))
								)
						)
						.append($("<td>").
								append($("<input type='checkbox' name='memberLevel' '>").attr("level-data",i).addClass('cklevel')))	
								.appendTo(table);	
					}else {
						$("<tr>")
						.append($("<td>").text(list[i].name)).attr('name', list[i].name)
						.append($("<td>").attr('class', 'levelid'+i).text(list[i].id))
						.append($("<td>").text(list[i].email))						
						.append($("<td>")
								.append($("<select>").attr('class', 'lvSelect'+i).attr("level-data",i)
										.append($("<option>").attr("value","0").text("일반회원").attr("selected",true))
										.append($("<option>").attr("value","1").text("감독"))
										.append($("<option>").attr("value","9").text("관리자"))
								)
						)
						.append($("<td>").
								append($("<input type='checkbox' name='memberLevel' '>").attr("level-data",i).addClass('cklevel')))	
								.appendTo(table);
					}

				}
			}
		}
	});
}

//평가항목 리스트
function evalList(){
	$.ajax('eval/evalList.do', {
		type:'GET',
		success: function(result){
			if(result.status == 'success'){	
				var evalList = result.data;
				$('.evalTr').remove();
				for(var i=0;i<evalList.length;i++){
					var eltype;  //디비값 셀렉트값
					var noeltype; 
					var eltypeState; 
					var noeltypeState;
					if(evalList[i].eltype == 0 ){
						//정량일경우
						eltype = 0; eltypeState ="정량평가";
						noeltype =1; noeltypeState ="정성평가";
					}else{
						eltype = 1; eltypeState ="정성평가";
						noeltype =0; noeltypeState ="정량평가";
					}
					var eluse; //디비값 셀력트값 현제값
					var noeluse;
					var eluseState;//디비값
					var noeluseState;
					if(evalList[i].euse == 1 ){
						//정량일경우
						eluse = 1; eluseState ="사용중";
						noeluse = 0; noeluseState ="사용안함";
					}else{
						eluse = 0; eluseState ="사용안함";
						noeluse = 1; noeluseState ="사용중";
					}


					$('<tr>').addClass("evalTr")
					.append($("<td>").text(evalList[i].elname).addClass("elname"))
					.append($("<td>") //0 정량 //1 정성
							//.append($("<select>").attr('id', 'eltype'+i).attr("eltype-data",i)
							.append($("<select>").attr('class', 'eltype')	
									.append($("<option>").attr("value",noeltype).text(noeltypeState))
									.append($("<option>").attr("value",eltype).text(eltypeState).attr("selected",true))
							))
							.append($("<td>") //0 정량 //1 정성
									//.append($("<select>").attr('class', "euse"+evalList[i].elno).attr("eltype-data",i)
									.append($("<select>").attr('class', "euse")	
											.append($("<option>").attr("value",noeluse).text(noeluseState))
											.append($("<option>").attr("value",eluse).text(eluseState).attr("selected",true))
									))
									.append($("<td>")
											.append($("<button>")
													.addClass("grabutton btn_eval_btn").addClass("btnEvalUpdate").attr("data-eval", evalList[i].elno).text("변경")))		
													.appendTo($(".evaltable"));	 

				}}
		}
	});	
}


//평가 항목 추가 펑션
function evalAdd(){

	if( $("#evalAddElname").val() == null || $("#evalAddElname").val() ==""){
		alert("항목명을 입력하여주세요");
		return false;
	}

	$.post("eval/evalAdd.do", 				
			{
		elname: $("#evalAddElname").val(),
		eltype: $("#evalAddEltype").val()
			},
			function(result) {
				if(result.status == "success") {
					alert("항목추가 성공");
					evalList();
				} else if(result.status == "fail"){
					alert("항목추가 실패!");	
					evalList();
				}
			},
	"json");
}	

//평가 항목 업데이트 펑션
function evalUpdate(elno,elname,eltype,euse){

	$.post("eval/evalUpdate.do", 				
			{
		elno: elno,
		elname : elname,
		eltype: eltype,
		euse: euse
			},
			function(result) {
				if(result.status == "success") {
					alert("항목변경 성공");
					evalList();
				} else if(result.status == "fail"){
					alert("항목변경 실패!");	
					evalList();
				}
			},
	"json");
} 


function submitEvent(){

	var text = $("#txtFilter").val();

	if (event.keyCode == 13 && text !="") {      
		// 엔터 키값은 13 입니다.
		$(".demo").css("display","none");
		$.ajax("member/listSearch.do?text=" + text, {
			type:'GET',
			success: function(result){
				if(result.status == 'success'){					
					var list = result.data;
				
					$("#table tbody").find("tr:gt(0)").remove();
					for(var i=0 ; i < list.length; i++){
						$(".tmTr").clone().css("display","").attr("memberid",list[i].id).attr("email",list[i].email).attr("name",list[i].name).attr("class","tmTr"+i).appendTo("#table tbody");
						$(".tmTr"+i).find("td:eq(0)").text(list[i].name);
						$(".tmTr"+i).find("td:eq(1)").attr("class","levelid"+i).text(list[i].id);
						$(".tmTr"+i).find("td:eq(2)").text(list[i].email);
						if(list[i].level == 0){
						$(".tmTr"+i).find("#sel0").attr("selected",true);
						}else if(list[i].level == 1){
						$(".tmTr"+i).find("#sel1").attr("selected",true);
						}else if(list[i].level == 2){
						$(".tmTr"+i).find("#sel2").attr("selected",true);
						$(".tmTr"+i).find(".tmlist").css("display","");
						}else if(list[i].level == 3){
						$(".tmTr"+i).find("#sel3").attr("selected",true);
						$(".tmTr"+i).find(".tmlist").css("display","");
						}else if(list[i].level == 9){
						$(".tmTr"+i).find("#sel9").attr("selected",true);
						}
						for(var j = 0; j< teamlist.length; j++){
						
						if(teamlist[j].tuse == 1){
							var select = $(".tmTr"+i).find(".tmlist");	
							
							console.log(list[i].tno +"===="+ teamlist[j].tno );
							
							if(list[i].tno == teamlist[j].tno){
								$("<option>").attr("selected",true).attr("value",teamlist[j].tno).text(teamlist[j].tname).appendTo(select);
							}else{
								$("<option>").attr("value",teamlist[j].tno).text(teamlist[j].tname).appendTo(select);
							};
						};
						};
					}
				};
								
				}
			});
		}else if (event.keyCode == 13 && text ==""){
			$(".demo").css("display","");
			 checkCount();
		}
	
	}
	

//초기화 안보이게 

function hideContent(){
	$("#frepare").css("display","none");
	$(".teamManagement").css("display", "none");
	$(".teamAdd").css("display", "none");
	$("#evalList").css("display", "none");
	$(".sponserPage").css("display", "none");
	$("#sponser").css("display", "none");
	$("#sponser_serch_file").css("display", "none");
	$("#sponser_sms").css("display", "none");
	$("#sponser_update_user").css("display", "none");
	$("#sponser_setup").css("display","none");
	$(".tableForm").css("display", "none");
	$("#manager_memberAdd").css("display", "none");
}
