---
layout: post
title: "[정처기 실기] C언어 벼락치기: typedef 구조체와 구조체 멤버 접근 연산자(->)"
date: 2026-07-10
tags: [정보처리기사, 실기, C언어, 구조체, typedef, 포인터]
summary: 정처기 실기 단골 문제! 매번 헷갈리는 typedef 구조체 선언 방식과, 화살표(->) 연산자를 써야 하는 경우를 정리합니다.
---

정보처리기사 실기 C언어 문제에서 구조체가 등장할 때, 코드가 살짝 다르게 생겨 당황한 적 있으신가요?
출제자가 가장 좋아하는 `typedef` 구조체 선언과, 단답형 기출문제로도 출제되었던 구조체 포인터 접근 연산자에 대해 알아봅시다.

## 1. typedef의 마법: struct 생략하기

보통 구조체를 만들고 변수를 선언할 때는 매번 `struct`라는 키워드를 붙여야 합니다. 하지만 `typedef`를 사용하면 구조체에 '별명'을 붙여서 아주 깔끔하게 사용할 수 있습니다.

```c
#include <stdio.h>

// 1. 일반적인 구조체 선언
struct NormalCar {
    int year;
};

// 2. typedef를 이용한 구조체 선언 (별명 짓기)
typedef struct {
    int year;
} SuperCar;

int main() {
    // 일반 구조체는 변수 선언 시 'struct'를 꼭 써야 함
    struct NormalCar car1 = {2025};
    
    // typedef로 만든 구조체는 별명(SuperCar)만으로 변수 선언 가능!
    SuperCar car2 = {2026}; 

    return 0;
}
```

### 💡 Tip
코드 위쪽에 `typedef struct { ... } 이름;` 이 보인다면, 앞으로 코드에서 `이름`이라는 단어는 구조체 타입으로 쓰인다는 뜻입니다.
`struct`가 없어도 구조체 문제임을 알 수 있어야합니다!

## 2. 점(.) vs 화살표(->) 구분하기

실제 기출문제에서 "구조체의 포인터로 멤버에 접근하기 위한 기호를 쓰시오"라는 문제가 단답형으로 출제된 적이 있습니다. 정답은 바로 -> 입니다.

```C
#include <stdio.h>

typedef struct {
    int score;
} Student;

int main() {
    Student s1 = {100};      // 일반 변수
    Student *ptr = &s1;      // 포인터 변수

    // 1. 일반 변수는 점(.)을 찍어서 알맹이에 접근
    printf("%d\n", s1.score); 

    // 2. 포인터 변수는 화살표(->)를 써서 알맹이에 접근
    printf("%d\n", ptr->score); 

    // (참고) 원론적인 표현법 (*ptr).score 와 ptr->score 는 완벽히 동일합니다.
    
    return 0;
}
```

### 💡 실전 요약 공식

왼쪽 변수의 **신분**부터 확인하세요!
**일반 변수** (예: s1) ➔ 무조건 점(`.`) 사용
**포인터 변수** (예: *ptr) ➔ 무조건 화살표(`->`) 사용

{% include link-card.html url="/blog/engineering/c/c-struct" %}