---
layout: post
title: "[Java 기초] 9. 메소드(Method)의 기초"
date: 2026-03-25
tags: [스터디로그, Java, 정보처리기사]
summary:
---

코드를 작성하다 보면 똑같은 로직을 여러 번 반복해서 써야 할 때가 있다.

이때 사용하는 것이 바로 **메소드(Method)**다. 수학의 함수, 혹은 입력을 넣으면 결과가 나오는 '자판기'로 생각하면 이해하기 쉽다.

(파이썬의 함수와 동일한 기능을 한다.)

## 1. 메소드 (Method) 기본

메소드는 특정 작업을 수행하는 코드들의 모임이다. 

`void`는 '반환값이 없음'을 의미하며, 메소드 이름 뒤의 괄호 `()`는 비워두면 '전달받는 값이 없음'을 뜻한다.

```java
// 접근제어자 반환명 메소드명(전달값){명령문}
public static void sayHello() {
    System.out.println("안녕하세요! 자바 공부 중입니다.");
}

public static void main(String[] args) {
    // [메소드 호출] 이름만 부르면 해당 블록의 코드가 실행된다.
    sayHello();
    sayHello(); // 필요할 때마다 몇 번이든 재사용 가능!
}
```

## 2. 전달값 (Parameter / Argument)

자판기에 동전을 넣듯, 메소드에 작업을 지시할 때 외부에서 값을 던져줄 수 있다. 이를 **전달값(파라미터)**이라고 한다. 괄호 `()` 안에 어떤 타입의 값을 받을지 변수를 선언해 주면 된다. 여러 개의 값을 쉼표(`,`)로 구분하여 받을 수도 있다.

```java
// [전달값이 없는 메소드]
public static void sayHello() {
    System.out.println("안녕!");
}

// [전달값이 있는 메소드] 이름을 받아 맞춤형 인사를 하는 메소드
public static void greet(String name, int age) {
    System.out.println("안녕, " + name + "! 넌 " + age + "살이구나.");
}

public static void main(String[] args) {
		sayHello();        // "안녕!" 출력
    greet("홍길동", 26); // "안녕, 홍길동! 넌 26살이구나." 출력
}
```

## 3. 반환값 (Return)

메소드가 작업을 끝낸 후, 그 결과를 호출한 곳으로 다시 돌려주는 것을 **반환(Return)**이라고 한다. 반환값이 있을 때는 메소드 선언부에 `void` 대신 **반환할 데이터의 타입(예: `int`, `String` 등)**을 적어주어야 한다.

```java
// [반환값이 있는 메소드] 항상 int 100을 돌려주는 메소드
public static int getScore() {
    return 100; // return 키워드를 만나면 값을 반환하고 메소드는 즉시 종료됨
}

public static void main(String[] args) {
    int myScore = getScore(); 
    System.out.println("내 점수는: " + myScore); // "내 점수는: 100" 출력
}
```

## 4. 전달값과 반환값 함께 쓰기 (입출력)

실무에서 가장 많이 쓰이는 형태다. 재료(전달값)를 받아 가공한 뒤, 완성품(반환값)을 돌려준다.

```java
// [전달값과 반환값이 모두 있는 메소드] 두 숫자를 더해 결과를 반환
public static int addNumbers(int num1, int num2) {
    int result = num1 + num2;
    return result; 
}

public static void main(String[] args) {
    int sum = addNumbers(10, 20); // 10과 20을 던져주고, 더해진 결과(30)를 받음
    System.out.println("두 수의 합: " + sum);
}
```

💡[주의] 두 문자를 더하는 경우
