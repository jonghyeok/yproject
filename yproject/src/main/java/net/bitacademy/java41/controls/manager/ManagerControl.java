package net.bitacademy.java41.controls.manager;

import java.io.File;
import java.io.PrintWriter;
import java.io.StringWriter;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import net.bitacademy.java41.services.ManagerService;
import net.bitacademy.java41.services.TeamPropertyService;
import net.bitacademy.java41.vo.JsonResult;
import net.bitacademy.java41.vo.TeamProperty;
import net.bitacademy.java41.vo.TeamStudent;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@Controller
@RequestMapping("/manager2")
public class ManagerControl {
	@Autowired ManagerService managerService;
	@Autowired TeamPropertyService teamPropertyService;
	@Autowired ServletContext sc;
	
	long currTime = 0;
	int count = 0;
	

	@RequestMapping(value="/teamStudentUpdate", method=RequestMethod.POST)
	@ResponseBody
	public Object teamStudentUpdate(TeamStudent teamStudent,HttpServletRequest request) throws Exception {
		
		MultipartHttpServletRequest multis = (MultipartHttpServletRequest) request;
		MultipartFile photos = multis.getFile("ts_image");
		if(photos != null){
			String filename = this.getNewFileName();
			String path = sc.getAttribute("rootRealPath") + "file/" + filename;
			photos.transferTo(new File(path));
			teamStudent.setTsphoto(filename);
		}
		JsonResult jsonResult = new JsonResult();
		try {
			managerService.teamStudentUpdate(teamStudent);	
			jsonResult.setStatus("success");
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setData(e);
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}
	
	
	@RequestMapping(value="/teamstudentlist")
	@ResponseBody
	public Object TeamStudentList(TeamStudent teamStudent) throws Exception {
		
		JsonResult jsonResult = new JsonResult();
		try {
			jsonResult.setData(managerService.TeamStudentList(teamStudent));	
			jsonResult.setStatus("success");
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}
	
	@RequestMapping("/deletestudent")
	@ResponseBody
	public Object deletestudent(TeamStudent teamStudent) throws Exception {
		JsonResult jsonResult = new JsonResult();
		try {
			jsonResult.setStatus("success");
			jsonResult.setData(managerService.deletestudent(teamStudent));
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}
	
	@RequestMapping("/serchjoinmemberId")
	@ResponseBody
	public Object serchjoinmemberId(TeamStudent teamstudent) throws Exception{
		JsonResult jsonResult = new JsonResult();
		try {
				jsonResult.setStatus("success");
				jsonResult.setData(managerService.serchjoinmemberId(teamstudent));
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}
	
	@RequestMapping(value="/newStudentadd", method=RequestMethod.POST)
	@ResponseBody
	public Object add(TeamStudent teamStudent, HttpServletRequest request) throws Exception {
		MultipartHttpServletRequest multi = (MultipartHttpServletRequest) request;
		MultipartFile photo = multi.getFile("ts_image");
		if(photo != null){
			String filename = this.getNewFileName();
			String path = sc.getAttribute("rootRealPath") + "file/" + filename;
			photo.transferTo(new File(path));
			teamStudent.setTsphoto(filename);
		}
		JsonResult jsonResult = new JsonResult();
		try {
			managerService.teamStudentAdd(teamStudent);		
			jsonResult.setStatus("success");
		
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}
	
	@RequestMapping("/serchmemberId")
	@ResponseBody
	public Object serchmemberId(String name) throws Exception{
		JsonResult jsonResult = new JsonResult();
		try {
				jsonResult.setStatus("success");
				jsonResult.setData(managerService.serchmemberId(name));
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}
	
	
	@RequestMapping("/view")
	@ResponseBody
	public Object view(int tsbackno) throws Exception {
		JsonResult jsonResult = new JsonResult();
		try {
			jsonResult.setData(managerService.memberView(tsbackno));
			jsonResult.setStatus("success");
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}
	
	@RequestMapping("/studentList")
	@ResponseBody
	public Object studentList(String ano) throws Exception {
		JsonResult jsonResult = new JsonResult();
		TeamProperty teamProperty = new TeamProperty();
		teamProperty.setAno(Integer.parseInt(ano));		
		try {
			jsonResult.setStatus("success");  
			jsonResult.setData(managerService.getStudentList(teamProperty));
			
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}
	
	@RequestMapping(value="/rollBookAdd", method=RequestMethod.POST)
	@ResponseBody
	public Object add(TeamProperty teamProperty) throws Exception {
		JsonResult jsonResult = new JsonResult();
		try {
			managerService.rollBookSend(teamProperty);			
			jsonResult.setStatus("success");
			
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}
	
	@RequestMapping("/personalList")
	@ResponseBody
	public Object persnalList(TeamProperty teamProperty) throws Exception {
		JsonResult jsonResult = new JsonResult();
		try {
			jsonResult.setStatus("success");
			jsonResult.setData(managerService.getPersonalList());
			
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
		return "member_" + millis + "_" + (++count);
	}
}













