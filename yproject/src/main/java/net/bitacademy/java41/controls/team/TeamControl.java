package net.bitacademy.java41.controls.team;

import java.io.File;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import net.bitacademy.java41.services.TeamPropertyService;
import net.bitacademy.java41.services.TeamService;
import net.bitacademy.java41.vo.JsonResult;
import net.bitacademy.java41.vo.Team;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
@Controller
@RequestMapping("/team")
public class TeamControl {
	@Autowired TeamService teamService;
	@Autowired TeamPropertyService teamPropertyService;
	@Autowired ServletContext sc;
	
	long currTime = 0;
	int count = 0;
	
	@RequestMapping(value="/add", method=RequestMethod.POST)
	@ResponseBody
	public Object add(Team team, HttpServletRequest request) throws Exception {
		MultipartHttpServletRequest multi = (MultipartHttpServletRequest) request;
		MultipartFile photo = multi.getFile("team_image");
		MultipartFile photos = multi.getFile("tk_image");
		if(photo != null && photo.getSize()>0){
			String filename = this.getNewFileName();
			String path = sc.getAttribute("rootRealPath") + "file/" + filename;
			photo.transferTo(new File(path));
			team.setTphoto(filename);
		}
		
		if(photos != null && photos.getSize()>0){
			String filenamee = this.getNewFileName();
			String paths = sc.getAttribute("rootRealPath") + "file/" + filenamee;
			photos.transferTo(new File(paths));	
			team.setTkphoto(filenamee);
		}
		JsonResult jsonResult = new JsonResult();
		
		try {
			teamService.teamAdd(team);			
			jsonResult.setStatus("success");
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}
	
	@RequestMapping(value="/tphotoadd", method=RequestMethod.POST)
	@ResponseBody
	public Object tphotoadd(Team team, HttpServletRequest request) throws Exception {
		MultipartHttpServletRequest multi = (MultipartHttpServletRequest) request;
		MultipartFile photo = multi.getFile("team_image");
		if(photo.getSize()>0){
			String filenames = this.getNewFileName();
			String path = sc.getAttribute("rootRealPath") + "file/" + filenames;
			photo.transferTo(new File(path));
			team.setTphoto(filenames);
		}
		JsonResult jsonResult = new JsonResult();
		try {
			teamService.tphotoadd(team);			
			jsonResult.setStatus("success");
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}
	
	
	@RequestMapping(value="/tkphotoadd", method=RequestMethod.POST)
	@ResponseBody
	public Object tkphotoadd(Team team, HttpServletRequest request) throws Exception {
		MultipartHttpServletRequest multi = (MultipartHttpServletRequest) request;
		MultipartFile photo = multi.getFile("tk_image_a");
		if(photo.getSize()>0){
			String filename = this.getNewFileName();
			String path = sc.getAttribute("rootRealPath") + "file/" + filename;
			photo.transferTo(new File(path));
			team.setTkphoto(filename);
		}
		
		JsonResult jsonResult = new JsonResult();
		
		try {
			teamService.tkphotoadd(team);			
			jsonResult.setStatus("success");
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
	public Object view(int tno) throws Exception {
		JsonResult jsonResult = new JsonResult();
		try {
			jsonResult.setData(teamService.teamView(tno));
			jsonResult.setStatus("success");
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}
	

	@RequestMapping("/view2")
	@ResponseBody
	public Object view2(int tno) throws Exception {
		JsonResult jsonResult = new JsonResult();
		try {
			jsonResult.setData(teamService.teamView2(tno));
			jsonResult.setStatus("success");
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}
	
	
	@RequestMapping(value="/update",method=RequestMethod.POST)
	@ResponseBody
	public Object update(Team team) throws Exception {
		JsonResult jsonResult = new JsonResult();
		try {
			teamService.teamUpdate(team);
			jsonResult.setStatus("success");
			
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}
	
	
	@RequestMapping("/deleteteam")
	@ResponseBody
	public Object deleteteam(Team team) throws Exception {
		JsonResult jsonResult = new JsonResult();
		try {
			teamService.deleteteam(team);
			jsonResult.setStatus("success");
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}

	@RequestMapping("/list")
	@ResponseBody
	public Object list() throws Exception {
		JsonResult jsonResult = new JsonResult();
		try {
			jsonResult.setData(teamService.teamList());
			jsonResult.setStatus("success");
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
			e.printStackTrace();
		}
		return jsonResult;
	}
	
	@RequestMapping("/teaminfoView")
	@ResponseBody
	public Object teaminfoView(Team team) throws Exception {
		JsonResult jsonResult = new JsonResult();
		try {
			List<Object> list = new ArrayList<Object>();
			list.add(0, teamService.teamView(team.getTno()));
			list.add(1, teamService.getStudentList(team.getTno()));
			jsonResult.setData(list);
			jsonResult.setStatus("success");
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
			e.printStackTrace();
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













