var loginInfo=null;

var IE_h = 1;

$(document).ready(function () {
	//header.html 로드
	
	if(IE_ver == false){
	
	}else if(IE_ver > 9){

		IE_h = crossieheight();
		
		$("#teaminfoFrame").attr("height",(IE_h-100));
		
	}else if(IE_ver == 9){
		
		IE_h = crossieheight();

	}else if(IE_ver < 8){

		alert("현재 접속하신 브라우저의 버전은 IE"+IE_ver+" 입니다.\n 버전이 오래되어 페이지가 지원하지 않습니다.");

		return false;
	}
	
	
	loginfo();
	
	
	$(".dropdown-select").on("change",function(){

		if($(".dropdown-select").val()==0){
			
		}else if($(".dropdown-select").val()==1){
			window.open('https://yjh10.com:46393/','_blank');
		}else if($(".dropdown-select").val()==2){
			window.open('http://twtkr.com/slion10','_blank');
		}else if($(".dropdown-select").val()==3){
			window.open('https://www.facebook.com/yjh10','_blank');
		}else if($(".dropdown-select").val()==4){
			window.open('http://happylog.naver.com/yjh10.do','_blank');
		}
		
	});
	

	//*******************************************************
	
	$("#headerjs").load("a-header/header.html");
	
	$('body').on("managerManagement", function(event) {
		$("#content2").css("display","none");
		$("#content").css("display","");
		$('.gldp-default').css('display', 'none');
		$("#content").load("a-manager/manager.html", function() {
			manager_onload();
		});
	});		
	
	$('body').on("adminManagement", function(event) {
		$("#content2").css("display","none");
		$("#content").css("display","");
		$("#content").load("a-admin/admin.html", function() {
			$('.gldp-default').css('display', 'none'); // 달력 없애기
			admin_onload();
		});
	});		
	$('body').on("teamManagement", function(event) {

		//$("#content2").css("display","");
		//$("#content").css("display","none");
		//$("#teaminfoFrame").css("display","");
		$("#mainslide").css("display","none");
		$("#content").load("a-team/teamInfo.html", function() {
			$('.gldp-default').css('display', 'none'); // 달력 없애기
			teaminfo_onload();
		});
	});	
	
	$('body').on("sponsorManagement", function(event) {
		$("#content2").css("display","none");
		$("#content").css("display","");
		$('.gldp-default').css('display', 'none');
		$("#content").load("a-sponsor/sponsor.html", function() {
			sponsor_onload();
		});
	});	
	
	
	$('body').on("noticeManagement", function(event) {
		$("#content2").css("display","none");
		$("#content").css("display","");
		$('.gldp-default').css('display', 'none');
		$("#content").load("a-notice/notice.html", function() {
			notice_onload();
		});
	});	
	
	$('body').on("galleryrManagement", function(event) {
		$("#content2").css("display","none");
		$("#content").css("display","");
		$('.gldp-default').css('display', 'none');
		$("#content").load("a-gallery/gallery.html", function() {
			if (loginInfo != undefined){
				if (loginInfo.level == 9 || loginInfo.level ==3) {
					gallery_onload();
					
				} else {
					
					$('#PhotoAddImg').css('display', 'none'); // 사진 추가 버튼 없애기.
					
					$('#btnPhotoUpdate').css('display', 'none'); 
					$('#btnPhotoDelete').css('display', 'none');
					$('#btnPhotoCancel').css('display', 'none');
					gallery_onload();
				}
			} else {
				$('#PhotoAddImg').css('display', 'none'); // 사진 추가 버튼 없애기.
				
				$('#btnViewUpdate').css('display', 'none'); 
				$('#btnPhotoUpdate').css('display', 'none'); 
				$('#btnPhotoDelete').css('display', 'none');
				$('#btnPhotoCancel').css('display', 'none');
				gallery_onload();
			}
		});
	});		
	
});	



/*엔터키 처리
	function keypressed() {
	 var key=event.keyCode;
	 if(key==13) {return false; }
	}
	document.onkeydown=keypressed;
 */



	
//세션 처리 //
	function loginfo() {
		$.getJSON("auth/loginInfo.do", function(result) {
			if(result.status == "success") {
				loginInfo = result.data;
					
				if(loginInfo.level==0 || loginInfo.level==1 || loginInfo.level==2 || loginInfo.level==9 ){ //일반회원
					$('#open-button').css('display','none');
					$('#headerLogin').css('display','none');
					$('#btnlogout').css('display','');
					$('#open-myinfo').css('display','');
					$('#welcome').text(loginInfo.name+"님 반갑습니다.");
				
					//headerCheck();
				
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
	
	
	
	/*테이블 정렬 관련.. 시작*/

	var sortedOn = 0;

	function SortTable(sortOn) {

		var table = document.getElementById('results');
		var tbody = table.getElementsByTagName('tbody')[0];
		var rows = tbody.getElementsByTagName('tr');

		var rowArray = new Array();
		for (var i=0, length=rows.length; i<length; i++) {
			rowArray[i] = rows[i].cloneNode(true);
		}
		
		if (sortOn == sortedOn) { rowArray.reverse(); }
		else {
			sortedOn = sortOn;
			if (sortedOn == 0) {
				rowArray.sort(RowCompareNumbers);
			}
			else if (sortedOn == 3) {
				rowArray.sort(RowCompareDollars);
			}
			else {
				rowArray.sort(RowCompare);
			}
		}
		
		var newTbody = document.createElement('tbody');
		for (var i=0, length=rowArray.length; i<length; i++) {
			newTbody.appendChild(rowArray[i]);
		}
		
		table.replaceChild(newTbody, tbody);
	}

	function RowCompare(a, b) {

		var aVal = a.getElementsByTagName('td')[sortedOn].firstChild.nodeValue;
		var bVal = b.getElementsByTagName('td')[sortedOn].firstChild.nodeValue;
		return (aVal == bVal ? 0 : (aVal > bVal ? 1 : -1));
	}

	function RowCompareNumbers(a, b) {

		var aVal = parseInt(a.getElementsByTagName('td')[sortedOn].firstChild.nodeValue);
		var bVal = parseInt(b.getElementsByTagName('td')[sortedOn].firstChild.nodeValue);
		return (aVal - bVal);
	}

	function RowCompareDollars(a, b) {

		var aVal = parseFloat(a.getElementsByTagName('td')[sortedOn].firstChild.nodeValue.substr(1));
		var bVal = parseFloat(b.getElementsByTagName('td')[sortedOn].firstChild.nodeValue.substr(1));
		return (aVal - bVal);
	}

	/*테이블 정렬 관련 끝!*/
	
	
	/*크로스 브라우징 관련 페이지 사이즈 알기*/
	
	function crossieheight(){
		var height11 = "innerHeight" in window 
		? window.innerHeight
				: document.documentElement.offsetHeight; 
		return height11;
	}
