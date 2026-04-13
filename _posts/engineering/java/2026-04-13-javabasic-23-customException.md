---
layout: post
title: "[Java 기초] 예외 떠넘기기와 나만의 예외 만들기 (throws, 사용자 정의 예외)"
date: 2026-04-13 12:00
tags: [스터디로그, java, Exception, Throws, CustomException]
summary: 내가 처리하기 힘든 예외를 호출한 곳으로 떠넘기는 throws 키워드와, 비즈니스 로직에 딱 맞는 사용자 정의 예외(Custom Exception) 클래스를 설계하는 방법을 알아본다.
---

앞선 포스트에서 `try-catch`를 이용해 내가 직접 예외를 처리하는 방법을 배웠다. 하지만 코드를 짜다 보면, **"여기서 에러를 처리하지 말고, 나를 호출한 쪽에서 알아서 처리해!"**라고 에러를 위로 넘겨버려야 할 때가 있다.

## 1. 예외 떠넘기기: throws (s가 붙음!)

메서드를 선언할 때 뒤에 `throws`를 붙이면, 해당 메서드 안에서 에러가 발생했을 때 본인이 직접 `catch`하지 않고 자기를 호출한 곳으로 에러를 던져버린다.

```java
public class ThrowsEx {
    
    // 이 메서드는 자기가 직접 예외를 처리하지 않고(try-catch 없음),
    // 누군가 자기를 부를 때 예외를 함께 던져버린다(throws).
    public static void checkPassword(String pwd) throws IllegalArgumentException {
        if (pwd.length() < 8) {
            throw new IllegalArgumentException("비밀번호는 8자리 이상이어야 합니다.");
        }
        System.out.println("비밀번호 설정 완료");
    }

    public static void main(String[] args) {
        // 호출하는 쪽(main)에서 반드시 try-catch를 이용해 떨어지는 예외를 막아내야 한다.
        try {
            checkPassword("1234"); // 여기서 예외가 날아옴!
        } catch (IllegalArgumentException e) {
            System.out.println("경고: " + e.getMessage());
        }
    }
}
```

**💡 언제 throws를 쓸까?**
메서드를 아주 범용적으로 만들 때 사용한다. 예를 들어 파일을 읽어오는 readFile() 메서드 안에서 무조건 "파일이 없습니다"라고 출력하게 고정해버리면, 어떤 프로그램에서는 팝업창을 띄우고 싶을 때 수정할 수가 없다. 따라서 **"에러가 났다는 사실만 전달할 테니, 처리는 이걸 쓰는 사람이 알아서 해!"**라는 목적으로 설계할 때 사용한다.

## 2. 사용자 정의 예외 (Custom Exception)

자바가 제공하는 IllegalArgumentException(잘못된 입력)이나 NullPointerException(값이 비어있음) 같은 기본 예외만으로는 우리의 복잡한 현실 세계의 에러를 표현하기 부족하다.

"잔액 부족 예외", "아이디 중복 예외"처럼 내 프로그램에 필요한 예외를 직접 만들 수 있다. **자바의 Exception 클래스를 상속**받기만 하면 된다.

```Java
// 1. 나만의 예외 클래스 만들기 (Exception 상속)
class InvalidPasswordException extends Exception {
    // 생성자: 에러 메시지를 받아서 부모 클래스에 전달
    public InvalidPasswordException(String message) {
        super(message);
    }
}

public class CustomExceptionEx {
    // 2. 내가 만든 예외를 떠넘기기(throws)로 설정
    public static void register(String pwd) throws InvalidPasswordException {
        if (pwd.contains(" ")) {
            // 3. 내가 만든 예외 터뜨리기 (throw new)
            throw new InvalidPasswordException("비밀번호에 공백을 포함할 수 없습니다.");
        }
        System.out.println("회원가입 성공");
    }

    public static void main(String[] args) {
        try {
            register("hello world"); // 공백이 있어서 에러 발생
        } catch (InvalidPasswordException e) {
            // 내가 만든 예외를 잡아서 처리!
            System.out.println("가입 실패: " + e.getMessage());
        }
    }
}
```