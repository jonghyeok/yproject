package net.bitacademy.java41.services;

import java.util.List;

import net.bitacademy.java41.vo.Gallery;

public interface GalleryService {

	List<Gallery> getPhotoList(int start_Index, int pageSize) throws Exception;

	void photoContentDelete(int ino) throws Exception;
	void photoUpdate(Gallery gallery) throws Exception;
	List<Gallery> photoView(int ino) throws Exception;
	void addPhotoContent(Gallery gallery) throws Exception;
	Gallery addPhotoTable(Gallery gallery) throws Exception;
	void photoUpload(Gallery gallery) throws Exception;
	void photoDelete(int ino) throws Exception;
	int countgalley() throws Exception;
	List<Gallery> getGalleyListSearch(String text) throws Exception;
	
}

