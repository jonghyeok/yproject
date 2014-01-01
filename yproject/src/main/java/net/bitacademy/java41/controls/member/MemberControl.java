package net.bitacademy.java41.controls.member;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import net.bitacademy.java41.services.MemberService;
import net.bitacademy.java41.services.TeamService;
import net.bitacademy.java41.vo.JsonResult;
import net.bitacademy.java41.vo.Kamdok;
import net.bitacademy.java41.vo.LoginInfo;
import net.bitacademy.java41.vo.Member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;


@Controller
@SessionAttributes({"member","loginInfo"})
@RequestMapping("/member")
public class MemberControl {
	@Autowired ServletContext sc;
	@Autowired MemberService memberService;
	@Autowired TeamService teamService;
	
	@RequestMapping("/serchSameId")
	@ResponseBody
	public Object serchSameId(String id) throws Exception {
		JsonResult jsonResult = new JsonResult();
		try {
			if(memberService.serchSameId(id) == null){
				jsonResult.setStatus("success");
			}else{
				jsonResult.setStatus("fail");
			}
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}
	
	@RequestMapping("/serchKamdokId")
	@ResponseBody
	public Object serchKamdokId(String name) throws Exception {
		JsonResult jsonResult = new JsonResult();
		try {
			jsonResult.setStatus("success");
			jsonResult.setData(memberService.serchKamdokId(name));
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}
	
	

	@RequestMapping("/signup")
	@ResponseBody
	public Object signup(Member member,HttpSession session) throws Exception {
		JsonResult jsonResult = new JsonResult();
		try {
			if(memberService.signUp(member)>0){
				jsonResult.setStatus("success");
				jsonResult.setData(member);
				session.setAttribute("loginInfo", memberService.getMember(member.getId(), member.getPassword()));
			}else{
				jsonResult.setStatus("fail");
			}
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}
	
	
	
	@RequestMapping("/findPassword")
	@ResponseBody
	public Object serchPassword(String uid, String uemail, HttpSession session) throws Exception {
		JsonResult jsonResult = new JsonResult();
		try {			
			String val =memberService.findPassword(uid, uemail);
			if(val !="fail"){ 
				jsonResult.setStatus("success"); 
			}else{
				jsonResult.setStatus("no ID");
			}
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}
	
	@RequestMapping("/newPassword")
	@ResponseBody
	public Object newPassword(Member member) throws Exception {
			JsonResult jsonResult = new JsonResult();
		try {
			memberService.newPassword(member);
			jsonResult.setStatus("success");
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
		}
		return jsonResult;
	}
	
	@RequestMapping("/serchPassword")
	@ResponseBody
	public Object serchPassword(String curpass, HttpSession session) throws Exception {
		JsonResult jsonResult = new JsonResult();
		try {
			LoginInfo loginInfo =(LoginInfo)session.getAttribute("loginInfo");
			if(memberService.getMember(loginInfo.getId(), curpass) != null){
				jsonResult.setStatus("success");
			}else{
				jsonResult.setStatus("fail");
			}
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}
	
	@RequestMapping("/passwordChange")
	@ResponseBody
	public Object changePassword(String changepass, HttpSession session) throws Exception {
		JsonResult jsonResult = new JsonResult();
		try {
			LoginInfo loginInfo =(LoginInfo)session.getAttribute("loginInfo");
			if(	memberService.changePassword(loginInfo.getId(), changepass)>0){
				jsonResult.setStatus("success");
			}else{
				jsonResult.setStatus("fail");
			}
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}
	
	
	@RequestMapping("/update")
	@ResponseBody
	public Object update(Member member, HttpSession session) throws Exception {
		JsonResult jsonResult = new JsonResult();
		try {
			LoginInfo loginInfo = null;
			if(memberService.updateMember(member)>0){ 
				loginInfo = memberService.getUser(member.getId());
				session.setAttribute("loginInfo", loginInfo);
				jsonResult.setData(loginInfo);
				jsonResult.setStatus("success");
			}else{
				jsonResult.setStatus("fail");
			}
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("pwdError");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}

	@RequestMapping("/list")
	@ResponseBody
	public Object list(
			@RequestParam(value="pageNo", defaultValue="1") 
			int pageNo,
			@RequestParam(value="pageSize", defaultValue="10") 
			int pageSize) throws Exception {
		JsonResult jsonResult = new JsonResult();
		try {
			int startIndex = (pageNo - 1) * pageSize;
			if (startIndex < 0) {
				startIndex = 0;
			}
			ArrayList<Object> list = new ArrayList<Object>();
			list.add(memberService.getMemberList(startIndex,pageSize));
			list.add( teamService.teamList());
			jsonResult.setData(list);
			jsonResult.setStatus("success");
			
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}
	
	
	@RequestMapping("/count")
	@ResponseBody
	public Object count() throws Exception {
		JsonResult jsonResult = new JsonResult();
		try {
			jsonResult.setData(memberService.countMember());
			jsonResult.setStatus("success");
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
			jsonResult.setData(memberService.getMemberListSearch(text));
			jsonResult.setStatus("success");
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}
	
	
	@RequestMapping("/coachView")
	@ResponseBody
	public Object coachView(String mid) throws Exception {
		JsonResult jsonResult = new JsonResult();
		try {
			 Kamdok kamdok =memberService.coachView(mid);
			if( kamdok!=null ){
			jsonResult.setStatus("success");
			jsonResult.setData(kamdok);
			}else{
				jsonResult.setStatus("fail");
			}
			
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}
	
	@RequestMapping("/coachUpdate")
	@ResponseBody
	public Object coachUpdate(Kamdok kamdok) throws Exception {
		JsonResult jsonResult = new JsonResult();
		try {
			if(memberService.coachUpdate(kamdok)>0){
				jsonResult.setStatus("success");
			}else{
				jsonResult.setStatus("fail");
			}
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
	public Object delete(String id,String password, HttpSession session) throws Exception {
		JsonResult jsonResult = new JsonResult();
		try {
			if(memberService.getMember(id, password) != null){
				memberService.delete(id);
				jsonResult.setStatus("success");
			}else{
				jsonResult.setStatus("fail");
			}
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}
	
	
	@RequestMapping("/updateLevel")
	@ResponseBody
	public Object updateLevel(
			Member member) throws Exception {
			JsonResult jsonResult = new JsonResult();
		try {
			memberService.updateLevel(member);
			jsonResult.setStatus("success");
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
		}
		return jsonResult;
	}
	

}













