

function notice_onload() {

	//페이징 호출
	notice_count();
	
	noticehide();
	boardList();

	$('#btnWrite').on('click', function(){
		$("#noticeList").fadeOut(100, function(){
			//form.reset();
			$("#image").show();
			$("#btitle1").val("");
			$("#image").val("");
			$("#bcontent1").val("");
			$("#btnBoUpdate").css("display","none");
			$("#contentInsert").show(500);
			$('#btnBoAdd').css("display","");
		});
		
	});

	$("#btnBoReturn").on("click", function(){
		boardList();
	});
	$('#btnBoAdd').on('click', function() {
		noticehide();
		$("#contentInsert").css("display","");
		enBfurl=$("#image").val();
		if($("#btitle1").val()==""){
			alert("제목을 입력하여주세요");
			$("#btitle1").focus();
			return false;
		}
		if($("#bcontent1").val()==""){
			alert("내용을 입력하여주세요");
			$("#bcontent1").focus();
			return false;
		}
		
		$('#serverInfoForm').ajaxSubmit({
			url : 'BoardUpload/addPhoto.do',
			data : {
				btitle: $("#btitle1").val(),
				bcontent: $("#bcontent1").val(),
				bdate: $("#bdate1").val(),
				bfurl: $("#image").val(),
				bfurl2: enBfurl,
			},
			type : 'post',
			dataType : 'json',
			success : function() {
				alert('등록 성공');	
				notice_count();
				boardList();
			}
		});
	});


	$('#content').on('click', '#btnDelete', function() {
		var bno_del = bno;//$('.titleNumber').attr('no');
		var input = confirm("삭제 하시겠습니까?");

		if(input == true){
			$.post("board/delete.do", 
					{
				bno: bno_del
					},
					function(result) {
						if(result.status == "success") {
							alert('글 삭제 성공');
							boardList();
						} else {
							alert("삭제중 에러가 발생하였습니다.\n 잠시 후 다시 시도해 주시기 바랍니다.");
						}
					},
			"json");
		} else {
			alert('취소되었습니다');
		}

	
	});
	$('#confirm').on('click', function() {
		boardList();
	});
	
	//업데이트 화면 보이기
	$('#content').on('click', '#btnUpdate', function() {
		var bno_del = bno;
		
		$.getJSON("board/view.do?bno=" + bno, function(result) {

			if(result.status == "success") {	
				noticehide();
				$("#image").hide();
				$("#contentInsert").css("display","");
				$("#btnBoUpdate").css("display","");
				$("#btnBoAdd").css("display","none");
				var view = result.data;
				$("#btitle1").val(view.btitle);
				$("#bcontent1").text(view.bcontent);

				var url = view.bfurl2;
				var split = url.split("\\");
				$("#fileDown_url").find("*").remove();	
				$("#fileDown_url").append($("<a>").attr("href",
						"file/" +view.bfurl).attr("download",split[2]).text(split[2]));

				$("#image").val(view.bfurl2);

			} else {
				alert("실행중 오류발생!");
			};
		});	


	//버튼 업데티트 눌렀을때
		$('#btnBoUpdate').on('click', function() {
			
			if($("#btitle1").val()==""){
				alert("제목을 입력하여주세요");
				$("#btitle1").focus();
				return false;
			}
			if($("#bcontent1").val()==""){
				alert("내용을 입력하여주세요");
				$("#bcontent1").focus();
				return false;
			}
			
			var input = confirm("수정 하시겠습니까?");

			if(input == true){
				$.post("board/update.do", 
						{
					bno: bno_del,
					btitle: $('#btitle1').val(),
					bcontent: $('#bcontent1').val()
					//bfurl:$('#bfurl2').val(),
						},					
						function(result) {
							if(result.status == "success") {
								boardList();
							} else {
								alert("수정중 에러가 발생하였습니다.\n 잠시 후 다시 시도해 주시기 바랍니다.");
							}
						},
				"json");
			} else {
				alert('취소되었습니다');
			}
		});


	});


}

function notice_count(){
	$.getJSON("board/count.do",function(result){
		if(result.status == "success"){
			var count = parseInt(result.data);
			
			var totalPage = Math.ceil(count / 10);
			
			$("#notice_paging").paginate({
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
				onChange     			: function(pageNo){
						var wd = $(".jPag-pages").css("width");
						
						wd = parseInt(wd) +5; 
						$(".jPag-pages").css("width", wd);
						boardList(pageNo);
					  }
				
			});
			var wd = $(".jPag-pages").css("width");
			
			wd = parseInt(wd) +5; 
			$(".jPag-pages").css("width", wd);
			boardList();
		}
	});
}


function boardList(pageNo) {
	
	if(pageNo == undefined){
		pageNo= 1;
	}
	noticehide();
	$("#noticeList").css("display","");
	if(loginInfo==undefined || loginInfo.level!=9){
		$("#btnWrite").css("display","none");
	}
	$.ajax('board/boardList.do?pageNo='+ pageNo, {			
		type:'GET',
		success: function(result){
			if(result.status == 'success'){	
				$("#tableContent tr").remove();	
				var list = result.data;
				for (var i =0 ; i< list.length ; i++){
					$('<tr>').addClass('titleNumber' ).attr("no",list[i].bno)
					.append($('<td>').text(list[i].bno))
					.append($("<td class='noticeTitle'>").text(list[i].btitle))
					.append($('<td>').text(list[i].bdate))
					.append($('<td>').text(list[i].bcount))
					.appendTo('#tableContent');
				}


				$('.titleNumber').on('click', function(){
				
					
					bno = $(this).attr("no");

					$.getJSON("board/view.do?bno=" + bno, function(result) {

						if(result.status == "success") {	
							noticehide();
							$("#contentViews").css("display","");
							var view = result.data;
							$("#bno2").text(view.bno);
							$("#btitle2").text(view.btitle);
							var cotents = view.bcontent.replaceAll("\n","<br>");
							$("#bcontent2").html(cotents);
							
							if(loginInfo==undefined || loginInfo.level!=9){
								$("#btnUpdate").css("display","none");
								$("#btnDelete").css("display","none");
							}
							
							var url = view.bfurl2;
							var split = url.split("\\");
							$("#fileDown_url2").find("*").remove();		
							$("#fileDown_url2").append($("<a>").attr("href",
									"file/" +view.bfurl).attr("download",split[2]).text(split[2]));

							$("#image2").val(view.bfurl);
							
						} else {
							alert("실행중 오류발생!");
						};
					});		
				});

			}
		}
	});
}


function noticehide(){
	$("#noticeList").css("display","none");
	$("#contentInsert").css("display","none");
	$("#contentViews").css("display","none");
}