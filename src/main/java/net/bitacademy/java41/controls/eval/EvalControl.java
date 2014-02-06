package net.bitacademy.java41.controls.eval;

import java.io.PrintWriter;
import java.io.StringWriter;

import net.bitacademy.java41.services.EvalationService;
import net.bitacademy.java41.vo.EvalList;
import net.bitacademy.java41.vo.JsonResult;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller

@RequestMapping("/eval")
public class EvalControl {
	@Autowired EvalationService evalationService;

	@RequestMapping("/evalList")
	@ResponseBody
	public Object evalList() throws Exception {
		JsonResult jsonResult = new JsonResult();
		try {
			jsonResult.setData(evalationService.evalationListGet());
			jsonResult.setStatus("success");
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}
	
	@RequestMapping("/evalAdd")
	@ResponseBody
	public Object evalAdd(EvalList eval) throws Exception {
		JsonResult jsonResult = new JsonResult();
		try {
			evalationService.evalationListAdd(eval);
			jsonResult.setStatus("success");
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}
	
	@RequestMapping("/evalUpdate")
	@ResponseBody
	public Object evalUpdate(EvalList eval) throws Exception {
		JsonResult jsonResult = new JsonResult();
		try {
			evalationService.updateEvalationList(eval);
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
