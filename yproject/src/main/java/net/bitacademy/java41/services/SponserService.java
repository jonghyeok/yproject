package net.bitacademy.java41.services;

import java.util.List;

import net.bitacademy.java41.vo.Member;
import net.bitacademy.java41.vo.Sponser;
import net.bitacademy.java41.vo.SponserCheck;
import net.bitacademy.java41.vo.SponserPersonData;
import net.bitacademy.java41.vo.ValanceData;

public interface SponserService {
	int sponsercheckAdd(SponserCheck sponserCheck)throws Exception;

	int addSponserData(String filepath,int spcno)throws Exception;
	
	List<Sponser> getAddData(SponserCheck sponserCheck)throws Exception;
	
	List<Sponser> getSerchSponserData(SponserCheck sponserCheck)throws Exception;

	List<Member> getSponsorxlsFile()throws Exception;
	
	
	int serch_count_torysponser(SponserPersonData sponserPersonData)throws Exception;

	int make_sponser_data(SponserPersonData sponserPersonData)throws Exception;
	
	SponserPersonData getmysonsorData(Member member)throws Exception;
	
	List<ValanceData> serch_my_valance(SponserPersonData sponserPersonData)throws Exception;

	int UpdateSponserData()throws Exception;
}


 










