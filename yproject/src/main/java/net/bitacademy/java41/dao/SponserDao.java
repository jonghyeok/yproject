package net.bitacademy.java41.dao;

import java.util.List;

import net.bitacademy.java41.vo.Sponser;
import net.bitacademy.java41.vo.SponserCheck;
import net.bitacademy.java41.vo.SponserPersonData;
import net.bitacademy.java41.vo.ValanceData;



public interface SponserDao {


	int addSponserCheck(SponserCheck sponserCheck)throws Exception;

	int addSponserData(Sponser sponser)throws Exception;
	
	int findSameData(Sponser sponser)throws Exception;
	
	List<Sponser> getAddData(SponserCheck sponserCheck)throws Exception;
	
	List<Sponser> getSerchSponserData(SponserCheck sponserCheck)throws Exception;
	
	int make_sponser_data(SponserPersonData sponserPersonData)throws Exception;
	
	int sponser_spcname_Setup(SponserPersonData sponserPersonData)throws Exception;
	
	List<SponserPersonData> serch_sponser_only_member()throws Exception;
	
	List<SponserPersonData> getSponsersData()throws Exception;
	
	List<SponserPersonData> get_my_SponserData(SponserPersonData sponserPersonData)throws Exception;
	
	int serch_count_torysponser(SponserPersonData sponserPersonData)throws Exception;
	
	List<ValanceData> serch_my_valance(SponserPersonData sponserPersonData)throws Exception;
	
	List<SponserPersonData> getlist_sponserData(SponserPersonData sponserPersonData)throws Exception;
	
	List<SponserPersonData> getlist_sponserUser()throws Exception;
	
	int find_sponserUser(SponserPersonData sponserPersonData)throws Exception;
	
	int update_sponser_insert(SponserPersonData sponserPersonData)throws Exception;
	
	int update_sponser_update(SponserPersonData sponserPersonData)throws Exception;
	
}
