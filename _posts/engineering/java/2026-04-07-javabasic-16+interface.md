---

layout: post
title: "[Java 기초] [참조] takeExam을 인터페이스로 분리해 보자 (Is-A vs Can-Do)"
date: 2026-04-07 00:001
tags: [스터디로그, java, 상속, interface, 추상클래스, 추상메소드]
summary:

---

이전 예제에서 우리는 takeExam()(시험 보기) 기능을 Student 추상 클래스 안에 넣었다. "학생이라면 응당 시험을 봐야 한다"는 논리였다. 이를 객체 지향에서는 **Is-A 관계(~은 ~이다)**라고 부른다.

하지만 현실을 생각해 보자. 시험은 학생만 보는 것이 아니다. 학생이 아닌 '취업 준비생'이나 승진을 앞둔 '직장인'도 시험을 본다. 만약 takeExam()이 Student 클래스 안에 갇혀 있다면, 취업 준비생 클래스는 시험을 보기 위해 억지로 Student를 상속받아야 하는 촌극이 벌어진다. 이때 필요한 설계 방식이 바로 **인터페이스를 활용한 Can-Do 관계(~을 할 수 있다)**다.

### 1. 인터페이스로 분리하기: "누구든 시험을 볼 수 있는 자격을 주마!"

시험을 볼 수 있는 능력 자체를 Examinable(시험 응시 가능)이라는 인터페이스로 빼내어 독립시킨다.

```Java
// [1. 능력(기능)을 정의한 인터페이스] 
interface Examinable {
    void takeExam(); // 추상 메소드
}

// [2. 기본 뼈대 클래스들 (각자의 족보가 다름)]
abstract class Student {
    String name;
    public Student(String name) { this.name = name; }
}

abstract class Person { // 학생과는 아예 다른 사람의 뼈대
    String name;
    public Person(String name) { this.name = name; }
}
```

### 2. 전혀 다른 족보(상속)를 가진 객체들을 하나로 묶기

이제 부모가 전혀 다른 '대학생'과 '취업 준비생' 클래스에 Examinable 인터페이스를 구현(implements)해 보자.

```Java
// [3-A. 대학생] 부모는 Student 이고, 시험(Examinable)을 본다.
class CollegeStudent extends Student implements Examinable {
    public CollegeStudent(String name) { super(name); }

    @Override
    public void takeExam() {
        System.out.println(name + " 학생이 대학교 전공 기말고사를 봅니다.");
    }
}

// [3-B. 취업 준비생] 부모는 Student가 아닌 일반 Person 이지만, 역시 시험(Examinable)을 본다.
class JobSeeker extends Person implements Examinable {
    public JobSeeker(String name) { super(name); }

    @Override
    public void takeExam() {
        System.out.println(name + " 취준생이 기업 입사 필기시험(NCS)을 봅니다.");
    }
}
```

### 3. 인터페이스의 진가: 다형성의 극대화

takeExam()을 인터페이스로 빼낸 덕분에, 우리는 부모(혈통)가 완전히 다른 대학생과 취업 준비생을 **Examinable이라는 하나의 바구니(타입)**에 담아서 관리할 수 있게 되었다.

```Java
public class Main {
    public static void main(String[] args) {
        // 부모 클래스가 서로 달라도, '시험 볼 자격(Examinable)'이 있는 객체들을 한 배열에 묶을 수 있다!
        Examinable[] examTakers = {
            new CollegeStudent("이영희"),
            new JobSeeker("박철수")
        };

        // 배열을 돌면서 모두에게 시험을 지시함 (다형성)
        for (Examinable taker : examTakers) {
            taker.takeExam(); 
        }
    }
}

// [출력 결과]
// 이영희 학생이 대학교 전공 기말고사를 봅니다.
// 박철수 취준생이 기업 입사 필기시험(NCS)을 봅니다.
```

**💡 결론: 추상 클래스 vs 인터페이스 설계의 기준**

추상 클래스에 넣을 때: 오직 그 가문(상속 트리)에 속한 자식들만 절대적으로 수행하는 핵심 본질일 때.

인터페이스로 뺄 때: 혈통(부모)에 상관없이, 특정 행동이나 능력을 여러 클래스에 유연하게 덧붙여야 할 때.