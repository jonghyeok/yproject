var find =0; 
$(document).ready(function () {
	$("pass1_check").val("");
	$("pass2_check").val("");
	$('#changepass').keyup(pwChecker2);
	$('#changepass2').keyup(pwChecker2);
	$("#btnfind").on("click",function() {
		var str = location.href;
		var rand = str.split('=');
					if(find==1){
						$.post("../member/newPassword.do", 
								{
							randpw: rand[1],
							password : b64_md5($('#changepass2').val())
								},
								function(result) {
									if(result.status == "success") {
										alert("비밀번호가 변경되었습니다. 로그인해주세요.");
										location.href="../index.html";
									} else{
										alert("비밀번호 변경 실패");
										location.href="../index.html";
									};
								},
						"json");
					}
			modal: true;
});
});

function pwChecker2(){  // 비밀번호 체크함수
	var pw = document.getElementById('changepass').value;
	var pwTwo = document.getElementById('changepass2').value;

	if(pw.length > 5){

		if(pw != '' && pwTwo != ''){ // 비밀번호 확인란까지 입력해야 실행
			if(pw == pwTwo){       // 일치할때
	
				$("#password_check").css("color","green");
				$("#password_check").css("line-height","17px");
				$("#password_check").text("비밀번호 일치");
				pwFlag2 = true; // 플래그값 true
				find=1;
			}else{  // 일치하지 않을때
	
				$("#password_check").css("color","red");
				$("#password_check").css("line-height","17px");
				$("#password_check").text("비밀번호 불일치!");
				pwFlag2 = false;        // 플래그값 false
				find=0;
			}
		}
	}else{
		$("#password_check").css("color","red");
		$("#password_check").css("line-height","17px");
		$("#password_check").text("비밀번호는 최소 6자리 이상!");
		pwFlag2 = false;        // 플래그값 false
		find=0;
	}
	if( pwTwo == '' || pwTwo == 'undifined'){

		$("#password_check").css("color","red");
		$("#password_check").css("line-height","17px");
		$("#password_check").text("입력하세요!");
		pwFlag2 = false;        // 플래그값 false
		find=0;
	}
}
