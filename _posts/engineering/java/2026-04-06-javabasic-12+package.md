---

layout: post
title: "[Java 기초] [참조] 패키지(Package) 기본개념, 생성, import"
date: 2026-04-06 00:02
tags: [스터디로그, java, 패키지, Package]
summary:

---

자바 프로그램을 개발하다 보면 수십, 수백 개의 클래스 파일이 생겨난다. 이 수많은 클래스들을 아무렇게나 흩어두면 관리가 불가능해진다.

이때 연관된 클래스와 인터페이스들을 용도별, 기능별로 묶어 효과적으로 관리하기 위해 사용하는 것이 바로 **패키지(Package)**다.

## 1. 패키지(Package)의 본질: 물리적인 폴더(Directory)

자바의 패키지는 논리적인 묶음일 뿐만 아니라, 실제 컴퓨터의 '폴더(디렉토리)' 구조와 완벽하게 일치한다.

**계층 구조**
폴더 안에 하위 폴더가 있듯, 패키지도 상/하위 계층 구조를 가진다. 자바에서는 이 계층을 **점(.)**으로 구분한다.

**클래스의 진짜 이름**
우리가 부르는 클래스 이름 앞에는 항상 패키지 경로가 숨어있다. 이를 풀네임(Full Name)이라고 부른다.

예: 입력받을 때 쓰는 java.util.Scanner 클래스는 → 실제로는 java 폴더 안의 util 폴더 안에 있는 Scanner.class 파일을 의미한다.

🚨 주의: 클래스 파일만 마우스로 복사해서 다른 폴더로 옮기면 에러가 난다. 클래스를 이동할 때는 반드시 패키지 구조 전체를 맞추어 이동해야 한다.

## 2. 패키지를 사용하는 이유 (장점)

**클래스 이름 충돌 방지**
자바가 기본 제공하는 달력 기능인 Date 클래스와, 내가 개인적으로 만든 Date 클래스가 이름이 똑같다면 어떻게 될까? 패키지가 다르면 서로 완전히 다른 클래스로 인식되므로 이름 충돌이 발생하지 않는다.

**효율적인 그룹화 관리**
'입출력 관련', '네트워크 관련' 등 비슷한 기능을 하는 클래스들을 폴더별로 묶어 유지보수를 쉽게 만든다.

## 3. 패키지 선언과 이름 짓기 국룰

소스 코드 최상단(첫 번째 줄)에 자신이 속한 패키지를 무조건 선언해야 한다.

```Java
// 소스코드 최상단에 단 한 번만 선언!
package com.mycompany.projectname; 

public class MyClass { ... }
```

**💡 이름 짓기 룰 (Naming Convention)**
대규모 프로젝트에서는 다른 회사 코드를 섞어 쓰다 패키지명이 겹칠 수 있다. 이를 막기 위해 회사의 웹사이트 주소(도메인)를 역순으로 적고, 마지막에 프로젝트 이름을 붙이는 것이 세계적인 표준이다.

예: samsung.com → package com.samsung.project;

## 4. 남의 패키지 가져다 쓰기: import문

같은 패키지(같은 폴더) 안에 있는 클래스끼리는 그냥 이름만 부르면 쓸 수 있다. 하지만 다른 패키지에 있는 클래스를 가져다 쓰려면 두 가지 방법 중 하나를 택해야 한다.

### 방법 A: 매번 풀네임(Full Name) 적기 (비권장)

사용할 때마다 패키지 이름을 전부 적어주는 방식이다. 코드가 너무 길어지고 지저분해진다.

```Java
package com.mycompany;

public class Main {
    // java.util 패키지에 있는 Scanner 클래스를 풀네임으로 불러옴
    java.util.Scanner scanner = new java.util.Scanner(System.in); 
}
```

### 방법 B: import 문 사용하기 (권장 ⭐)

컴파일러에게 "나 이 폴더에 있는 클래스 쓸 거야!"라고 미리 알려주는 기능이다. 패키지 선언부와 클래스 선언부 사이에 작성한다. 한 번만 import 해두면 패키지명을 생략하고 클래스 이름만 깔끔하게 쓸 수 있다.

```Java
package com.mycompany;

// 1. 특정 클래스 딱 하나만 가져올 때
import java.util.Scanner; 

// 2. 해당 패키지 안의 '모든 클래스'를 다 가져올 때 (* 와일드카드 사용)
import java.util.*; 

public class Main {
    // 패키지명 생략 가능! 코드가 훨씬 깔끔해짐
    Scanner scanner = new Scanner(System.in); 
}
```

🚨 import 사용 시 핵심 주의사항

**① 하위 패키지(서브 폴더)는 포함되지 않는다!**

* 기호를 사용해 패키지를 통째로 불러온다고 해도, 자바 컴파일러는 딱 그 폴더 안에 있는 파일들만 가져온다. 그 폴더 안에 들어있는 '하위 폴더(서브 패키지)'의 내용물까지 알아서 긁어오지는 않는다.

```Java
package com.mycompany;

import java.util.*; // java.util 폴더 안의 파일들만 가져옴

public class Main {
    Scanner sc = new Scanner(System.in); // ⭕ 정상 작동 (java.util.Scanner 니까 가능)
    
    // ZipFile zip = new ZipFile(); 
    // 💥 에러 발생! ZipFile은 java.util 폴더 안의 zip이라는 '하위 폴더'에 있기 때문.
    // ✅ 해결: import java.util.zip.*; 을 한 줄 더 적어주어야 한다.
}
```

**② 이름이 똑같은 클래스를 동시에 가져올 때는 '풀네임' 필수**

자바 개발을 하다 보면 서로 다른 패키지에서 똑같은 이름의 클래스를 만들어 두는 경우가 흔하다. 가장 대표적인 것이 날짜를 다루는 Date 클래스다.

만약 이 두 패키지를 모두 import 했다면, 자바는 도대체 어떤 패키지의 달력을 써야 할지 몰라 혼란에 빠진다.

```Java
package com.mycompany;

import java.util.*; // 여기에 java.util.Date 가 있음
import java.sql.*;  // 여기에도 java.sql.Date 가 있음

public class Main {
    // Date today = new Date(); 
    // 💥 에러 발생! (Reference to 'Date' is ambiguous) 
    // 자바: "util 폴더의 Date를 말하는 거야, sql 폴더의 Date를 말하는 거야?"
    
    // ✅ 해결 방법: 사용할 때 패키지 이름까지 몽땅 적어주기 (Full Name 명시)
    java.util.Date utilDate = new java.util.Date(); 
    java.sql.Date sqlDate = new java.sql.Date(); 
}
```

💡 Tip: 만약 파일 안에서 주로 java.util.Date를 쓰고, 아주 가끔 java.sql.Date를 쓴다면 아래처럼 충돌을 우아하게 피할 수 있다.

```Java
// 1. 주로 쓸 클래스를 명확하게 콕 집어서 import 해둔다.
import java.util.Date; 

public class Main {
    // 그냥 Date라고 쓰면 무조건 미리 선언해둔 java.util.Date로 인식함!
    Date today = new Date(); 
    
    // 가끔 쓰는 sql의 Date만 예외적으로 풀네임을 적어줌
    java.sql.Date dbDate = new java.sql.Date(); 
}
```

{% include link-card.html url="/blog/engineering/java/javabasic-12+package+aliasing" %}