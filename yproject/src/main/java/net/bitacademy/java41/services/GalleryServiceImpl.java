package net.bitacademy.java41.services;

import java.util.HashMap;
import java.util.List;

import net.bitacademy.java41.dao.GalleryDao;
import net.bitacademy.java41.vo.Gallery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;

@Service
public class GalleryServiceImpl implements GalleryService {
	@Autowired PlatformTransactionManager txManager;
	@Autowired GalleryDao galleryDao;

	@Override
	public List<Gallery> getPhotoList(int start_Index, int pageSize) throws Exception {
		HashMap<String,Object> params = new HashMap<String,Object>();
		params.put("start_Index", start_Index);
		params.put("pageSize", pageSize);
		return galleryDao.photoList(params);
	}

	@Override
	public void photoContentDelete(int ino) throws Exception {
		galleryDao.photoContentDelete(ino);
	}

	@Override
	public void photoUpdate(Gallery gallery) throws Exception {
		galleryDao.photoUpdate(gallery);
	}

	@Override
	public List<Gallery> photoView(int ino) throws Exception {
		return galleryDao.photoView(ino);
	}

	@Override
	public void addPhotoContent(Gallery gallery) throws Exception {
		galleryDao.addPhotoContent(gallery);
	}

	@Override
	public Gallery addPhotoTable(Gallery gallery) throws Exception {
		galleryDao.addPhotoTable(gallery);
		return gallery;
	}

	@Override
	public void photoUpload(Gallery gallery) throws Exception {
		galleryDao.photoUpload(gallery);
	}

	@Override
	public void photoDelete(int ino) throws Exception {
		galleryDao.photoDelete(ino);
	}

	@Override
	public int countgalley() throws Exception {
		return  galleryDao.countgalley();
	}

	@Override
	public List<Gallery> getGalleyListSearch(String text) throws Exception {
		return  galleryDao.getGalleyListSearch(text);
	}

}
