---

layout: post
title: "[Java 기초] [참조] 다형성에서 참조(Reference)를 알아야하는 이유 (다형성과 참조의 연관성)"
date: 2026-04-07 00:01
tags: [스터디로그, java, 패키지, Package, 다형성, 참조]
summary:

---

자바를 처음 배울 때 '참조(Reference)'는 그저 메모리(Heap)에 있는 객체의 **'주소를 가리키는 포인터'** 정도로 배운다. 
그런데 상속과 다형성을 배울 때쯤 갑자기 이 '참조'라는 단어가 다시 등장한다. 원래 주소를 가리키는 기능일 뿐인 참조가, 상속에서는 왜 그토록 중요한 역할을 하게 될까?

### 1. 원래 참조의 역할: "저기 객체가 있어요!"
기본적으로 참조 변수는 메모리에 만들어진 객체의 위치를 기억하는 역할이 끝이다.
`CollegeStudent s = new CollegeStudent();` 라고 쓰면, `s`라는 변수는 거대한 대학생 객체가 있는 메모리 주소를 가리킬 뿐이다.

### 2. 상속을 만났을 때의 참조: "색안경(뷰파인더)"으로 변신
상속을 배우면 자바가 아주 특이한 문법을 하나 허용해 준다. 바로 **'부모 타입의 참조 변수'에 '자식 객체의 주소'를 담는 것(업캐스팅)**이다.

```java
// 부모 타입의 참조 변수(학생)에 자식 객체(대학생)를 담았다!
Student polyStudent = new CollegeStudent();
```

이렇게 부모와 자식이 섞이는 순간, 참조 변수는 단순한 주소 알림이를 넘어 **'색안경(가시성 제어기)'**으로 돌변한다.

메모리에는 분명히 전공(major) 변수까지 모두 갖춘 거대한 '대학생' 객체가 떡하니 존재한다. 하지만 우리가 '학생(Student)'이라는 참조 색안경을 끼고 바라보기 때문에, 부모 클래스에 없는 자식만의 새로운 기능은 시야에서 가려져 보이지 않게 되는 것이다.

## 3. 우리가 참조에 대해 알아야 할 것

결국 상속 파트에서 참조를 굳이 꺼내어 강조하는 이유는 이 규칙을 설명하기 위함이다.

💡 "객체가 아무리 크고 기능이 많아도, 내가 쥐고 있는 참조 변수(리모컨)의 타입에 있는 기능만 쓸 수 있다."

```java
class Student {
    String name;
    public void study() { System.out.println("공부합니다."); }
}

class CollegeStudent extends Student {
    String major; // 자식만의 고유 변수
    @Override
    public void study() { System.out.println("전공 공부를 합니다."); }
}

public class Main {
    public static void main(String[] args) {
        // 참조(리모컨)는 Student, 실제 본체는 CollegeStudent
        Student polyStudent = new CollegeStudent(); 
        
        // 1. 다형성: 겹치는 버튼(study)을 누르면 실제 본체(자식)의 기능이 나옴
        polyStudent.study(); // "전공 공부를 합니다." 출력
        
        // 2. 참조의 한계: Student 리모컨에는 major 버튼이 없어서 누를 수 없음!
        // polyStudent.major = "컴퓨터공학"; // 💥 컴파일 에러 발생!
    }
}
```
🤔 그렇다면 왜 굳이 쓸 수 있는 기능을 제한해가면서 부모 참조를 쓸까?
기능이 줄어드는 손해를 보더라도, 수많은 종류의 자식 객체들을 '부모'라는 단 **하나의 이름(타입)으로 통일해서 한 배열에 담거나 한 번에 처리**할 수 있는 압도적인 편리함(다형성)을 얻기 위해서다.