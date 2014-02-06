package net.bitacademy.java41.controls.board;

import java.io.File;
import java.io.PrintWriter;
import java.io.StringWriter;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import net.bitacademy.java41.services.BoardUploadService;
import net.bitacademy.java41.vo.Board;
import net.bitacademy.java41.vo.JsonResult;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@Controller
@RequestMapping("/BoardUpload")
public class BoardUploadControl {
	@Autowired BoardUploadService boardUploadService;
	@Autowired ServletContext sc;
	
	long currTime = 0;
	int count = 0;
	
	@RequestMapping("/addPhoto")
	@ResponseBody
	public Object add(Board board, HttpServletRequest request) throws Exception {
		MultipartHttpServletRequest multi = (MultipartHttpServletRequest) request;
		MultipartFile photo = multi.getFile("image1");
		
		if(photo !=null && photo.getSize()>0  ){
			String filename = this.getNewFileName();
			String path = sc.getAttribute("rootRealPath") + "file/" + filename;
			photo.transferTo(new File(path));
			board.setBfurl(filename);
		}
		
		JsonResult jsonResult = new JsonResult();

		try {
			boardUploadService.addFileUpload(board);
			jsonResult.setStatus("success");
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
	
	
	
	@RequestMapping("/photoList")
	@ResponseBody
	public Object photoList(Board board) throws Exception {
		JsonResult jsonResult = new JsonResult();
		try {
			jsonResult.setData(boardUploadService.getPhotoList());
			jsonResult.setStatus("success");
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}
	
	@RequestMapping("/photoDelete")
	@ResponseBody
	public Object delete(int ino) throws Exception {
		JsonResult jsonResult = new JsonResult();
		
		try {
			boardUploadService.photoDelete(ino);
			jsonResult.setStatus("success");
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}
	
	@RequestMapping(value="/photoUpdate",method=RequestMethod.POST)
	@ResponseBody
	public Object Update(Board board, HttpServletRequest request) throws Exception {
		MultipartHttpServletRequest multi = (MultipartHttpServletRequest) request;
		MultipartFile photo = multi.getFile("image3");
		if(photo.getSize()>0){
			String filename = this.getNewFileName();
			String path = sc.getAttribute("rootRealPath") + "file/" + filename;
			photo.transferTo(new File(path));
			board.setBfurl(filename);
		}
		
		JsonResult jsonResult = new JsonResult();

		try {
			boardUploadService.photoUpdate(board);
			jsonResult.setStatus("success");
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}
}