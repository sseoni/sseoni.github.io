---
layout: post
title: "[Java 기초] [참조] new Integer()에 취소선이 그어지는 이유 (자바의 메모리 최적화)"
date: 2026-04-09 17:30
tags: [스터디로그, java, Wrapper, Auto-boxing, Deprecated, IntegerCache]
summary: 자바 9부터 Wrapper 클래스의 생성자(new Integer)가 비권장(Deprecated) 처리된 이유와, 메모리 효율을 위한 오토박싱 및 캐싱(Caching) 원리
---

인텔리제이(IntelliJ)나 이클립스(Eclipse) 같은 최신 IDE에서 자바 코드를 작성하다 보면, `new Integer(10)`과 같은 코드를 작성했을 때 컴파일러가 코드에 쫙 취소선을 그어버리며 경고를 띄우는 것을 볼 수 있다. 

이 방식은 자바 9버전부터 공식적으로 **사용 중지(Deprecated)** 처리되었다. 작동 자체는 하지만, "절대 쓰지 말 것"을 강력히 권고하는 것이다.

![인텔리제이 Integer 취소선 에러 화면](/assets/images/deprecated_error.png)

## 1. 문제의 원인: 불필요한 객체 생성과 메모리 낭비
`new` 키워드는 자바에서 **"메모리(Heap)에 무조건 새로운 객체를 생성하라"**는 절대적인 명령이다.

만약 반복문 안에서 `new Integer(10)`을 1만 번 호출한다면, 숫자 10을 담은 서로 다른 객체가 메모리상에 1만 개나 생성된다. 값은 똑같은 `10`인데, 불필요하게 힙(Heap) 메모리를 낭비하고 가비지 컬렉터(GC)의 업무량을 폭증시키는 치명적인 비효율이 발생하는 것이다.

## 2. 해결책: 자바의 IntegerCache와 오토박싱(Auto-boxing)
자바 개발진은 이 메모리 낭비를 막기 위해 **캐싱(Caching)** 기법을 도입했다. 
자바는 실행될 때, 개발자들이 가장 자주 쓰는 숫자인 **-128부터 127까지의 `Integer` 객체를 메모리에 미리 딱 1개씩만 만들어 둔다.** (이를 `IntegerCache`라고 부른다.)

* **`new Integer(10)` (과거 방식)**: 캐시를 무시하고 무조건 새로운 객체를 찍어낸다. (메모리 낭비)
* **`Integer.valueOf(10)` (개선된 방식)**: 메모리에 미리 만들어둔 숫자 10 객체의 '주소'만 빌려온다. 1만 번을 호출해도 메모리에는 딱 1개의 객체만 존재한다.

그리고 현대 자바에서는 이마저도 직접 쓸 필요 없이 **오토박싱(Auto-boxing)**을 사용하면 된다. 컴파일러가 알아서 가장 효율적인 `valueOf()` 방식으로 코드를 변환해 주기 때문이다.

👉 이전 포스트 참조
{% include link-card.html url="/blog/engineering/java/javabasic-17-wrapper-autoBoxing" %}

## 3. 올바른 Wrapper 클래스 사용법 비교

```java
public class WrapperDeprecatedEx {
    public static void main(String[] args) {
        
        // ❌ [비권장/과거 방식] 강제 객체 생성 (취소선 발생)
        // 메모리에 새로운 객체 A를 생성함
        Integer badWay1 = new Integer(10); 
        // 메모리에 새로운 객체 B를 생성함 (A와 B는 값이 10으로 같지만, 다른 객체임)
        Integer badWay2 = new Integer(10); 
        
        System.out.println(badWay1 == badWay2); // false 출력 (주소가 다름)

        // --------------------------------------------------

        // ⭕ [권장/현대 방식 1] valueOf() 메서드 사용
        // 미리 만들어둔 숫자 10 객체의 주소를 가져옴
        Integer goodWay1 = Integer.valueOf(10); 
        Integer goodWay2 = Integer.valueOf(10);
        
        System.out.println(goodWay1 == goodWay2); // true 출력 (같은 주소를 공유함!)

        // ⭕ [권장/현대 방식 2] 오토박싱(Auto-boxing) - 실무 표준⭐
        // 개발자가 10만 대입해도, 내부적으로 자동으로 Integer.valueOf(10)으로 처리됨
        Integer bestWay = 10; 
    }
}
```

**💡 결론**
Wrapper 클래스를 객체로 만들 때 new 키워드를 사용하는 것은 자바의 메모리 최적화 시스템을 정면으로 무시하는 행위다. 따라서 현대 자바에서는 무조건 **오토박싱(Integer a = 10;)**을 사용하는 것이 성능과 가독성 모두를 챙기는 정답이다.