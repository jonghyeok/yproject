var loginInfo=null;

$(document).ready(function () {
	loginfo(); 
	$("#h-sponsor").css("display" , "none");
	$("#h-manager").css("display" , "none");
	$("#h-admin").css("display" , "none");
	$('.gldp-default').css('display', 'none');
	var loginout = $("#btnlogout");
	loginout.on("click", function(event) {
		$.ajax("auth/logout.do", {
			type: "POST",
			dataType: "json",
			success: function(result) {
				if(result.status == "success") {
					loginInfo=null;
					$('#btnlogout').css('display','none');
					$('#open-button3').css('display','none');
					$('#open-myinfo').css('display','none');
					$('#open-button').css('display','');
					$('#headerLogin').css('display','');
					$('#welcome').text('');
					$("#id").val("");
					$("#password").val("");
					location.href = "index.html";
					alert("성공적으로 로그아웃 되셨습니다.");
				} else {
					alert("로그아웃중 오류 발생");
					location.href = "index.html";
				}
			}
		});

	});
	var login = $("#btnLogin");
	login.on("click", function(event) {
		$.ajax("auth/login.do", {
			type: "POST",
			data: {
				id: $("#id").val(),
				password: b64_md5($("#password").val()),
			},
			dataType: "json",
			success: function(result) {
				if(result.status == "fail") {
					alert("아이디나 암호가 맞지 않습니다.");
					$("#id").val("");
					$("#password").val("");
				} else {
					loginInfo = result.data;
					$('#open-button').css('display','none');
					$('#headerLogin').css('display','none');
					$('#btnlogout').css('display','');
					$('#open-myinfo').css('display','');
					$('#welcome').text(loginInfo.name+"님");
					$('#login').dialog('close');
					headerCheck();
				}
			}
		});
		return false;
	});
	$("#main-Logo").click( function() {
		location.href="index.html";
		$(".dropdown").css("display","");
	});
	$("#main-Logo2").click( function() {
		location.href="../index.html";
		$(".dropdown").css("display","");
	});
	$("#h-admin").click( function() {
		$("#main-header").find("*").removeClass("current-Page");
		$("#h-admin").addClass("current-Page");
		$(".dropdown").css("display","none");
		$(this).trigger("adminManagement");		
	});
	$("#h-manager").click( function() {
		$("#main-header").find("*").removeClass("current-Page");
		$("#h-manager").addClass("current-Page");
		$(".dropdown").css("display","");
		$(this).trigger("managerManagement");		
	});
	$("#h-sponsor").click( function() {
		$("#main-header").find("*").removeClass("current-Page");
		$("#h-sponsor").addClass("current-Page");
		$(".dropdown").css("display","");
		$(this).trigger("sponsorManagement");
	});
	$("#h-teaminfo").click( function() {
		$('.gldp-default').css('display', 'none');
		$("#main-header").find("*").removeClass("current-Page");
		$("#h-teaminfo").addClass("current-Page");
		$(".dropdown").css("display","");
		$(this).trigger("teamManagement");		
	});
	$("#h-gallery").click( function() {
		$("#main-header").find("*").removeClass("current-Page");
		$("#h-gallery").addClass("current-Page");
		$(".dropdown").css("display","");
		$(this).trigger("galleryrManagement");		
	});
	$("#h-notice").click( function() {
		$("#main-header").find("*").removeClass("current-Page");
		$("#h-notice").addClass("current-Page");
		$(".dropdown").css("display","");
		$(this).trigger("noticeManagement");		
	});
	$('#headerLogin').click(function () {
		$('#login').dialog('open');
	});
	$('#login').on('dialogcreate', function () {
	});
	$('#login').dialog({
		open: function () {
		},
		minWidth:340,
		maxWidth:340,
		minHeight:420,
		maxHeight:420,
		autoOpen: false,
		modal: true
	});
	$('#contract1').click(function () {
		$('#contract1_read').dialog('open');
	});
	$('#contract1_read').dialog({
		open: function () {
		},
		minWidth:340,
		maxWidth:340,
		minHeight:420,
		maxHeight:420,
		autoOpen: false,
		modal: true
	});
	$('#contract2').click(function () {
		$('#contract2_read').dialog('open');
	});
	$('#contract2_read').dialog({
		open: function () {
		},
		minWidth:340,
		maxWidth:340,
		minHeight:420,
		maxHeight:420,
		autoOpen: false,
		modal: true
	});
	$('#signUp').click(function() {
		$('#login').dialog('close');
		$('#sign').dialog('open');
	});
	$('#open-button').click(function () {
		$('#sign').dialog('open');
	});
	$('#sign').on('dialogcreate', function () {});

	$('#lostP').click(function() {
		$('#login').dialog('close');
		$('#lostPassword').dialog('open');
	});
	$('#lostPassword').dialog({
		open: function () {
			$("#id").val("");
			$("#email").val("");
		},
		minWidth:300,
		maxWidth:300,
		minHeight:380,
		maxHeight:400,
		autoOpen: false,
		buttons: {
			"find" : {
				text: "find",
				id:"lost",
				click:function(){
					$.post("member/findPassword.do", 
							{
						uid:($("#findid").val()),
						uemail:($("#findemail").val()),
							},
							function(result) {
								if(result.status == "success") {
									$('#check-pass').dialog('close');
									alert("해당 EMAIL로 전송되었습니다");
								} else{
									alert("ID 또는 EMAIL 이 일치하지않습니다");
								};
							},
					"json");
				}
			},
			cancel: function () {
				$('#lostPassword').dialog('close');
			}
		},
		modal: true
	});
	$('#sign').dialog({
		open: function () {
			$('#sign').find("*").val("");
			$(".signcheck").attr("checked",false);
			var joinCheck = $('#btnsign'); //가입버튼 비활성화 초기설정
			joinCheck.button( "disable" ); //버튼 비활성화 
			var contract_ck = $(".signcheck");	//체크박스가 두개 그래서 배열 리턴
			$('#uid').keyup(idChecker);//아이디체크이벤트
			$('#upass').keyup(pwChecker);
			$('#upass2').keyup(pwChecker2); //비밀번호체크이벤트
			$('#uname').keyup(nameChecker);
			$('#uemail').keyup(emailChecker);
			$('#uphone').keyup(phoneChecker);
			var idFlag = false; //Email플래그값
			var pwFlag = false;    //PW플래그값
			var pwFlag2 = false;
			var nameFlag = false;
			var emailFlag = false;
			var phoneFlag = false;
			var contractFlag = false;
			var contractFlag2 = false;
			$(".signcheck").on("click",function () {
				if(contract_ck[0].checked){
					contractFlag= true;
					joinChecker();
				} else if (contract_ck[1].checked){
					contractFlag2= true;
					joinChecker();
				}else{
					joinCheck.button( "disable" );
					contractFlag=false;
					contractFlag2= false;
				}
				joinChecker();
			});

			function idChecker(){  //ID체크 함수
				var inputId = $('#uid').val();
				if(inputId != ''){

					$.post("member/serchSameId.do",
							{
						id: $("#uid").val(),
							}, 
							function(result) {
								if($("#uid").val().length >5){
									if(result.status == "success") {
										$("#id_check").attr("src","images/ok1.png");
										idFlag = true; //플래그값 true
										joinChecker(); //버튼체크
									} else {
										$("#id_check").attr("src","images/cross1.png");
										idFlag = false; //플래그값 false
										joinChecker(); //버튼체크
									}
								}else{
									$("#id_check").attr("src","images/cross1.png");
									idFlag = false; //플래그값 false
									joinChecker(); //버튼체크
								}
							},
					"json");
				}else if(inputId == '' || inputId == 'undifined'){ //입력되지않았을때 발생
					$("#id_check").attr("src","images/cross1.png");
					idFlag = false; //플래그값 false
					joinChecker(); //버튼체크
				}
			}
			function pwChecker(){
				var pw = document.getElementById('upass').value;
					if(pw.length > 5){
						if(pw != '' || pw != 'undifined' ){
							$("#password_in").attr("src","images/ok1.png");
							pwFlag = true;        //플래그값 false
							joinChecker(); //버튼체크
						}else{
							$("#password_in").attr("src","images/cross1.png");
							pwFlage =false;
						}
					}else{
						$("#password_in").attr("src","images/cross1.png");
						pwFlage =false;
					}
			}
			function pwChecker2(){  //비밀번호 체크함수
				var pw = document.getElementById('upass').value;
				var pwTwo = document.getElementById('upass2').value;
				if(pw.length > 5){
					if(pw != '' && pwTwo != ''){ //비밀번호 확인란까지 입력해야 실행
						if(pw == pwTwo){       //일치할때
	
							$("#password_check").attr("src","images/ok1.png");
							pwFlag2 = true; //플래그값 true
							joinChecker(); //버튼체크
						}else{  //일치하지 않을때
							$("#password_check").attr("src","images/cross1.png");
							pwFlag2 = false;        //플래그값 false
							joinChecker(); //버튼체크
						}
					}
				}else{
					$("#password_check").attr("src","images/cross1.png");
					pwFlag2 = false;        //플래그값 false
					joinChecker(); //버튼체크
				}
				
				if( pwTwo == '' || pwTwo == 'undifined'){
            	$("#password_check").attr("src","images/cross1.png");
            	pwFlag2 = false;        //플래그값 false
            	joinChecker(); //버튼체크
            }
		}
			function nameChecker(){  //이름 체크함수
				var name = 	 $('#uname').val();
				if(name == '' || name == 'undifined'){
					$("#name_check").attr("src","images/cross1.png");
					nameFlag  = false;        //플래그값 false
					joinChecker(); //버튼체크
				}else{
					$("#name_check").attr("src","images/ok1.png");
					nameFlag  = true;
					joinChecker();
				}
			}
			function emailChecker(){  //이메일 체크함수
				var email = $('#uemail').val();
				//입력이 안되있을때 실행
				if(email == '' || email == 'undifined'){
					$("#email_check").attr("src","images/cross1.png");
					emailFlag  = false;        //플래그값 false
					joinChecker(); //버튼체크
				}else{
					if(!isValidEmailAddress(email)){
						$("#email_check").attr("src","images/cross1.png");
						emailFlag  = false;        //플래그값 false
						joinChecker(); //버튼체크
						}
					else{
						$("#email_check").attr("src","images/ok1.png");
						emailFlag  = true;
						joinChecker();
					}
				}
			}
			function isValidEmailAddress(emailAddress) {
			    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
			    return pattern.test(emailAddress);
			};
			function contract_blur(){
				joinChecker();
			}
			function phoneChecker(){
				var phone = $('#uphone').val();
				//입력이 안되있을때 실행
				if(phone == '' || phone == 'undifined'){
					$("#phone_check").attr("src","images/cross1.png");
					phoneFlag  = false;        //플래그값 false
					joinChecker(); //버튼체크
				}else{
					if(!isValidPhoneNumber(phone)){
						$("#phone_check").attr("src","images/cross1.png");
						phoneFlag  = false;
						joinChecker();
					}else{
						$("#phone_check").attr("src","images/ok1.png");
						phoneFlag  = true;
						joinChecker();
					}
				}
			}
			function isValidPhoneNumber(phoneNumber) {
			    var pattern = new RegExp(/^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/);
			    return pattern.test(phoneNumber);
			};
			function joinChecker(){       //버튼체크 함수 - 위의 함수들이 실행될때마다 같이 실행
				if(contract_ck[0].checked==true && contract_ck[1].checked==true){
					contractFlag=true;  
				}else{
					joinCheck.button( "disable" );
					contractFlag=false;
				}
				if(idFlag == true && pwFlag2== true && pwFlag == true && nameFlag == true &&  emailFlag == true && contractFlag == true && phoneFlag==true){
					joinCheck.button( "enable" );
					joinCheck.css("background-color","black");
				}else{
					joinCheck.button( "disable" );
				}
			}
		},
		minWidth:480,
		maxWidth:480,
		autoOpen: false,
		buttons: {
			"submit" : {
				text: "submit!",
				id:"btnsign",
				click:function(){
					$(this).addClass("signinButton");
					$.post("member/signup.do", 
							{
						id: $("#uid").val(),
						password: b64_md5($("#upass").val()),
						name: $("#uname").val(),
						email: $("#uemail").val(),
						postno: $("#upostno").val(),
						address: $("#uaddress").val(),
						detAddr: $("#udetAddr").val(),
						phone: $("#uphone").val()
							},
							function(result) {
								if(result.status == "success") {
									loginInfo = result.data;
									$('#open-button').css('display','none');
									$('#headerLogin').css('display','none');
									$('#btnlogout').css('display','');
									$('#open-button3').css('display','');
									$('#welcome').text(loginInfo.name+"님");
									$("#uid").val("");
									$("#upass").val("");
									$("#upass2").val("");
									$("#uname").val("");
									$("#uemail").val("");
									$("#upostno").val("");
									$("#uaddress").val("");
									$("#udetAddr").val("");
									$("#uphone").val("");
									$("#contract1").attr("checked",false);
									$("#contract2").attr("checked",false);
									$("input:checkbox[name='sign_checkboxGroup']").attr("checked",false);
									$('#sign').dialog('close');

								} else {
									alert("실행중 오류발생!");
								}
							},
					"json");

				}},
				reset :function () {
					$("#uid").val('');
					$("#upass").val('');
					$("#upass2").val('');
					$("#uname").val('');
					$("#uemail").val('');
					$("#upostno").val('');
					$("#uaddress").val('');
					$("#udetAddr").val('');
					$("#uphone").val('');
					$("#id_check").text("");
					$("#password_in").text("");
					$("#password_check").text("");
					$("#curpass_check").text("");
					$("#pass1_check").text("");
					$("#pass2_check").text("");
					$(".wellcomeform_img").attr("src","images/default1.png");
					$("#btnsign").attr("disabled",true);
				},
				cancel: function () {
					$("#uid").val('');
					$("#upass").val('');
					$("#upass2").val('');
					$("#uname").val('');
					$("#uemail").val('');
					$("#upostno").val('');
					$("#uaddress").val('');
					$("#udetAddr").val('');
					$("#uphone").val('');
					$("#id_check").text(" ");
					$("#password_in").text(" ");
					$("#password_check").text(" ");
					$('#sign').dialog('close');
					$("#curpass_check").text("");
					$("#pass1_check").text("");
					$("#pass2_check").text("");
					$("#btnsign").attr("disabled",true);
				}
		},
		modal: true
	});

		$('#open-myinfo').click(function () {
			$('#check-pass').dialog('open');
		});
		$('#check-pass').on('dialogcreate', function () {
		});
		$('#check-pass').dialog({
			open: function () {
				$("#pass-value").val("");
				$("#check-pass-id").text(loginInfo.id);
			},
			minWidth:400,
			maxWidth:400,
			autoOpen: false,
			buttons: {
				"pass" : {
					text: "submit",
					id:"btncheck-pass",
					click:function(){
						$.post("member/serchPassword.do", 
								{
							curpass: b64_md5($("#pass-value").val()),
								},
								function(result) {
									if(result.status == "success") {

										$('#check-pass').dialog('close');
										$('#myUpdate').dialog('open');

									} else{
										alert("암호가 일치하지않습니다");
									};
								},
						"json");
					}
				},
				cancel: function () {
					$('#check-pass').dialog('close');
				}
			},
			modal: true
		});
	$('#open-button3').click(function () {
		$('#myUpdate').dialog('open');
	});
	$('#myUpdate').on('dialogcreate', function () {
		$("#btnupdate").css("display","");
		$("#btncoach").css("display","none");
		$("#btnpasschange").css("display","none");
		$("#btnout").css("display","none");
	});
	$('#myUpdate').dialog({
		open: function () {
			$("#tabs-3").find("*").val(""); //암호 리셋
			$("#tabs-3").find("*").val("");
			$('#tab-myinfo').css("display","");
			$('#userId').val(loginInfo.id);
			$('#userName').val(loginInfo.name);
			$('#userEmail').val(loginInfo.email);
			$('#userDetailaddress').val(loginInfo.detAddr);
			$('#userPhone').val(loginInfo.phone);
			if(loginInfo.level==999){
				$('#tab-coachinfo').css("display","");
			}else{
				$('#tab-coachinfo').css("display","none");
			}
			$("#tab-myinfo").on("click", function(){
				$("#btnupdate").css("display","");
				$("#btncoach").css("display","none");
				$("#btnpasschange").css("display","none");
				$("#btnout").css("display","none");
			});
			$("#tab-coachinfo").on("click", function(){
				$("#btnupdate").css("display","none");
				$("#btncoach").css("display","");
				$("#btnpasschange").css("display","none");
				$("#btnout").css("display","none");
				coachview();
			});
			$("#tab-changepass").on("click", function(){
				$("#tabs-3").find("*").val("");
				$("#tabs-4").find("*").val("");
				$("#curpass_check").text("");
				$("#pass1_check").text("");
				$("#pass2_check").text("");
				$("#btnupdate").css("display","none");
				$("#btncoach").css("display","none");
				$("#btnpasschange").css("display","");
				$("#btnout").css("display","none");
				var changepassword = $("#btnpasschange");
				changepassword.button( "disable" );
				$('#curpass').keyup(curpassChecker);
				$('#changepass').keyup(pass1Checker);
				$('#changepass2').keyup(pass2Checker);
				var curpassFlag = false;
				var changepassFlag = false;
				var changepass2Flag = false;
				function curpassChecker(){  //ID체크 함수
					var inputcurpass = $('#curpass').val();
					if(inputcurpass != ''){
						$.post("member/serchPassword.do",
								{
							curpass: b64_md5($("#curpass").val()),
								}, 
								function(result) {
									if(result.status == "success") {

										$("#curpass_check").attr("src","images/ok1.png");
										curpassFlag = true; //플래그값 true
										passChecker(); //버튼체크
									} else {
										$("#curpass_check").attr("src","images/cross1.png");
										curpassFlag = false; //플래그값 false
										passChecker(); //버튼체크
									}
								},
						"json");
					}else if(inputcurpass == '' || inputcurpass == 'undifined'){ //입력되지않았을때 발생

						$("#curpass_check").attr("src","images/cross1.png");
						curpassFlag = false; //플래그값 false
						passChecker(); //버튼체크
					}
				}
				function pass1Checker(){
					var pass1 = document.getElementById('changepass').value;
					if(pass1 != '' || pass1 != 'undifined' ){
						if(pass1.length > 5){
						$("#pass1_check").attr("src","images/ok1.png");
						passChecker(); //버튼체크
						changepassFlag = true;
						}else{
						$("#pass1_check").attr("src","images/cross1.png");
						changepassFlag =false;
						passChecker();
						}
					}else{
						$("#pass1_check").attr("src","images/cross1.png");
						changepassFlag =false;
						passChecker();
					}
				}
				function pass2Checker(){  //비밀번호 체크함수
					var pass1 = document.getElementById('changepass').value;
					var pass2 = document.getElementById('changepass2').value;
					if(pass2.length > 5){
					if(pass1 != '' && pass2 != ''){ //비밀번호 확인란까지 입력해야 실행
						if(pass1 == pass2){       //일치할때
							$("#pass2_check").attr("src","images/ok1.png");
							changepass2Flag = true; //플래그값 true
							passChecker(); //버튼체크
						}else{  //일치하지 않을때
							$("#pass2_check").attr("src","images/cross1.png");
							changepass2Flag = false;        //플래그값 false
							passChecker(); //버튼체크
						}
					}
					}else{
						$("#pass2_check").attr("src","images/cross1.png");
						changepass2Flag = false;        //플래그값 false
						passChecker(); //버튼체크
					}
					if( pass2 == '' || pass2 == 'undifined'){
						$("#pass1_check").attr("src","images/cross1.png");
						changepass2Flag = false;        //플래그값 false
						passChecker(); //버튼체크
					}

				}	

				function passChecker(){     
					if(curpassFlag == true && changepassFlag==true && changepass2Flag==true ){
						changepassword.button( "enable" );
						changepassword.css("background-color","black");
					}else{
						changepassword.button( "disable" );
					}
				}    
			});
			$("#tab-out").on("click", function(){
				$("#btnupdate").css("display","none");
				$("#btncoach").css("display","none");
				$("#btnpasschange").css("display","none");
				$("#btnout").css("display","");
				
			});
		},
		minWidth:550,
		maxWidth:550,
		autoOpen: false,
		buttons: {
			"submit" : {
				text: "기본변경!",
				id:"btnupdate",
				click:function(){
					$.post("member/update.do", 
							{
						id: $("#userId").val(),
						name: $("#userName").val(),
						email: $("#userEmail").val(),
						postno: $("#userPostno").val(),
						address: $("#userAddress").val(),
						detAddr: $("#userDetailaddress").val(),
						phone: $("#userPhone").val()
							},
							function(result) {
								if(result.status == "success") {
									loginInfo = result.data;
									$('#open-button').css('display','none');
									$('#headerLogin').css('display','none');
									$('#btnlogout').css('display','');
									$('#open-button3').css('display','');
									$('#welcome').text($("#userName").val()+"님");
									$("#userPass").val('');
									alert($("#userName").val()+"님의 데이터가 변경 성공!");
									$('#myUpdate').dialog('close');

								} else{
									alert("업데이트중 오류발생!");
								};
							},
					"json");
				}
			},
			"submit2" : {
				text: "정보변경!",
				id:"btncoach",
				click:function(){
					alert("클릭됨");
					$.post("member/coachUpdate.do", 
							{
						mid: $("#userId").val(),
						mschool:$("#mschool").val(),
						hschool:$("#hschool").val(),
						uschool:$("#uschool").val(),
						kback:$("#back").val().replace("\r\g","<br>")
							},
							function(result) {
								if(result.status == "success") {
									alert("변경되었습니다");
									$('#myUpdate').dialog('close');
								}else {
									alert("실행중 오류발생!");
								}
							},
					"json");
				}
			},
			"submit3" : {
				text: "암호변경!",
				id:"btnpasschange",
				click:function(){
					$.post("member/passwordChange.do", 
							{
						changepass: b64_md5($("#changepass").val()),
							},
							function(result) {
								if(result.status == "success") {
									alert("암호가변경되었습니다");
									$('#myUpdate').dialog('close');

								} else {
									alert("실행중 오류발생!");
								}
							},
					"json");
				}
			},
			"submit4" : {
				text: "탈퇴!",
				id:"btnout",
				click:function(){
					$.post("member/delete.do", 
							{
						id : loginInfo.id,
						password:b64_md5($("#outpass").val()),
							},
							function(result) {
								if(result.status == "success") {
									
									$.ajax("auth/logout.do", {
										type: "POST",
										dataType: "json",
										success: function(result) {
											if(result.status == "success") {
												loginInfo=null;
												$('#open-button').css('display','');
												$('#headerLogin').css('display','');
												$('#btnlogout').css('display','none');
												$('#open-button3').css('display','none');
												$('#welcome').text('');
												$("#id").val("");
												$("#password").val("");
												location.href = "index.html";
												alert("회원님의 탈퇴 작업이 성공적으로 완료되었습니다. \n 다음에 또 이용해 주세요~");
											} else {
												alert("탈퇴중 오류 발생");
												location.href = "index.html";
											}
										}
									});
									
								}else {
									alert("비밀번호를 잘못 입력하셨습니다.");
								}
							},
					"json");
				}
			},
			cancel: function () {
				$('#myUpdate').dialog('close');
			}
		},
		modal: true
	});
});

