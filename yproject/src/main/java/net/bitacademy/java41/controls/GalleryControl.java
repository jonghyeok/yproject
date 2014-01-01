package net.bitacademy.java41.controls;

import java.io.File;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import net.bitacademy.java41.services.GalleryService;
import net.bitacademy.java41.vo.Gallery;
import net.bitacademy.java41.vo.JsonResult;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@Controller
@RequestMapping("/gallery")
public class GalleryControl {
	@Autowired GalleryService galleryService;
	@Autowired ServletContext sc;
	
	long currTime = 0;
	int count = 0;
	
	@RequestMapping(value="/addPhotoTable",method=RequestMethod.POST)
	@ResponseBody
	public Object photoTable(Gallery gallery, HttpServletRequest request) throws Exception {
		JsonResult jsonResult = new JsonResult();
		try {
			gallery=galleryService.addPhotoTable(gallery);
			jsonResult.setStatus("success");
			jsonResult.setData(gallery);
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}
	
	@RequestMapping("/listSearch")
	@ResponseBody
	public Object listSearch(String text) throws Exception {
		JsonResult jsonResult = new JsonResult();
		try {
			jsonResult.setData(galleryService.getGalleyListSearch(text));
			jsonResult.setStatus("success");
			
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}
	
	@RequestMapping(value="/addPhoto",method=RequestMethod.POST)
	@ResponseBody
	public Object add(
			Gallery gallery,
			HttpServletRequest request) throws Exception {
		MultipartHttpServletRequest multi = (MultipartHttpServletRequest) request;
		List<MultipartFile> photo = multi.getFiles("image1[]");
		JsonResult jsonResult = new JsonResult();

		try {
			List<Object> photos = new ArrayList<Object>();
			for (MultipartFile multipartFile : photo){
				String filename = multipartFile.getOriginalFilename();
				String path = sc.getAttribute("rootRealPath") + "file/" + filename;
				multipartFile.transferTo(new File(path));
				gallery.setIurl(filename);
				gallery.setIsize(multipartFile.getSize());
				photos.add(filename);
				photos.add(multipartFile.getSize());
				photos.add(path);
				galleryService.photoUpload(gallery);
			}
			jsonResult.setData(photos);
			jsonResult.setStatus("success");
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}
	
	@RequestMapping(value="/addPhotoContent",method=RequestMethod.POST)
	@ResponseBody
	public Object photoContent(	Gallery gallery, HttpServletRequest request) throws Exception {
		JsonResult jsonResult = new JsonResult();
		try {
			galleryService.addPhotoContent(gallery);
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
	public Object Update(Gallery gallery, HttpServletRequest request) throws Exception {
		
		JsonResult jsonResult = new JsonResult();

		try {
			jsonResult.setStatus("success");
			galleryService.photoUpdate(gallery);	
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}
	
	@RequestMapping("/photoListForm")
	@ResponseBody
	public Object photoList(Gallery gallery,
							@RequestParam(value="pageNo", defaultValue="1") 
							int pageNo,
							@RequestParam(value="pageSize", defaultValue="8") 
							int pageSize) throws Exception {
		
		JsonResult jsonResult = new JsonResult();
		try {
			int start_Index = (pageNo - 1) * pageSize;
			if(start_Index < 0){
				start_Index = 0;
			}
			jsonResult.setData(galleryService.getPhotoList(start_Index,pageSize));
			jsonResult.setStatus("success");
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		
		return jsonResult;
	}
	
	
	//페이징 처리부분
		@RequestMapping("/count")
		@ResponseBody
		public Object count() throws Exception {
			JsonResult jsonResult = new JsonResult();
			
			try {
				jsonResult.setData(galleryService.countgalley());
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
			galleryService.photoDelete(ino);
			galleryService.photoContentDelete(ino);
			jsonResult.setStatus("success");
			
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}
	
	@RequestMapping("/photoView")
	@ResponseBody
	public Object view(int ino) throws Exception {
		JsonResult jsonResult = new JsonResult();
		try {
			jsonResult.setData(galleryService.photoView(ino));
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