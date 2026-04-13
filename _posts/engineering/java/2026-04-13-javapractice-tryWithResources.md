---
layout: post
title: "[Java 활용] 자원 반납의 정석: Try-With-Resources 완벽 가이드"
date: 2026-04-13 12:00
tags: [스터디로그, java, Exception, TryWithResources, AutoCloseable]
summary: 과거 finally를 이용해 자원을 닫던 지저분한 코드를 한 줄로 압축해 주는 현대 자바의 표준 문법, Try-With-Resources에 대해 알아본다.
---

앞서 예외 처리 기초에서 `finally` 구문은 '에러 발생 여부와 상관없이 무조건 마지막에 문을 닫고 나가는 역할'을 한다고 배웠다. 

{% include link-card.html url="/blog/engineering/java/javabasic-22-tryCatch" %}

실무에서는 메모리 누수를 막기 위해 사용이 끝난 파일 읽기, 네트워크 연결 등을 **무조건 닫아주어야(close)** 한다. 하지만 과거 자바의 `finally` 방식은 코드가 길어지는 단점이 있었다.

## 1. 과거의 자원 반납 방식

파일 하나를 읽어서 쓰고 닫는 코드를 작성해 보자.

```java
import java.util.Scanner;
import java.io.File;
import java.io.FileNotFoundException;

public class OldCloseEx {
    public static void main(String[] args) {
        Scanner scanner = null;
        try {
            scanner = new Scanner(new File("test.txt"));
            System.out.println(scanner.nextLine());
            
        } catch (FileNotFoundException e) {
            System.out.println("파일이 없습니다.");
            
        } finally {
            // 🚨 지저분한 마무리 코드
            // scanner가 혹시라도 생성되기도 전에 에러가 났을 수 있으므로 null 체크를 해야 함
            if (scanner != null) {
                scanner.close(); // 여기서도 또 에러가 날 수 있음!
            }
        }
    }
}
```

핵심 로직은 한 줄인데, 파일을 안전하게 닫기 위한 코드가 배보다 배꼽이 더 커져 버렸다.

## 2. 현대 자바의 혁명: Try-With-Resources

자바 7버전부터 이 코드를 한 방에 해결해 주는 Try-With-Resources 문법이 등장했다.
try 옆에 괄호 ( )를 열고 그 안에서 사용할 자원(파일 등)을 생성하면, 작업이 끝난 뒤 자바가 알아서 close()를 호출하여 문을 닫아준다. finally를 쓸 필요가 없어진 것이다!

```Java
import java.util.Scanner;
import java.io.File;
import java.io.FileNotFoundException;

public class TryWithResourcesEx {
    public static void main(String[] args) {
        
        // 💡 try 괄호 안에 자원 생성 코드를 넣음!
        try (Scanner scanner = new Scanner(new File("test.txt"))) {
            
            // 파일 읽기 수행
            System.out.println(scanner.nextLine());
            
        } catch (FileNotFoundException e) {
            System.out.println("파일이 없습니다.");
        } 
        // finally가 없어도 try 블록이 끝나면 알아서 scanner.close()가 몰래 실행됨!
    }
}
```

**💡 아무 클래스나 다 알아서 닫아줄까? (AutoCloseable)**
Try-With-Resources 문법을 쓰려면 아무 객체나 괄호 안에 넣을 수 있는 것은 아니다. 괄호 안에 들어갈 수 있는 객체는 반드시 **AutoCloseable**이라는 자바 표준 인터페이스를 구현(implements)한 클래스여야만 한다.

자바가 제공하는 파일 읽기, 쓰기, 네트워크 통신 관련 클래스들(Scanner, FileWriter, BufferedReader 등)은 모두 내부적으로 이 AutoCloseable 인터페이스가 구현되어 있으므로 안심하고 try ( ) 안에 넣어서 사용하면 된다.