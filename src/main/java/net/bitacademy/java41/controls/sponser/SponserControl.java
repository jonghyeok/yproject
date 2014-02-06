package net.bitacademy.java41.controls.sponser;

import java.io.File;
import java.io.FileOutputStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.sql.Date;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import net.bitacademy.java41.services.MemberService;
import net.bitacademy.java41.services.SponserService;
import net.bitacademy.java41.vo.JsonResult;
import net.bitacademy.java41.vo.LoginInfo;
import net.bitacademy.java41.vo.Member;
import net.bitacademy.java41.vo.Sponser;
import net.bitacademy.java41.vo.SponserCheck;
import net.bitacademy.java41.vo.SponserPersonData;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@Controller
@RequestMapping("/sponser")
public class SponserControl {
	@Autowired ServletContext sc;
	@Autowired SponserService sponserService;
	@Autowired MemberService memberService;
	
	long currTime = 0;
	int count = 0; 

	@RequestMapping(value="/addsponser", method=RequestMethod.POST)
	@ResponseBody
	public Object teamStudentUpdate(SponserCheck sponserCheck ,HttpServletRequest request) throws Exception {
		JsonResult jsonResult = new JsonResult();
		
		MultipartHttpServletRequest multi = (MultipartHttpServletRequest) request;
		MultipartFile sponser_xmlfile = multi.getFile("sponser_xlsfile");

		   
		    String type = sponser_xmlfile.getContentType();
		    
		    try {
		    String path = new String();
		    path = sc.getAttribute("rootRealPath") +sponser_xmlfile.getName(); 
		    
		if(type.equals("application/vnd.ms-excel")){
			
			
			if(sponser_xmlfile.getSize()>0){
				String filename = this.getNewFileName();
				path = sc.getAttribute("rootRealPath") + "file/" + filename+".xls";
				sponser_xmlfile.transferTo(new File(path));
			}
			
			sponserCheck.setSpcdata(path);
			
			sponserService.sponsercheckAdd(sponserCheck);
			
			
			
			int i = sponserService.addSponserData(path,sponserCheck.getSpcno());
			
			if(i==1){
				
				List<Sponser> spo = sponserService.getAddData(sponserCheck);
				
				
				if(spo.size()==0){ 
					jsonResult.setStatus("noupdate");
				}else{
					jsonResult.setStatus("success");
					jsonResult.setData(spo);
				}
				
			}else{
				jsonResult.setStatus("failsetdefaultdata");
				
			}
			
		}else if(type.equals("application/vnd.ms-excel.sheet.macroEnabled.12")){
			File f = new File(path);
			f.delete();
			jsonResult.setStatus("heightexcel");
		}else if(type.equals("application/octet-stream")){
			jsonResult.setStatus("nohaveapp");
			
		}else{
			File f = new File(path);
			f.delete();
			jsonResult.setStatus("notype");
		}
		
		
		
		
		
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			e.printStackTrace();
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}
	
	
	@RequestMapping(value="/sponserfind", method=RequestMethod.POST)
	@ResponseBody
	public Object sponserfind(SponserCheck sponserCheck) throws Exception {
		JsonResult jsonResult = new JsonResult();
		
		try {
			if(!sponserCheck.getSpcstart_string().equals("") && !sponserCheck.getSpcstart_string().equals("")){
				
				if(sponserCheck.getSpcstart_string().equals("")){
					sponserCheck.setSpcstart_string(null);
					//sponserCheck.setSpcstart(null);
				}else{
					sponserCheck.setSpcstart(Date.valueOf(sponserCheck.getSpcstart_string()));
				}
				
				if(sponserCheck.getSpcend_string().equals("")){
					sponserCheck.setSpcend_string(null);
					sponserCheck.setSpcend(null);
				}else{
					sponserCheck.setSpcend(Date.valueOf(sponserCheck.getSpcend_string()));
				}
							
			}else{
				sponserCheck.setSpcstart_string(null).setSpcend_string(null);
			}
			if(sponserCheck.getSpcname().equals("")){
				sponserCheck.setSpcname(null);
			}
			
			if(sponserCheck.getSpdname().equals("")){
				sponserCheck.setSpdname(null);
			}
			
			List<Sponser> sponserData = sponserService.getSerchSponserData(sponserCheck);
			jsonResult.setStatus("success");
			jsonResult.setData(sponserData);
			
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			e.printStackTrace();
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		
		return jsonResult;
	}
	
	
	@RequestMapping(value="/getsponserxlsfile", method=RequestMethod.POST)
	@ResponseBody
	public Object getsponserxlsfile(SponserCheck sponserCheck) throws Exception {
		JsonResult jsonResult = new JsonResult();

		String xlsfilename = getNewFileName2();

		List<Member> list = sponserService.getSponsorxlsFile();
		
		Workbook wb = new HSSFWorkbook();

		Sheet sheet = wb.createSheet("sponser");

		Row row = sheet.createRow(0);

		for(int i=0;i<list.size();i++){
			row = sheet.createRow(i);
			row.createCell(0).setCellValue(list.get(i).getName());
			row.createCell(1).setCellValue(list.get(i).getPhone());
		}

		FileOutputStream fileOut;
		
		
		

		try {
			
			String path = sc.getAttribute("rootRealPath") + "file/"+xlsfilename;
			
			
			fileOut = new FileOutputStream(path);
			wb.write(fileOut);
			fileOut.close();
			
			jsonResult.setStatus("success");
			jsonResult.setData("file/"+xlsfilename);
			
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		
		return jsonResult;
		
		
	}
	
	@RequestMapping(value="/getmysonsorData")
	@ResponseBody
	public Object getmysonsorData(String id) throws Exception {
		JsonResult jsonResult = new JsonResult();
		
		try {
			
			SponserPersonData spd = new SponserPersonData();
			
			Member member=new Member();
			member.setId(id);
			
			LoginInfo logininfo = memberService.getUser(id);
			
			spd.setMid(logininfo.getId()).setMphone(logininfo.getPhone()).setMname(logininfo.getName()).setSpacname("").setSpname(logininfo.getName());
			
			if(sponserService.serch_count_torysponser(spd)==0){
				spd.setSppc(0).setSpname("");
				sponserService.make_sponser_data(spd);
				spd.setSpname("아직 지정되지 않았습니다.").setSppc_string("-").setSpacname("아직 지정되지 않았습니다.");
			}else{
				
				spd = sponserService.getmysonsorData(member);
				
				if(spd.getSppc()==0){
					spd.setSppc_string("개인");				
				}else {
					spd.setSppc_string("기업");
				}
				
				if(spd.getSpacname().equals("") || spd.getSpacname()==null){
					spd.setSpacname("아직 지정되지 않았습니다.");
				}else{
					spd.setValanceRecord(sponserService.serch_my_valance(spd));
				}
				
				if(spd.getSpname().equals("")){
					spd.setSpname("아직 지정되지 않았습니다.");
				}
				
			}
			
			
			
			jsonResult.setStatus("success");
			jsonResult.setData(spd);
			
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		
		return jsonResult;
	}
	
	
	
	
	
	
	synchronized private String getNewFileName() {
		long millis = System.currentTimeMillis(); //1000
		if (currTime != millis) {
			currTime = millis;
			count = 0;
		}
		return "sponser_xlsfile_" + millis + "_" + (++count);
	}
	
	

	synchronized private String getNewFileName2() {
		long millis = System.currentTimeMillis(); //1000
		if (currTime != millis) {
			currTime = millis;
			count = 0;
		}
		return "sponsor_" + millis + ".xls";
	}
	
}













