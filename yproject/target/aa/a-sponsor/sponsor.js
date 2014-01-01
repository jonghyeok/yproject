
function sponsor_onload(){
	
	load_sponsor_Data();
	$("#slider").dateRangeSlider();
	
}




function load_sponsor_Data(){
	
	$.getJSON("sponser/getmysonsorData.do?id=" + loginInfo.id, function(result) {
		if(result.status == "success"){
		
			var data = result.data;
			
			console.log(result.data);
			
			$("#sponser_table_mid").text(data.mid);
			$("#sponser_table_mname").text(data.mname);
			$("#sponser_table_mphone").text(data.mphone);
			$("#sponser_table_spacname").text(data.spacname);
			$("#sponser_table_spname").text(data.spname);
			$("#sponser_table_sppc_string").text(data.sppc_string);

			if(data.valanceRecord != null){
				

				var valance_data = data.valanceRecord;
				
				var valance_total=0;
				
				$('.mysponser_valance_tbody tr').remove();
				
				for(var i=0;i<valance_data.length;i++){
					var table = $('.mysponser_valance_tbody');
						table.append($("<tr>")
								.append($("<td>").text(i+1))
								.append($("<td>").text(valance_data[i].spddate))
								.append($("<td>").text(data.spacname))
								.append($("<td>").text(valance_data[i].spdincome))
								.append($("<td>").text(valance_data[i].spdwhere))
						);
						
						valance_total+=valance_data[i].spdincome;
				}
				
				$("#mysponser_valance_total_count").text(valance_data.length+"회 ");
				$("#mysponser_valance_total").text(valance_total+"원 ");
					
				
				
			}else{
				
				
				$('.mysponser_valance_tbody tr').remove();
				var table = $('#mysponser_valance_tbody');
				table.append($("<tr>").append($("<td>").attr("colspan",5).text("자료가 없습니다.")));
						
	
				
				
				
			}
			
		}else{
			alert("서버에 문제가 발생하였습니다. 잠시 후 다시 시도해 주시기 바랍니다.");
		}
	});


}



