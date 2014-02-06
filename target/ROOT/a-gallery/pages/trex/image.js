var imgInfo;

//등록버튼(사진 본문에 삽입)
$('#photoInContent').on('click', function() {
	initUploader();
});

function initUploader(){
	
	var _opener = PopupUtil.getOpener();
	if (!_opener) {
		alert('잘못된 경로로 접근하셨습니다.');
		return;
	}

	var _attacher = getAttacher('image', _opener);
	registerAction(_attacher);

	if (typeof(execAttach) == 'undefined') { //Virtual Function
		return;
	}
	
	for (var i=0; i < imgInfo.length; i++){ //랭스 처리해야함.
		var _mockdata = {
				'imageurl': 'file/' + imgInfo[3*i],
				'filename': imgInfo[3*i],
				'filesize': imgInfo[(3 * i) + 1],
				'imagealign': 'C',
				'originalurl': imgInfo[(3 * i) + 2],
				'thumburl': '',
				'width' : '700',
				'height' : '500'
		};
		execAttach(_mockdata);
		closeWindow();
	}
}
//사진 올리기 버튼 클릭했을 시.
$('#photoUpload').on('click', function() {
	onlyPhotoAdd();
});

function onlyPhotoAdd() {
	var openerWin = PopupUtil.getOpener();
	$('#serverInfoForm').ajaxSubmit({
		url : '../../../gallery/addPhoto.do',
		data : {
			ino : openerWin.ino, // 처리 해야 함.
			iurl : $("#image").val()
		},
		type : 'post',
		dataType : 'json',
		success : function(photoInfo) {
			var jsonData = photoInfo.data;
			imgInfo = jsonData;
			
			$('#photoListForm').css('display', '');
			$('#photoAddForm').css('display', 'none');
			alert('사진 등록 성공');
		}
	});
}
