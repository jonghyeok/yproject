package net.bitacademy.java41.controls.test;

import java.io.File; 

import java.io.FileNotFoundException; 

import java.io.FileOutputStream; 

import java.io.IOException; 

 

import org.apache.poi.hssf.usermodel.HSSFCell; 

import org.apache.poi.hssf.usermodel.HSSFRichTextString; 

import org.apache.poi.hssf.usermodel.HSSFRow; 

import org.apache.poi.hssf.usermodel.HSSFSheet; 

import org.apache.poi.hssf.usermodel.HSSFWorkbook; 

 

public class exltest { 

 

public static void main(String[] args) { 

 

 HSSFWorkbook workbook = new HSSFWorkbook(); 

 HSSFSheet sheet = workbook.createSheet("students"); 

 HSSFRow row = sheet.createRow(1); 

 HSSFCell cell = row.createCell(1); 

 cell.setCellValue(new HSSFRichTextString("sandeep")); 

 

 FileOutputStream fos = null; 

 

try { 

 fos = new FileOutputStream(new File("C:\\myExcelWorkBook.xls")); 

 workbook.write(fos); 

 } catch (FileNotFoundException e) { 

 

 e.printStackTrace(); 

 } catch (IOException e) { 

 

 e.printStackTrace(); 

 } finally { 

try { 

 fos.flush(); 

 fos.close(); 

 } catch (IOException e) { 

 

 e.printStackTrace(); 

 } 

 } 

 } 

} 







