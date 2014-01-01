package net.bitacademy.java41.dao;

import java.util.List;

import net.bitacademy.java41.vo.Game;
import net.bitacademy.java41.vo.GamePoint;
import net.bitacademy.java41.vo.TeamProperty;



public interface TeamGameDao {

	
	int addDefaultData(Game game)throws Exception;
	
	Game loaddata(Game game)throws Exception;
	
	List<GamePoint> loaddata_point(Game game)throws Exception;
	
	void updatedata(Game game)throws Exception;
	
	void updatedata_point(GamePoint gamePoint)throws Exception;
	
	void delete_point(GamePoint gamePoint)throws Exception;
	
	TeamProperty serchGameTotal_gps(TeamProperty teamProperty)throws Exception;
	
	TeamProperty serchGameTotal_gpe(TeamProperty teamProperty)throws Exception;
}
