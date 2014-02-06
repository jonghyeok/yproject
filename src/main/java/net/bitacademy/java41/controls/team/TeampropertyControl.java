package net.bitacademy.java41.controls.team;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.List;

import javax.servlet.http.HttpSession;

import net.bitacademy.java41.services.TeamPropertyService;
import net.bitacademy.java41.services.TeamService;
import net.bitacademy.java41.vo.JsonResult;
import net.bitacademy.java41.vo.LoginInfo;
import net.bitacademy.java41.vo.TableCk;
import net.bitacademy.java41.vo.TeamProperty;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;

@Controller
@RequestMapping("/teamp")
public class TeampropertyControl {
	@Autowired TeamService teamService;
	@Autowired TeamPropertyService teamPropertyService;
	
	@RequestMapping("/ckFindano")
	@ResponseBody
	public Object ckFindano(TeamProperty teamProperty) throws Exception {
		JsonResult jsonResult = new JsonResult();
		try{
			TableCk ck = new TableCk();
			if(teamProperty.getAno()==0){
				ck = teamPropertyService.addFindano(teamProperty);
			}else{
				ck = teamPropertyService.ckFindano(teamProperty);
			}
			jsonResult.setStatus("success");
			jsonResult.setData(ck);
		}catch(Exception e){
			jsonResult.setStatus("fail");
			jsonResult.setData(e);
		}
		return jsonResult;
	}


	@RequestMapping("/getrollcount")
	@ResponseBody
	public Object getRollCount(TeamProperty teamProperty) throws Exception {
		JsonResult jsonResult = new JsonResult();
		try{
			int count = teamPropertyService.getRollBookCount(teamProperty);
			if(teamProperty.getAno()==0){
				jsonResult.setStatus("fail");
			}else{
				jsonResult.setStatus("success");
				jsonResult.setData(count);
			}
		}catch(Exception e){
			jsonResult.setStatus("fail");
			jsonResult.setData(e);
		}
		return jsonResult;
	}
	
	
	@RequestMapping("/ckteativ")
	@ResponseBody
	public Object ckteampw(int tno) throws Exception {
		JsonResult jsonResult = new JsonResult();
		TeamProperty teamProperty =  new TeamProperty();
		teamProperty.setTno(tno); 
		try {
				int res = teamPropertyService.cktable(teamProperty);
				if(res==0 || res==9){ //에러난경우
					jsonResult.setStatus("fail");
				}else if(res==1){ //테이블에 데이터가 없을 경우
					jsonResult.setStatus("success");
					teamProperty.setTableStatus(0);
					jsonResult.setData(teamProperty);
				}else if(res==2){ //테이블에 데이터가 해당 날짜에 데이터가 없을 경우
					jsonResult.setStatus("success");
					teamProperty.setTableStatus(1);
					jsonResult.setData(teamProperty);
				}else{ //테이블에 데이터가 있고, 해당 날짜에도 데이터가 있을 경우.
					jsonResult.setStatus("success");
					teamProperty.setTableStatus(2);
					jsonResult.setData(teamProperty);
				}
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
			e.printStackTrace();
		}
		return jsonResult;
	}
	

	@RequestMapping(value="/getAdate")
	@ResponseBody
	public Object getAdate(int tno) throws Exception {
		JsonResult jsonResult = new JsonResult();
		try {
			List<TableCk> list = teamPropertyService.getADATEList(tno);
			jsonResult.setStatus("success");
			jsonResult.setData(list);
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}
	
	
	@RequestMapping(value="/rollbookAdd")
	@ResponseBody
	public Object rollbookAdd(TeamProperty teamProperty) throws Exception {
		JsonResult jsonResult = new JsonResult();
			try {
			List<TeamProperty> tpList=teamPropertyService.roolbookAdd(teamProperty);
			jsonResult.setStatus("success");
			jsonResult.setData(tpList);
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}
	
	
	@RequestMapping(value="/rollbookUpdate")
	@ResponseBody
	public <T> Object rollbookUpdate(@RequestBody String json) throws Exception {
		JsonResult jsonResult = new JsonResult();
		try {
			Gson gson = new Gson();
			JsonParser parser = new JsonParser();
			JsonArray jsonArray = (JsonArray) parser.parse(json);
			List<TeamProperty> rollbookList = gson.fromJson(jsonArray, new TypeToken<List<TeamProperty>>() {}.getType());
			if(teamPropertyService.rollbookUpate(rollbookList) > 0){
				jsonResult.setStatus("success");
			}else{
				jsonResult.setStatus("nodata");
			}
		} catch(Throwable e) {
			e.printStackTrace();
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("fail");
		}
		return jsonResult;
	}
	
	@RequestMapping(value="/load_roolbook")
	@ResponseBody
	public Object load_roolbook(TeamProperty teamProperty) throws Exception {
		JsonResult jsonResult = new JsonResult();
			try {
			List<TeamProperty> tpList=teamPropertyService.load_roolbook(teamProperty);
			jsonResult.setStatus("success");
			jsonResult.setData(tpList);
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}
	
	@RequestMapping(value="/trainAdd")
	@ResponseBody
	public Object trainAdd(TeamProperty teamProperty) throws Exception {
		JsonResult jsonResult = new JsonResult();
			try {
			List<TeamProperty> tpList=teamPropertyService.addTrain(teamProperty);
			jsonResult.setStatus("success");
			jsonResult.setData(tpList);
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}
	
	@RequestMapping(value="/load_train")
	@ResponseBody
	public Object load_train(TeamProperty teamProperty) throws Exception {
		JsonResult jsonResult = new JsonResult();
			try {
			List<TeamProperty> tpList=teamPropertyService.load_train(teamProperty);
			jsonResult.setStatus("success");
			jsonResult.setData(tpList);
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}
	

	@RequestMapping(value="/trainUpdate")
	@ResponseBody
	public <T> Object trainUpdate(@RequestBody String json) throws Exception {
		JsonResult jsonResult = new JsonResult();
		try {
			Gson gson = new Gson();
			JsonParser parser = new JsonParser();
			JsonArray jsonArray = (JsonArray) parser.parse(json);
			List<TeamProperty> trainkList = gson.fromJson(jsonArray, new TypeToken<List<TeamProperty>>() {}.getType());
			if(teamPropertyService.trainUpdate(trainkList) > 0){
				jsonResult.setStatus("success");
			}else{
				jsonResult.setStatus("nodata");
			}
		} catch(Throwable e) {
			e.printStackTrace();
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("fail");
		}
		return jsonResult;
	}
	
	@RequestMapping("/getMyTeamName")
	@ResponseBody
	public Object getMyTeamName(HttpSession sesstion) throws Exception {
		JsonResult jsonResult = new JsonResult();
		try {
			LoginInfo loginInfo=(LoginInfo)sesstion.getAttribute("loginInfo");
			jsonResult.setData(teamService.getMyTeamName(loginInfo.getTno()));
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
	
	@RequestMapping(value="/getroolbookxlsfile")
	@ResponseBody
	public Object getroolbookxlsfile(int year,int tno) throws Exception {
		JsonResult jsonResult = new JsonResult();
		try {
			
			
			
			
			
			
			jsonResult.setStatus("success");
			jsonResult.setData("a");
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}
	
	
	
}
