 var str = "";
 var now = new Date();
 var year = now.getFullYear(); //2013 
 var month = now.getMonth();
 var day = now.getDate(); //4
 
 var today_year = now.getFullYear(); //2013 
 var today_month = now.getMonth();
 var today_day = now.getDate(); //4
 
 var adateList=0;
 var tno;
 var ano = 0;
 var call=0;
 
function calender_onload(tno1){
	tno=tno1;
	sgeteventData(tno);
//	process();
	
	var pYear = document.getElementById("pYear");
	pYear.onclick = Yearminus;
	var pMonth = document.getElementById("pMonth");
	pMonth.onclick = Monthminus;
	var nMonth = document.getElementById("nMonth");
	nMonth.onclick = Monthplus;
	var nYear = document.getElementById("nYear");
	nYear.onclick = Yearplus;
	
	
	//오늘 날짜 클릭하기
	$( "#today" ).click(function() {
		alert( "Handler for .click() called." );
		todayShow();
	});
	
	$("#disp").on("click", ".have_activity",function(){todayShow($(this).attr("dano"))});
	

}

function process() {
    //alert(year+"/"+(month+1)+"/"+day);
    //해당 달의 1일이 무슨 요일이냐?
    var firstDay = new Date(year, month, 1);
    var yoil = firstDay.getDay(); //요일 얻기. 0~6(일~토)
    //해당 달의 날 수 얻기
    var nalsu = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    if ((year % 4 === 0) && (year % 100 !== 0) || (year % 400 === 0)) {
         nalsu[1] = 29; //윤년 체크
    }

    geteventData(tno,yoil, nalsu[month], year, month + 1, day);
    document.getElementById("disp").innerHTML = str;
   document.getElementById("etc").style.display = "block";
}



function makeData(yoil, nalsu, year, month, day,adateList) {
    str = ""; //출력 결과를 위한 문자열 더하기
    str += "<table width='70%' align='center' border='1'>";
    str += "<tr style='font-size:20px'><tr><th colspan='7'>" + year + "년"
      + month + "월</th></tr>";
    str += "<tr style=background-color:#abcdef>";
    var weekTitle = new Array("일", "월", "화", "수", "목", "금", "토");
    for ( var a = 0; a < weekTitle.length; a++) {
     str += "<th>" + weekTitle[a] + "</th>";
    }
    str += "</tr>";
    //날 수 채우기
    var no = 1;
    var currentCell = 0;
    var ju = Math.ceil((nalsu + yoil) / 7); //몇주
    var adate;
    var ayear;
    var amonth;
    var aday;
    //*********************
    for ( var row = 1; row <= ju; row++) {
         str += "<tr>"; 
         for ( var col = 1; col <= 7; col++) {

              if (no > nalsu)
                  break; //1부터 날수 까지만  숫자 채우기
              if (currentCell < yoil) {
                   str += "<td>&nbsp</td>";
                   currentCell++;
              } else {
            	  var calla=3;
            	  var ano=0;
            	  
            	  if(adateList.length >0){
            	  
            	  for (var i = 0; i < adateList.length; i++) {

              		adate = adateList[i].adate.split("-");
              		ayear = adate[0];
              		amonth = adate[1];
              		aday = adate[2];
	                 	if (no === day && month == (today_month+1) && year==today_year && year==ayear && month==amonth && no==aday) { //오늘(O) + 자료(O)
	                 		ano=adateList[i].ano;
	                 		calla=0;
	              		}else if (year==ayear && month==amonth && no==aday) { //오늘(X) + 자료(O)
	              			ano=adateList[i].ano;
	                 		calla=1;
	              		}else if (no === day && month == (today_month+1) && year==today_year) { //오늘(O) + 자료(X)
	              			ano=adateList[i].ano;
	                 		calla=2;
	              		} else {
	                 		
	              		}
	                 	
	                 	if(calla==0){
	                 		addstr(ano,calla,no);
	                 		break;
	                 	}else{
	                 		if(i == adateList.length-1){
		                 		addstr(ano,calla,no);
		                 	}	
	                 	}
  				}
              }else{
            	  if (no === day && month == (today_month+1) && year==today_year) { //오늘(O) + 자료(X)
               		calla=2;
            		} else {
               		
            		}
            	  addstr(ano,calla,no);
              }
              
              	no++;
              }
            	  
            }
            str += "</tr>";
        }
    str += "</table>";
}
function Yearminus() {
    year--;
    process();
}
function Monthminus() {
    if (month == 0) {
         year--;
         month = 11;
    }else{
         month--;
    }
    process();
}
function Yearplus() {
    year++;  
    process();
}
function Monthplus() {
    if (month > 10) {
         year++;
         month = 0;
    }else{
    month++;
    }  
    process();
}
function todayShow(ano) {
	kamdok_update_sidebar(ano);
}

function sgeteventData(tno){
	 
	 $.getJSON("teamp/getAdate.do?tno=" + tno, function(result) {
			if(result.status == "success") {
			adateList = result.data;
			sendmainadateList(result.data);
		}else{
			alert("잘못된 요청입니다. 잠시 후 다시 시도해 주시기 바랍니다.");
		}
	});
	 process();
}

function geteventData(tno,yoil, nalsu, year, month, day){
	 
	 $.getJSON("teamp/getAdate.do?tno=" + tno, function(result) {
			if(result.status == "success") {
			adateList = result.data;
			sendmainadateList(result.data);
			makeData(yoil, nalsu, year, month, day,adateList); 
		}else{
			alert("잘못된 요청입니다. 잠시 후 다시 시도해 주시기 바랍니다.");
		}
	});
	 
}

function sendmainadateList(adateList1){
	adateList=adateList1;
}

function addstr(ano,calla,no){
	 
		//onsole.log(ano + "********" + calla + "*********" + no);
	
	  if (calla==0) { //오늘(O) + 자료(O)
			str += "<td id='today' class='have_activity' dano='"+ano+"' style='color:green'><b>" + no + "</b></td>";
		}else if (calla==1) { //오늘(X) + 자료(O)
			str += "<td class='have_activity' dano='"+ano+"' style='color:blue'><b>" + no + "</b></td>";
		}else if (calla==2) { //오늘(O) + 자료(X)
			str += "<td id='today' style='color:red'><b>" + no + "</b></td>";
		} else {
			str += "<td>" + no + "</td>";
		}
	
}
