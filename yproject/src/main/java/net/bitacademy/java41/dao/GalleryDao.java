package net.bitacademy.java41.dao;

import java.util.List;
import java.util.Map;

import net.bitacademy.java41.vo.Gallery;

public interface GalleryDao {

	List<Gallery> photoList(Map<String,Object> params) throws Exception;

	void photoContentDelete(int ino) throws Exception;

	void photoUpdate(Gallery gallery) throws Exception;

	List<Gallery> photoView(int ino) throws Exception;

	void photoUpload(Gallery gallery) throws Exception;

	void addPhotoContent(Gallery gallery) throws Exception;

	void addPhotoTable(Gallery gallery) throws Exception;

	void photoDelete(int ino) throws Exception;

	int countgalley()throws Exception;

	List<Gallery> getGalleyListSearch(String text) throws Exception;
	
}
