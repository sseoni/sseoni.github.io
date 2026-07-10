---
layout: post
title: "[정보처리기사 실기] C언어 벼락치기: switch-case문과 break 생략의 함정 (Fall-through)"
date: 2026-07-09
tags: [정보처리기사, 실기, C언어, 제어문, switch-case, fall-through]
summary: 정처기 실기 단골 출제! switch-case문에서 break가 생략되었을 때 발생하는 'Fall-through' 현상 완벽 분석
---

정보처리기사 실기 시험의 C언어 코드 분석 문제에서 `switch-case`문이 나왔다면, 출제자의 의도는 99% 확률로 **"`break`가 없을 때 코드가 어떻게 흘러가는지 알아?"**를 묻는 것입니다. 이 현상을 **폴스루(Fall-through)**라고 부르는데, 아래 코드로 완벽하게 이해해 봅시다.

## 1. 기본 원리와 Fall-through 함정 코드

```c
#include <stdio.h>

int main() {
    int score = 2;     // 기준이 되는 값
    int result = 0;    // 결과를 누적할 변수

    // switch 괄호 안의 값(2)과 일치하는 case를 찾아 이동합니다.
    switch(score) {
        case 1:
            result += 10;
            break;
            
        case 2: // score가 2이므로 여기서부터 실행 시작!
            result += 20;
            // 🚨 [주의] 여기에 break; 가 없습니다! 
            // 멈추지 않고 아래 case 3의 코드까지 강제로 이어서 실행합니다.
            
        case 3:
            result += 30;
            break; // 여기서 break를 만나 비로소 switch문을 탈출합니다.
            
        default: // if문의 else와 같은 역할 (일치하는 case가 없을 때 실행)
            result += 40;
            break;
    }

    // 최종 결과 출력
    // result = 0 + 20(case 2) + 30(case 3) = 50
    printf("%d\n", result); 

    return 0;
}
```

## 2. 시험장 디버깅(변수 추적) 요령

시험지 여백에 손으로 디버깅을 할 때, 이 흐름만 기억하세요.

1. 입장: `switch(값)`에 들어있는 값과 똑같은 숫자를 가진 `case` 문패를 찾아 그 줄로 점프합니다.
2. 실행: 해당 `case`의 코드를 실행합니다.
3. 탈출 조건 (가장 중요 ⭐): 코드를 실행한 후 `break;`를 만나면 그 즉시 switch문을 빠져나옵니다.
❗️ **함정 (Fall-through)**: 만약 `break;`가 없다면? 조건과 상관없이 `break;`를 만날 때까지, 혹은 switch문이 완전히 끝날 때까지 그 아래에 있는 모든 case의 코드를 싹 다 실행합니다.

## 3. 요약: 출제자의 낚시 패턴

A유형: **모든 case마다 break;**를 예쁘게 적어둠 ➔ 해당 case만 실행하고 끝. (난이도 하)
B유형 (단골): **중간에 일부러 break;를 빼놓음** ➔ 일치하는 case로 들어간 후, break;를 만날 때까지 아래 코드들을 줄줄이 누적 계산해야 함. (난이도 상)
시험장에서 switch문을 보면 제일 먼저 "각 case 밑에 `break`가 제대로 붙어있는가?"부터 확인하는 습관을 들이세요!