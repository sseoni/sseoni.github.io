---

layout: post
title: "[Java 기초] 추상 클래스(Abstract Class)와 추상 메소드(Abstract Method)"
date: 2026-04-07
tags: [스터디로그, java, 상속, 추상클래스, 추상메소드]
summary:

---

상속을 배울 때, 부모 클래스는 자식 클래스들에게 공통적인 기능과 변수를 물려주는 역할을 했다. 하지만 부모 입장에서는 **"이 기능은 무조건 있어야 하는데, 구체적으로 어떻게 동작할지는 자식들마다 다르니까 너희가 알아서 만들어라!"**라고 강제하고 싶을 때가 있다. 

이때 사용하는 것이 바로 **추상 클래스(Abstract Class)**와 **추상 메소드(Abstract Method)**다.



## 1. 추상 클래스와 추상 메소드의 개념
**추상 메소드**
중괄호 `{ }` 블록(알맹이)이 아예 없는 껍데기 메소드다. 선언부 끝에 세미콜론(`;`)을 찍어 미완성임을 표시하며, 앞에 `abstract` 키워드를 붙인다.

**추상 클래스**
미완성된 추상 메소드를 단 하나라도 포함하고 있다면, 그 클래스도 반드시 `abstract` 키워드를 붙여 추상 클래스가 되어야 한다.

## 2. 추상 클래스의 2가지 핵심 특징
1. **객체를 직접 생성할 수 없다 (`new` 불가)**
미완성 설계도이기 때문에 `new Student();`처럼 단독으로 실체화할 수 없다. 오직 다른 클래스의 부모 역할만 할 수 있다.

2. **자식 클래스에게 오버라이딩을 강제한다**
추상 클래스를 상속받은 자식 클래스는 부모의 미완성 메소드를 **반드시 오버라이딩하여 완성(구현)**해야 한다. 빼먹으면 컴파일 에러가 발생한다.


**💻 코드로 보는 추상 클래스 (공통 뼈대 물려주기)**

중학생과 대학생은 모두 '학생(Student)'이다. 등교하는 방식은 같지만, 치르는 시험의 종류는 완전히 다르다.

```java
// [1. 추상 클래스 정의] abstract 키워드 사용
abstract class Student {
    public String name;

    public Student(String name) {
        this.name = name;
    }

    // 일반 메소드: 모든 학생의 공통 기능 (자식이 그대로 물려받아 씀)
    public void goToSchool() {
        System.out.println(name + " 학생이 등교합니다.");
    }

    // ⭐ 추상 메소드: 중괄호 {} 가 없음. 
    // "학생이라면 시험은 무조건 봐야 해! 근데 무슨 시험인지는 각자 알아서 정해!"
    public abstract void takeExam(); 
}

// [2. 자식 클래스 A]
class MiddleSchoolStudent extends Student {
    public MiddleSchoolStudent(String name) { super(name); }

    // 부모의 미완성 메소드를 강제로 완성(오버라이딩)
    @Override
    public void takeExam() {
        System.out.println(name + " 학생이 OMR 카드에 중간고사를 봅니다.");
    }
}

// [3. 자식 클래스 B]
class CollegeStudent extends Student {
    public CollegeStudent(String name) { super(name); }

    // 역시 강제로 오버라이딩! (안 하면 에러 발생)
    @Override
    public void takeExam() {
        System.out.println(name + " 학생이 두꺼운 전공 서적으로 오픈북 기말고사를 봅니다.");
    }
}
```