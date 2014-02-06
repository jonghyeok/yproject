var ino;

function gallery_onload() {
	
	check_count();
	
	$("#txtFilter").on("keypressed" , function(){
		$('#txtFilter').val("");
	});
	
//	photoListForm();
	
	$('.btnBackList').on('click', function() {
		check_count();
		if(event.preventDefault){ event.preventDefault();}
		 else{event.returnValue = false;}
		$('#contentView').css('display', 'none');
		$('#photoAddForm').css('display', 'none');
		$('#photoListForm').css('display', '');
	});
	
	$('#photoListForm').css('display', '');
	$('#photoAddForm').css('display', 'none');
	$('#contentView').css('display', 'none');
	
	// 갤러리 화면에서 + 클릭했을시.
	$('#PhotoAddImg').on('click', function() { 
		$('textarea[name="content"]').remove();
		$('.writer').text(loginInfo.id);
		
		// #1 테이블 만들기.
		$.post("gallery/addPhotoTable.do", 
				{	
			mid: loginInfo.id, 
				},
				function(result) {
					if(result.status == "success") {
						var data = result.data;
						ino = data.ino;
					} else {
						alert("갤러리 테이블 만들기 오류발생!");
					}
				},
		"json");
		
		$('#btnPhotoDelete').css('display', 'none');
		$('#photoListForm').css('display', 'none');
		$('#btnPhotoUpdateSend').css('display', 'none');
		$('#btnPhotoAdd').css('display', '');
		$('#photoAddForm').css('display', '');
		$('.photoTitle').val("");

		Editor.modify({
			"attachments" : function() { /* 저장된 첨부가 있을 경우 배열로 넘김, 위의 부분을 수정하고 아래 부분은 수정없이 사용 */
				var allattachments = [];
				return allattachments;
			}(),
			"content" : " ",
			/* 내용 문자열, 주어진 필드(textarea) 엘리먼트 */
		});	
		
		$('.photoTitle').attr('readonly', false);
//		$('#photoContent').attr('readonly', false);
	});
	
	$('#btnPhotoAdd').on('click', function() {
		check_count();
		saveContent();
	});
	
	// 수정 버튼 눌렀을 시.
	$('#btnViewUpdate').on('click', function() {
		loadContentUpdate();
		$('#btnPhotoUpdateSend').css('display', '');
		$('#photoAddForm').css('display', '');
		$('#btnPhotoAdd').css('display', 'none');
		$('#contentView').css('display', 'none');
		$('#btnPhotoDelete').css('display', 'none');
		$('.photoTitle').attr('readonly', false);
		$('textarea[name="content"').css('display', 'none');
		if(event.preventDefault){ event.preventDefault();}
		 else{event.returnValue = false;}
	});
	
	//수정완료 버튼
	$('#btnPhotoUpdateSend').on('click', function() {
		photoUpdate();
		check_count();
	});
	
	//삭제 버튼
	$('#btnPhotoDelete').on('click', function() {
		var del = confirm('삭제 하시겠습니까?');
		if (del == true) {
			photoDelete(ino);
		}
	});
	
	$("#gallerySearch").on("click",function(){
		var text = $("#txtFilter").val();
		
		$.ajax("gallery/listSearch.do?text=" + text, {
			type:'GET',
			success: function(result){
				if(result.status == 'success'){		
					$(".searchPhoto").remove();
					
					var list = result.data;
					for(var i=0; i < list.length; i++){
						if(i == 0) {
							$('<li>').addClass('span3 searchPhoto').attr('name', list[i].ititle)
							.append($("<div>").addClass('work photoClick').css('height', '220px')
									.append($('<a>').attr('href', '#')
											.append($('<img>').css('width','215px').css('height','185px').attr('data-ino', list[i].ino).attr('src', 'file/' + list[i].iurl)))
											.append($('<h4>').text(list[i].ititle))
											.append($('<p>').css('line-height', '0').text(list[i].iupdate)))
											.appendTo('.portfolio-img');
							
						} else if (list[i-1].ino != list[i].ino ){
							$('<li>').addClass('span3 searchPhoto').attr('name', list[i].ititle)
							.append($("<div>").addClass('work photoClick').css('height', '220px')
									.append($('<a>').attr('href', '#')
											.append($('<img>').css('width','215px').css('height','185px').attr('data-ino', list[i].ino).attr('src', 'file/' + list[i].iurl)))
											.append($('<h4>').text(list[i].ititle))
											.append($('<p>').css('line-height', '0').text(list[i].iupdate)))
											.appendTo('.portfolio-img');	
						} 
						}
					
				}}
			
		});
		
	});
	
	$('#btnPhotoCancel').on('click', function() {
		Editor.modify({
			"attachments" : function() { /* 저장된 첨부가 있을 경우 배열로 넘김, 위의 부분을 수정하고 아래 부분은 수정없이 사용 */
				var allattachments = [];
				return allattachments;
			}(),
			"content" : " ",
			/* 내용 문자열, 주어진 필드(textarea) 엘리먼트 */
		});	
	});
}

