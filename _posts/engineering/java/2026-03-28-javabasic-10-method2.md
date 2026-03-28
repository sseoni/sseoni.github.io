---
layout: post
title: "[Java 기초] 10. 메소드 오버로딩(Overloading)과 스코프(Scope)"
date: 2026-03-28
tags: [스터디로그, Java, 정보처리기사]
summary:
---

메소드의 기초를 다졌다면, 객체 지향 프로그래밍(OOP)의 다형성을 구현하는 핵심 기술인 **오버로딩(Overloading)**과 **오버라이딩(Overriding)**, 그리고 **스코프(Scope)**에 대해 정리한다.

## 1. 메소드 오버로딩 (Overloading)

**"같은 이름의 메소드를 여러 개 만드는 기술"**이다.

메소드 이름이 같더라도, **전달값(파라미터)의 타입이나 개수가 다르면** 자바 컴파일러는 서로 다른 메소드로 인식한다.

(`System.out.println()`이 문자열, 정수, 실수 등 모든 타입을 다 받을 수 있는 이유가 바로 오버로딩 덕분이다.)

```jsx
// 1. 정수 2개를 더하는 메소드
public static int add(int a, int b) {
    return a + b;
}
    
// 2. 실수 2개를 더하는 메소드 (이름은 같지만 매개변수 타입이 다름 -> 오버로딩 성공)
public static double add(double a, double b) {
    return a + b;
}

// 3. 정수 3개를 더하는 메소드 (이름은 같지만 매개변수 개수가 다름 -> 오버로딩 성공)
public static int add(int a, int b, int c) {
    return a + b + c;
}
```

### [참조] 메소드 오버라이딩 (Overriding)

**"부모 클래스에게 물려받은 메소드를 자식 클래스에서 내 입맛대로 뜯어고치는(재정의하는) 기술"**이다.

이름, 전달값, 반환값 타입이 **모두 부모와 완벽히 똑같아야** 하며, 내부 로직(코드)만 변경할 수 있다.

[🔗 상세설명]

```jsx
// [부모 클래스]
class Animal {
    public void makeSound() {
        System.out.println("동물이 소리를 냅니다.");
    }
}

// [자식 클래스]
class Dog extends Animal {
    @Override // 컴파일러에게 "이거 부모 메소드 덮어쓴 거야!"라고 알려주는 어노테이션
    public void makeSound() {
        System.out.println("멍멍!"); // 부모의 메소드를 자식에 맞게 재정의(Overriding)
    }
}
```

### 💡 [요약] 오버로딩 vs 오버라이딩 비교

| 구분 | 개념 | 이름 | 파라미터(전달값) | 리턴 타입 |
| --- | --- | --- | --- | --- |
| **Overloading** | 기존에 없는 **새로운** 메소드를 추가 (적재) | 같음 | **다름** | 상관없음 |
| **Overriding** | 부모의 메소드를 **덮어쓰기** (재정의) | 같음 | **같음** | **같음** |

## 2. Variable Scope: 변수의 범위

자바에서 변수는 자신이 선언된 **중괄호 `{ }` 블록 안에서만** 살아 숨 쉴 수 있다. 중괄호가 닫히는 순간 메모리에서 깔끔하게 삭제된다. 이 생존 구역을 **스코프(Scope)**라고 부른다.

❗️파이썬이나 c언어와는 달리 자바에는 전역변수(Global)는 존재하지 않는다.

[🔗참조]

- **지역 변수 (Local Variable)**: 메소드나 제어문(if, for 등) 안에서 선언된 변수. 해당 블록을 벗어나면 죽는다.
- **매개 변수 (Parameter)**: 메소드 선언부에 적힌 변수. 해당 메소드 안에서만 쓰이고 메소드가 끝나면 죽는다.

```jsx
public static void main(String[] args) {
    int mainNum = 10; // main 메소드 전체에서 살아있는 변수

    if (mainNum > 5) {
        int ifNum = 20; // if문 블록 안에서 태어난 변수
        System.out.println(mainNum); // 사용 가능
        System.out.println(ifNum);   // 사용 가능
    } // <- 여기서 ifNum은 수명을 다하고 메모리에서 사라짐!

    System.out.println(mainNum); // 사용 가능
    // System.out.println(ifNum); // 에러 💥! if문 밖이므로 ifNum은 이미 죽고 없다.
}
```

💡 스코프를 좁게 유지할수록(변수가 빨리 죽게 만들수록) 메모리 효율이 좋아지고 의도치 않은 버그를 방지할 수 있다.