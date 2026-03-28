---
layout: post
title: "[Java 기초] [참조] 12. 자바에는 전역 변수(Global Variable)가 없을까? (feat. static)"
date: 2026-03-25
tags: [스터디로그, Java, 정보처리기사]
summary:
---

C언어나 파이썬에는 파일 밖 최상단에 변수를 띡 선언해 두면 어디서든 쓸 수 있는 '전역 변수'가 있다.

하지만 자바에는 그런 변수가 없다. 자바는 "모든 것은 객체(클래스) 안에 있어야 한다"는 철저한 객체 지향(OOP) 사상을 바탕으로 만들어졌기 때문에 자바의 모든 변수와 메소드는 **반드시 클래스(Class)라는 울타리 안**에 있어야 힌다.

그렇다면 프로그램 전체에서 공유해야 하는 값(예: 회사 이름, 수학의 파이값 등)은 어떻게 만들까? 자바에서는 **`public static`** 키워드를 조합하여 전역 변수와 똑같은 효과를 낸다.

## 1. `static` 이란 무엇인가? (정적 변수)

보통 클래스 안에 만든 변수(인스턴스 변수)는 객체를 `new`로 찍어낼 때마다 메모리(Heap)에 새로 생겨난다. 하지만 변수 앞에 `static`을 붙이면 이야기가 완전히 달라진다.

`static`이 붙은 변수는 프로그램이 딱 시작될 때 메모리의 **'메소드 영역(Method Area)'** 또는 '스태틱 영역'이라는 특별한 공간에 **딱 1개만** 만들어진다. 그리고 모든 객체가 이 1개의 공간을 다 함께 공유해서 바라본다.

## 2. `public static`으로 전역 변수 만들기

- `static`: 메모리에 딱 하나만 만들어서 다 같이 공유하겠다.
- `public`: 다른 패키지, 다른 클래스 어디서든 접근할 수 있게 빗장을 열겠다.

이 두 가지를 합치면 C언어의 전역 변수와 동일한 역할을 하게 된다.

```jsx
// [전역 변수 역할을 할 클래스 생성]
public class GlobalData {
    // 1. 어디서든 공유해서 쓸 수 있는 '전역 변수'
    public static int totalUserCount = 0; 
    
    // 2. 절대 변하지 않는 '전역 상수' (final 키워드 추가)
    public static final double PI = 3.141592; 
}
```

## 3. 전역(static) 변수 사용하기

`static` 변수는 객체를 `new`로 생성할 필요가 없다. 이미 프로그램 시작과 동시에 메모리에 올라가 있기 때문에, **`클래스이름.변수이름`** 형태로 언제 어디서든 바로 가져다 쓰면 된다.

```jsx
public class MainArea {
    public static void main(String[] args) {
        
        // 객체 생성(new) 없이 클래스 이름으로 바로 접근!
        System.out.println("초기 유저 수: " + GlobalData.totalUserCount); 
        
        // 전역 변수이므로 값을 변경하면 프로그램 전체에 영향을 미침
        GlobalData.totalUserCount += 10; 
        
        System.out.println("증가된 유저 수: " + GlobalData.totalUserCount);
        System.out.println("원주율: " + GlobalData.PI);
    }
}
```

### 🚨 전역 변수(`static`) 사용 시 주의할 점

1. **메모리 낭비**: `static` 변수는 프로그램이 끝날 때까지 절대 메모리에서 사라지지 않는다. 너무 많이 만들면 메모리를 갉아먹는 주범이 된다. (가비지 컬렉터가 함부로 건드리지 못함)
2. **동시성 문제**: 여러 곳에서 동시에 하나의 `static` 변수 값을 바꾸려고 들면, 값이 꼬이는 치명적인 버그가 발생할 수 있다.
3. 따라서 꼭 필요한 경우가 아니면 사용을 자제하고, 주로 절대 변하지 않는 환경 설정값이나 상수(`public static final`)를 정의할 때만 제한적으로 사용하는 것이 좋다.