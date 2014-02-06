package net.bitacademy.java41.services;

import java.util.List;

import net.bitacademy.java41.dao.TeamDao;
import net.bitacademy.java41.dao.TeamGameDao;
import net.bitacademy.java41.vo.Game;
import net.bitacademy.java41.vo.GamePoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TeamGameServiceImpl implements TeamGameService {
	@Autowired PlatformTransactionManager txManager;
	@Autowired TeamDao teamDao;
	@Autowired TeamGameDao teamGameDao;
	
	
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Throwable.class)
	public Game addNew(Game game) throws Exception {
		teamGameDao.addDefaultData(game);
		return game;
	}
	
	
	
	public Game getGame(Game game) throws Exception {
		game = teamGameDao.loaddata(game);
		game.setGamePoint(teamGameDao.loaddata_point(game));
		return game;
	}
	
	
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Throwable.class)
	public void gameUpdate(Game game) throws Exception {
		
		teamGameDao.updatedata(game);
		List<GamePoint>gamePoint_list =game.getGamePoint(); 
		
		GamePoint gpp = new GamePoint();
		gpp.setGno(game.getGno());
		teamGameDao.delete_point(gpp);
		
		for(GamePoint gp : gamePoint_list){
			teamGameDao.updatedata_point(gp);
		}
	}
}

