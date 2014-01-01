package net.bitacademy.java41.services;

import java.io.FileInputStream;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import net.bitacademy.java41.controls.sponser.Setting;
import net.bitacademy.java41.dao.MemberDao;
import net.bitacademy.java41.dao.SponserDao;
import net.bitacademy.java41.vo.Member;
import net.bitacademy.java41.vo.SheetData;
import net.bitacademy.java41.vo.Sponser;
import net.bitacademy.java41.vo.SponserCheck;
import net.bitacademy.java41.vo.SponserPersonData;
import net.bitacademy.java41.vo.ValanceData;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SponserServiceImpl implements SponserService {
	@Autowired PlatformTransactionManager txManager;
	@Autowired SponserDao sponserDao;
	@Autowired MemberDao memberDao;
	
	long currTime = 0;
	int count = 0;
	

	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Throwable.class)
	public int sponsercheckAdd(SponserCheck sponserCheck) throws Exception {
		return sponserDao.addSponserCheck(sponserCheck);
	}

	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Throwable.class)
	public int addSponserData(String filepath,int spcno) throws Exception {

		int resno = 9;
		char[] ca = {'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'};
		char caa = 0;

		
		String excelfile =filepath;
		
		POIFSFileSystem fs = new POIFSFileSystem(new FileInputStream(excelfile)); 

		//워크북을 생성!               
		HSSFWorkbook workbook = new HSSFWorkbook(fs);
		int sheetNum = workbook.getNumberOfSheets();

		//Sheet에서 가져온 데이터를 행,열,데이터로 구분해서 리스트에 담아줌
		ArrayList<SheetData> mySheet = new ArrayList<SheetData>();

		//Suport 형식에 맞춰서 넣기위해 리스트에 담아줌
		ArrayList<Sponser> mySuport = new ArrayList<Sponser>();

		//Setting 변수(x열은 OO이다. 같은 설정)
		Setting sett = new Setting();

		//임시 Suport 저장공간
		Sponser su = new Sponser();


		for (int k = 0; k < sheetNum; k++) {


			HSSFSheet sheet = workbook.getSheetAt(k);
			int rows = sheet.getPhysicalNumberOfRows();

			for (int r = 0; r <= rows; r++) {

				// 시트에 대한 행을 하나씩 추출
				HSSFRow row   = sheet.getRow(r);
				if (row != null) { 
					int cells = row.getPhysicalNumberOfCells();

					for (int c = 0; c <= cells; c++) {

						// 행에대한 셀을 하나씩 추출하여 셀 타입에 따라 처리
						HSSFCell cell = row.getCell(c);
						caa = ca[c];
						if (cell != null) {
							SheetData s = new SheetData();
							
							caa = ca[c];
							//System.out.println(r + "  "+caa + "    " + cell );
							
							mySheet.add( s.setRow(row.getRowNum()+1).setCol(c).setData(cell.toString()));
						}
					}
				}
			}
		}



		for(int i=0;i<mySheet.size();i++){
			if(mySheet.get(i).getData().equals("거래일자")||mySheet.get(i).getData().equals("거래일시")){
				sett.setSpddate_col(mySheet.get(i).getCol());
				sett.setDataStart(mySheet.get(i).getRow()+1);
			}else if(mySheet.get(i).getData().equals("적요")){
				sett.setSpdtype_col(mySheet.get(i).getCol());
			}else if(mySheet.get(i).getData().equals("기재내용")||mySheet.get(i).getData().equals("보낸분/받는분")){
				sett.setSpdname_col(mySheet.get(i).getCol());
			}else if(mySheet.get(i).getData().equals("맡기신금액")||mySheet.get(i).getData().equals("입금액")){
				sett.setSpdincome_col(mySheet.get(i).getCol());
			}else if(mySheet.get(i).getData().equals("취급점")||mySheet.get(i).getData().equals("거래점")){
				sett.setSpdwhere_col(mySheet.get(i).getCol());
			}
			sett.setDataEnd(mySheet.get(i).getRow());
		}//for문 끝!

		caa = ca[sett.getSpddate_col()];
		System.out.println("*********************************거래일자일자는 " + caa +"행입니다." );
		caa = ca[sett.getSpdtype_col()];
		System.out.println("*********************************적요는 " + caa +"행입니다." );
		caa = ca[sett.getSpdname_col()];
		System.out.println("*********************************기재내용는 " + caa +"행입니다." );
		caa = ca[sett.getSpdincome_col()];
		System.out.println("*********************************금액은 " + caa +"행입니다." );
		caa = ca[sett.getSpdwhere_col()];
		System.out.println("*********************************취급점은 " + caa +"행입니다." );
		System.out.println("*********************************자료 시작점은 " + sett.getDataStart() +"번째 열입니다." );
		System.out.println("*********************************자료 끝점은 " + (sett.getDataEnd()) +"번째 열입니다." );
		

		//////////////////////////////대부분의 시작 행에 자료종류 컬럼명이 들어있다./////////////////////////////////
		//고로...  시작열을 일단 따와서 가져온 뒤 정렬해준다.
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		if(sett.getDataStart()==0){
			System.out.println("해당 파일에 지정된 양식의 데이터가 없음");
			return 0;
		}else{
			int low1 =  sett.getDataStart();
			int low2 =  sett.getDataStart()-1;
			for(int i=0;i<mySheet.size();i++){
				low1=mySheet.get(i).getRow();
				//System.out.println("getRow = " + low1);

				if(mySheet.get(i).getRow()>=sett.getDataStart() && mySheet.get(i).getRow()<=sett.getDataEnd()){
				
					//System.out.println("intoRow = " + low1);
					
					if(low1 == low2){
						if(sett.getSpddate_col()==mySheet.get(i).getCol()){
							String[] str =  mySheet.get(i).getData().replace(".", "-").split(" ");
							if(str.length ==1){//1일경우 =  날짜만 있을경우
								su.setSpddate(Date.valueOf(mySheet.get(i).getData()));
							}else{//나머지 경우 =  시간도 있을경우
								su.setSpddate(Date.valueOf(str[0]));
							}
						}else if(sett.getSpdtype_col()==mySheet.get(i).getCol()){
							su.setSpdtype(mySheet.get(i).getData());
						}else if(sett.getSpdname_col()==mySheet.get(i).getCol()){
							su.setSpdname(mySheet.get(i).getData());
						}else if(sett.getSpdincome_col()==mySheet.get(i).getCol()){
							String[] str =  mySheet.get(i).getData().split(".0");
							if(str.length>0){
								if(str[0].equals(""))str[0]="0";
							}
							//su.setSpdincome(Integer.parseInt(str[0])); 
							su.setSpdincome(Integer.parseInt(mySheet.get(i).getData().replace(".0", "")));
						}else if(sett.getSpdwhere_col()==mySheet.get(i).getCol()){
							su.setSpdwhere(mySheet.get(i).getData());
						}
						
					}else{
						su = new Sponser();
						
						if(sett.getSpddate_col()==mySheet.get(i).getCol()){
							
							mySheet.get(i).setData(mySheet.get(i).getData().replace(".", "-"));
							
							String[] str =  mySheet.get(i).getData().replace(".", "-").split(" ");
							
							if(str.length ==1){//1일경우 =  날짜만 있을경우
								su.setSpddate(Date.valueOf(mySheet.get(i).getData()));
							}else{//나머지 경우 =  시간도 있을경우0
								su.setSpddate(Date.valueOf(str[0]));
							}
						}else if(sett.getSpdtype_col()==mySheet.get(i).getCol()){
							su.setSpdtype(mySheet.get(i).getData());
						}else if(sett.getSpdname_col()==mySheet.get(i).getCol()){
							su.setSpdname(mySheet.get(i).getData());
						}else if(sett.getSpdincome_col()==mySheet.get(i).getCol()){
							String[] str =  mySheet.get(i).getData().split(".0");
							if(str.length>0){
								if(str[0].equals(""))str[0]="0";
							}
							//su.setSpdincome(Integer.parseInt(str[0])); 
							su.setSpdincome(Integer.parseInt(mySheet.get(i).getData().replace(".0", "")));
						}else if(sett.getSpdwhere_col()==mySheet.get(i).getCol()){
							su.setSpdwhere(mySheet.get(i).getData());
						}
						su.setSpcno(spcno);
						//System.out.println(su.getSpddate() + "날짜에 " + su.getSpdname() + "님이 " + su.getSpdincome()+ " \\을 입금하셨습니다.");
						mySuport.add(su);
						
						
						low2=mySheet.get(i).getRow();
					}
					
					
				}
			}
			mySuport.add(su);
			
			
			for(int i=0;i<mySuport.size();i++){
				
				Sponser s = new Sponser();
				
				s = mySuport.get(i);
				
				if(sponserDao.findSameData(s)>=1){
					resno=1;
				}else{
					//System.out.println(s.getSpddate() + "날짜에 " + s.getSpdname() + "님이 " + s.getSpdincome()+ " \\을 입금하셨습니다.");
					sponserDao.addSponserData(s);
					resno=1;
				}
				
			}
			return resno;
		}
	}

	
	
	public List<Sponser> getAddData(SponserCheck sponserCheck)throws Exception{
		return sponserDao.getAddData(sponserCheck);
	}



	public List<Sponser> getSerchSponserData(SponserCheck sponserCheck)
			throws Exception {
		return sponserDao.getSerchSponserData(sponserCheck);
	}
	

	public List<Member>	getSponsorxlsFile()throws Exception{
		return memberDao.getSponsorData();
	}
	
	
	public int serch_count_torysponser(SponserPersonData sponserPersonData)throws Exception{
		return sponserDao.serch_count_torysponser(sponserPersonData);
	}
	
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Throwable.class)
	public int make_sponser_data(SponserPersonData sponserPersonData)throws Exception{

		return sponserDao.make_sponser_data(sponserPersonData);
	}
	
	
	public SponserPersonData getmysonsorData(Member member)throws Exception{
		
		SponserPersonData spd = new SponserPersonData();
		
		spd.setMid(member.getId());
		
		spd = sponserDao.get_my_SponserData(spd).get(0);
		
		return spd;
	}
	
	
	public List<ValanceData> serch_my_valance(SponserPersonData sponserPersonData)throws Exception{
		return sponserDao.serch_my_valance(sponserPersonData);
	}

	
	public int UpdateSponserData()throws Exception{
		
		List<SponserPersonData> sponser_User = sponserDao.getlist_sponserUser();
		
		for(int i=0; i<sponser_User.size();i++){
			
			
			List<SponserPersonData> sponser_Data = sponserDao.getlist_sponserData(sponser_User.get(i));
			
			
			for(int j=0; j<sponser_Data.size();j++){
				
				
				if(sponserDao.find_sponserUser(sponser_User.get(i))==0){
					
					sponser_User.get(i).setSpdno(sponser_Data.get(j).getSpdno());
					
					sponserDao.update_sponser_insert(sponser_User.get(i));
					
				}else{
					sponserDao.update_sponser_update(sponser_User.get(i));
				}
				
				
				
			}
			
			
		}
		
		
		
		return 0;
	}
	
}













