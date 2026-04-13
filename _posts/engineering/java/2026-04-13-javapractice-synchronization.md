---
layout: post
title: "[Java 활용] 동기화(synchronized) 최적화: 메서드 vs 블록"
date: 2026-04-13 17:00
tags: [스터디로그, java, Synchronization, Multi-threading, synchronized, Optimization]
summary: 다중 쓰레드 환경에서 데이터 오염을 막는 synchronized 키워드를 메서드 전체에 적용할 때의 성능 문제와, 이를 해결하기 위해 특정 변수(블록)에만 동기화를 적용하는 방법을 비교해 본다.
---

앞선 포스트에서 여러 쓰레드가 동시에 하나의 데이터를 수정하려고 할 때 발생하는 데이터 오염을 막기 위해, 메서드에 `synchronized` 키워드를 붙여 자물쇠(Lock)를 거는 방법을 알아보았다.

{% include link-card.html url="/blog/engineering/java/javabasic-25+synchronization" %}

하지만 이 방식에는 치명적인 단점이 있다. 무작정 메서드 전체에 자물쇠를 걸어버리면, 한 쓰레드가 메서드의 모든 작업을 끝낼 때까지 다른 쓰레드들은 아무것도 하지 못하고 무작정 기다려야 하므로 **프로그램의 처리 속도가 심각하게 느려진다.**

이 문제를 해결하기 위해 자바는 **꼭 필요한 핵심 영역(변수)에만 자물쇠를 거는 '동기화 블록'** 문법을 지원한다.

## 1. 메서드 동기화 (Method Synchronization)

메서드 선언부에 `synchronized`를 붙이는 방식이다. 해당 메서드에 진입한 쓰레드가 모든 코드를 실행하고 빠져나올 때까지 객체 전체에 자물쇠가 걸린다.

### 🚨 문제 상황: 비효율적인 대기

콘서트 티켓을 예매하는 로직을 생각해 보자. 티켓을 차감하기 전에는 '본인 인증' 같은 오래 걸리는 작업이 필요하다.

```java
class TicketManager {
    int ticketCount = 10;

    // synchronized 메소드명()
    // 메서드 전체에 자물쇠 → 해당 메서드에는 한 번에 하나의 쓰레드만 접근 가능
    public synchronized void bookTicket(String user) {
        
        System.out.println(user + " 본인 인증 중... (약 3초 소요)");
        // 여기서 3초를 보내는 동안, 다른 유저들은 본인 인증조차 시작하지 못하고 밖에서 대기해야 함!
        
        // --- 진짜 보호해야 할 핵심 구역 (임계 영역) ---
        if (ticketCount > 0) {
            ticketCount--; 
            System.out.println(user + " 예매 성공! 남은 티켓: " + ticketCount);
        } else {
            System.out.println(user + " 예매 실패 (매진)");
        }
        // ------------------------------------------
    }
}
```

본인 인증은 데이터를 수정하는 작업이 아니므로 여러 명이 동시에 진행해도 문제가 없다. 오직 남은 티켓 수를 확인하고 빼는 작업(`ticketCount--`)만 동시에 접근하지 못하게 막으면 되는데, 메서드 전체를 묶어버려 심각한 병목 현상이 발생한다.

## 2. 블록 동기화 (Block Synchronization)

이러한 비효율을 막기 위해, 메서드 내에서 진짜로 보호해야 하는 특정 코드 구역(블록)에만 자물쇠를 거는 방식이다. `synchronized(잠금대상)` 형태로 괄호를 열고 보호할 코드를 감싸준다.

```Java
class SmartTicketManager {
    int ticketCount = 10;

    public void bookTicket(String user) {
        
        // 💡 이 부분은 자물쇠가 없으므로 여러 쓰레드(유저)가 동시에 들어와서 본인 인증을 진행함!
        System.out.println(user + " 본인 인증 중... (약 3초 소요)");
        
        // synchronized(변수명)
        // 💡 진짜 보호해야 할 변수(데이터)를 다루는 곳에만 블록으로 자물쇠
        synchronized (this) {       // this: 현재 SmartTicketManager 객체 자체를 자물쇠의 기준으로 삼겠다
            if (ticketCount > 0) {
                ticketCount--;
                System.out.println(user + " 예매 성공! 남은 티켓: " + ticketCount);
            } else {
                System.out.println(user + " 예매 실패 (매진)");
            }
        }
    }
}
```

## 요약

다중 쓰레드 환경에서는 자물쇠(Lock)의 범위를 최대한 좁게 설정하는 것이 좋은 성능을 내는 핵심 비결이다.

### 메서드 동기화 `public synchronized void...`

메서드 내부의 코드가 매우 짧고 간결하며, 내부 로직 전체가 보호받아야 할 때 사용한다.

### 블록 동기화 `synchronized(this) { ... }` (⭐ 실무 권장)

메서드 내부에 실행 시간이 긴 로직(데이터베이스 조회, 네트워크 통신 등)이 포함되어 있어서, 꼭 보호해야 하는 데이터 수정 부분만 좁게 감싸 성능을 최적화해야 할 때 사용한다.