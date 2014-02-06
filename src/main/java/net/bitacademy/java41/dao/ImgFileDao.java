package net.bitacademy.java41.dao;

import net.bitacademy.java41.vo.ImgFile;


public interface ImgFileDao {
	
	int InputImg(ImgFile imgFile) throws Exception;
	
	ImgFile SerchImg(int fno)throws Exception;
	
}
