---
layout: post
title: "[Java 활용] Files 클래스 (NIO): 단 한 줄로 파일 읽고 쓰기"
date: 2026-04-17 13:00
tags: [스터디로그, java, IO, NIO, Files, Paths]
summary: 코드가 길고 복잡한 기존 java.io 패키지 대신, 실무에서 파일 입출력을 극도로 간결하게 처리할 때 사용하는 java.nio.file.Files 유틸리티 클래스에 대해 정리한다.
---

자바에서 파일을 읽고 쓰기 위해 `FileWriter`와 `BufferedReader`를 만들고, `try-catch`로 감싸고, `while`문을 돌려 한 줄씩 읽어오는 과정은 상당히 길고 수고스럽다.

이러한 불편함을 해소하기 위해 자바 7버전부터 **`java.nio.file`** 패키지가 도입되었다. 특히 그중에서도 **`Files`** 유틸리티 클래스를 사용하면, 10줄이 넘어가던 파일 입출력 코드를 단 한 줄로 끝낼 수 있어 실무에서 아주 적극적으로 쓰인다.

## 1. `Files.writeString()`: 단 한 줄로 파일 쓰기

기존에 `FileWriter`를 써서 스트림을 열고 닫던 과정을 `Files.writeString()` 메서드가 한 번에 처리해 준다.

```java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;

public class NioWriteEx {
    public static void main(String[] args) {
        
        // 파일의 경로를 지정하는 객체 (java.io.File의 최신 버전)
        Path path = Paths.get("todo.txt");
        String content = "내일 할 일: 객체지향 설계 연습\n";

        try {
            // 경로, 넣을 내용, [옵션: 기존 내용에 이어쓰기 및 파일 없으면 생성] 지정
            Files.writeString(path, content, StandardOpenOption.CREATE, StandardOpenOption.APPEND);
            System.out.println("간단하게 파일 쓰기 성공!");
            
        } catch (IOException e) {
            System.out.println("에러: " + e.getMessage());
        }
    }
}
```

## 2. `Files.readAllLines()`: 단 한 줄로 파일 전체 읽기

`BufferedReader`와 `while(readLine())` 조합을 쓸 필요 없이, 파일 안의 모든 텍스트 라인을 읽어서 깔끔하게 `List<String>` 자료구조로 한 번에 담아준다. 앞서 배운 `List`와 향상된 `for`문을 이용해 바로 꺼내 쓸 수 있다.

```Java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

public class NioReadEx {
    public static void main(String[] args) {
        Path path = Paths.get("todo.txt");

        try {
            // 파일의 모든 줄을 읽어 List 바구니에 차곡차곡 담아준다.
            List<String> lines = Files.readAllLines(path);
            
            System.out.println("--- 파일 내용 출력 ---");
            for (String line : lines) {
                System.out.println(line);
            }
            
        } catch (IOException e) {
            System.out.println("파일 읽기 에러: " + e.getMessage());
        }
    }
}
```

**💡 요약**: 용량이 기가바이트(GB) 단위로 엄청나게 큰 파일을 다뤄야 하는 상황이 아니라면, 수십~수백 메가바이트 수준의 일반적인 텍스트 파일 입출력은 코드가 훨씬 직관적이고 짧은 `java.nio.file.Files` 클래스를 사용하는 것이 현대 자바 개발의 트렌드다.