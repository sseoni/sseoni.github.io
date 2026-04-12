---
layout: post
title: "[Java 기초] [참조] Wrapper 클래스는 왜 '포장지'라고 불릴까? (Auto-boxing)"
date: 2026-04-12 18:30
tags: [스터디로그, java, Wrapper, Auto-boxing, 상속]
summary: 순수 데이터에 객체의 기능을 부여하는 Wrapper 클래스의 본질(Boxing/Unboxing)과, 자바 컴파일러가 지원하는 오토박싱의 원리를 파헤쳐 본다.
---

자바 코드를 작성하다 보면 아래와 같은 코드를 마주하게 된다. 

```java
public static void main(String[] args) {
    Integer i = 1;
    Double d = 1.0;

    System.out.println(i.intValue());
    System.out.println(d.intValue());
}
```
말씀하신 대로 포스트를 두 개로 깔끔하게 나누는 것이 블로그 운영이나 프로덕트 관점에서는 훨씬 더 좋은 전략입니다!

방문자의 **'검색 의도(Search Intent)'**가 완전히 다르기 때문입니다.

오토박싱 검색자: "자바 기초 문법과 Wrapper의 개념"을 공부하려는 사람.

취소선 에러 검색자: 실습하다가 "내 코드에 왜 빨간 줄/취소선이 생겼지?" 하고 에러 해결책을 급하게 찾는 사람.

이 두 타겟을 위해 포스트를 완전히 분리하고, 서로 꼬리물기 링크를 달아두어 체류 시간을 늘리는 방향으로 두 개의 포스트를 분리해 보았습니다.

📝 참조 포스트 A: Wrapper 개념과 오토박싱

Markdown
---
layout: post
title: "[Java 기초] [참조] Wrapper 클래스는 왜 '포장지'라고 불릴까? (오토박싱의 마법)"
date: 2026-04-12 18:30
tags: [스터디로그, java, Wrapper, Auto-boxing, 상속]
summary: 순수 데이터에 객체의 기능을 부여하는 Wrapper 클래스의 본질(Boxing/Unboxing)과, 자바 컴파일러가 지원하는 오토박싱의 원리를 파헤쳐 본다.
---

자바 코드를 작성하다 보면 아래와 같이 기묘한 코드를 마주하게 된다. 

```java
public static void main(String[] args) {
    Integer i = 1;
    Double d = 1.0;

    System.out.println(i.intValue());
    System.out.println(d.intValue());
}
```

분명 `1`이나 `1.0`은 기능(메서드)을 가질 수 없는 순수한 기본형(Primitive) 데이터다. 그런데 어떻게 저 값들에 점(`.`)을 찍어서 `.intValue()` 같은 메서드를 호출할 수 있는 걸까?

## 1. Wrapper의 진짜 의미: 포장하기와 뜯기
위 코드는 'Wrapper(포장지)'라는 이름의 존재 이유를 가장 직관적으로 보여주는 예시다.

포장하기 (Boxing): 우측의 순수 데이터 `1`을 `Integer`라는 '객체 포장지' 안에 쏙 집어넣어 어엿한 객체로 만든다.

포장 뜯기 (Unboxing): 포장지 객체(`i`)에게 `.intValue()` 메서드를 호출하여, "네 포장지 안의 순수한 `int` 알맹이를 다시 꺼내줘!"라고 명령한다.

객체가 아닌 일반 `int` 변수에는 `.`을 찍어 기능을 호출할 수 없다. 즉, 순수 데이터를 객체로 포장했기 때문에 유용한 내장 기능을 사용할 수 있게 된 것이다.

## 2. 컴파일러의 마법: 오토박싱 (Auto-boxing)
객체를 만들려면 원래 `new` 키워드를 써야 하는데, 값만 덩그러니 적혀 있어도 에러가 나지 않는 이유는 자바 컴파일러가 코드를 몰래 바꿔치기하기 때문이다.

```Java
// 개발자가 쓴 코드
Integer i = 1; 

// 자바 컴파일러가 실행할 때 몰래 바꾼 코드
Integer i = Integer.valueOf(1); 
```

이처럼 개발자가 귀찮게 객체 생성 코드를 쓰지 않아도 자바가 알아서 포장해 주는 마법을 **오토박싱(Auto-boxing)**이라고 부른다.

(💡 **참고**: Double 객체에서 .intValue()를 호출해 실수를 정수로 바꿀 수 있는 이유는 숫자형 Wrapper 클래스들이 모두 java.lang.Number라는 공통 부모를 상속받아 타입 변환 메서드를 물려받았기 때문이다.)

---
👉 이어지는 글
{% include link-card.html url="/blog/engineering/java/javabasic-17-wrapper" %}
