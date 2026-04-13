---
layout: post
title: "[Java 기초] 프로그램의 안전망: 예외 처리 (try-catch, finally, throw)"
date: 2026-04-13 12:00
tags: [스터디로그, java, Exception, TryCatch, Finally]
summary: 프로그램이 강제 종료되는 것을 막기 위한 try-catch 문법과 무조건 실행되는 finally, 그리고 개발자가 직접 에러를 발생시키는 throw 키워드를 알아본다.
---

프로그램을 만들다 보면 숫자를 0으로 나누거나, 없는 파일을 읽으려고 하는 등 다양한 오류 상황이 발생한다. 자바는 에러가 발생하면 즉시 그 자리에 에러 메시지를 뱉으며 **프로그램을 강제로 종료**시켜버린다. 

이러한 예기치 못한 종료를 막고, 에러가 발생하더라도 프로그램이 정상적으로 다음 작업을 수행할 수 있도록 안전망을 설치하는 것을 **예외 처리(Exception Handling)**라고 한다.

## 1. 기본 안전망: try-catch

예외 처리의 가장 기본 형태는 `try-catch` 블록이다. 

**`try`**: 에러가 발생할 위험이 있는 코드를 이 안에 넣는다.
**`catch`**: `try` 안에서 에러가 터졌을 때, 프로그램이 멈추지 않고 대신 실행할 대체 코드를 넣는다.

```java
public class TryCatchEx {
    public static void main(String[] args) {
        System.out.println("프로그램 시작");

        try {
            // 에러 발생 위험이 있는 코드
            int result = 10 / 0; // 숫자를 0으로 나눌 수 없으므로 에러 발생!
            System.out.println("계산 결과: " + result); // 에러가 났으므로 이 줄은 무시됨
            
        } catch (ArithmeticException e) {
            // 에러가 발생했을 때 프로그램이 종료되는 대신 실행되는 곳
            System.out.println("수학적 오류가 발생했습니다! 0으로 나눌 수 없습니다.");
        }

        System.out.println("프로그램 정상 종료"); 
        // catch문 덕분에 프로그램이 튕기지 않고 무사히 여기까지 도달함!
    }
}
```

{% include link-card.html url="/blog/engineering/java/javapractice-exception" %}

## 2. 무조건 실행되는 구역: finally

데이터베이스를 다루거나 파일을 열어서 작업할 때, 에러가 났든 안 났든 마지막에 무조건 파일을 닫아주는 마무리 작업이 필요하다. 이때 사용하는 것이 finally다.

```Java
public class FinallyEx {
    public static void main(String[] args) {
        try {
            System.out.println("1. 문을 열고 들어갑니다.");
            int result = 10 / 0; // 에러 발생!
            System.out.println("2. 작업을 수행합니다."); // 무시됨
            
        } catch (Exception e) {
            System.out.println("에러 발생: 비상 조치를 취합니다.");
            
        } finally {
            // 에러가 나든 안 나든, 심지어 catch 안에 return문이 있어도 무조건 실행됨
            System.out.println("3. 마지막에 무조건 문을 닫고 나갑니다.");
        }
    }
}
```

## 3. 내 손으로 에러 터뜨리기: throw

자바가 문법적으로는 에러라고 생각하지 않지만, 우리의 비즈니스 규칙상 에러로 처리해야 할 때가 있다. 예를 들어 회원가입 시 나이는 음수(-1살)가 될 수 없다. 이때는 개발자가 고의로 예외를 발생시켜야 하는데, 이때 사용하는 키워드가 **throw**다.

```Java
public class ThrowEx {
    public static void main(String[] args) {
        int age = -5;

        try {
            if (age < 0) {
                // throw new: 강제로 예외 객체를 생성하여 던짐(터뜨림)
                throw new IllegalArgumentException("나이는 0보다 작을 수 없습니다!");
            }
            System.out.println("입력된 나이: " + age);
            
        } catch (IllegalArgumentException e) {
            // throw로 던진 에러 메시지를 꺼내서 출력함
            System.out.println("잘못된 입력입니다 -> " + e.getMessage());
        }
    }
}
```

{% include link-card.html url="/blog/engineering/java/javapractice-tryWithResources" %}