---

layout: post
title: "[Java 활용] 표준라이브러리 클래스 ArrayList"
date: 2026-04-09 00:00
tags: [스터디로그, java, ArrayList, Class, 표준라이브러리]
summary:

---

자바를 배우다 보면 이름에 'Array(배열)'가 들어간 ArrayList를 마주하게 된다. 이것은 배열의 일종일까, 아니면 자바에 내장된 특수한 기본 기능일까?

## 1. ArrayList의 정체: 배열을 조종하는 '클래스(Class)'

ArrayList는 자바 언어 문법 자체에 내장된 기본 기능(for, if, int[] 등)이 아니다. 자바 개발진이 미리 만들어둔 수많은 표준 라이브러리(API) 중 하나인 **클래스(Class)**다. (정확한 위치는 java.util.ArrayList다.)

이름에 'Array'가 붙은 이유는, ArrayList 클래스 내부를 뜯어보면 결국 진짜 '배열(Array)'을 숨겨두고 사용하기 때문이다.

```Java
// ArrayList의 내부 구조 (개념적 코드)
public class ArrayList {
    private Object[] elementData; // 진짜 배열을 내부에 몰래 숨겨두고 있다!
    private int size;
    
    // 개발자가 add() 메서드를 호출하면, 내부 배열에 값을 대신 넣어준다.
    // 만약 내부 배열이 꽉 차면? 더 큰 배열을 새로 만들어서 이사시키는 로직이 들어있다.
    public void add(Object obj) { ... } 
}
```

즉, ArrayList는 일반 배열을 사용할 때 겪는 고통(크기 고정, 삭제 시 데이터 이동 등)을 해결하기 위해, **진짜 배열을 내부에 감춰두고 개발자 대신 배열의 크기와 데이터를 조작해 주는 '배열 관리 대행 클래스'**인 것이다.

## 2. 여러 자료형을 '섞어 담는 것'의 치명적인 함정

작성자의 통찰대로, 컬렉션(ArrayList)은 내부적으로 Object[] 배열을 사용하므로 문자열(String), 숫자(Integer), 학생(Student) 객체를 하나의 리스트에 마구잡이로 섞어 담을 수 있다.

```Java
// 제네릭스를 쓰지 않은 과거(Java 5 이전)의 방식
ArrayList mixedList = new ArrayList();
mixedList.add("문자열"); 
mixedList.add(new Integer(10)); 
mixedList.add(new Student("홍길동")); // 온갖 타입이 다 들어감!
```

하지만 실무에서 이렇게 데이터를 섞어 담는 일은 절대 금기시된다. 데이터를 꺼내서 쓸 때 대참사가 일어나기 때문이다.

데이터를 꺼낼 때 반복문을 돌리면, 컴퓨터는 꺼낸 데이터가 문자열인지 숫자인지 학생인지 알 길이 없다. 결국 매번 데이터의 진짜 타입을 검사(instanceof)하고, 원래 타입으로 다운캐스팅(형변환)을 해주는 엄청나게 복잡하고 위험한 코드를 짜야 한다. 만약 실수로 숫자를 학생으로 형변환하려 들면 프로그램이 런타임 에러(ClassCastException)를 뿜으며 강제 종료된다.

## 3. 결론: 제네릭스(`<T>`)로 컬렉션을 배열처럼 엄격하게 만들기

이러한 '섞어 담기'의 위험성 때문에, 자바 개발진은 Java 5버전부터 앞서 배운 **제네릭스(Generics)**를 도입했다.

"컬렉션의 섞어 담기 기능은 너무 위험하다! 차라리 배열처럼 무조건 하나의 자료형만 담도록 강제하자!"

```Java
// 현대 자바의 방식: 제네릭스(<String>)를 붙여서 단일 타입만 허용
ArrayList<String> stringList = new ArrayList<String>();
stringList.add("사과");
// stringList.add(new Integer(10)); // 💥 컴파일 에러! String이 아니면 절대 못 들어옴
```

💡 요약
ArrayList는 내부에 일반 배열을 품고 있는 '클래스(API)'다. 태생적으로는 모든 객체를 섞어 담을 수 있게 설계되었지만, 에러를 방지하기 위해 제네릭스(< >)를 결합하여 **"크기는 무한히 늘어나면서, 타입은 배열처럼 딱 한 가지만 담는 완벽한 구조"**로 통제하여 사용하는 것이 현대 자바의 표준이다.

{% include link-card.html url="/blog/engineering/java/javabasic-17-generics" %}