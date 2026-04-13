---
layout: post
title: "[Java 활용] 개발자가 가장 자주 만나는 자바 표준 예외 총정리"
date: 2026-04-13 12:00
tags: [스터디로그, java, Exception, API, TroubleShooting]
summary: 자바 프로그래밍 및 코딩 테스트 중 가장 흔하게 마주치는 4가지 대표적인 표준 예외 클래스들의 원인과 해결책을 예제 코드로 정리한다.
---

자바 개발자라면 콘솔 창을 빨갛게 물들이는 예외(에러) 메시지를 하루에도 수십 번씩 만나게 된다. 사용자 정의 예외를 만들기 전에, 자바가 기본적으로 제공하는 **대표적인 표준 예외 클래스 4가지**의 원인과 발생하는 코드를 숙지해 두면 트러블슈팅(에러 해결) 속도가 비약적으로 상승한다.

## 1. NullPointerException (NPE)

개발을 하면서 가장 많이 만나는 에러 1위다. 객체가 생성이 안 되어 '비어있는(null)' 상태인데, 그 객체에 대고 점(`.`)을 찍어 메서드를 호출하거나 속성을 꺼내려 할 때 발생한다.

```java
String text = null; // 인스턴스(객체)가 없음!
// System.out.println(text.length()); // 💥 NullPointerException 발생
```

**👉 해결책**: 변수가 null인지 검사하는 로직(if (text != null))을 추가하거나, 객체를 확실하게 초기화("")해야 한다.


## 2. ArrayIndexOutOfBoundsException
배열(Array)이나 리스트(List)에서, 자신이 가지고 있는 인덱스(번호) 범위를 벗어난 곳에 접근하려고 할 때 발생한다.

```Java
int[] numbers = {1, 2, 3}; // 인덱스는 0, 1, 2까지만 존재함
// System.out.println(numbers[3]); // 💥 ArrayIndexOutOfBoundsException 발생
```

**👉 해결책**: 배열의 길이(numbers.length)를 넘지 않도록 조건문을 설정하거나, 반복문에서 <= length 대신 < length를 사용했는지 확인한다.


## 3. NumberFormatException
문자열(String)을 숫자(int, double 등)로 강제로 변환하려고 할 때, 그 문자열 안에 문자가 섞여 있어서 숫자로 바꿀 수 없을 때 발생한다.

```Java
String priceStr = "1000원"; // '원' 이라는 글자가 포함됨
// int price = Integer.parseInt(priceStr); // 💥 NumberFormatException 발생
```

**👉 해결책**: 정규표현식 등을 사용해 숫자가 아닌 문자를 모두 제거한 뒤에 parseInt()를 수행해야 한다.


## 4. IllegalArgumentException
메서드에 전달된 파라미터(인자)의 값이 논리적으로 말이 안 되거나, 비즈니스 규칙에 맞지 않을 때 발생(또는 개발자가 고의로 발생시킴)하는 예외다.

```Java
// 나이를 세팅하는 메서드에 음수를 넣은 경우
public void setAge(int age) {
    if (age < 0) {
        throw new IllegalArgumentException("나이는 음수가 될 수 없습니다.");
    }
}
```

**👉 해결책**: 파라미터를 메서드에 넘기기 전에, 사용자의 입력값이 유효한지 1차적으로 검증(Validation)하는 로직이 필요하다.