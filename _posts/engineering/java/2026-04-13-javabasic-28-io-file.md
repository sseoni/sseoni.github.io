---
layout: post
title: "[Java 기초] 파일 내용 읽고 쓰기: FileWriter와 BufferedReader"
date: 2026-04-13 18:00
tags: [스터디로그, java, IO, FileWriter, BufferedReader]
summary: 문자(Character) 단위의 입출력 스트림을 생성하여 텍스트 파일에 데이터를 기록하고, 성능을 향상시키는 버퍼(Buffer)를 통해 데이터를 읽어오는 방법을 알아본다.
---

앞선 포스트에서 만든 빈 파일(`memo.txt`)에 이제 진짜 글자를 써넣고, 다시 화면으로 읽어올 차례다. 
우리가 다루는 데이터는 동영상이나 이미지가 아닌 '텍스트(문자)'이므로, 문자 기반의 스트림인 `FileWriter`와 `FileReader`를 사용한다.

## 1. 파일에 글자 쓰기 (FileWriter)

프로그램의 데이터를 텍스트 파일로 밀어 넣을 때는 `FileWriter`를 사용한다. 앞서 배운 `Try-With-Resources` 구문을 사용하면 작업이 끝난 후 스트림을 자동으로 닫아주어 매우 안전하다.

```java
import java.io.FileWriter;
import java.io.IOException;

public class FileWriteEx {
    public static void main(String[] args) {
        
        // Try-With-Resources 괄호 안에서 FileWriter 생성
        // true 옵션: 기존 파일 내용을 지우지 않고 밑에 이어 쓰기(Append)를 하겠다는 의미
        try (FileWriter writer = new FileWriter("memo.txt", true)) {
            
            writer.write("첫 번째 할 일: 자바 복습하기\n");
            writer.write("두 번째 할 일: 블로그 포스팅하기\n");
            
            System.out.println("파일 쓰기 완료!");
            
        } catch (IOException e) {
            System.out.println("파일에 쓰는 중 에러 발생: " + e.getMessage());
        }
    }
}
```

## 2. 파일에서 글자 읽기 (BufferedReader)

파일에 쓰인 텍스트를 읽어올 때는 기본적으로 `FileReader`를 쓴다. 하지만 디스크에서 한 글자씩 가져오면 성능이 너무 떨어지기 때문에, 여러 글자를 수레(버퍼)에 가득 모았다가 한 번에 가져오는 **`BufferedReader`**를 겉에 씌워서 사용하는 것이 실무 표준이다.

```Java
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class FileReadEx {
    public static void main(String[] args) {
        
        // FileReader를 성능이 좋은 BufferedReader로 한 번 감싸서 사용함
        try (BufferedReader reader = new BufferedReader(new FileReader("memo.txt"))) {
            
            String line;
            // readLine(): 텍스트를 한 줄(엔터 기준)씩 통째로 읽어옴. 더 이상 읽을 줄이 없으면 null 반환.
            while ((line = reader.readLine()) != null) {
                System.out.println("읽어온 내용 -> " + line);
            }
            
        } catch (IOException e) {
            System.out.println("파일을 읽는 중 에러 발생: " + e.getMessage());
        }
    }
}
```

이처럼 스트림을 열고, 데이터를 이동시키고, 스트림을 닫는 것이 자바 I/O의 가장 기본적인 작동 원리다.