---
layout: post
title: "[Java 기초] [참조] 문자를 더했는데 왜 숫자가 나올까? (char vs String 덧셈의 함정)"
date: 2026-03-25
tags: [스터디로그, Java, 정보처리기사]
summary:
---

자바 기초를 공부하다 보면 누구나 한 번쯤 겪는 황당한 에러가 있다. 바로 문자 `'1'`과 문자 `'2'`를 더해서 `"12"`를 만들고 싶었는데, 뜬금없이 숫자 `99`가 튀어나오거나 타입 에러가 발생하는 현상이다.

문자(char)와 문자열(String)의 덧셈 연산이 내부적으로 어떻게 다르게 동작하는지 정리했다.

## 🚨 1. `char` + `char` = 수학적 덧셈 (아스키코드)

`char` 타입은 홑따옴표(`''`)를 사용해 딱 한 글자만 담는 **기본 자료형**이다. 앞선 포스트에서 다루었듯, 컴퓨터는 문자를 있는 그대로 기억하지 못하고 내부적으로 **아스키(ASCII) 코드라는 숫자**로 변환하여 저장한다.

따라서 `char` 끼리 `+` 기호를 사용하면, 자바는 이를 글자를 이어 붙이라는 뜻이 아니라 **"아스키코드 숫자끼리 산술 덧셈을 해라!"**라고 받아들인다.

```jsx
// [char 타입의 덧셈 연산 (주의!)]
public static void main(String[] args) {
    char a = '1'; // 내부적으로 아스키코드 49
    char b = '2'; // 내부적으로 아스키코드 50

    // char 끼리 더하면 그 결과는 더 큰 바구니인 int(정수)로 튀어나온다.
    // char result = a + b; // 💥 에러 발생: int 결과를 char에 담을 수 없음!
    
    int sum = a + b; 
    System.out.println("문자 '1'과 '2'의 합: " + sum); // 결과: 99
}
```

## 💡 2. `String` + `String` = 텍스트 이어붙이기 (결합)

여러 글자를 나란히 이어붙여 새로운 단어를 만들고 싶다면, 홑따옴표(`''`)가 아닌 쌍따옴표(`""`)를 사용하는 **문자열(`String`)** 참조형 타입을 사용해야 한다.

`String` 객체 사이에서의 `+` 연산자는 산술 덧셈이 아니라 **'문자열 결합(Concatenation)'**으로 완전히 다르게 동작하기 때문이다.

```jsx
// [String 타입의 결합 연산 (권장!)]
public static String joinStrings(String str1, String str2) {
    // 문자열에서 + 기호는 텍스트를 기차처럼 나란히 이어붙인다.
    String result = str1 + str2; 
    return result;
}

public static void main(String[] args) {
    // 숫자 10, 20이 아닌, 텍스트 "10", "20"을 던져준다.
    String resultText = joinStrings("10", "20"); 
    System.out.println("두 문자열의 결합: " + resultText); // 결과: 1020
}
```

### 📌 요약

- **`char` (홑따옴표)**: 덧셈 시 아스키코드 숫자로 변환되어 **수학적 계산**이 일어남.
- **`String` (쌍따옴표)**: 덧셈 시 텍스트가 기차처럼 **이어 붙음**.