package net.bitacademy.java41.controls.team;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.List;

import net.bitacademy.java41.services.TeamGameService;
import net.bitacademy.java41.vo.Game;
import net.bitacademy.java41.vo.GamePoint;
import net.bitacademy.java41.vo.JsonResult;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;

@Controller
@RequestMapping("/teamgame")
public class TeamGameControl {
	@Autowired TeamGameService teamGameService;

	@RequestMapping(value="/addGame")
	@ResponseBody
	public Object addGame(Game  game) throws Exception {
		JsonResult jsonResult = new JsonResult();
			try {
			game =teamGameService.addNew(game);
			jsonResult.setStatus("success");
			jsonResult.setData(game);
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}
	

	@RequestMapping(value="/getGame")
	@ResponseBody
	public Object getGame(Game  game) throws Exception {
		JsonResult jsonResult = new JsonResult();
			try {
			game =teamGameService.getGame(game);
			jsonResult.setStatus("success");
			jsonResult.setData(game);
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}
	

	@RequestMapping(value="/updateGame")
	@ResponseBody
	public Object updateGame(@RequestBody String json) throws Exception {
		JsonResult jsonResult = new JsonResult();
			try {
				Gson gson = new Gson();
				JsonParser parser = new JsonParser();
				JsonObject jsonObject = (JsonObject) parser.parse(json);
				Game game = gson.fromJson(jsonObject, new TypeToken<Game>() {}.getType());
				JsonElement jsonElement = jsonObject.get("gplist");
				JsonArray jsonArray = jsonElement.getAsJsonArray();
				List<GamePoint>gamePoint = gson.fromJson(jsonArray, new TypeToken<List<GamePoint>>() {}.getType());
				game.setGamePoint(gamePoint);
				teamGameService.gameUpdate(game);
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

