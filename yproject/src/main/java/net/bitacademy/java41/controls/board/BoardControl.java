package net.bitacademy.java41.controls.board;

import java.io.PrintWriter;
import java.io.StringWriter;

import net.bitacademy.java41.services.BoardService;
import net.bitacademy.java41.vo.Board;
import net.bitacademy.java41.vo.JsonResult;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/board")
public class BoardControl {
	@Autowired BoardService boardService;

	@RequestMapping("/count")
	@ResponseBody
	public Object count() throws Exception {
		JsonResult jsonResult = new JsonResult();
		try {
			jsonResult.setData(boardService.countnotice());
			jsonResult.setStatus("success");
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}

	
	
	
	@RequestMapping(value="/add", method=RequestMethod.POST)
	@ResponseBody
	public Object add(Board board) throws Exception {
		JsonResult jsonResult = new JsonResult();
		try {
			boardService.boardAdd(board);		
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
	public Object view(int bno) throws Exception {
		JsonResult jsonResult = new JsonResult(); 
		try {
			Board b = boardService.boardView(bno);
			jsonResult.setData(b);
			jsonResult.setStatus("success");
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}
	
	@RequestMapping("/boardList")
	@ResponseBody
	public Object boardList(Board board,
							@RequestParam(value="pageNo", defaultValue="1") 
							int pageNo,
							@RequestParam(value="pageSize", defaultValue="10") 
							int pageSize) throws Exception{
		
		JsonResult jsonResult = new JsonResult();
		try {
			int start_Index = (pageNo - 1) * pageSize;
			if(start_Index < 0){
				start_Index = 0;
			}
			jsonResult.setStatus("success");
			jsonResult.setData(boardService.getBoardList(start_Index,pageSize));
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}
	
	@RequestMapping("/delete")
	@ResponseBody
	public Object delete(int bno) throws Exception {
		JsonResult jsonResult = new JsonResult();
		try {
			if(boardService.boardDelete(bno)>0){
				jsonResult.setStatus("success");
			}else{
				jsonResult.setStatus("Error");
			}
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
	public Object update(Board board) throws Exception {
		JsonResult jsonResult = new JsonResult();
		try { 
			boardService.boardUpdate(board);
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











