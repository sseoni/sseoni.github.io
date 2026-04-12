---

layout: post
title: "[Java 기초] Wrapper 클래스와 제네릭스(Generics)"
date: 2026-04-08 00:02
tags: [스터디로그, java, Generics, Wrapper]
summary:

---

앞선 포스트에서 고정된 크기를 갖는 배열의 단점을 극복하기 위해, 크기가 무한히 늘어나는 마법의 바구니인 **컬렉션(Collection)** 자료구조가 등장했다고 정리했다.

{% include link-card.html url="/blog/engineering/java/javabasic-17-storeData" %}

하지만 이 강력한 컬렉션 프레임워크에도 개발자를 괴롭히는 두 가지 치명적인 구조적 한계가 존재했다. 

1. **기본형 저장 불가**: `int`, `double` 같은 기본형(Primitive) 데이터는 객체(Object)가 아니므로 컬렉션에 직접 담을 수 없다.
2. **타입 안정성 부재**: 컬렉션에 다양한 객체를 무분별하게 섞어 담을 경우, 런타임(실행 중)에 데이터를 꺼내어 원래 형태로 되돌리는 과정(형변환)에서 치명적인 에러가 발생할 위험이 높다.

이 두 가지 한계를 완벽하게 해결하고, 현대 자바의 안정적인 데이터 처리를 완성한 핵심 문법이 바로 **Wrapper 클래스**와 **제네릭스(Generics)**다.

## 1. Wrapper 클래스: 기본형 데이터를 객체로 포장하기

자바의 컬렉션은 무조건 **'객체(참조형)'**만 담을 수 있다. 다시 말해 int나 char 같은 기본형 데이터는 컬렉션에 담을 수 없다.
이들을 바구니에 담기 위해 객체 형태로 포장해 주는 클래스가 바로 Wrapper 클래스다.

```Java
// 박싱(Boxing): 기본형을 Wrapper 객체 Integer()로 포장
Integer myInt = new Integer(10);

// 언박싱(Unboxing): 포장지에서 알맹이만 빼내기
int basicInt = autoInt.intValue();
```

**❗️참조**: 자바 ver9부터 `new Integer()`처럼 `new` 키워드를 직접 사용해 박싱을 하는 방식은 공식적으로 사용 중지되었다.
요즘 인텔리제이나 이클립스 같은 에디터에서 저렇게 코드를 짜면, 컴파일러가 코드에 취소선을 그어버리며 경고를 띄운다.

{% include link-card.html url="/blog/engineering/java/javabasic-17+wrapper" %}
{% include link-card.html url="/blog/engineering/java/javabasic-17+wrapper2" %}

## 2. 제네릭스 (Generics): 바구니에 이름표 붙이기

과거 자바에서는 바구니에 데이터를 담을 때, 모든 객체의 조상인 Object 타입으로 담았다. 그러다 보니 사과 상자에 배가 섞여 들어가도 컴퓨터가 눈치채지 못했고, 꺼낼 때마다 일일이 "이건 사과야"라고 형태를 바꿔주는(형변환) 귀찮은 작업을 해야 했다.

**제네릭스(< >)**는 바구니를 만들 때 **"이 바구니에는 이 타입만 넣을 수 있어!"**라고 명확하게 이름표를 붙여주는 기능이다.

장점 1: 엉뚱한 타입이 들어오는 것을 컴파일 단계(코드 작성 중)에서 완벽히 차단한다. (타입 안정성)

장점 2: 꺼낼 때 일일이 형변환(Casting)을 할 필요가 없다.

💻 제네릭스 사용하는 방법

```Java
// 1. 제네릭 클래스 설계: 아직 무엇을 담을지 모르는 마법의 상자
// <T>는 Type의 약자로, '나중에 객체를 생성할 때 정해질 임시 타입'을 의미하는 빈칸입니다.
class Box<T> {
    private T item; // T가 무엇인지는 나중에 결정됨

    public void setItem(T item) {
        this.item = item;
    }

    public T getItem() {
        return item;
    }
}

public class Main {
    public static void main(String[] args) {
        // 2. 제네릭 사용: 상자를 만들 때 빈칸 <T>에 들어갈 진짜 타입을 확정!
        
        // 상자의 T를 String(문자열)으로 확정하여 생성
        Box<String> stringBox = new Box<>();
        stringBox.setItem("제네릭스 기초");
        String text = stringBox.getItem(); // 형변환 없이 깔끔하게 꺼냄
        
        // 💥 에러 발생! String 전용 상자가 되었으므로 숫자는 거부됨 (타입 안정성)
        // stringBox.setItem(100); 

        // ---------------------------------------------------------

        // 상자의 T를 Integer(숫자 객체)로 확정하여 생성
        Box<Integer> numberBox = new Box<>();
        numberBox.setItem(99);
        int number = numberBox.getItem(); // 형변환 없이 꺼냄
    }
}
```