// #2 글 내용 DB에 보내는 Function
function photoContent() {
	$.post("gallery/addPhotoContent.do", 
			{	
				ino : ino,
				ititle: $('#titleUpdate').val(),
				icontent: Editor.getContent(),		
			},
			function(result) {
				if(result.status == "success") {
					alert('갤러리 등록 성공');
				} else {
					alert("갤러리 오류발생!");
				}
			},
	"json");
}


function photoUpdate() {
	$.post('gallery/photoUpdate.do',
			{
			ino : ino,
			ititle : $("#titleUpdate").val(),
			icontent : Editor.getContent()
			},
			function(result) {
				if(result.status == 'success') {
					alert('사진 수정 성공');
					if(event.preventDefault){ event.preventDefault();}
					 else{event.returnValue = false;}
					$('#contentView').css('display', 'none');
					$('#photoAddForm').css('display', 'none');
					$('#photoListForm').css('display', '');
					$('li.searchPhoto').remove();
					photoListForm();
				} else {
					alert('사진 수정 중 오류발생');
				}
			}
	);
}

function photoDelete(ino) {
	$.post('gallery/photoDelete.do',
			{
			ino : ino,
			},
			function(result) {
				if(result.status == 'success') {
					alert('사진삭제성공');
					if(event.preventDefault){ event.preventDefault();}
					 else{event.returnValue = false;}
					$('#contentView').css('display', 'none');
					$('#photoAddForm').css('display', 'none');
					$('#photoListForm').css('display', '');
					$('#btnPhotoAdd').css('display', '');
					$('li.searchPhoto').remove();
					photoListForm();
				} else {
					alert('사진삭제 중 오류발생');
				}
			}
	);
}

//galley list paging

function check_count(){
	$.getJSON("gallery/count.do",function(result){
		if(result.status == "success"){
			var count = parseInt(result.data);
			
			var totalPage = Math.ceil(count / 8);
			
			$("#gal_paging").paginate({
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
						photoListForm(pageNo);
					  }
				
			});
			var wd = $(".jPag-pages").css("width");
			
			wd = parseInt(wd) +5; 
			$(".jPag-pages").css("width", wd);
			photoListForm();
		}
	});
	
}

function submit_Event(){
	var text = $("#txtFilter").val();
	if (event.keyCode == 13 && text !="") {      
		// 엔터 키값은 13 입니다.
		$(".demos").css("display","none");
	$.ajax("gallery/listSearch.do?text=" + text, {
		type:'GET',
		success: function(result){
			if(result.status == 'success'){		
				$(".searchPhoto").remove();
				
				var list = result.data;
				for(var i=0; i < list.length; i++){
					if(i == 0) {
						$('<li>').addClass('span3 searchPhoto').attr('name', list[i].ititle)
						.append($("<div>").addClass('work photoClick').css('height', '220px')
								.append($('<a>').attr('href', '#')
										.append($('<img>').css('width','215px').css('height','185px').attr('data-ino', list[i].ino).attr('src', 'file/' + list[i].iurl)))
										.append($('<h4>').text(list[i].ititle))
										.append($('<p>').css('line-height', '0').text(list[i].iupdate)))
										.appendTo('.portfolio-img');
						
					} else if (list[i-1].ino != list[i].ino ){
						$('<li>').addClass('span3 searchPhoto').attr('name', list[i].ititle)
						.append($("<div>").addClass('work photoClick').css('height', '220px')
								.append($('<a>').attr('href', '#')
										.append($('<img>').css('width','215px').css('height','185px').attr('data-ino', list[i].ino).attr('src', 'file/' + list[i].iurl)))
										.append($('<h4>').text(list[i].ititle))
										.append($('<p>').css('line-height', '0').text(list[i].iupdate)))
										.appendTo('.portfolio-img');	
					} 
					}
				
			}}
		
	});
	}else if (event.keyCode == 13 && text ==""){
		$(".demos").css("display","");
		check_count();
	}
}

