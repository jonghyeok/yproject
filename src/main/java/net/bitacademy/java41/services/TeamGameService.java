package net.bitacademy.java41.services;

import net.bitacademy.java41.vo.Game;


public interface TeamGameService {

	Game addNew(Game game)throws Exception;
	Game getGame(Game game)throws Exception;
	void gameUpdate(Game game)throws Exception;
	
}













