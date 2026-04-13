---
layout: post
title: "[Java 기초] 파일과 폴더 제어하기: File 클래스"
date: 2026-04-13 18:00
tags: [스터디로그, java, IO, File, Directory]
summary: java.io.File 클래스를 사용하여 파일의 내용을 수정하는 것이 아닌, 파일 및 폴더 자체를 생성하고 삭제하고 존재 여부를 확인하는 관리 방법을 알아본다.
---

자바 프로그램에서 파일 시스템(윈도우의 탐색기, 맥의 파인더)을 제어할 때는 **`java.io.File`** 클래스를 사용한다. 

🚨 **주의할 점**: `File` 클래스는 파일 안에 있는 '글자(내용)'를 읽고 쓰는 역할이 아니다. 파일이나 폴더가 존재하는지 확인하고, 새로 만들고, 삭제하는 등의 **'껍데기(형태)'를 관리하는 역할**만 수행한다.

## 1. 파일과 폴더 생성

파일과 폴더는 아래 명령어를 통해 생성한다.

`folder.mkdir();`: 폴더 생성
`file.createNewFile()`: 파일 생성

예제를 통해 바탕화면(또는 특정 경로)에 나만의 폴더를 만들고, 그 안에 빈 텍스트 파일을 생성하는 기본 흐름을 알아보자.

```java
import java.io.File;
import java.io.IOException;

public class FileManageEx {
    public static void main(String[] args) {
        
        // 1. 제어할 폴더의 경로와 이름을 지정하여 File 객체 생성
        // (주의: 객체를 만들었다고 실제 폴더가 생성되는 것은 아님!)
        File folder = new File("my_folder");
        
        // 폴더가 존재하는지 확인 (exists)
        if (!folder.exists()) {
            folder.mkdir(); // 폴더 생성 (make directory)
            System.out.println("폴더를 새로 생성했습니다.");
        }

        // 2. 방금 만든 폴더 안에 들어갈 파일의 경로 지정
        // 경로 연결 시 슬래시(/)나 백슬래시(\) 대신 File.separator를 쓰면 윈도우/맥 어디서든 안전함
        File memoFile = new File(folder.getAbsolutePath() + File.separator + "memo.txt");

        try {
            if (!memoFile.exists()) {
                memoFile.createNewFile(); // 빈 물리적 파일 생성
                System.out.println("memo.txt 파일을 생성했습니다.");
            } else {
                System.out.println("파일이 이미 존재합니다.");
            }
        } catch (IOException e) {
            // 파일 생성 권한이 없거나 경로가 잘못되었을 때 예외 발생
            System.out.println("파일 생성 중 에러 발생: " + e.getMessage());
        }
    }
}
```

## 2. 파일 정보 읽기 및 삭제

File 클래스는 생성된 파일의 다양한 정보를 제공하며, 필요 없어진 파일을 삭제(delete)할 수도 있다.

```Java
public class FileInfoEx {
    public static void main(String[] args) {
        File myFile = new File("my_folder/memo.txt");

        if (myFile.exists()) {
            System.out.println("파일 이름: " + myFile.getName());
            System.out.println("파일 경로: " + myFile.getAbsolutePath());
            System.out.println("파일 크기: " + myFile.length() + " bytes");
            
            // 파일 삭제
            // myFile.delete(); 
            // System.out.println("파일이 삭제되었습니다.");
        }
    }
}
```