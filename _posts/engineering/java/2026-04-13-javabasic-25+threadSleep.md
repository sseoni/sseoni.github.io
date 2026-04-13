---
layout: post
title: "[Java 기초] 쓰레드 제어 핵심 메서드 (sleep, interrupt, 데몬)"
date: 2026-04-13 17:00
tags: [스터디로그, java, Thread, sleep, interrupt, Daemon]
summary: 실무와 코딩 테스트에서 쓰레드의 상태를 유연하게 제어하기 위해 반드시 알아야 할 추가적인 핵심 기능들(sleep, interrupt, 데몬 쓰레드)을 정리한다.
---

앞서 쓰레드를 생성하고, 동기화(synchronized)하고, 대기(join)하는 핵심 원리를 배웠다. 이외에도 다중 쓰레드 프로그래밍에서 쓰레드의 상태를 제어하기 위해 반드시 알아두어야 할 3가지 실전 기능들을 추가로 정리한다.

## 1. 쓰레드 재우기: Thread.sleep()

특정 시간 동안 쓰레드의 실행을 일시 정지(Pause)시킨다. 데이터를 긁어오거나(크롤링) 의도적으로 지연을 발생시켜야 할 때 매우 자주 사용된다.

```Java
public class SleepEx {
    public static void main(String[] args) {
        System.out.println("작업 시작");
        
        try {
            // 현재 코드를 실행 중인 쓰레드를 지정한 시간(밀리초) 동안 멈춤
            // 2000 = 2초
            Thread.sleep(2000); 
        } catch (InterruptedException e) {
            // 누군가 자고 있는 쓰레드를 깨우면(방해하면) 발생하는 예외
            System.out.println("잠에서 깼습니다!");
        }
        
        System.out.println("2초 뒤 작업 재개");
    }
}
```

## 2. 쓰레드 깨우기 및 안전한 종료: interrupt()

과거에는 쓰레드를 강제로 죽이는 stop()이라는 메서드가 있었으나, 자원이 제대로 닫히지 않는 치명적인 문제 때문에 현재는 사용이 금지(Deprecated)되었다. 대신, interrupt()를 사용하여 쓰레드에게 "이제 그만 자고 일어나서 하던 일 마무리하고 종료해!"라는 신호를 보내는 방식을 사용한다.

```Java
public class InterruptEx {
    public static void main(String[] args) throws InterruptedException {
        Thread worker = new Thread(() -> {
            try {
                while (true) {
                    System.out.println("작업 중...");
                    Thread.sleep(1000); // 1초마다 대기
                }
            } catch (InterruptedException e) {
                // 누군가 interrupt() 신호를 보내면 sleep 중인 쓰레드가 예외를 발생시키며 이리로 넘어옴
                System.out.println("종료 신호를 받았습니다. 하던 일을 정리하고 종료합니다.");
            }
        });

        worker.start();
        Thread.sleep(3000); // 메인 쓰레드 3초 대기
        
        // 3초 뒤에 작업자 쓰레드에게 멈추라는 신호(Interrupt)를 보냄
        worker.interrupt(); 
    }
}
```

## 3. 메인 쓰레드의 그림자: 데몬 쓰레드 (Daemon Thread)

일반적으로는 메인 쓰레드(main)가 종료되더라도, 서브 쓰레드가 아직 일을 하고 있다면 프로그램 전체는 종료되지 않는다.

하지만 워드 프로세서의 '자동 저장'이나 미디어 플레이어의 '백그라운드 스트리밍'처럼, 메인 쓰레드가 종료되면 자기도 더 이상 존재할 필요가 없어 자동으로 함께 죽어야 하는 보조 쓰레드가 필요할 때가 있다. 이를 데몬 쓰레드라고 한다.

```Java
public class DaemonEx {
    public static void main(String[] args) throws InterruptedException {
        Thread autoSaveThread = new Thread(() -> {
            while (true) {
                System.out.println("...자동 저장 중...");
                try { Thread.sleep(1000); } catch (InterruptedException e) {}
            }
        });

        // 💡 쓰레드를 시작(start)하기 전에 반드시 데몬 쓰레드로 설정해야 함!
        autoSaveThread.setDaemon(true); 
        autoSaveThread.start();

        Thread.sleep(3000);
        System.out.println("메인 쓰레드 작업 완료. 프로그램 종료.");
        // 데몬 쓰레드로 설정했기 때문에, 메인 쓰레드가 죽는 순간 autoSaveThread도 즉시 강제 종료됨.
    }
}
```