function photoListForm(pageNo) {
	if(pageNo == undefined){
		pageNo= 1;
	}
	$.ajax('gallery/photoListForm.do?pageNo='+ pageNo, {
	type:'GET',
	success: function(result){
		if(result.status == 'success'){	
			
			$(".searchPhoto").remove();
			var list = result.data;
			for(var i=0; i < list.length; i++){
				if(i == 0) {
					$('<li>').addClass('span3 searchPhoto').attr('name', list[i].ititle)
					.append($("<div>").addClass('work photoClick').css('height', '220px')
							.append($('<a>').attr('href', '#')
									.append($('<img>').css('width','215px').css('height','185px').attr('data-ino', list[i].ino).attr('src', 'file/' + list[i].iurl)))
									.append($('<h4>').text(list[i].ititle))
									.append($('<p>').css('line-height', '18px').text(list[i].iupdate)))
									.appendTo('.portfolio-img');
					
				} else if (list[i-1].ino != list[i].ino ){
					$('<li>').addClass('span3 searchPhoto').attr('name', list[i].ititle)
					.append($("<div>").addClass('work photoClick').css('height', '220px')
							.append($('<a>').attr('href', '#')
									.append($('<img>').css('width','215px').css('height','185px').attr('data-ino', list[i].ino).attr('src', 'file/' + list[i].iurl)))
									.append($('<h4>').text(list[i].ititle))
									.append($('<p>').css('line-height', '18px').text(list[i].iupdate)))
									.appendTo('.portfolio-img');	
				} 
			}
			
			// 검색창에서 X 누르기.
			$('#SearchCancel').on('click', function(event) {
				$('#txtFilter').val("");
				$(".demos").css("display","");
				check_count();
			});
			
			$('.photoClick').on('click', 'img', function() {
				if(event.preventDefault){ event.preventDefault();}
				 else{event.returnValue = false;}
				ino = ($(this).attr('data-ino'));
				loadContent(); // 글 내용을 리뷰한다.
				
//				$('#btnPhotoDelete').css('display', '');
				$('#btnPhotoUpdateSend').css('display', 'none');
				$('#photoListForm').css('display', 'none');
				$('#btnPhotoAdd').css('display', 'none');
				$('#photoAddForm').css('display', 'none');
				$('#contentView').css('display', '');
			});
			
			}}});
}



function saveContent() {
	Editor.save(); // 이 함수를 호출하여 글을 등록하면 된다.
}
// saveContent() 실행시, 아래의 validForm() -> setForm() 실행됨. 
function validForm(editor) {
	var images = editor.getAttachments('image');
	
	if ( $('#titleUpdate').val() == "" ){
		alert('제목을 입력하세요.');
		return false;
	}
	
	if ( images == "" ){
		alert('사진을 삽입하세요.');
		return false;
	}
	
	return true;
}

function setForm(editor) {
	var i, input;
	var form = editor.getForm();
	var content = editor.getContent();
	
	// 본문 내용을 필드를 생성하여 값을 할당하는 부분
	var textarea = document.createElement('textarea');
	textarea.name = 'content';
	textarea.value = content;
	form.createField(textarea);
	
	photoContent(); //글 내용을 DB에 보낸다.
	
	/* 아래의 코드는 첨부된 데이터를 필드를 생성하여 값을 할당하는 부분으로 상황에 맞게 수정하여 사용한다.
         첨부된 데이터 중에 주어진 종류(image,file..)에 해당하는 것만 배열로 넘겨준다. */
	var images = editor.getAttachments('image');
	
	for (i = 0; i < images.length; i++) {
		// existStage는 현재 본문에 존재하는지 여부
		if (images[i].existStage) {
			// data는 팝업에서 execAttach 등을 통해 넘긴 데이터
			input = document.createElement('input');
			input.type = 'hidden';
			input.name = 'attach_image';
			input.value = images[i].data.imageurl;  // 예에서는 이미지경로만 받아서 사용
			form.createField(input);
		}
	}
	
	if(event.preventDefault){ event.preventDefault();}
	 else{event.returnValue = false;}
	
	$('#contentView').css('display', 'none');
	$('#photoAddForm').css('display', 'none');
	$('#photoListForm').css('display', '');
	$('li.searchPhoto').remove();
	photoListForm();
}

function loadContent() {
	$.getJSON("gallery/photoView.do?ino=" + ino, function(result) {
		var list = result.data;
		if(result.status == "success") {
			$(".photoTitle").text(list[0].ititle);
			$(".writer").text(list[0].mid);
			$('#viewForm').html(list[0].icontent);
			$('.photoDay').text(list[0].iupdate);
			
		} else {
			alert("실행중 오류발생!");
		};
	});		
}

function loadContentUpdate() {
	$.getJSON("gallery/photoView.do?ino=" + ino, function(result) {
		if(result.status == "success") {
			var list = result.data;
			
			$(".photoTitle").val(list[0].ititle);
			$(".writer").text(list[0].mid);
			$('.loadContent').val(list[0].icontent);
			$('.photoDay').text(list[0].iupdate);
			
			var attachments = {};
			attachments['image'] = [];
			
			for (var i=0; i < list.length; i++){
				attachments['image']
				.push({
					'attacher' : 'image',
					'data' : {
						'imageurl' : 'file/' + list[i].iurl,
						'filename' : list[i].iurl,
						'filesize' : list[i].isize,
						'originalurl' : '',
						'thumburl' : 'file/' + list[i].iurl
					}
				});
			}
			
			Editor.modify({
				"attachments" : function() { /* 저장된 첨부가 있을 경우 배열로 넘김, 위의 부분을 수정하고 아래 부분은 수정없이 사용 */
					var allattachments = [];
					for ( var i in attachments) {
						allattachments = allattachments.concat(attachments[i]);
					}
					return allattachments;
				}(),
				"content" : $tx("tx_load_content"),
			});
		} else {
			alert("실행중 오류발생!");
		};
	});		
}
