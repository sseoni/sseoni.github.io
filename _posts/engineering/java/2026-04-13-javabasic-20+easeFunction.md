---
layout: post
title: "[Java 기초] [참조] 익명 클래스(Anonymous Class)는 도대체 어떤 '번거로움'을 피하게 해줄까?"
date: 2026-04-13 10:30
tags: [스터디로그, java, AnonymousClass, OOP]
summary: 자바에서 1회성 로직을 위해 정식 클래스(.java)를 생성할 때 발생하는 물리적 오버헤드와, 이를 해결해 주는 익명 클래스의 실용성을 비교해 본다.
---

자바의 람다식이나 익명 클래스를 공부하다 보면 **"클래스를 새로 만드는 번거로움을 피하기 위해 등장했다"**는 설명을 자주 보게 된다. 

그렇다면 여기서 말하는 '번거로움'의 실체는 무엇일까? 자바의 정통 객체 지향 방식과 익명 클래스 방식을 비교해 보면 그 귀찮음이 확 와닿는다.

## 1. 정통 방식: 1회성 로직을 위해 파일까지 만들어야 하는 고통

만약 숫자들 중에서 '짝수'만 걸러내는 기능 하나가 딱 한 번 필요하다고 가정해 보자. 자바의 정통 방식대로라면 다음과 같은 험난한 과정을 거쳐야 한다.

### ① 별도의 파일 생성 및 이름 짓기 (`EvenNumberFilter.java`)

새로운 자바 파일을 만들고, 클래스 이름을 고민해서 짓고, 인터페이스를 상속(`implements`)받는 코드를 작성해야 한다.

```java
// 별도의 파일: EvenNumberFilter.java
public class EvenNumberFilter implements NumberFilter {
    @Override
    public boolean check(int number) {
        return number % 2 == 0;
    }
}
```

### ② 메인 코드에서 불러와서 객체 생성 (Main.java)

```Java
// 별도의 파일: Main.java
public class Main {
    public static void main(String[] args) {
        // 아까 만든 정식 클래스를 불러와서 객체로 생성
        NumberFilter filter = new EvenNumberFilter();
    }
}
```

**🚨 문제점**
만약 홀수를 거르는 필터, 3의 배수를 거르는 필터 등 딱 한 번만 쓰고 버릴 1회성 로직이 10개가 필요하다면 어떻게 될까? 프로젝트 폴더 안에 단 한 번만 쓰고 버릴 .java 파일이 10개나 생겨나는 끔찍한 상황이 벌어진다. 파일 관리도 지저분해지고, 매번 새로운 클래스 이름(Naming)을 지어내야 하는 엄청난 스트레스가 수반된다.

## 2. 해결책: 익명 클래스 (Anonymous Class)

이런 1회성 로직을 위해 굳이 새로운 .java 파일을 만들고 이름을 짓기 싫을 때 사용하는 것이 바로 익명(이름 없는) 클래스다.

별도의 파일을 만들지 않고, 내가 이 기능이 필요한 Main.java의 그 위치에서 즉석으로 인터페이스를 구현하고 객체까지 한 방에 생성해 버린다.

```Java
// Main.java 하나면 충분함!
public class Main {
    public static void main(String[] args) {
        
        // 굳이 EvenNumberFilter.java를 만들지 않고, 
        // NumberFilter 인터페이스를 즉석에서 구현해 버린다!
        NumberFilter filter = new NumberFilter() {
            @Override
            public boolean check(int number) {
                return number % 2 == 0;
            }
        }; 
        // ↑ 여기서 만들어진 객체는 껍데기 이름(클래스명)이 없으므로 '익명 클래스'라 부른다.
    }
}
```

**💡 결론**
익명 클래스가 '번거로움을 피하는 방법'인 이유는 결국 실용성에 있다.

파일 파편화 방지: 단 한 번 쓸 로직 때문에 불필요한 .java 파일을 여러 개 만들지 않아도 된다. (파일 관리의 최소화)

이름 짓기 스트레스 해소: 어차피 한 번 쓰고 버릴 객체이므로 EvenNumberFilterImpl 같은 거창한 이름을 지어줄 필요가 없다.

결국, **"이 로직은 여기서 한 번만 딱 쓰고 버릴 건데, 굳이 각 잡고 정식 파일(클래스)로 만들어야 해? 그냥 여기서 즉석으로 만들고 끝내자!"**라는 개발자들의 실용주의가 만들어낸 문법이 바로 익명 클래스인 셈이다.