function headerCheck(){	
	if(loginInfo.level==2 ||loginInfo.level==3){//코치
		$("#h-manager").css("display" , "");
		$("#h-admin").css("display" , "none");
		$("#h-sponsor").css("display" , "none");
	}else if(loginInfo.level==1){//후원자
		$("#h-manager").css("display" , "none");
		$("#h-admin").css("display" , "none");
		$("#h-sponsor").css("display" , "");
	}else if(loginInfo.level==9){//관리자
		$("#h-sponsor").css("display" , "none");
		$("#h-manager").css("display" , "");
		$("#h-admin").css("display" , "");
	}else{
		$("#h-manager").css("display" , "none");
		$("#h-admin").css("display" , "none");
		$("#h-sponsor").css("display" , "none");
	}
}

function loginfo() {
	$.getJSON("auth/loginInfo.do", function(result) {
		if(result.status == "success") {
			loginInfo = result.data;
			if(loginInfo.level==0 || loginInfo.level==1 || loginInfo.level==2 || loginInfo.level==9 ){ //일반회원
				$('#open-button').css('display','none');
				$('#headerLogin').css('display','none');
				$('#btnlogout').css('display','');
				$('#open-myinfo').css('display','');
				$('#welcome').text(loginInfo.name+"님");
				headerCheck();
			}else{
				loginInfo=null;
				$('#open-button').css('display',''); 
				$('#headerLogin').css('display','');
				$('#btnlogout').css('display','none');
				$('#open-myinfo').css('display','none');
				$('#welcome').text('');
				$("#id").val("");
				$("#password").val("");
			}
		} else {
			loginInfo = undefined;
		}
	});}


function maskInput(input, textbox, location, delimiter) {
    var locs = location.split(',');
    for (var delimCount = 0; delimCount <= locs.length; delimCount++) {
        for (var inputCharCount = 0; inputCharCount <= input.length; inputCharCount++) {
            if (inputCharCount == locs[delimCount]) {
                if (input.substring(inputCharCount, inputCharCount + 1) != delimiter) {
                    input = input.substring(0, inputCharCount) + delimiter + input.substring(inputCharCount, input.length);
                }
            }
        }
    }
    textbox.value = input;
}
