package net.bitacademy.java41.test;

import java.io.FileOutputStream;
import java.io.IOException;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;

public class mytxlsest {

	public static void Make(){

		Workbook wb = new HSSFWorkbook();

	//	CreationHelper createHelper = wb.getCreationHelper();

		Sheet sheet = wb.createSheet("sponser");



		Row row = sheet.createRow(0);


		for(int i=1;i<100;i++){

			row = sheet.createRow(i);
			row.createCell(0).setCellValue("홍길동");
			row.createCell(1).setCellValue("010-1111-1211");
		}





		FileOutputStream fileOut;
		try {
			fileOut = new FileOutputStream("workbook.xls");
			wb.write(fileOut);
			fileOut.close();


		} catch (IOException e) {
			e.printStackTrace();
		}



	}










	public static void main(String[] args) {
		Make();
	}
}
