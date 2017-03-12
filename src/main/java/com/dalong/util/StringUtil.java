package com.dalong.util;

public class StringUtil {
	public static String append(Object ...appendStrs) {
		StringBuffer destStr = new StringBuffer();
		for(Object appendStr : appendStrs) {
			destStr.append(appendStr);
		}
		return destStr.toString();
	}
}
