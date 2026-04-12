---

layout: post
title: "[Java 기초] 인터페이스(Interface): 다중 상속과 규약"
date: 2026-04-07 00:00
tags: [스터디로그, java, 상속, interface, 다중 상속]
summary:

---

추상 클래스가 공통 뼈대를 제공하는 '미완성 설계도'라면, **인터페이스(Interface)**는 그보다 한발 더 나아간 **'밑그림조차 없는 순수한 규약(Contract)'**이다.

자바의 클래스는 오직 하나의 부모만 가질 수 있는 '단일 상속(extends)'이라는 엄격한 규칙이 있다. 하지만 현실 세계에서는 학생이면서 동시에 아르바이트생인 것처럼, 하나의 객체가 여러 역할을 동시에 수행해야 할 때가 많다.

**🚨 상속만으로 해결할 수 없는 치명적인 딜레마**

앞선 예제에서 우리는 중학생과 대학생을 묶어주는 Student라는 추상 클래스를 만들었다. 그런데 여기에 **"아르바이트를 해서 돈을 버는 기능(work)"**을 추가해야 한다면 어떻게 될까?

부모인 Student 클래스에 work() 메소드를 무작정 넣어버리면, 상속의 강제성 때문에 중학생 클래스까지 강제로 아르바이트를 해야 하는 치명적인 설계 오류가 발생한다.

**💡 인터페이스: 혈통을 넘어서는 '자격증(역할)'의 부여**

이 딜레마를 돌파하게 해주는 것이 바로 인터페이스다.

인터페이스는 "모두가 반드시 가져야 할 생물학적/본질적 특징(부모)"을 정의하는 것이 아니다. 혈통에 상관없이 **"특정 객체에게만 유연하게 추가적인 자격이나 역할"**을 덧붙여 주고 싶을 때 사용한다.

이 덕분에 대학생 객체는 Student라는 본질적인 부모를 그대로 유지하면서도, 부모와는 전혀 상관없는 PartTimeJob(아르바이트)이라는 새로운 규약을 동시에 구현(implements)하여 여러 역할을 자유롭게 넘나들 수 있게 된다.


## 1. 인터페이스의 특징

순수도 100%: 인터페이스 안에는 일반 변수나 일반 메소드를 절대 넣을 수 없다. 오직 **상수(public static final)**와 **추상 메소드(public abstract)**만 들어갈 수 있다. (너무 당연한 규칙이라 이 키워드들은 생략해도 자바가 알아서 붙여준다.)

**implements 키워드**
인터페이스는 상속(extends)받는다고 하지 않고, 규약을 **구현(implements)**한다고 표현한다.

**다중 구현 가능**
클래스는 부모를 하나만 둘 수 있지만, 인터페이스는 콤마(,)를 이용해 여러 개를 동시에 구현할 수 있다.


## 2. 인터페이스의 존재 이유 (역할 부여)

인터페이스는 서로 관련이 없는 클래스들에게 **'특정한 역할(기능)'**을 묶어줄 때 사용한다. 예를 들어 '아르바이트 가능'이라는 인터페이스를 만들면, 대학생 클래스에도 붙일 수 있고, 전혀 다른 고등학생 클래스나 직장인(투잡) 클래스에도 자유롭게 붙일 수 있다.

```Java
// [1. 인터페이스 정의] "이 자격증을 따려면 무조건 일(work)을 해야 해!"
interface PartTimeJob {
    // 1. 상수 (public static final 이 자동으로 붙음)
    int MINIMUM_WAGE = 10000; 

    // 2. 추상 메소드 (public abstract 가 자동으로 붙음)
    void work(); 
}

// [2. 클래스 적용] 상속(extends)과 다중 구현(implements)을 동시에 할 수 있다!
// "대학생은 학생(Student)의 뼈대를 가지면서, 동시에 알바(PartTimeJob) 역할도 수행한다!"
class CollegeStudent extends Student implements PartTimeJob {
    
    public CollegeStudent(String name) { super(name); }

    // Student(추상 클래스)에게 물려받은 의무
    @Override
    public void takeExam() {
        System.out.println("전공 시험을 봅니다.");
    }

    // ⭐ PartTimeJob(인터페이스)에게 부여받은 역할(의무)
    @Override
    public void work() {
        System.out.println("시급 " + MINIMUM_WAGE + "원을 받고 카페에서 일합니다.");
    }
}

public class Main {
    public static void main(String[] args) {
        // 중학생은 Student 이기만 할 뿐, PartTimeJob은 없으므로 일하지 않는다.
        MiddleSchoolStudent ms = new MiddleSchoolStudent("김철수");
        ms.takeExam();

        // 대학생은 알바 인터페이스를 구현했으므로 일할 수 있다.
        CollegeStudent cs = new CollegeStudent("이영희");
        cs.takeExam();
        cs.work(); 
    }
}
```

**💡 추상 클래스 vs 인터페이스 핵심 비교**

구분 | 추상 클래스 (abstract class) | 인터페이스 (interface)
:--|:--|:--
목적 | 관련된 객체들의 공통 뼈대 제공 (물려주기) | 서로 무관한 객체들에게 공통 기능/역할 부여 (규약)
다중 상속 | ❌ 불가능 (단일 상속만 가능) | ⭕ 가능 (여러 개 다중 구현 가능)
구성 요소 | 일반 변수 + 일반 메소드 + 추상 메소드 | 오직 상수 + 추상 메소드만 가능 (Java 8 이전 기준)
키워드 | extends (상속) | implements (구현)
비유 | "너는 기본적으로 내 자식이니까 이 뼈대를 써라" | "네가 누구든 상관없으니, 이 자격증(기능)을 따와라"

{% include link-card.html url="/blog/engineering/java/javabasic-16+interface" %}